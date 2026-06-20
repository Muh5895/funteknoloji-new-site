import { createServerFn } from "@tanstack/react-start";
import { supabase } from "./supabase";

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; subject: string; message: string }) => data)
  .handler(async ({ data: input }) => {
    const { error } = await supabase
      .from("contact")
      .insert([{ ...input, status: "new" }]);

    if (error) throw error;
    return { success: true };
  });

export const getBlogPosts = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  });
