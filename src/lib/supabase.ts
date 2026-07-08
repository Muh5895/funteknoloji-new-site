import { createClient } from "@supabase/supabase-js";

// MASKED URL: Using relative paths proxied via vercel.json / vite.config.ts
const supabaseUrl =
  typeof window !== "undefined" ? window.location.origin : "https://funteknoloji.com";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
