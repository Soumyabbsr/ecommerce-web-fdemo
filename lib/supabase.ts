import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

// Server-only key: NEVER prefix with NEXT_PUBLIC_ to keep it secure
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  "";

export const isSupabaseConfigured = (): boolean => {
  const hasUrl =
    Boolean(supabaseUrl) &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project-id") &&
    !supabaseUrl.includes("placeholder");

  const hasValidKey =
    (Boolean(supabaseServiceRoleKey) && !supabaseServiceRoleKey.includes("your-service-key")) ||
    (Boolean(supabaseAnonKey) && !supabaseAnonKey.includes("your-anon-key-here"));

  return hasUrl && hasValidKey;
};

// Singleton server client for server-side API routes & database operations
let cachedServerClient: SupabaseClient | null = null;

export const getSupabaseServerClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  // Use service role key if present for elevated administrative operations, fallback to anon key
  const serverKey = supabaseServiceRoleKey || supabaseAnonKey;
  if (!serverKey) return null;

  if (!cachedServerClient) {
    cachedServerClient = createClient(supabaseUrl, serverKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return cachedServerClient;
};

// Client for public reads (using anon key)
export const supabase: SupabaseClient | null = isSupabaseConfigured() && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

