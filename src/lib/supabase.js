import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isMissingCreds = !supabaseUrl || !supabaseAnonKey;

if (isMissingCreds) {
  console.warn('⚠️  Supabase credentials missing — running in static/fallback mode.');
}

/**
 * Safe factory: only calls createClient when BOTH env vars are present.
 * During Vercel build (when env vars may be absent) this returns a stub
 * so the module loads without throwing "supabaseUrl is required".
 */
function makeSafeClient(url, key, options = {}) {
  if (!url || !key) {
    // Return a stub that no-ops all calls and returns empty data
    const noop = () => Promise.resolve({ data: null, error: new Error('Supabase not configured') });
    const stub = new Proxy({}, {
      get: () => stub,
      apply: () => noop(),
    });
    return stub;
  }
  return createClient(url, key, options);
}

// Regular client — used for auth (login, signup, logout)
export const supabase = makeSafeClient(supabaseUrl, supabaseAnonKey);

// Admin client — bypasses ALL RLS policies
// This fixes the "infinite recursion detected in policy for relation profiles" error
export const supabaseAdmin = makeSafeClient(
  supabaseUrl,
  supabaseAnonKey,
  { auth: { persistSession: false } }
);
