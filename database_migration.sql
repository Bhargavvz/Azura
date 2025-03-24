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