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
  user_agent?: string;
  referrer?: string;
  screen_resolution?: string;
  device_type?: string;
}

export interface AdvancedCookieConsentPayload extends CookieConsentPayload {
  session_id: string;
  country_code?: string;
}

export interface CookieConsentEventPayload {
  session_id: string;
  event_type: "BANNER_SHOWN" | "ACCEPT_ALL" | "REJECT_ALL" | "CUSTOM_SAVE" | "BANNER_CLOSED";
  consent_necessary: boolean;
  consent_analytics: boolean;
  consent_marketing: boolean;
  user_lang: string;
  user_agent?: string;
  referrer?: string;
  screen_resolution?: string;
  device_type?: string;
}

/**
 * Submits the standard cookie consent to legacy table, and also writes to advanced tracking tables.
 */
export const submitCookieConsent = async (payload: CookieConsentPayload, sessionId?: string) => {
  try {
    // 1. Write to Legacy table for backwards compatibility
    const { error: legacyErr } = await supabase.from("cookies").insert([payload]);
    if (legacyErr) {
      console.warn("DB_COOKIE_LEGACY_SUBMIT_ERR (non-blocking):", legacyErr);
    }

    // If session ID is provided, write to advanced tables
    if (sessionId) {
      const advancedPayload: AdvancedCookieConsentPayload = {
        ...payload,
        session_id: sessionId,
      };

      // 2. Check if a consent record for this session already exists
      const { data: existing, error: checkErr } = await supabase
        .from("cookie_consents")
        .select("id")
        .eq("session_id", sessionId)
        .limit(1);

      if (checkErr) {
        console.warn("DB_ADVANCED_CHECK_ERR (non-blocking):", checkErr);
      }

      if (existing && existing.length > 0) {
        // Update existing record
        const { error: updateErr } = await supabase
          .from("cookie_consents")
          .update({
            consent_necessary: advancedPayload.consent_necessary,
            consent_analytics: advancedPayload.consent_analytics,
            consent_marketing: advancedPayload.consent_marketing,
            user_lang: advancedPayload.user_lang,
            user_agent: advancedPayload.user_agent,
            referrer: advancedPayload.referrer,
            screen_resolution: advancedPayload.screen_resolution,
            device_type: advancedPayload.device_type,
            updated_at: new Date().toISOString(),
          })
          .eq("session_id", sessionId);

        if (updateErr) {
          console.warn("DB_ADVANCED_UPDATE_ERR (non-blocking):", updateErr);
        }
      } else {
        // Insert new record
        const { error: insertErr } = await supabase
          .from("cookie_consents")
          .insert([advancedPayload]);

        if (insertErr) {
          console.warn("DB_ADVANCED_INSERT_ERR (non-blocking):", insertErr);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("DB_COOKIE_SUBMIT_EXCEPTION:", error);
    return { success: false, error };
  }
};

/**
 * Submits a precise user interaction event to the audit log table.
 */
export const submitCookieConsentEvent = async (payload: CookieConsentEventPayload) => {
  try {
    const { error } = await supabase.from("cookie_consent_events").insert([payload]);
    if (error) {
      console.warn("DB_COOKIE_EVENT_SUBMIT_ERR (non-blocking):", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error("DB_COOKIE_EVENT_EXCEPTION:", error);
    return { success: false, error };
  }
};
