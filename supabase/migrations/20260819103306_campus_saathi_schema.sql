/*
# Campus Saathi — Campus companion for new students

1. New Tables
- `notices` — official notices shown on the notices board (title, body, category, priority, posted_at).
- `events` — campus events including hackathons, cultural, sports, technical (title, description, category, date, venue, organizer).
- `clubs` — student clubs and technical chapters (name, category, description, meeting_day, contact).
- `contacts` — important contacts: admin block, security, medical, office (name, role, department, phone, email, category, priority).
- `campus_locations` — buildings, classrooms, labs, blocks for the campus map (name, block, floor, room, category, description, landmark).

2. Security
- Enable RLS on all tables.
- This is a single-tenant, no-auth public app: all data is intentionally public/shared.
- Policies allow anon + authenticated CRUD on every table.

3. Notes
- No user_id / auth.users references — no sign-in screen in this app.
- Categories are plain text so the frontend can filter freely.
*/

CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  priority text NOT NULL DEFAULT 'normal',
  posted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_notices" ON notices;
CREATE POLICY "anon_select_notices" ON notices FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_notices" ON notices;
CREATE POLICY "anon_insert_notices" ON notices FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_notices" ON notices;
CREATE POLICY "anon_update_notices" ON notices FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_notices" ON notices;
CREATE POLICY "anon_delete_notices" ON notices FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  event_date date NOT NULL,
  venue text NOT NULL,
  organizer text NOT NULL,
  image_url text
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_events" ON events;
CREATE POLICY "anon_select_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_events" ON events;
CREATE POLICY "anon_insert_events" ON events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_events" ON events;
CREATE POLICY "anon_update_events" ON events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_events" ON events;
CREATE POLICY "anon_delete_events" ON events FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  description text NOT NULL,
  meeting_day text,
  contact text
);

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_clubs" ON clubs;
CREATE POLICY "anon_select_clubs" ON clubs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_clubs" ON clubs;
CREATE POLICY "anon_insert_clubs" ON clubs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_clubs" ON clubs;
CREATE POLICY "anon_update_clubs" ON clubs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_clubs" ON clubs;
CREATE POLICY "anon_delete_clubs" ON clubs FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text NOT NULL,
  phone text,
  email text,
  category text NOT NULL DEFAULT 'office',
  priority integer NOT NULL DEFAULT 0
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_contacts" ON contacts;
CREATE POLICY "anon_select_contacts" ON contacts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts" ON contacts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_contacts" ON contacts;
CREATE POLICY "anon_update_contacts" ON contacts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_contacts" ON contacts;
CREATE POLICY "anon_delete_contacts" ON contacts FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS campus_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  block text NOT NULL,
  floor text,
  room text,
  category text NOT NULL DEFAULT 'classroom',
  description text,
  landmark text
);

ALTER TABLE campus_locations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_campus_locations" ON campus_locations;
CREATE POLICY "anon_select_campus_locations" ON campus_locations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_campus_locations" ON campus_locations;
CREATE POLICY "anon_insert_campus_locations" ON campus_locations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_campus_locations" ON campus_locations;
CREATE POLICY "anon_update_campus_locations" ON campus_locations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_campus_locations" ON campus_locations;
CREATE POLICY "anon_delete_campus_locations" ON campus_locations FOR DELETE
  TO anon, authenticated USING (true);
