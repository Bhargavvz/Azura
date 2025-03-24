/*
  # Create registrations table for Azura 2025

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `college` (text)
      - `year` (text)
      - `events` (text[])
      - `team_members` (text[])

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public insert access
    - Add policy for reading own registration data
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  college text NOT NULL,
  year text NOT NULL,
  events text[] NOT NULL,
  team_members text[] DEFAULT '{}'::text[]
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert registrations"
  ON registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own registration"
  ON registrations
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');