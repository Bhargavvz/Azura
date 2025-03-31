import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Building, Hash, BookOpen, GraduationCap, CheckCircle, CreditCard } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define available departments
const departments = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other'
];

// Sample event data
const allEvents = [
  { title: 'Blind Coding', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Tech Relay', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'DevDash', category: 'Technical', teamSize: '1-2', fee: { csi: '100', nonCsi: '100' } },
  { title: 'Bug Hunt', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Crack It Up 2.0', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'PPT Presentation', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Freshman Code Cup', category: 'Technical', teamSize: '1', fee: { csi: '150', nonCsi: '150' } },
  { title: 'Coding Premier League', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Poster Presentation with AI', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Predict & Win', category: 'Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Musical Feast', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Box Office Battle', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Wordless Wonder', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Try Not to Laugh', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Tech Treasure', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Memes Challenge', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Musical Ball Tag', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Dance Diwana', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } },
  { title: 'Free Fire Tournament', category: 'Non-Technical', teamSize: '1-2', fee: { csi: '150', nonCsi: '200' } }
];

// Define event redirect links type
type EventName = keyof typeof eventRedirectLinks;

// Define event redirect links
const eventRedirectLinks = {
  'DevDash': 'https://dev-dash-omega.vercel.app/',
  'Predict and Win': 'payment link',
  'Blind Coding': 'https://docs.google.com/forms/d/e/1FAIpQLSefq0YoUAaXic_v0YnlQ2OU8vUI8DmDOeW5ncx4OHZc62heug/viewform',
  'Tech Relay': 'https://docs.google.com/forms/d/e/1FAIpQLSfdlFCJmMeMC7dVifEXZjAE9vp0cPkniEGvvLr1MjsmeZpN7A/viewform',
  'Freshman Code Cup': 'https://docs.google.com/forms/d/e/1FAIpQLScJW2VEMfO_2Tm9LiBJSC2qHNM1WNVxXW0Kp15vfeq4hCz5mg/viewform',
  'Bug Hunt': 'payment link',
  'Coding Premier League': 'https://docs.google.com/forms/d/e/1FAIpQLSdv8nF7zJz78rmtDox_0BRe_RZ1R0CE6J5sKfEdc-hwZqCoEA/viewform',
  'Crack It Up 2.0': 'or not working',
  'Poster Presentation with AI': 'https://docs.google.com/forms/d/e/1FAIpQLSfj0fpG9ZO0zcZ3WbLmBYBvApwWRliPCWygh7KpcqOF_k9nFA/viewform',
  'PPT Presentation': 'payment link',
  'Musical Feast': 'https://docs.google.com/forms/d/e/1FAIpQLSdaGaHKIyCAl70IfaQroYXD6M9zOOeQOCDZ9XYAUIQU_RswSw/viewform',
  'Try Not to Laugh': 'Payment link',
  'Wordless Wonder': 'https://docs.google.com/forms/d/e/1FAIpQLSf_a-BLHQVTry9RDU_pAui7LPl-GWQLWuG8ZDWZLCEbmr_FWg/viewform',
  'Free Fire Tournament': 'https://docs.google.com/forms/d/e/1FAIpQLSdayA4dJFMMry5oOUxWx9nOZ9LhA9nyy5OPq5Z9ytB34asdGQ/viewform',
  'Box Office Battle': 'https://docs.google.com/forms/d/e/1FAIpQLScWR5W7Tp7rzR5Khu9Oha05mXR5VspEUN2TaiHKNaiZ1jRzpQ/viewform',
  'Meme Challenge': 'https://docs.google.com/forms/d/e/1FAIpQLSc36fAPRMXX4IN7batp3OWF1wPnx2gXyq7du667LL5a_nzJCg/viewform',
  'Tech Treasure': 'https://docs.google.com/forms/d/e/1FAIpQLSeOP9tlcEmi_ZJkptawilXKYHtoPPQvBn7ndDj-CC8JWcPhfQ/viewform',
  'Musical Ball Tag': 'https://docs.google.com/forms/d/e/1FAIpQLSfxTYsABluz8vO1OuB4tOLOKHFxKkKLmL1cRudmg7lU5PWNxA/viewform?pli=1',
  'Dance Diwana': 'Payment link'
} as const;

// Component for Department icon
function Dept(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}

// Steps for the registration process
const steps = [
  { number: 1, title: 'Personal Info' },
  { number: 2, title: 'Academic Details' },
  { number: 3, title: 'Event Selection' },
  { number: 4, title: 'Team Details' }
];

// Initial form data
const initialFormData = {
  name: '',
  email: '',
  phone: '',
  college: '',
  rollNumber: '',
  section: '',
  department: '',
  year: '',
  event: '',
  teamMembers: ['', ''] as string[],
  isCsiMember: false
};

export function RegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update handleEventChange function
  const handleEventChange = (eventName: string) => {
    setFormData(prev => ({
      ...prev,
      event: eventName
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Prepare data in format matching Supabase table columns
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        roll_number: formData.rollNumber,
        section: formData.section,
        department: formData.department,
        year: formData.year,
        event: formData.event,
        team_members: formData.teamMembers.filter(Boolean),
        is_csi_member: formData.isCsiMember
      };
      
      console.log('Submitting registration data:', registrationData);
      
      // Insert into Supabase with correct column names
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);
      
      if (error) throw error;
      
      console.log('Database insertion successful');
      
      // Actually attempt to send email notification
      try {
        console.log('Sending email notification...');
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-registration-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            registration: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              college: formData.college,
              roll_number: formData.rollNumber,
              section: formData.section,
              department: formData.department,
              year: formData.year,
              event: formData.event,
              team_members: formData.teamMembers.filter(Boolean),
              is_csi_member: formData.isCsiMember
            },
            adminEmail: 'azura2025@gmail.com' // Replace with your actual admin email
          })
        });
        
        console.log('Email notification response status:', emailResponse.status);
        const emailResponseText = await emailResponse.text();
        console.log('Email notification response:', emailResponseText);
        
        if (!emailResponse.ok) {
          console.warn('Failed to send email notification:', emailResponseText);
        } else {
          console.log('Email notification sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }
      
      // Actually attempt to add data to Google Sheets
      try {
        console.log('Adding data to Google Sheets...');
        const driveResponse = await fetch(`${supabaseUrl}/functions/v1/append-to-sheet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            registration: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              college: formData.college,
              roll_number: formData.rollNumber,
              section: formData.section,
              department: formData.department,
              year: formData.year,
              event: formData.event,
              team_members: formData.teamMembers.filter(Boolean).join(', '),
              is_csi_member: formData.isCsiMember
            }
          })
        });
        
        console.log('Google Sheets response status:', driveResponse.status);
        const driveResponseText = await driveResponse.text();
        console.log('Google Sheets response:', driveResponseText);
        
        if (!driveResponse.ok) {
          console.warn('Failed to add data to Google Sheets:', driveResponseText);
        } else {
          console.log('Data added to Google Sheets successfully');
        }
      } catch (driveError) {
        console.error('Error adding data to Google Sheets:', driveError);
      }
      
      // Success notification
      toast.success('Registration successful!');
      
      // Reset form and show success
      setFormData(initialFormData);
      setActiveStep(1);
      setSubmitSuccess(true);
      
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast.error(errorMessage);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update handleRedirect function
  const handleRedirect = async () => {
    try {
      setIsSubmitting(true);
      const redirectLink = eventRedirectLinks[formData.event as EventName];
      
      if (!redirectLink) {
        toast.error('No registration link available for this event.');
        return;
      }

      if (redirectLink === 'payment link' || redirectLink === 'Payment link') {
        toast.error('Please proceed to payment counter for registration.');
        return;
      }

      if (redirectLink === 'or not working') {
        toast.error('This event registration is currently not available.');
        return;
      }

      // Prepare data for database
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        roll_number: formData.rollNumber,
        section: formData.section,
        department: formData.department,
        year: formData.year,
        event: formData.event,
        team_members: formData.teamMembers.filter(Boolean),
        is_csi_member: formData.isCsiMember
      };

      // Save to Supabase
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (error) {
        console.error('Error saving to database:', error);
        toast.error('Failed to save registration. Please try again.');
        return;
      }

      // Send email notifications
      try {
        // Send email to participant
        const participantEmailResponse = await fetch('https://sitknuiapmvuobgjmhmd.supabase.co/functions/v1/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            to: formData.email,
            subject: `AZURA 2025 - Registration Confirmation for ${formData.event}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">AZURA 2025 Registration Confirmation</h2>
                <p>Dear ${formData.name},</p>
                <p>Thank you for registering for AZURA 2025! Your registration for ${formData.event} has been confirmed.</p>
                
                <h3 style="color: #4F46E5;">Registration Details:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Event:</strong> ${formData.event}</li>
                  <li><strong>Name:</strong> ${formData.name}</li>
                  <li><strong>Email:</strong> ${formData.email}</li>
                  <li><strong>Phone:</strong> ${formData.phone}</li>
                  <li><strong>College:</strong> ${formData.college}</li>
                  <li><strong>Roll Number:</strong> ${formData.rollNumber}</li>
                  <li><strong>Department:</strong> ${formData.department}</li>
                  <li><strong>Year:</strong> ${formData.year}</li>
                </ul>
                
                <p>Please proceed to complete your registration by clicking the link that will be provided after this confirmation.</p>
                
                <p style="margin-top: 20px;">Best regards,<br>AZURA 2025 Team</p>
              </div>
            `
          })
        });

        // Send email to admin
        const adminEmailResponse = await fetch('https://sitknuiapmvuobgjmhmd.supabase.co/functions/v1/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            to: 'azura2025@gmail.com',
            subject: `New Registration: ${formData.event} - ${formData.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">New Registration for AZURA 2025</h2>
                
                <h3 style="color: #4F46E5;">Registration Details:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Event:</strong> ${formData.event}</li>
                  <li><strong>Name:</strong> ${formData.name}</li>
                  <li><strong>Email:</strong> ${formData.email}</li>
                  <li><strong>Phone:</strong> ${formData.phone}</li>
                  <li><strong>College:</strong> ${formData.college}</li>
                  <li><strong>Roll Number:</strong> ${formData.rollNumber}</li>
                  <li><strong>Department:</strong> ${formData.department}</li>
                  <li><strong>Year:</strong> ${formData.year}</li>
                  <li><strong>CSI Member:</strong> ${formData.isCsiMember ? 'Yes' : 'No'}</li>
                </ul>
              </div>
            `
          })
        });

        if (!participantEmailResponse.ok || !adminEmailResponse.ok) {
          console.warn('Failed to send some email notifications');
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
      }

      // Add to Google Sheets
      try {
        console.log('Adding to Google Sheets...');
        await fetch(`${supabaseUrl}/functions/v1/append-to-sheet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            registration: {
              ...registrationData,
              team_members: registrationData.team_members.join(', ')
            }
          })
        });
      } catch (sheetError) {
        console.error('Error updating sheet:', sheetError);
      }

      // Store form data in localStorage before redirecting
      localStorage.setItem('registration_data', JSON.stringify(formData));
      
      // Show success message
      toast.success('Registration saved successfully!');

      // Redirect to the event-specific form
      window.location.href = redirectLink;

    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
        >
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-indigo-900 to-slate-900 text-white">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Register for AZURA 2025
            </h1>
            <p className="text-indigo-200">Fill in your details to participate in the events</p>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 border-b border-indigo-500/20">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep >= step.number
                        ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white'
                        : 'bg-white/10 text-indigo-200'
                    }`}
                  >
                    {activeStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        activeStep > step.number ? 'bg-gradient-to-r from-indigo-400 to-purple-400' : 'bg-white/10'
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="College/University"
                        value={formData.college}
                        onChange={e => setFormData(prev => ({ ...prev, college: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-indigo-200">
                      CSI Membership
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isCsiMember"
                        checked={formData.isCsiMember}
                        onChange={(e) => setFormData({ ...formData, isCsiMember: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="isCsiMember" className="text-sm text-indigo-200">
                        I am a CSI member
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-900"
                    >
                      Next Step
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Roll Number"
                        value={formData.rollNumber}
                        onChange={e => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Section"
                        value={formData.section}
                        onChange={e => setFormData(prev => ({ ...prev, section: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div className="relative">
                      <Dept className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <select
                        required
                        value={formData.department}
                        onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="" className="bg-slate-900 text-white">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept} className="bg-slate-900 text-white">
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                      <select
                        required
                        value={formData.year}
                        onChange={e => setFormData(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-indigo-500/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="" className="bg-slate-900 text-white">Select Year</option>
                        <option value="1" className="bg-slate-900 text-white">1st Year</option>
                        <option value="2" className="bg-slate-900 text-white">2nd Year</option>
                        <option value="3" className="bg-slate-900 text-white">3rd Year</option>
                        <option value="4" className="bg-slate-900 text-white">4th Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-indigo-900"
                    >
                      Previous Step
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-900"
                    >
                      Next Step
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Select Event</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {allEvents.map((event) => (
                        <motion.div
                          key={event.title}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            formData.event === event.title
                              ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-indigo-500'
                              : 'bg-white/5 border-white/10 hover:border-indigo-500/50'
                          }`}
                          onClick={() => handleEventChange(event.title)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                checked={formData.event === event.title}
                                onChange={() => {}}
                                className="w-5 h-5 text-indigo-500 border-gray-300 focus:ring-indigo-500"
                              />
                              <div className="ml-3">
                                <span className="block font-medium text-white">{event.title}</span>
                                <span className="block text-sm text-indigo-300">{event.category}</span>
                                <div className="mt-1 text-xs text-indigo-400">
                                  <span>Team Size: {event.teamSize}</span>
                                  <span className="ml-3">Fee: ₹{formData.isCsiMember ? event.fee.csi : event.fee.nonCsi}/-</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-indigo-900"
                    >
                      Previous Step
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveStep(4)}
                      disabled={!formData.event}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-900 disabled:opacity-50"
                    >
                      Next Step
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Registration Summary</h2>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-200">Selected Event:</span>
                        <span className="text-white">{formData.event}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-200">Name:</span>
                        <span className="text-white">{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-200">Email:</span>
                        <span className="text-white">{formData.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-200">Phone:</span>
                        <span className="text-white">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-200">College:</span>
                        <span className="text-white">{formData.college}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-indigo-900"
                    >
                      Previous Step
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRedirect}
                      disabled={isSubmitting || !formData.event}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-900 disabled:opacity-50"
                    >
                      Complete Registration
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Submission status messages */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-indigo-500/20 border border-indigo-500 rounded-lg p-4 text-center mt-6"
                >
                  <p className="text-white">Registration successful! We look forward to seeing you at AZURA 2025.</p>
                </motion.div>
              )}
              
              {submitError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center mt-6"
                >
                  <p className="text-white">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
}