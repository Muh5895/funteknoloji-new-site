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
    const { data, error } = await supabase.from("blog").select("*").eq("title", title).single();

    if (error) {
      console.error("DB_SINGLE_ERR:", error);
      throw error;
    }
    return data;
  } catch (err) {
    return null;
  }
};

export const submitContactForm = async (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // Check for existing entries with same subject and message from the same email
    const { data: existing, error: checkError } = await supabase
      .from("contact")
      .select("id")
      .eq("email", payload.email)
      .eq("subject", payload.subject)
      .eq("message", payload.message)
      .limit(1);

    if (checkError) {
      console.error("DB_CHECK_ERR:", checkError);
    }

    if (existing && existing.length > 0) {
      throw new Error("ALREADY_SENT");
    }

    const { error } = await supabase.from("contact").insert([
      {
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        status: "new",
      },
    ]);

    if (error) {
      console.error("DB_SUBMIT_ERR:", error);
      throw error;
    }
    return { success: true };
  } catch (error: any) {
    if (error.message === "ALREADY_SENT") throw error;
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
