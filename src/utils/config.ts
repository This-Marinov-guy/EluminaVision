import { createClient } from "@supabase/supabase-js";

export const SESSION_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY);