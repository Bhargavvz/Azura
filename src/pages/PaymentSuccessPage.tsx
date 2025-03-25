import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment...');
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentId?: string;
    event?: string;
    amount?: number;
  }>({});

  useEffect(() => {
    async function verifyPaymentAndComplete() {
      try {
        // Get payment ID from URL
        const paymentId = searchParams.get('razorpay_payment_id');
        const paymentReference = searchParams.get('razorpay_order_id');
        
        if (!paymentId) {
          setStatus('error');
          setMessage('Payment ID not found in the URL. Your payment might not have been completed.');
          return;
        }
        
        console.log('Verifying payment:', paymentId);
        setPaymentDetails(prev => ({ ...prev, paymentId }));
        
        // Get stored pending registration info
        const storedInfo = localStorage.getItem('azura_pending_registration');
        if (!storedInfo) {
          setStatus('error');
          setMessage('Registration data not found. Please contact support with your payment ID.');
          return;
        }
        
        // Parse stored registration info
        const pendingReg = JSON.parse(storedInfo);
        
        if (!pendingReg || !pendingReg.email) {
          setStatus('error');
          setMessage('Incomplete registration data. Please contact support with your payment ID.');
          return;
        }
        
        console.log('Found pending registration in localStorage:', pendingReg);
        setPaymentDetails(prev => ({ 
          ...prev, 
          event: pendingReg.event,
          amount: pendingReg.registration_fee
        }));
        
        // Create final registration with payment details
        const registrationData = {
          name: pendingReg.name,
          email: pendingReg.email,
          phone: pendingReg.phone,
          college: pendingReg.college,
          roll_number: pendingReg.roll_number,
          section: pendingReg.section,
          department: pendingReg.department,
          year: pendingReg.year,
          event: pendingReg.event,
          team_members: pendingReg.team_members,
          is_csi_member: pendingReg.is_csi_member,
          registration_fee: pendingReg.registration_fee,
          payment_id: paymentId,
          payment_reference: paymentReference,
          payment_status: 'completed'
        };
        
        // Insert into main registrations table
        const { error: insertError } = await supabase
          .from('registrations')
          .insert([registrationData]);
          
        if (insertError) {
          console.error('Error creating final registration:', insertError);
          setStatus('error');
          setMessage('Error saving your registration. Please contact support with your payment ID.');
          return;
        }
        
        console.log('Registration saved to Supabase successfully');
        
        // Send email notification
        try {
          const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              registration: registrationData,
              recipientEmail: 'azura2025@gmail.com' // Admin email
            })
          });
          
          if (!emailResponse.ok) {
            console.warn('Email notification failed but registration was successful');
          } else {
            console.log('Email notification sent successfully');
          }
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
        }
        
        // Clear stored registration data
        localStorage.removeItem('azura_pending_registration');
        
        // Set success status
        setStatus('success');
        setMessage('Your payment was successful and your registration is confirmed!');
        
      } catch (error) {
        console.error('Error processing payment success:', error);
        setStatus('error');
        setMessage('An error occurred while processing your payment. Please contact support.');
      }
    }
    
    verifyPaymentAndComplete();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-24 pb-16">
      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 text-indigo-300 hover:text-white transition-colors">
        <motion.div
          whileHover={{ x: -5 }}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.div>
      </Link>

      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20 p-8 text-center"
        >
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-indigo-400 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Processing Your Payment</h2>
              <p className="text-indigo-200 mb-4">{message}</p>
              <p className="text-indigo-300 text-sm">This may take a few moments...</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
              <p className="text-indigo-200 mb-6">{message}</p>
              
              <div className="bg-white/10 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-4">Registration Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Payment ID:</span>
                    <span className="text-white">{paymentDetails.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Event:</span>
                    <span className="text-white">{paymentDetails.event}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Amount Paid:</span>
                    <span className="text-white">₹{paymentDetails.amount}/-</span>
                  </div>
                </div>
              </div>
              
              <p className="text-indigo-200 mb-6">
                We've sent a confirmation email with your registration details. 
                Please check your inbox.
              </p>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg"
                >
                  Return to Home
                </motion.button>
              </Link>
            </>
          )}
          
          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 mx-auto text-red-400 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Payment Verification Failed</h2>
              <p className="text-indigo-200 mb-6">{message}</p>
              
              {paymentDetails.paymentId && (
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <p className="text-white">Your payment ID: <span className="font-mono">{paymentDetails.paymentId}</span></p>
                  <p className="text-indigo-300 text-sm mt-2">
                    Please save this ID and contact us if you believe your payment was successful.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg"
                  >
                    Try Again
                  </motion.button>
                </Link>
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg"
                  >
                    Return to Home
                  </motion.button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
} 