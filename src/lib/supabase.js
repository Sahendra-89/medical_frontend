import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isMissingCreds = !supabaseUrl || !supabaseAnonKey;

if (isMissingCreds) {
  console.warn('⚠️  Supabase credentials missing — running in static/fallback mode.');
}

/**
 * Safe factory: only calls createClient when BOTH env vars are present.
 */
function makeSafeClient(url, key, options = {}) {
  if (!url || !key) {
    const noop = () => Promise.resolve({ data: null, error: new Error('Supabase not configured') });
    const stub = new Proxy({}, {
      get: () => stub,
      apply: () => noop(),
    });
    return stub;
  }
  return createClient(url, key, options);
}

// ── Single Shared Supabase Client ──
// Use this everywhere on the frontend. It automatically includes the active user session.
export const supabase = makeSafeClient(supabaseUrl, supabaseAnonKey);
