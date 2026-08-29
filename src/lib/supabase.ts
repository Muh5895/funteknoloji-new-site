import { createClient } from "@supabase/supabase-js";

// UNMASKED URL: Direct database endpoint
const supabaseUrl = "https://db.funteknoloji.com/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3ODU4NTgyMjAsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.NBXjLy1dzdVwJG7w5YWIANy9aj6bU1-7ZYAEa3LIkCg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
