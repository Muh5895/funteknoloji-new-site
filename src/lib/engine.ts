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

export interface CookieConsentPayload {
  consent_necessary: boolean;
  consent_analytics: boolean;
  consent_marketing: boolean;
  user_lang: string;
  os_name?: string;
  os_version?: string;
  browser_name?: string;
  browser_version?: string;
  raw_user_agent?: string;
  ip_address?: string;
  referrer?: string;
  screen_resolution?: string;
  device_type?: string;
  network_effective_type?: string;
  network_downlink?: number;
  network_rtt?: number;
  network_latency_ms?: number;
  console_errors?: string;
}

/**
 * Submits the single cookie consent and comprehensive telemetry details to the unified cookies table.
 */
export const submitCookieConsent = async (payload: CookieConsentPayload) => {
  try {
    const startTime = Date.now();

    // Supplement with client-side latency calculation to standard API
    const finalPayload = {
      ...payload,
      network_latency_ms: Date.now() - startTime,
    };

    const { error } = await supabase.from("cookies").insert([finalPayload]);
    if (error) {
      console.error("DB_COOKIE_SUBMIT_ERR:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error("DB_COOKIE_SUBMIT_EXCEPTION:", error);
    return { success: false, error };
  }
};
