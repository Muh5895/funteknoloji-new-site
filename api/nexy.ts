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
  const { prompt, model = "openai" } = req.body || {};

  if (!prompt) {
    return res.status(400).send("Nexy error: Prompt is required");
  }

  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: model,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch from backend: ${response.status} ${response.statusText} - ${errText}`);
    }

    let text = await response.text();

    // Clean any case-insensitive Pollinations mentions
    text = text.replace(/pollinations\.ai/gi, "Nexy");
    text = text.replace(/pollinations/gi, "Nexy");

    return res.status(200).send(text);
  } catch (err: any) {
    console.error("Backend error calling Pollinations:", err);
    return res.status(500).send("Nexy error: Bir hata oluştu: " + err.message);
  }
}
