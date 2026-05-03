import { createClient } from "@supabase/supabase-js";

// Supabase URL and anon public key should be defined in your .env file
// Vite exposes them via import.meta.env with the VITE_ prefix.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    detectSessionInUrl: true,
  },
});