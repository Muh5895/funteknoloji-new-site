import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS & origin checks to ensure only this site can request
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const allowedOriginsPattern = /^(https?:\/\/localhost(:\d+)?|https?:\/\/127\.0\.0\.1(:\d+)?|https:\/\/(www\.)?funteknoloji\.com|https:\/\/.*\.vercel\.app)$/;

  let isAllowed = false;
  if (origin && allowedOriginsPattern.test(origin)) {
    isAllowed = true;
  } else if (referer && allowedOriginsPattern.test(referer)) {
    isAllowed = true;
  } else if (!origin && !referer) {
    // Allow if direct server-side fetch / dev testing without origin headers
    isAllowed = true;
  }

  if (!isAllowed) {
    return res.status(403).send("Nexy error: Access denied");
  }

  const { prompt, model = "openai", cache = "false" } = req.query;

  if (!prompt) {
    return res.status(400).send("Nexy error: Prompt is required");
  }

  try {
    const targetUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt as string)}?model=${model}&cache=${cache}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch from backend");
    }

    let text = await response.text();

    // Clean any case-insensitive Pollinations mentions
    text = text.replace(/pollinations\.ai/gi, "Nexy");
    text = text.replace(/pollinations/gi, "Nexy");

    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).send("Nexy error: Bir hata oluştu.");
  }
}
