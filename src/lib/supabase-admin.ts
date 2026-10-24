import { createClient } from "@supabase/supabase-js";

// Sin genérico tipado — las operaciones de escritura admin usan tipos propios
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  { auth: { persistSession: false } }
);
