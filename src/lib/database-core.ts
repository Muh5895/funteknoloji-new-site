import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

// Database configuration - masked from client
// These credentials are only used server-side
const DB_CONFIG = {
  url: "https://eiecuiberhqmyvvlrakn.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM"
};

const db = createClient(DB_CONFIG.url, DB_CONFIG.key);

/**
 * Fetches all blog posts from the database.
 * This function runs strictly on the server.
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
    console.error("Fetch Posts Error:", error);
    return [];
  }
});

/**
 * Fetches a single blog post by ID.
 * This function runs strictly on the server.
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
    console.error(`Fetch Post (${id}) Error:`, error);
    return null;
  }
});

/**
 * Fetches testimonials.
 */
export const getTestimonials = createServerFn("GET", async () => {
  try {
    const { data, error } = await db.from("testimonials").select("*");
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch Testimonials Error:", error);
    return [];
  }
});

/**
 * Fetches FAQs.
 */
export const getFaqs = createServerFn("GET", async () => {
  try {
    const { data, error } = await db.from("faqs").select("*");
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch FAQs Error:", error);
    return [];
  }
});

/**
 * Submits the contact form data to the database.
 * Includes basic server-side rate limiting.
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
    console.error("Submit Contact Error:", error);
    throw new Error("DB_ERROR");
  }
});
