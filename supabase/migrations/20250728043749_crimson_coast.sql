/*
  # Create bots table for bot management

  1. New Tables
    - `bots`
      - `id` (uuid, primary key, auto-generated)
      - `user_id` (uuid, foreign key to users)
      - `name` (text, not null)
      - `description` (text)
      - `type` (text, default 'general')
      - `language` (text, default 'english')
      - `personality` (text, default 'professional')
      - `status` (text, default 'inactive')
      - `created_at` (timestamp, default now())
      - `updated_at` (timestamp, default now())
      - `last_active` (timestamp)

  2. Security
    - Enable RLS on `bots` table
    - Add policies for users to manage their own bots
*/

CREATE TABLE IF NOT EXISTS bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type text DEFAULT 'general',
  language text DEFAULT 'english',
  personality text DEFAULT 'professional',
  status text DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'training')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_active timestamptz
);

ALTER TABLE bots ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own bots
CREATE POLICY "Users can read own bots"
  ON bots
  FOR SELECT
  TO public
  USING (true);

-- Policy for users to insert their own bots
CREATE POLICY "Users can create own bots"
  ON bots
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for users to update their own bots
CREATE POLICY "Users can update own bots"
  ON bots
  FOR UPDATE
  TO public
  USING (true);

-- Policy for users to delete their own bots
CREATE POLICY "Users can delete own bots"
  ON bots
  FOR DELETE
  TO public
  USING (true);

-- Create trigger to automatically update updated_at for bots
CREATE TRIGGER update_bots_updated_at
  BEFORE UPDATE ON bots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();