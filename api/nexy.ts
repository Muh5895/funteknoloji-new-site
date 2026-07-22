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

  // Read body parameters (accepts both legacy prompt or standard messages array)
  const { prompt, messages, model = "gemma-3-1b-it" } = req.body || {};

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
    console.error("Backend error calling Fun Teknoloji AI:", err);
    return res.status(500).send("Nexy error: Bir hata oluştu: " + err.message);
  }
}
