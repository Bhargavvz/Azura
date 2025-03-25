// This is a Vercel API route for sending emails
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // Use environment variables in production
  // For testing, you can use a service like Ethereal (https://ethereal.email)
  // or configure your own SMTP settings
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
    const { registration, recipientEmail } = req.body;

    if (!registration || !recipientEmail) {
      return res.status(400).json({ error: 'Registration data and recipient email are required' });
    }
    
    console.log('Received registration data:', registration);

    // Assume using snake_case as that's what Supabase uses
    const rollNumber = registration.roll_number || '';
    const teamMembers = registration.team_members || [];
    const isCsiMember = registration.is_csi_member || false;
    const registrationFee = registration.registration_fee || 0;

    // Prepare email content
    const htmlContent = `
      <h2>New Registration Details</h2>
      <p><strong>Name:</strong> ${registration.name}</p>
      <p><strong>Email:</strong> ${registration.email}</p>
      <p><strong>Phone:</strong> ${registration.phone}</p>
      <p><strong>Roll Number:</strong> ${rollNumber}</p>
      <p><strong>Section:</strong> ${registration.section}</p>
      <p><strong>Department:</strong> ${registration.department}</p>
      <p><strong>College:</strong> ${registration.college}</p>
      <p><strong>Year:</strong> ${registration.year}</p>
      <p><strong>Event:</strong> ${registration.event}</p>
      ${teamMembers && teamMembers.length > 0 ? `
        <p><strong>Team Members:</strong></p>
        <ul>
          ${Array.isArray(teamMembers) ? teamMembers.map(member => member ? `<li>${member}</li>` : '').join('') : ''}
        </ul>
      ` : ''}
      <p><strong>CSI Member:</strong> ${isCsiMember ? 'Yes' : 'No'}</p>
      <p><strong>Registration Fee:</strong> ₹${registrationFee}</p>
    `;

    // Create email transporter
    const transporter = createTransporter();

    // Send email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: `New Registration for AZURA - ${registration.name}`,
      html: htmlContent,
    };

    await transporter.sendMail(adminMailOptions);
    console.log('Sent admin email to:', recipientEmail);

    // Send confirmation email to the participant
    const participantMailOptions = {
      from: process.env.SMTP_USER,
      to: registration.email,
      subject: 'Your AZURA Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4338ca;">AZURA Registration Confirmation</h2>
          <p>Dear ${registration.name},</p>
          <p>Thank you for registering for AZURA! Your registration has been successfully processed.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4338ca;">Registration Details:</h3>
            <p><strong>Event:</strong> ${registration.event}</p>
            <p><strong>Registration Fee:</strong> ₹${registrationFee}</p>
          </div>
          
          <p>Please keep this email for your records. If you have any questions, feel free to contact us at <a href="mailto:cse_azura@cmrcet.ac.in">cse_azura@cmrcet.ac.in</a>.</p>
          
          <p>We look forward to seeing you at the event!</p>
          
          <p style="margin-top: 30px;">Best regards,<br>AZURA Team</p>
        </div>
      `,
    };

    await transporter.sendMail(participantMailOptions);
    console.log('Sent participant email to:', registration.email);

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
} 