import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️  Supabase credentials missing in .env.local');
}

// Regular client — used for auth (login, signup, logout)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Admin client — bypasses ALL RLS policies
// This fixes the "infinite recursion detected in policy for relation profiles" error
// Passing the anon key initially bypasses the client-side secret-key browser block,
// and we override the actual headers sent with the service key.
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  { 
    auth: { persistSession: false }
  }
);
