import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle CORS preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 1. Only allow POST requests to secure the endpoint from direct browser access
  if (req.method !== "POST") {
    return res.status(403).json({
      error: "Direct browser GET requests to this endpoint are strictly forbidden."
    });
  }

  // 2. Extract and validate prompt
  const { prompt, model } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  // 3. Prevent off-topic requests (e.g. write code, programs, general hacks)
  const lowerPrompt = prompt.toLowerCase();
  const offTopicTriggers = [
    "kod yaz", "bana kod", "write code", "javascript", "python", "html", "css",
    "react", "programming", "bana yazılım", "programlama", "sql", "database",
    "docker", "typescript", "kodlama", "yazılım geliştir", "kodunu", "hacker", "hackle"
  ];

  const hasOffTopic = offTopicTriggers.some(trigger => lowerPrompt.includes(trigger));
  // Allow if it explicitly mentions Fun Teknoloji, Nexy, or QuakeSafe so that legitimate company-related programming queries are fine
  const isCompanyRelated = lowerPrompt.includes("fun teknoloji") ||
                           lowerPrompt.includes("fun technology") ||
                           lowerPrompt.includes("nexy") ||
                           lowerPrompt.includes("quakesafe");

  if (hasOffTopic && !isCompanyRelated) {
    return res.status(400).send(
      "Nexy, Fun Teknoloji şirketinin resmi asistanıdır. İstek dışı kod yazma, programlama veya genel geliştirme talepleri engellenmiştir. Lütfen yalnızca Fun Teknoloji projeleri ve hizmetleri hakkında sorular sorun."
    );
  }

  // 4. Securely fetch from pollinations
  try {
    const targetUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${model || "openai"}&cache=false`;
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Pollinations error: ${response.statusText}`);
    }
    const text = await response.text();
    return res.status(200).send(text);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
