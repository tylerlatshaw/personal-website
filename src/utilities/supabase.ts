import { createClient } from "@supabase/supabase-js";

import type { Database } from "../../database.types";

const supabaseUrl = process.env.SUPABASE_URL!;
const anonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient<Database>(supabaseUrl, anonKey);

export default supabase;