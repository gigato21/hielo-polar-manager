// Ensure this file is the only place where Supabase is initialized
// Avoid creating multiple instances of SupabaseClient in the application
// Import this instance wherever Supabase is needed

import { createClient } from "@supabase/supabase-js";

// Use hardcoded values instead of environment variables
const supabaseUrl = "https://qnwetrelqkusmoazszym.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFud2V0cmVscWt1c21vYXpzenltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNTY2ODcsImV4cCI6MjA2MTczMjY4N30.ygHXHSjEZtDTm3dhBXXn4ftuhSWAFQiD5M12lzeYZPY";

export const supabase = createClient(supabaseUrl, supabaseKey);
