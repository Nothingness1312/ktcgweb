-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create ctf_events table
CREATE TABLE IF NOT EXISTS ctf_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Upcoming',
  link TEXT,
  link_text TEXT DEFAULT 'View Event',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create admin_users table for access control
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE ctf_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for members (public read, admin write)
CREATE POLICY "Members are viewable by everyone"
  ON members FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert members"
  ON members FOR INSERT
  WITH CHECK (
    auth.uid()::text IN (
      SELECT id::text FROM admin_users WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Only admins can update members"
  ON members FOR UPDATE
  USING (
    auth.uid()::text IN (
      SELECT id::text FROM admin_users WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Only admins can delete members"
  ON members FOR DELETE
  USING (
    auth.uid()::text IN (
      SELECT id::text FROM admin_users WHERE email = auth.jwt()->>'email'
    )
  );

-- RLS Policies for ctf_events (public read, admin write)
CREATE POLICY "Events are viewable by everyone"
  ON ctf_events FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert events"
  ON ctf_events FOR INSERT
  WITH CHECK (
    auth.uid()::text IN (
      SELECT id::text FROM admin_users WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Only admins can update events"
  ON ctf_events FOR UPDATE
  USING (
    auth.uid()::text IN (
      SELECT id::text FROM admin_users WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Only admins can delete events"
  ON ctf_events FOR DELETE
  USING (
    auth.uid()::text IN (
      SELECT id::text FROM admin_users WHERE email = auth.jwt()->>'email'
    )
  );

-- RLS Policies for admin_users (read-only for admins)
CREATE POLICY "Admin users are viewable by authenticated users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only system can insert admin users"
  ON admin_users FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only system can update admin users"
  ON admin_users FOR UPDATE
  USING (false);

CREATE POLICY "Only system can delete admin users"
  ON admin_users FOR DELETE
  USING (false);
