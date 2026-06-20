import { createClient } from "@supabase/supabase-js";

const DB_URL = "https://eiecuiberhqmyvvlrakn.supabase.co";
const DB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZWN1aWJlcmhxbXl2dmxyYWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjEzNDcsImV4cCI6MjA4NjgzNzM0N30.fq7MTsxB86XfZzfkRXS9avf7XK-kAsDAqms6WI84qbM";

const db = createClient(DB_URL, DB_KEY);

async function test() {
  const { data: posts, error: postsError } = await db.from("posts").select("id").limit(1);
  console.log("Posts test:", { count: posts?.length, error: postsError });

  const { data: faqs, error: faqsError } = await db.from("faqs").select("id").limit(1);
  console.log("FAQs test:", { count: faqs?.length, error: faqsError });
}

test();
