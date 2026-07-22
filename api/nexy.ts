import type { VercelRequest, VercelResponse } from "@vercel/node";

// Lightweight in-memory rate limiter cache as fallback
const ipCache = new Map<string, number[]>();

const isRateLimitedInMemory = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 15;

  const timestamps = ipCache.get(ip) || [];
  const activeTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (activeTimestamps.length >= maxRequests) {
    return true;
  }

  activeTimestamps.push(now);
  ipCache.set(ip, activeTimestamps);
  return false;
};

// Vercel KV / Upstash Redis Serverless Rate Limiter (Direct REST API, Zero Dependencies)
const isRateLimitedServerless = async (ip: string): Promise<boolean> => {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return isRateLimitedInMemory(ip);
  }

  const key = `rate_limit:${ip.replace(/:/g, "_")}`;
  try {
    // Increment the request count in Redis
    const response = await fetch(`${kvUrl}/incr/${key}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
    });
    if (!response.ok) throw new Error("KV incr fetch failed");
    const data = (await response.json()) as any;
    const count = Number(data.result);

    if (count === 1) {
      // Set TTL to 60 seconds on the first request
      await fetch(`${kvUrl}/expire/${key}/60`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
    }

    return count > 15; // Max 15 requests per minute
  } catch (e) {
    console.error("Serverless KV rate limit error, falling back to in-memory:", e);
    return isRateLimitedInMemory(ip);
  }
};

const translateTextHelper = async (text: string, source: string, target: string): Promise<string> => {
  if (!text || source === target) return text;
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0].map((item: any) => item[0]).join("");
  } catch (error) {
    console.error("Translation helper error:", error);
    return text;
  }
};

const KNOWLEDGE_BASE = `
Şirket: Fun Teknoloji
Kurucu: Muhammed Erbay
Misyon: Geleceğin teknolojilerini bugünden sunmak.
Kuruluş: 2025

Projelerimiz:
1. Nexy: Fun Teknoloji'nin amiral gemisi yapay zeka asistanı. İşletmelerin ve kullanıcıların her dilde (12+ dil desteği) iletişim kurmasını sağlayan, akıllı, hızlı ve güvenli bir dijital asistan. (Şu an kullanıcıyla konuşan sensin!)
2. QuakeSafe: Afet güvenliği teknolojisinde devrim. Yapay zeka ve sensör ağları kullanarak deprem anında erken uyarı veren ve afet sonrası koordinasyonu sağlayan hayat kurtarıcı bir platform.

Hizmetler:
1. Yapay Zeka Çözümleri: İşletmenize özel eğitilmiş LLM modelleri, otonom müşteri temsilcileri (Nexy gibi) ve ileri seviye veri analitiği.
2. Özel Yazılım Geliştirme: Modern web uygulamaları (React, Next.js, TanStack), yüksek performanslı mobil uygulamalar (iOS, Android) ve ölçeklenebilir backend sistemleri.
3. Bulut ve Veri: Bulut altyapı yönetimi, veritabanı optimizasyonu ve güvenli veri depolama çözümleri.
4. Siber Güvenlik: Sistem zafiyet analizleri, sızma testleri ve tam kapsamlı güvenlik denetimleri.
5. Teknik Danışmanlık: Dijital dönüşüm yolculuğunuzda profesyonel rehberlik ve strateji geliştirme.

Sayfalar ve Yönlendirme Komutları:
- Ana Sayfa: /
- Hakkımızda: /about
- Hizmetler: /services
- Blog: /blog
- İletişim: /contact
- Fiyatlandırma: /pricing
- Projeler: /projects
- QuakeSafe: /quakesafe
- Ekibimiz: /team
- Nexy Sayfası: /nexy
- Changelog: /changelog
- Dokümantasyon: /docs
- SSS: /faq
- Marka Kiti: /brand-kit

Önemli Notlar:
- Sen sadece Fun Teknoloji projelerini ve hizmetlerini biliyorsun. Sahibi olmadığımız projelerden bahsetme.
- Eğer kullanıcı "beni iletişim sayfasına götür" veya "sizinle nasıl çalışabilirim?" gibi bir şey söylerse, cevabının sonuna mutlaka [REDIRECT:/contact] ekle.
- Tablolu cevaplar verebilirsin (Markdown formatında).
- Cevaplarında asla Pollinations.ai reklamı yapma.
`;

const HACKCLUB_SYSTEM_PROMPT = `You are Nexy, the official AI assistant and customer support representative of Fun Teknoloji (Fun Technology).
Fun Technology projects and information:
${KNOWLEDGE_BASE}

CRITICAL RULES:
1. FOCUS ON CUSTOMER SUPPORT: Your main objective is to assist the user with Fun Teknoloji, our products (Nexy, QuakeSafe), our services, or their specific ticket details.
2. BE WARM, CONVERSATIONAL AND INTELLIGENT: Talk like a highly empathetic, helpful human agent. Avoid dry, robotic rejections. If the user asks general friendly chitchat or unrelated questions, gently and politely bridge back to how you can help them with Fun Teknoloji or their support ticket.
3. Solve requests in a polite and professional manner based on the knowledge base.
4. STRICT OUTPUT CONSTRAINT: Never output any technical ticket fields (like "Subject:", "Konu:", "Importance:", "Severity:", "Açıklama:") as headers, prefixes, or labels in your response. Never write any "Subject:" or "Konu:" prefixes. Do not write any redirection labels, redirect commands, or redirect text. Just speak naturally.
5. STRICT OUTPUT CONSTRAINT: DO NOT under any circumstances output bracketed tokens like [inceliyor], [duraklama], [düşünüyor] or any similar status tags.
6. Do not mention any third-party services like Pollinations or Pulsar.
7. RESPOND IN THE USER'S LANGUAGE: Speak to the user in the language they are communicating with you (e.g. Turkish, English, Spanish, etc.). Do not use any translation layers.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. CORS Whitelist and Domain-Only Request Enforcement
  const origin = (req.headers.origin as string) || "";
  const referer = (req.headers.referer as string) || "";

  const isAllowedOrigin =
    origin === "http://localhost:8080" ||
    origin === "http://localhost:3000" ||
    origin.endsWith(".funteknoloji.com") ||
    origin === "https://funteknoloji.com";

  const isAllowedReferer =
    referer.startsWith("http://localhost:8080") ||
    referer.startsWith("http://localhost:3000") ||
    referer.includes(".funteknoloji.com") ||
    referer.startsWith("https://funteknoloji.com");

  // Reject immediately with "Access Denied" if the request is not from our allowed domains
  if (!isAllowedOrigin && !isAllowedReferer) {
    return res.status(403).send("Access Denied");
  }

  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://funteknoloji.com");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Reject GET or any method other than POST with generic "Access Denied" response
  if (req.method !== "POST") {
    return res.status(403).send("Access Denied");
  }

  // 2. Secure Trusted IP Check (using Vercel trusted headers to mitigate header spoofing risk)
  const ip =
    (req.headers["x-vercel-proxied-for"] as string) ||
    (req.headers["x-vercel-ip"] as string) ||
    (req.headers["x-real-ip"] as string) ||
    "127.0.0.1";

  // 3. Redis/KV Rate Limit Check
  const rateLimited = await isRateLimitedServerless(ip);
  if (rateLimited) {
    return res.status(429).send("Nexy error: Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.");
  }

  // Read body parameters
  const { prompt, messages, originalMessages, lang = "tr", model = "gemma-3-1b-it" } = req.body || {};

  // 5. Safe Message Fallback
  const requestMessages = messages || (prompt ? [{ role: "user", content: prompt }] : null);
  const rawOriginal = originalMessages || messages || requestMessages || (prompt ? [{ role: "user", content: prompt }] : []);

  if (!requestMessages || requestMessages.length === 0) {
    return res.status(400).send("Nexy error: Geçersiz istek verisi.");
  }

  // Helper to ensure messages list starts with user role and strictly alternates user/assistant.
  const cleanMessagesForAPI = (msgs: any[]) => {
    const systemMsg = msgs.find((m) => m.role === "system");
    const chatMsgs = msgs.filter((m) => m.role !== "system");

    while (chatMsgs.length > 0 && chatMsgs[0].role !== "user") {
      chatMsgs.shift();
    }

    const alternating: any[] = [];
    for (const msg of chatMsgs) {
      if (!msg.content || msg.content.trim() === "") continue;

      if (alternating.length === 0) {
        alternating.push({ ...msg });
      } else {
        const lastMsg = alternating[alternating.length - 1];
        if (lastMsg.role === msg.role) {
          lastMsg.content = `${lastMsg.content}\n${msg.content}`;
        } else {
          alternating.push({ ...msg });
        }
      }
    }

    const finalMsgs = [];
    if (systemMsg) {
      finalMsgs.push(systemMsg);
    }
    finalMsgs.push(...alternating);
    return finalMsgs;
  };

  const backupApiKey = process.env.Nexy || process.env.NEXY || "";

  // 1. PRIMARY CHOICE: Try Hack Club AI first (gpt-5-mini, no translation layer)
  if (backupApiKey) {
    try {
      const cleanedOriginal = cleanMessagesForAPI(rawOriginal);

      const finalHackClubMessages = [
        { role: "system", content: HACKCLUB_SYSTEM_PROMPT },
        ...cleanedOriginal.filter((m) => m.role !== "system")
      ];

      const backupResponse = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${backupApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          messages: finalHackClubMessages
        }),
      });

      if (!backupResponse.ok) {
        const backupErrText = await backupResponse.text();
        throw new Error(`Hack Club AI returned status ${backupResponse.status}: ${backupErrText}`);
      }

      const backupData = await backupResponse.json() as any;
      let backupText = backupData.choices?.[0]?.message?.content || "";

      // Post-process response to strip bracketed tokens
      backupText = backupText.replace(/\[inceliyor\]/gi, "");
      backupText = backupText.replace(/\[duraklama\]/gi, "");
      backupText = backupText.replace(/\[bekliyor\]/gi, "");
      backupText = backupText.replace(/\[düşünüyor\]/gi, "");
      backupText = backupText.replace(/\[[^\]]+\]/g, (match: string) => {
        if (match.toLowerCase().startsWith("[redirect:")) return match;
        return "";
      });
      backupText = backupText.trim().replace(/pulsar/gi, "Nexy");

      // Respond directly in JSON
      return res.status(200).json({
        text: backupText,
        englishText: backupText, // Untranslated, so original language acts as English context
        isTranslated: false
      });
    } catch (backupErr: any) {
      console.warn("Primary Hack Club AI call failed, falling back to Fun Teknoloji AI:", backupErr);
    }
  } else {
    console.warn("Hack Club AI API key (Nexy/NEXY) is not set. Skipping primary choice.");
  }

  // 2. FALLBACK CHOICE: Fallback to Fun Teknoloji AI (gemma-3-1b-it, with translation layer)
  try {
    const cleanedMessages = cleanMessagesForAPI(requestMessages);

    if (cleanedMessages.filter((m) => m.role !== "system").length === 0) {
      return res.status(400).send("Nexy error: Geçersiz sohbet geçmişi.");
    }

    const response = await fetch("https://ai.funteknoloji.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: cleanedMessages,
        model: "gemma-3-1b-it",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Fun Teknoloji AI returned status ${response.status}: ${errText}`);
    }

    const data = await response.json() as any;
    let englishText = data.choices?.[0]?.message?.content || "";

    englishText = englishText.replace(/\[inceliyor\]/gi, "");
    englishText = englishText.replace(/\[duraklama\]/gi, "");
    englishText = englishText.replace(/\[bekliyor\]/gi, "");
    englishText = englishText.replace(/\[düşünüyor\]/gi, "");
    englishText = englishText.replace(/\[[^\]]+\]/g, (match: string) => {
      if (match.toLowerCase().startsWith("[redirect:")) return match;
      return "";
    });
    englishText = englishText.trim().replace(/pulsar/gi, "Nexy");

    // Server-side translation back to user's selected local language
    let text = englishText;
    if (lang && lang !== "en") {
      text = await translateTextHelper(englishText, "en", lang);
    }

    return res.status(200).json({
      text,
      englishText,
      isTranslated: true
    });
  } catch (err: any) {
    // 4. Generic Error Messages (keep detailed logs securely on the server console, return friendly generic error)
    console.error("Fallback Fun Teknoloji AI call also failed completely:", err);
    return res.status(500).json({
      text: "Sistemde geçici bir yoğunluk var. Lütfen daha sonra tekrar deneyin.",
      englishText: "A temporary system congestion occurred. Please try again later.",
      isTranslated: false
    });
  }
}
