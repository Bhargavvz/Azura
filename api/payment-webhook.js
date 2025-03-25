// This is a Vercel API route for handling Razorpay payment webhooks
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  try {
    // Extract payment verification from Razorpay
    const {
      payload: { payment: { entity } } = { payment: { entity: {} } },
      event,
    } = req.body;

    // Log webhook data
    console.log('Received payment webhook:', event);
    console.log('Payment entity:', entity);

    // Verify this is a payment completion event
    if (event !== 'payment.captured' && event !== 'payment.authorized') {
      return res.status(200).json({
        message: 'Webhook received but not processing - not a payment completion event',
        event
      });
    }

    const paymentId = entity.id;
    const amount = entity.amount / 100; // Razorpay amount is in paise
    const email = entity.email || 'Unknown';
    const phone = entity.contact || 'Unknown';
    const status = entity.status || 'completed';

    console.log(`Processing payment: ${paymentId} for ₹${amount} by ${email}`);

    // Look up pending registration with matching info
    const { data: pendingRegistrations, error: findError } = await supabase
      .from('pending_registrations')
      .select('*')
      .eq('email', email)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1);

    if (findError) {
      console.error('Error querying pending registrations:', findError);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (!pendingRegistrations || pendingRegistrations.length === 0) {
      console.warn(`No matching pending registration found for email: ${email}`);
      return res.status(200).json({ 
        message: 'Payment processed but no matching registration found',
        paymentId
      });
    }

    const pendingReg = pendingRegistrations[0];
    console.log('Found matching pending registration:', pendingReg.id);

    // Prepare registration data with payment info
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
      payment_status: status
    };

    // Insert verified registration into main registrations table
    const { error: insertError } = await supabase
      .from('registrations')
      .insert([registrationData]);

    if (insertError) {
      console.error('Error inserting registration:', insertError);
      return res.status(500).json({ error: 'Failed to save registration' });
    }

    // Update pending registration status
    await supabase
      .from('pending_registrations')
      .update({ status: 'completed', payment_id: paymentId })
      .eq('id', pendingReg.id);

    // Send confirmation emails
    try {
      const transporter = createTransporter();
      
      // Email to admin
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'azura2025@gmail.com',
        subject: `New Paid Registration for AZURA - ${registrationData.name}`,
        html: `
          <h2>New Registration with Confirmed Payment</h2>
          <p><strong>Name:</strong> ${registrationData.name}</p>
          <p><strong>Email:</strong> ${registrationData.email}</p>
          <p><strong>Phone:</strong> ${registrationData.phone}</p>
          <p><strong>Event:</strong> ${registrationData.event}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Amount:</strong> ₹${amount}</p>
          <p><strong>Status:</strong> ${status}</p>
        `
      });
      
      // Email to participant
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: registrationData.email,
        subject: 'Your AZURA Registration is Confirmed!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #4338ca;">AZURA Registration Confirmation</h2>
            <p>Dear ${registrationData.name},</p>
            <p>Thank you for registering for AZURA! Your payment has been received and your registration is now confirmed.</p>
            
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #4338ca;">Registration Details:</h3>
              <p><strong>Event:</strong> ${registrationData.event}</p>
              <p><strong>Payment ID:</strong> ${paymentId}</p>
              <p><strong>Amount Paid:</strong> ₹${amount}</p>
            </div>
            
            <p>Please keep this email for your records. If you have any questions, feel free to contact us at <a href="mailto:cse_azura@cmrcet.ac.in">cse_azura@cmrcet.ac.in</a>.</p>
            
            <p>We look forward to seeing you at the event!</p>
            
            <p style="margin-top: 30px;">Best regards,<br>AZURA Team</p>
          </div>
        `
      });
      
      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
    }

    return res.status(200).json({
      message: 'Payment processed and registration completed successfully',
      paymentId
    });
  } catch (error) {
    console.error('Error processing payment webhook:', error);
    return res.status(500).json({ 
      error: 'Failed to process payment webhook', 
      details: error.message 
    });
  }
} 