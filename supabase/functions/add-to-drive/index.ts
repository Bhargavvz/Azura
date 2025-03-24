import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { registration } = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the Google Drive API client
    const { data: driveClient, error: driveError } = await supabaseClient.functions.invoke('get-drive-client', {
      body: {
        email: 'cse_azura@cmrcet.ac.in'
      }
    });

    if (driveError) throw driveError;

    // Create CSV row
    const csvRow = [
      new Date().toISOString(),
      registration.name,
      registration.email,
      registration.phone,
      registration.rollNumber,
      registration.section,
      registration.department,
      registration.college,
      registration.year,
      registration.events.join(', '),
      registration.teamMembers.join(', ')
    ].join(',');

    // Append to Google Sheet
    const { error: sheetError } = await supabaseClient.functions.invoke('append-to-sheet', {
      body: {
        driveClient,
        sheetId: Deno.env.get('GOOGLE_SHEET_ID'),
        values: [csvRow]
      }
    });

    if (sheetError) throw sheetError;

    return new Response(
      JSON.stringify({ message: 'Added to Google Drive successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 