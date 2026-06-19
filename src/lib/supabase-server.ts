import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials missing from environment variables.");
}

const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export const getBlogPosts = createServerFn("GET", async () => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  return data;
});

export const getBlogPost = createServerFn("GET", async (id: string) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    return null;
  }
  return data;
});

export const getTestimonials = createServerFn("GET", async () => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from("testimonials").select("*");
  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  return data;
});

export const getFaqs = createServerFn("GET", async () => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from("faqs").select("*");
  if (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
  return data;
});

// Simple in-memory rate limiting for contact form
const rateLimitMap = new Map<string, number>();

export const submitContactForm = createServerFn("POST", async (formData: { name: string, email: string, subject: string, message: string }) => {
  if (!supabase) throw new Error("Supabase client not initialized");
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
