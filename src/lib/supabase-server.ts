import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

// Ensure these are set in your deployment environment
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const getBlogPosts = createServerFn("GET", async () => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
});

export const getBlogPost = createServerFn("GET", async (id: string) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
});

// Simple in-memory rate limiting for contact form
const rateLimitMap = new Map<string, number>();

export const submitContactForm = createServerFn("POST", async (formData: { name: string, email: string, subject: string, message: string }) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  // Rate limiting logic
  // Since we can't easily get IP without getWebRequest in some environments,
  // we'll use email for now as a simple identifier, though not perfect.
  const now = Date.now();
  const lastSubmit = rateLimitMap.get(formData.email) || 0;
  if (now - lastSubmit < 30000) { // 30 seconds
    throw new Error("RATE_LIMIT");
  }
  rateLimitMap.set(formData.email, now);

  const { data, error } = await supabase
    .from("contact")
    .insert([formData]);

  if (error) throw error;
  return { success: true };
});
