import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

// Hiding provider details as requested
const DB_URL = process.env.SUPABASE_URL || "https://eiecuiberhqmyvvlrakn.supabase.co";
const DB_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM";

const db = createClient(DB_URL, DB_KEY);

export const getBlogPosts = createServerFn("GET", async () => {
  const { data, error } = await db
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database Error (Posts):", error);
    return [];
  }
  return data;
});

export const getBlogPost = createServerFn("GET", async (id: string) => {
  const { data, error } = await db
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Database Error (Post):", error);
    return null;
  }
  return data;
});

export const getTestimonials = createServerFn("GET", async () => {
  const { data, error } = await db.from("testimonials").select("*");
  if (error) {
    console.error("Database Error (Testimonials):", error);
    return [];
  }
  return data;
});

export const getFaqs = createServerFn("GET", async () => {
  const { data, error } = await db.from("faqs").select("*");
  if (error) {
    console.error("Database Error (FAQs):", error);
    return [];
  }
  return data;
});

const rateLimitMap = new Map<string, number>();

export const submitContactForm = createServerFn("POST", async (formData: { name: string, email: string, subject: string, message: string }) => {
  const now = Date.now();
  const lastSubmit = rateLimitMap.get(formData.email) || 0;
  if (now - lastSubmit < 30000) {
    throw new Error("RATE_LIMIT");
  }
  rateLimitMap.set(formData.email, now);

  const { error } = await db
    .from("contact")
    .insert([formData]);

  if (error) {
    console.error("Database Error (Contact):", error);
    throw error;
  }
  return { success: true };
});
