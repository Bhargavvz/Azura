import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Razorpay from 'https://esm.sh/razorpay@2.8.6';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Log environment variables (without exposing secrets)
    console.log('Checking environment variables...');
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    console.log('RAZORPAY_KEY_ID exists:', !!keyId);
    console.log('RAZORPAY_KEY_SECRET exists:', !!keySecret);

    if (!keyId || !keySecret) {
      console.error('Missing Razorpay credentials');
      throw new Error('Missing Razorpay credentials');
    }

    // Log request headers
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    // Log request body
    const body = await req.json();
    console.log('Request body:', {
      amount: body.amount,
      receipt: body.receipt
    });

    if (!body.amount || !body.receipt) {
      console.error('Missing required fields:', { amount: !!body.amount, receipt: !!body.receipt });
      throw new Error('Missing required fields: amount and receipt');
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    console.log('Creating Razorpay order...');
    const order = await razorpay.orders.create({
      amount: body.amount, // amount in paise
      currency: 'INR',
      receipt: body.receipt,
    });
    console.log('Order created successfully:', order.id);

    return new Response(
      JSON.stringify(order),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
}); 