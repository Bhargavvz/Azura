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

-- Add payment columns to registrations table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'registrations' AND column_name = 'payment_id') THEN
    ALTER TABLE registrations ADD COLUMN payment_id TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'registrations' AND column_name = 'payment_reference') THEN
    ALTER TABLE registrations ADD COLUMN payment_reference TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'registrations' AND column_name = 'payment_status') THEN
    ALTER TABLE registrations ADD COLUMN payment_status TEXT;
  END IF;
END $$; 