import type { VercelRequest, VercelResponse } from "@vercel/node";

// Lightweight in-memory rate limiter cache to prevent backend abuse/spam.
// Max 15 requests per minute per IP.
const ipCache = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
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
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    (req.headers["x-real-ip"] as string) ||
    "127.0.0.1";

  if (req.method === "POST" && isRateLimited(ip)) {
    return res.status(429).send("Nexy error: Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin. (Too many requests. Please try again later.)");
  }

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

  // Read body parameters (accepts both legacy prompt or standard messages array)
  const { prompt, messages, originalMessages, model = "gemma-3-1b-it" } = req.body || {};

  const requestMessages = messages || (prompt ? [{ role: "user", content: prompt }] : null);

  if (!requestMessages) {
    return res.status(400).send("Nexy error: Prompt or messages is required");
  }

  // Helper to ensure messages list starts with user role and strictly alternates user/assistant.
  // Gemma-3-1b-it chat template (Jinja) throws 400 Bad Request if roles do not alternate or start with user.
  const cleanMessagesForAPI = (msgs: any[]) => {
    const systemMsg = msgs.find((m) => m.role === "system");
    const chatMsgs = msgs.filter((m) => m.role !== "system");

    // Remove any starting non-user messages (like assistant greeting)
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

  const cleanedMessages = cleanMessagesForAPI(requestMessages);

  if (cleanedMessages.filter((m) => m.role !== "system").length === 0) {
    return res.status(400).send("Nexy error: No valid user message in history");
  }

  // We strictly use the active model "gemma-3-1b-it" for Fun Teknoloji AI
  const activeModel = "gemma-3-1b-it";

  // Attempt Primary Call (Fun Teknoloji AI)
  try {
    const response = await fetch("https://ai.funteknoloji.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: cleanedMessages,
        model: activeModel,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch from backend: ${response.status} ${response.statusText} - ${errText}`);
    }

    const data = await response.json() as any;
    let text = data.choices?.[0]?.message?.content || "";

    // Clean any legacy service references to keep branding clean
    text = text.replace(/pollinations\.ai/gi, "Nexy");
    text = text.replace(/pollinations/gi, "Nexy");
    text = text.replace(/pulsar/gi, "Nexy");

    return res.status(200).send(text);
  } catch (err: any) {
    console.warn("Primary Fun Teknoloji AI call failed, falling back to Hack Club AI:", err);

    // Fallback Call (Hack Club AI)
    const backupApiKey = process.env.Nexy || process.env.NEXY || "";
    if (!backupApiKey) {
      console.error("Hack Club AI API key (Nexy/NEXY) is not set in Vercel environment variables.");
      return res.status(500).send("Nexy error: Bir hata oluştu ve yedek API anahtarı bulunamadı.");
    }

    try {
      // Prioritize untranslated originalMessages if provided to avoid any translation layers
      const rawOriginal = originalMessages || messages;
      const cleanedOriginal = cleanMessagesForAPI(rawOriginal);

      // Prepend Hack Club System prompt
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
        throw new Error(`Failed to fetch from Hack Club AI: ${backupResponse.status} ${backupResponse.statusText} - ${backupErrText}`);
      }

      const backupData = await backupResponse.json() as any;
      let backupText = backupData.choices?.[0]?.message?.content || "";

      // Post-process the final output
      backupText = backupText.replace(/\[inceliyor\]/gi, "");
      backupText = backupText.replace(/\[duraklama\]/gi, "");
      backupText = backupText.replace(/\[bekliyor\]/gi, "");
      backupText = backupText.replace(/\[düşünüyor\]/gi, "");
      backupText = backupText.replace(/\[[^\]]+\]/g, (match: string) => {
        if (match.toLowerCase().startsWith("[redirect:")) return match;
        return "";
      });
      backupText = backupText.trim().replace(/pulsar/gi, "Nexy");

      return res.status(200).send(backupText);
    } catch (backupErr: any) {
      console.error("Hack Club AI fallback call also failed:", backupErr);
      return res.status(500).send("Nexy error: Bir hata oluştu: " + backupErr.message);
    }
  }
}
