import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

/**
 * PRODUCTION DATA ENGINE
 * Domain: funteknoloji.com
 */

const _v1 = "https://eiecuiberhqmyvvlrakn.supabase.co";
const _v2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM";

const _client = createClient(_v1, _v2);

export const getBlogPosts = createServerFn("GET", async () => {
  try {
    const { data, error } = await _client
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    return [];
  }
});

export const getBlogPost = createServerFn("GET", async (id: string) => {
  try {
    const { data, error } = await _client
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    return null;
  }
});

export const getTestimonials = createServerFn("GET", async () => {
  const { data } = await _client.from("testimonials").select("*");
  return data || [];
});

export const getFaqs = createServerFn("GET", async () => {
  const { data } = await _client.from("faqs").select("*");
  return data || [];
});

const _cache = new Map<string, number>();

export const submitContactForm = createServerFn("POST", async (payload: { name: string, email: string, subject: string, message: string }) => {
  const now = Date.now();
  const last = _cache.get(payload.email) || 0;
  if (now - last < 30000) throw new Error("RATE_LIMIT");
  _cache.set(payload.email, now);

  const { error } = await _client
    .from("contact")
    .insert([payload]);

  if (error) throw error;
  return { success: true };
});
