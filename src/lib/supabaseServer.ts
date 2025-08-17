import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client using the SERVICE ROLE key (do NOT expose to the client)
// Ensure you set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
export function getSupabaseServer() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
