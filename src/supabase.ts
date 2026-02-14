import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mxmfzquvwmlomvvpdtcf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bWZ6cXV2d21sb212dnBkdGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTQyNDYsImV4cCI6MjA4NjU5MDI0Nn0.lilgXOdMzxCcdYgVckhNXNgKgkU4g-CNtXdDuhVEwoQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
