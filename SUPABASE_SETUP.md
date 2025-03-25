# Supabase Setup Instructions

To set up the required database tables for the AZURA registration system, follow these steps:

## 1. Create the Pending Registrations Table

1. Login to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to the SQL Editor in the sidebar
4. Create a new query
5. Copy and paste the following SQL:

```sql
-- Create pending_registrations table
CREATE TABLE IF NOT EXISTS pending_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  section TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  event TEXT NOT NULL,
  team_members TEXT[] NOT NULL,
  is_csi_member BOOLEAN NOT NULL,
  registration_fee INTEGER NOT NULL,
  status TEXT NOT NULL,
  session_id TEXT NOT NULL,
  payment_id TEXT,
  payment_reference TEXT
);

-- Create index on session_id for faster lookups
CREATE INDEX IF NOT EXISTS pending_registrations_session_id_idx ON pending_registrations(session_id);

-- Create index on email and status for webhook lookups
CREATE INDEX IF NOT EXISTS pending_registrations_email_status_idx ON pending_registrations(email, status);
```

6. Click "Run" to execute the SQL and create the table

## 2. Update the Registrations Table

If you already have a `registrations` table, you need to add payment-related columns:

```sql
-- Add payment columns to registrations table if they don't exist
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_id TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_reference TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_status TEXT;
```

## 3. Set Up Webhook for Razorpay (Optional)

For automatic payment confirmation:

1. In your Razorpay dashboard, navigate to Settings > Webhooks
2. Add a new webhook with your API endpoint URL: `https://your-domain.com/api/payment-webhook`
3. Select events like `payment.authorized` and `payment.captured`
4. Set the active status to "Active"

## 4. Set Up Environment Variables

Create or update your `.env.local` file with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
```

For the deployment environment (Vercel), add these same environment variables in your project settings.

## 5. Testing the Flow

To test the registration and payment flow:

1. Fill out the registration form
2. Click "Proceed to Payment"
3. Complete the payment in Razorpay
4. You should be redirected back to the success page
5. Check the `registrations` table to confirm the data was saved

If you encounter any issues, check the browser console and Supabase logs for error messages. 