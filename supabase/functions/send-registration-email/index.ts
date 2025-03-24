import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  try {
    // Log environment variable presence for debugging
    console.log('Environment variables check:');
    console.log('- RESEND_API_KEY exists:', !!Deno.env.get('RESEND_API_KEY'));
    console.log('- SENDGRID_API_KEY exists:', !!Deno.env.get('SENDGRID_API_KEY'));
    
    const { registration, adminEmail } = await req.json();
    
    console.log(`Received registration email request for ${registration.name} to ${adminEmail}`);

    // Prepare email content
    const emailContent = `
      <h2>New Registration Details</h2>
      <p><strong>Name:</strong> ${registration.name}</p>
      <p><strong>Email:</strong> ${registration.email}</p>
      <p><strong>Phone:</strong> ${registration.phone}</p>
      <p><strong>Roll Number:</strong> ${registration.rollNumber}</p>
      <p><strong>Section:</strong> ${registration.section}</p>
      <p><strong>Department:</strong> ${registration.department}</p>
      <p><strong>College:</strong> ${registration.college}</p>
      <p><strong>Year:</strong> ${registration.year}</p>
      <p><strong>Events:</strong></p>
      <ul>
        ${Array.isArray(registration.events) 
          ? registration.events.map(event => `<li>${event}</li>`).join('') 
          : `<li>${registration.events}</li>`}
      </ul>
      <p><strong>Team Members:</strong></p>
      <ul>
        ${Array.isArray(registration.teamMembers) 
          ? registration.teamMembers.map(member => member ? `<li>${member}</li>` : '').join('') 
          : registration.teamMembers ? `<li>${registration.teamMembers}</li>` : ''}
      </ul>
    `;

    // Check if we have API key for a mail service like SendGrid or Resend
    const mailApiKey = Deno.env.get('RESEND_API_KEY') || Deno.env.get('SENDGRID_API_KEY');
    if (!mailApiKey) {
      console.warn('No email service API key found in environment variables');
      return new Response(
        JSON.stringify({ 
          message: 'Email notification not sent - no API key configured',
          registration: {
            name: registration.name,
            email: registration.email,
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine which email service to use (Resend preferred)
    if (Deno.env.get('RESEND_API_KEY')) {
      console.log('Using Resend to send email');
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'AZURA 2025 <registration@azura2025.com>',
          to: [adminEmail],
          subject: `New Registration for AZURA 2025 - ${registration.name}`,
          html: emailContent
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Resend API error: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Email sent via Resend:', result);
    } 
    // SendGrid fallback
    else if (Deno.env.get('SENDGRID_API_KEY')) {
      console.log('Using SendGrid to send email');
      
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: adminEmail }] }],
          from: { email: 'registration@azura2025.com', name: 'AZURA 2025' },
          subject: `New Registration for AZURA 2025 - ${registration.name}`,
          content: [{ type: 'text/html', value: emailContent }]
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SendGrid API error: ${response.status} ${errorText}`);
      }
      
      console.log('Email sent via SendGrid');
    }
    
    return new Response(
      JSON.stringify({ message: 'Email notification sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-registration-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 