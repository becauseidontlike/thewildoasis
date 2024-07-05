import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gfuhuhbfiixwwxrmofdz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdWh1aGJmaWl4d3d4cm1vZmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMjU5NjMsImV4cCI6MjAzNTcwMTk2M30.z0egJGPuJogYXdSR_FZCKSMUtkiT9PomkKGS1vyOOb4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
