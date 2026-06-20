import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

/**
 * PRODUCTION DATABASE SERVICE
 * Port: 5432 (Internal)
 * Domain: funteknoloji.com
 */

const CONFIG = {
  v1: "https://eiecuiberhqmyvvlrakn.supabase.co",
  v2: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM"
};

const internal_db = createClient(CONFIG.v1, CONFIG.v2);

export const getBlogPosts = createServerFn("GET", async () => {
  const { data, error } = await internal_db
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("DB_FETCH_ERR", error);
    return [];
  }
  return data || [];
});

export const getBlogPost = createServerFn("GET", async (id: string) => {
  const { data, error } = await internal_db
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("DB_SINGLE_ERR", error);
    return null;
  }
  return data;
});

export const getTestimonials = createServerFn("GET", async () => {
  const { data, error } = await internal_db.from("testimonials").select("*");
  return data || [];
});

export const getFaqs = createServerFn("GET", async () => {
  const { data, error } = await internal_db.from("faqs").select("*");
  return data || [];
});

const SUBMIT_LIMITS = new Map<string, number>();

export const submitContactForm = createServerFn("POST", async (form: { name: string, email: string, subject: string, message: string }) => {
  const now = Date.now();
  const last = SUBMIT_LIMITS.get(form.email) || 0;
  if (now - last < 30000) throw new Error("RATE_LIMIT");
  SUBMIT_LIMITS.set(form.email, now);

  const { error } = await internal_db
    .from("contact")
    .insert([form]);

  if (error) {
    console.error("DB_SUBMIT_ERR", error);
    throw error;
  }
  return { success: true };
});
