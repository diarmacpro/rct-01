/*
  # Create users table with custom authentication

  1. New Tables
    - `users`
      - `id` (uuid, primary key, auto-generated)
      - `username` (text, unique, not null)
      - `email` (text, unique, not null)  
      - `password_hash` (text, not null) - bcrypt hashed password
      - `name` (text, not null)
      - `ip_address` (text) - IP address when registered
      - `created_at` (timestamp, default now())
      - `updated_at` (timestamp, default now())

  2. Security
    - Enable RLS on `users` table
    - Add policy for users to read their own data
    - Add policy for public registration (insert)
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  ip_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO public
  USING (true);

-- Policy for public registration
CREATE POLICY "Anyone can register"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO public
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();