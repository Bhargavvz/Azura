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
    console.log('- GOOGLE_SHEET_ID exists:', !!Deno.env.get('GOOGLE_SHEET_ID'));
    console.log('- GOOGLE_CLIENT_EMAIL exists:', !!Deno.env.get('GOOGLE_CLIENT_EMAIL'));
    console.log('- GOOGLE_PRIVATE_KEY exists:', !!Deno.env.get('GOOGLE_PRIVATE_KEY'));
    
    const { registration } = await req.json();
    
    // Log the received registration data
    console.log('Received registration data for Google Sheets:', registration);

    // Get Sheet ID from environment
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID');
    if (!sheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable not set');
    }

    // Get Google API credentials
    const clientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
    
    if (!clientEmail || !privateKey) {
      throw new Error('Google API credentials not configured');
    }
    
    // Log credentials availability (not the actual values)
    console.log('Google API credentials available:', {
      clientEmail: !!clientEmail,
      privateKey: !!privateKey,
      sheetId: !!sheetId
    });

    // Prepare the values for the spreadsheet - convert arrays to strings
    let events = registration.events;
    let teamMembers = registration.teamMembers;
    
    // Handle different data types
    if (Array.isArray(events)) {
      events = events.join(', ');
    }
    
    if (Array.isArray(teamMembers)) {
      teamMembers = teamMembers.join(', ');
    }
    
    const values = [
      [
        registration.name || '',
        registration.email || '',
        registration.phone || '',
        registration.college || '',
        registration.rollNumber || '',
        registration.section || '',
        registration.department || '',
        registration.year || '',
        events || '',
        teamMembers || ''
      ]
    ];
    
    // Generate JWT for Google API authentication
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600; // 1 hour
    
    const jwt = await createJWT(
      clientEmail,
      privateKey,
      'https://sheets.googleapis.com/auth/spreadsheets',
      iat,
      exp
    );
    
    // Call Google Sheets API to append values
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:J:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: values
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', errorText);
      throw new Error(`Google Sheets API error: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    
    return new Response(
      JSON.stringify({ 
        message: 'Added to Google Sheets successfully',
        updatedRange: result.updates?.updatedRange,
        updatedRows: result.updates?.updatedRows
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in append-to-sheet function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to create JWT for Google API
async function createJWT(clientEmail: string, privateKey: string, scope: string, iat: number, exp: number) {
  // Create JWT header
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  // Create JWT claim set
  const claim = {
    iss: clientEmail,
    scope: scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: exp,
    iat: iat
  };
  
  // Encode header and claim
  const encoder = new TextEncoder();
  const headerBase64 = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const claimBase64 = btoa(JSON.stringify(claim)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  
  // Create signature
  const signatureInput = encoder.encode(`${headerBase64}.${claimBase64}`);
  const keyData = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKey),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    keyData,
    signatureInput
  );
  
  // Convert signature to base64
  const signatureBase64 = arrayBufferToBase64(signature)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  
  // Create JWT token
  const jwt = `${headerBase64}.${claimBase64}.${signatureBase64}`;
  
  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  
  const tokenData = await tokenResponse.json();
  
  if (!tokenResponse.ok) {
    throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
  }
  
  return tokenData.access_token;
}

// Helper function to convert PEM to ArrayBuffer
function pemToArrayBuffer(pem: string) {
  const pemContents = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  
  const binary = atob(pemContents);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
} 