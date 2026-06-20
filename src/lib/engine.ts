import { supabase } from "./supabase";

/**
 * PRODUCTION DATA ENGINE
 * Domain: funteknoloji.com
 */

export const getBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select("title, description, text, image_url, author, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("DB_FETCH_ERR:", error);
      return [];
    }
    return data || [];
  } catch (err) {
    return [];
  }
};

export const getBlogPost = async (title: string) => {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("title", title)
      .single();

    if (error) {
      console.error("DB_SINGLE_ERR:", error);
      throw error;
    }
    return data;
  } catch (err) {
    return null;
  }
};

export const submitContactForm = async (payload: { name: string, email: string, subject: string, message: string }) => {
  try {
    const { error } = await supabase
      .from("contact")
      .insert([{
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        status: "new"
      }]);

    if (error) {
      console.error("DB_SUBMIT_ERR:", error);
      throw error;
    }
    return { success: true };
  } catch (error) {
    throw new Error("INTERNAL_DB_ERROR");
  }
};

export const getTestimonials = async () => {
  const { data } = await supabase.from("testimonials").select("*");
  return data || [];
};

export const getFaqs = async () => {
  const { data } = await supabase.from("faqs").select("*");
  return data || [];
};
