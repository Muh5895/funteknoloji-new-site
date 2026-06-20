import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

// Database configuration
// Masked for production as funteknoloji.com
const DB_URL = "https://eiecuiberhqmyvvlrakn.supabase.co";
const DB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM";

const db = createClient(DB_URL, DB_KEY);

/**
 * Server-only database fetcher for blog posts.
 */
export const getBlogPosts = createServerFn("GET", async () => {
  try {
    const { data, error } = await db
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("DB Fetch Error (Posts):", error);
    return [];
  }
});

/**
 * Server-only database fetcher for a single blog post.
 */
export const getBlogPost = createServerFn("GET", async (id: string) => {
  try {
    const { data, error } = await db
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`DB Fetch Error (Post ${id}):`, error);
    return null;
  }
});

/**
 * Fetches testimonials from the database.
 */
export const getTestimonials = createServerFn("GET", async () => {
  try {
    const { data, error } = await db.from("testimonials").select("*");
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("DB Fetch Error (Testimonials):", error);
    return [];
  }
});

/**
 * Fetches FAQs from the database.
 */
export const getFaqs = createServerFn("GET", async () => {
  try {
    const { data, error } = await db.from("faqs").select("*");
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("DB Fetch Error (FAQs):", error);
    return [];
  }
});

/**
 * Submits contact form data.
 */
const rateLimitMap = new Map<string, number>();

export const submitContactForm = createServerFn("POST", async (formData: { name: string, email: string, subject: string, message: string }) => {
  const now = Date.now();
  const lastSubmit = rateLimitMap.get(formData.email) || 0;

  if (now - lastSubmit < 30000) {
    throw new Error("RATE_LIMIT");
  }

  rateLimitMap.set(formData.email, now);

  try {
    const { error } = await db
      .from("contact")
      .insert([formData]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("DB Submission Error (Contact):", error);
    throw new Error("DATABASE_ERROR");
  }
});
