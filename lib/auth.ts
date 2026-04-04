import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join('; '),
      },
    },
  });
};

// Client-side auth
export const getSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Get current user session
export const getSession = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

// Get current user
export const getUser = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Auth error handling
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// User type
export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
  email_confirmed_at?: string;
  created_at: string;
}
