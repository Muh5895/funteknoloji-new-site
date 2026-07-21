import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // Reject GET or any method other than POST to prevent users from just typing /api/nexy in the browser
  if (req.method !== "POST") {
    return res.status(405).send("Nexy error: Sadece POST istekleri kabul edilir.");
  }

  // Read body parameters
  const { prompt, model = "gemma-3-1b-it" } = req.body || {};

  if (!prompt) {
    return res.status(400).send("Nexy error: Prompt is required");
  }

  // Map older model names to the new active model "gemma-3-1b-it"
  const activeModel = model === "openai" || model === "pulsar" ? "gemma-3-1b-it" : model;

  try {
    const response = await fetch("https://ai.funteknoloji.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: activeModel,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch from backend: ${response.status} ${response.statusText} - ${errText}`);
    }

    const data = await response.json() as any;
    let text = data.choices?.[0]?.message?.content || "";

    // Clean any case-insensitive Pollinations/Pulsar references
    text = text.replace(/pollinations\.ai/gi, "Nexy");
    text = text.replace(/pollinations/gi, "Nexy");
    text = text.replace(/pulsar/gi, "Nexy");

    return res.status(200).send(text);
  } catch (err: any) {
    console.error("Backend error calling Fun Teknoloji AI:", err);
    return res.status(500).send("Nexy error: Bir hata oluştu: " + err.message);
  }
}
