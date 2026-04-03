-- Insert team members
INSERT INTO members (name, role, image_url) VALUES
  ('kkarinzzz', 'Digital Forensics', '/team/1.jpg'),
  ('Ren1Ko', 'Cryptography', '/team/2.jpg'),
  ('Claritys', 'Digital Forensics', '/team/3.jpg'),
  ('nandd3', 'Web Exploitation', '/team/4.jpg'),
  ('chawaa', 'Digital Forensics', '/team/5.jpg'),
  ('Garmin', 'Web Exploitation', '/team/6.jpg'),
  ('zenapietal', 'OSINT', '/team/7.jpg'),
  ('soon', 'OSINT', '/team/8.jpg')
ON CONFLICT DO NOTHING;

-- Insert CTF events
INSERT INTO ctf_events (name, date, description, status, link, link_text, display_order) VALUES
  ('PsychCTF 2026', 'Maret 2026', 'Event dari PsychCTF', 'Completed', 'https://ctftime.org/event/3166', 'View Event', 1),
  ('FGTE0', 'Maret 2026', 'Event CTF dari FGTE', 'Completed', 'https://ctf.ariaf.my.id', 'View Event', 2),
  ('RamadanCTF 2026', 'Maret 2026', 'Event dari vulnlab', 'Completed', 'https://lab.vulnbydefault.com/ramadan-ctf-2026', 'View Event', 3),
  ('RamadanCTF 2026 (Indonesia)', 'Maret 2026', 'Event CTF selama bulan Ramadan', 'Completed', 'https://ctf.ocry.com/', 'View Event', 4),
  ('TexSaw', 'Maret 2026', 'Event dari TexSaw', 'Completed', 'https://texsaw.org/', 'View Event', 5),
  ('Nullcon Goa HackIM 2026 CTF', 'Februari 2026', 'Event dari Nullcon Goa HackIM', 'Completed', 'https://ctftime.org/event/3066', 'View Event', 6)
ON CONFLICT DO NOTHING;
