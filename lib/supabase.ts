import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (for API routes and server components)
export const getSupabaseServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Types
export interface Member {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CTFEvent {
  id: string;
  name: string;
  date: string;
  description: string | null;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  link: string | null;
  link_text: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}
