import { createServerFn } from "@tanstack/react-start";
import { supabase } from "./supabase";
import { KNOWLEDGE_BASE } from "./knowledge";

/**
 * PRODUCTION DATA ENGINE
 * Domain: funteknoloji.com
 */

export const getBlogPosts = createServerFn("GET", async () => {
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
});

export const getBlogPost = createServerFn("GET", async (title: string) => {
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
});

export const submitContactForm = createServerFn(
  "POST",
  async (payload: { name: string; email: string; subject: string; message: string }) => {
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
  },
);

export const getTestimonials = createServerFn("GET", async () => {
  const { data } = await supabase.from("testimonials").select("*");
  return data || [];
});

export const getFaqs = createServerFn("GET", async () => {
  const { data } = await supabase.from("faqs").select("*");
  return data || [];
});

export const askNexy = createServerFn("POST", async (payload: { input: string; lang: string }) => {
  const { input, lang } = payload;

  const prompt = `System: Sen Fun Teknoloji şirketinin yapay zeka asistanı Nexy'sin.
    Bilgi Bankası: ${KNOWLEDGE_BASE}
    Dil: Kullanıcının dilinde (${lang}) cevap ver.
    Tarz: Profesyonel, yardımsever ve samimi ol.
    Önemli: Eğer kullanıcı bir sayfaya gitmek isterse cevabının sonuna [REDIRECT:/sayfa] ekle.
    Kısa ve öz cevaplar ver.
    User: ${input}`;

  try {
    const response = await fetch(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&cache=false`,
    );
    if (!response.ok) throw new Error("AI_ERROR");
    const text = await response.text();
    return text;
  } catch (err) {
    throw new Error("AI_OFFLINE");
  }
});
