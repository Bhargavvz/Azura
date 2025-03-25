-- Adding new columns to the registrations table for AZURA 2025
ALTER TABLE registrations 
  ADD COLUMN IF NOT EXISTS roll_number TEXT,
  ADD COLUMN IF NOT EXISTS section TEXT,
  ADD COLUMN IF NOT EXISTS department TEXT,
  ADD COLUMN IF NOT EXISTS year TEXT;

-- Making sure all columns from the form are available
ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS college TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS events TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS team_members TEXT[] NOT NULL DEFAULT '{}';

-- Add any indexes that would be helpful
CREATE INDEX IF NOT EXISTS registrations_email_idx ON registrations(email);
CREATE INDEX IF NOT EXISTS registrations_name_idx ON registrations(name);

-- Add payment-related columns to registrations table
ALTER TABLE registrations
ADD COLUMN is_csi_member BOOLEAN DEFAULT false,
ADD COLUMN payment_id VARCHAR(255),
ADD COLUMN payment_status VARCHAR(50),
ADD COLUMN amount_paid DECIMAL(10, 2),
ADD COLUMN payment_timestamp TIMESTAMP WITH TIME ZONE,
ADD COLUMN razorpay_order_id VARCHAR(255),
ADD COLUMN razorpay_payment_id VARCHAR(255),
ADD COLUMN razorpay_signature VARCHAR(255);

-- Create index on payment_id for faster lookups
CREATE INDEX idx_registrations_payment_id ON registrations(payment_id);

-- Create index on razorpay_order_id for faster lookups
CREATE INDEX idx_registrations_razorpay_order_id ON registrations(razorpay_order_id); 