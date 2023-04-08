import { createClient } from "@supabase/supabase-js";

let supabase;
const initializeSupabase = () => {
  const options = {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  };

  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
    options
  );
  return supabase;
};

export { initializeSupabase, supabase };
