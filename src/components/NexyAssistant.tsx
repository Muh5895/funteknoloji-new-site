import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { LiveLoginView, LiveChatView, LiveTicketDetailsView } from "./LiveSupportViews";
import { KNOWLEDGE_BASE } from "../lib/knowledge";
import { toast } from "sonner";
import {
  X,
  Copy,
  Volume,
  VolumeX,
  Volume2,
  Send,
  ChevronRight,
  ChevronLeft,
  Mic,
  Maximize2,
  Minimize2,
  Plus,
  MessageSquare,
  Trash2,
  Search as SearchIcon,
  Menu,
  Edit2,
  Check,
  Eye,
  EyeOff,
  LogOut,
  Square,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface Chat {
  id: string;
  title: string;
  messages: { role: "nexy" | "user"; text: string; displayedText?: string }[];
  createdAt: number;
}

export default function NexyAssistant() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  const [supportView, setSupportView] = useState<"menu" | "chat" | "live_login" | "live_details" | "live_chat">("menu");
  const [liveUser, setLiveUser] = useState<{ email: string } | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("live_support_user");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [liveEmail, setLiveEmail] = useState("");
  const [livePassword, setLivePassword] = useState("");
  const [liveMessages, setLiveMessages] = useState<{ role: "agent" | "user"; text: string; id: string; timestamp: number; images?: string[] }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("live_support_messages");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [liveAgentTyping, setLiveAgentTyping] = useState(false);
  const [isPastSession, setIsPastSession] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [pastSessions, setPastSessions] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("live_support_history");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (liveUser) {
        localStorage.setItem("live_support_user", JSON.stringify(liveUser));
      } else {
        localStorage.removeItem("live_support_user");
      }
    }
  }, [liveUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (liveMessages.length > 0) {
        localStorage.setItem("live_support_messages", JSON.stringify(liveMessages));
      } else {
        localStorage.removeItem("live_support_messages");
      }
    }
  }, [liveMessages]);

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const currentChat = chats.find((c) => c.id === activeChatId);
  const chatMessages = currentChat?.messages || [];

  const [userInput, setUserInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowPopup(false);
      setIsMinimized(false);
      setSupportView("chat");
      createNewChat();
    };
    window.addEventListener("open-nexy-chat", handleOpenChat);
    return () => window.removeEventListener("open-nexy-chat", handleOpenChat);
  }, [chats]);

  useEffect(() => {
    const saved = localStorage.getItem("nexy_chats_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const formatted = parsed.map((chat: any) => ({
          ...chat,
          messages: chat.messages.map((m: any) => ({ ...m, displayedText: m.text })),
        }));
        setChats(formatted);
        if (formatted.length > 0) {
          setActiveChatId(formatted[0].id);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(
        "nexy_chats_v2",
        JSON.stringify(
          chats.map((c) => ({
            ...c,
            messages: c.messages.map(({ role, text }) => ({ role, text })),
          })),
        ),
      );
    }
  }, [chats]);

  useEffect(() => {
    // Improved scrolling: Use requestAnimationFrame to ensure DOM is updated
    if (scrollRef.current) {
      const scroll = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      };
      requestAnimationFrame(scroll);
      setTimeout(scroll, 100); // Fallback for slower rendering
    }
  }, [chatMessages, isThinking, isTyping]);

  // Prevent background scroll when maximized
  useEffect(() => {
    if (isMaximized && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMaximized, isOpen]);

  const typingIntervalRef = useRef<number | null>(null);

  const typeMessage = (fullText: string, msgIndex: number, chatId: string) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    let currentText = "";
    let charIndex = 0;
    const speed = 30;

    typingIntervalRef.current = window.setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setChats((prev) =>
          prev.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: c.messages.map((m, i) =>
                    i === msgIndex ? { ...m, displayedText: currentText } : m,
                  ),
                }
              : c,
          ),
        );
        charIndex++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, speed);
  };

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const createNewChat = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const initialText = t("nexy.msg1");
    const newChat: Chat = {
      id: newId,
      title: t("nexy.new_chat"),
      messages: [{ role: "nexy", text: initialText, displayedText: "" }],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
    setIsSidebarOpen(false);
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setIsTyping(true);
      typeMessage(initialText, 0, newId);
    }, 1000);
  };

  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const filtered = chats.filter((c) => c.id !== id);
    setChats(filtered);
    if (activeChatId === id) {
      setActiveChatId(filtered.length > 0 ? filtered[0].id : null);
    }
    toast.success(t("nexy.delete_toast"));
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
    if (!isOpen) {
      setSupportView("menu");
    }
  };

  const generateChatTitle = async (userMsg: string, aiResponse: string) => {
    const prompt = `User: ${userMsg}\nAssistant: ${aiResponse}\n\nSystem: Based on the conversation above, determine a short and meaningful title for this chat (max 3-4 words). The title should summarize the topic. DO NOT just repeat the user's message. Response in the user's language. Write ONLY the title, no quotes or extra text.`;
    try {
      const response = await fetch("/api/nexy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, model: "openai", cache: "false" }),
      });
      if (response.ok) {
        let title = await response.text();
        title = title.replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, "").trim();
        title = title.replace(/^"|"$/g, "").trim();
        if (title && title.length < 50) return title;
      }
    } catch (e) {}

    // Fallback logic if AI fails or returns garbage
    if (userMsg.length <= 20) return userMsg;
    return userMsg.slice(0, 20) + "...";
  };

  const handleStopRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsThinking(false);
    setIsTyping(false);
  };

  const getNexyBrainResponse = async (input: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const history = chatMessages
      .slice(-6)
      .map((m) => `${m.role === "nexy" ? "Assistant" : "User"}: ${m.text}`)
      .join("\n");
    const prompt = `System: Sen Fun Teknoloji şirketinin resmi yapay zeka asistanı Nexy'sin.
    Fun Teknoloji'nin projeleri:
    1. Nexy: İşletmeler ve kullanıcılar için geliştirilmiş, her dilde hizmet verebilen akıllı dijital asistan (şu an konuştuğun sistem).
    2. QuakeSafe: Yapay zeka ve sensör ağları ile deprem güvenliği sağlayan, erken uyarı ve afet sonrası koordinasyon platformu.

    Bilgi Bankası: ${KNOWLEDGE_BASE}
    Dil: Kullanıcının dilinde (${lang}) cevap ver.
    Tarz: Profesyonel, yardımsever ve samimi ol.
    Önemli: Eğer kullanıcı bir sayfaya gitmek isterse cevabının sonuna [REDIRECT:/sayfa] ekle ve BU REDIRECT'ten önce mutlaka kullanıcıya o sayfaya yönlendirdiğini kendi cümlenle söyle (Örn: Seni fiyatlandırma sayfamıza yönlendiriyorum).
    Kısa ve öz cevaplar ver. Cevaplarında Pollinations veya başka bir servis reklamı yapma, sadece Nexy olarak konuş.

    Önceki Konuşmalar:
    ${history}

    User: ${input}`;

    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }]
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      let text = await response.text();

      // Filter out Pollinations ads & replace mentions
      text = text.replace(/pollinations\.ai/gi, "Nexy");
      text = text.replace(/pollinations/gi, "Nexy");
      text = text.replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, "");
      text = text.replace(/🌸[\s\S]*?Ad[\s\S]*?🌸/gi, "");
      text = text.replace(/Powered by Pollinations\.AI[\s\S]*?accessible for everyone\./gi, "");
      text = text.replace(
        /\[Support our mission\]\(https:\/\/pollinations\.ai\/redirect\/kofi\)/gi,
        "",
      );

      return text.trim();
    } catch (err) {
      return t("nexy.resp.default.0");
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Allow sending if thinking is finished, even if still typing previous response
    // But prevent double-sending while thinking
    if (!userInput.trim() || isThinking) return;

    if (!navigator.onLine) {
      toast.error(t("error.offline") || "İnternet bağlantınız yok.");
      return;
    }
    const userMsg = { role: "user" as const, text: userInput, displayedText: userInput };

    const savedInput = userInput;
    const shouldUpdateTitle = chatMessages.length <= 1;

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, userMsg] }
          : c,
      ),
    );

    const currentChatId = activeChatId!;
    setUserInput("");
    setIsTyping(false);
    setIsThinking(true);

    let response = await getNexyBrainResponse(savedInput);

    // If request was stopped/cancelled, return immediately
    if (abortControllerRef.current === null) {
      return;
    }
    abortControllerRef.current = null;

    // Check for REDIRECT command
    const redirectMatch = response.match(/\[REDIRECT:(.+)\]/);
    if (redirectMatch) {
      const path = redirectMatch[1];
      response = response.replace(/\[REDIRECT:.+\]/, "").trim();

      setTimeout(() => {
        navigate({ to: path as any });
      }, 2500);
    }

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === currentChatId) {
          const nexyMsgIndex = c.messages.length;
          const updatedMsgs = [...c.messages, { role: "nexy" as const, text: response, displayedText: "" }];
          setTimeout(() => typeMessage(response, nexyMsgIndex, currentChatId), 10);
          return { ...c, messages: updatedMsgs };
        }
        return c;
      })
    );

    if (shouldUpdateTitle) {
      const newTitle = await generateChatTitle(savedInput, response);
      setChats((prev) =>
        prev.map((c) => (c.id === currentChatId ? { ...c, title: newTitle } : c))
      );
    }
    setIsThinking(false);
    setIsTyping(true);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error(
        lang === "tr"
          ? "Tarayıcınız ses tanımayı desteklemiyor."
          : "Your browser does not support speech recognition.",
      );
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Set language based on active site language
    const langMap: Record<string, string> = {
      tr: "tr-TR",
      en: "en-US",
      de: "de-DE",
      fr: "fr-FR",
      es: "es-ES",
      az: "tr-TR",
      ru: "ru-RU",
      ar: "ar-SA",
      it: "it-IT",
      pt: "pt-PT",
      ja: "ja-JP",
      zh: "zh-CN",
    };
    recognition.lang = langMap[lang] || "en-US";
    recognition.continuous = false;
    recognition.interimResults = true; // Enable interim results for better feedback

    recognition.onstart = () => {
      setIsListening(true);
      toast.info(lang === "tr" ? "Dinliyorum..." : "I'm listening...", {
        icon: <Mic className="h-4 w-4 animate-pulse text-red-500" />,
        duration: 2000,
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === "not-allowed") {
        toast.error(lang === "tr" ? "Mikrofon izni reddedildi." : "Microphone permission denied.");
      } else {
        toast.error(lang === "tr" ? "Ses algılanamadı." : "Speech not detected.");
      }
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");

      setUserInput(transcript);

      // If it's the final result, maybe auto-send?
      // For now just update input
    };

    recognition.start();
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success(t("nexy.toast.copy"), {
      description: "Mesaj panoya kopyalandı.",
      duration: 3000,
    });
  };

  const speak = (text: string, index: number) => {
    if ("speechSynthesis" in window) {
      if (speakingMessageIndex === index) {
        window.speechSynthesis.cancel();
        setSpeakingMessageIndex(null);
        return;
      }
      window.speechSynthesis.cancel();
      setSpeakingMessageIndex(index);

      // Strip table markers and formatting for clean speech
      const cleanText = text
        .split("\n")
        .filter((line) => {
          const trimmed = line.trim();
          // Skip empty lines
          if (!trimmed) return false;
          // Skip table separator lines (e.g., |---| or :---:)
          if (trimmed.includes("|") && trimmed.replace(/[|:\s-]/g, "").length === 0)
            return false;
          // Skip lines that are just dashes or hyphens (often used in tables or separators)
          if (trimmed.replace(/[\s-]/g, "").length === 0) return false;
          // Skip code block start/end
          if (trimmed.startsWith("```")) return false;
          return true;
        })
        .join(". ") // Use period to give a small pause between lines
        .replace(/\|/g, " ") // Remove remaining pipes
        .replace(/#{1,6}\s/g, " ") // Remove markdown headers
        .replace(/\*\*/g, "") // Remove bold markers
        .replace(/\*/g, "") // Remove italic markers
        .replace(/-{2,}/g, " ") // Remove multiple dashes (the main issue)
        .replace(/(\s-){2,}/g, " ") // Remove repeating space-dash patterns
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace links [text](url) with just text
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Remove images ![alt](url)
        .replace(/\[REDIRECT:.*?\]/g, "") // Remove redirect commands
        .replace(/\s+/g, " ") // Collapse multiple spaces
        .trim();

      const ut = new SpeechSynthesisUtterance(cleanText);
      const langMap: Record<string, string> = {
        tr: "tr-TR",
        en: "en-US",
        de: "de-DE",
        fr: "fr-FR",
        es: "es-ES",
        az: "tr-TR",
        ru: "ru-RU",
        ar: "ar-SA",
        it: "it-IT",
        pt: "pt-PT",
        ja: "ja-JP",
        zh: "zh-CN",
      };
      ut.lang = langMap[lang] || "tr-TR";
      ut.rate = 1.0;
      ut.pitch = 1.1;
      ut.onstart = () => setSpeakingMessageIndex(index);
      ut.onend = () => setSpeakingMessageIndex(null);
      ut.onerror = () => setSpeakingMessageIndex(null);
      window.speechSynthesis.speak(ut);
    }
  };

  if (!visible) return null;

  const formatText = (text: string) => {
    const lines = text.split("\n");
    const result: React.ReactNode[] = [];
    let currentTable: string[][] = [];
    let inTable = false;

    const processLine = (line: string, key: string | number) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, pi) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={`${key}-${pi}`} className="font-extrabold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const italicParts = part.split(/(\*.*?\*)/g);
        return italicParts.map((iPart, ji) => {
          if (iPart.startsWith("*") && iPart.endsWith("*")) {
            return (
              <em key={`${key}-${pi}-${ji}`} className="italic opacity-90">
                {iPart.slice(1, -1)}
              </em>
            );
          }
          return iPart;
        });
      });
    };

    const renderTable = (tableData: string[][], tableKey: string | number) => {
      if (tableData.length === 0) return null;
      const headers = tableData[0];
      const rows = tableData.slice(1);

      return (
        <div
          key={`table-wrapper-${tableKey}`}
          className="overflow-x-auto my-3 border rounded-xl border-[var(--fun-stroke-1)] bg-[var(--fun-card)] shadow-sm"
        >
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[var(--fun-surface)] text-[var(--fun-purple)] font-bold">
              <tr>
                {headers.map((cell, idx) => (
                  <th
                    key={idx}
                    className="p-2.5 border-b border-[var(--fun-stroke-1)] whitespace-nowrap"
                  >
                    {processLine(cell, `th-${idx}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-[var(--fun-surface)]/50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-2.5 border-t border-[var(--fun-stroke-1)]">
                      {processLine(cell, `td-${rowIdx}-${cellIdx}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("|") && line.includes("|")) {
        const cells = line
          .split("|")
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          .map((c) => c.trim());

        if (cells.every((c) => c.match(/^[ \-:]+$/))) {
          continue;
        }

        if (!inTable) {
          inTable = true;
          currentTable = [cells];
        } else {
          currentTable.push(cells);
        }
      } else {
        if (inTable) {
          result.push(renderTable(currentTable, i));
          currentTable = [];
          inTable = false;
        }
        if (line || lines[i] === "") {
          result.push(
            <p key={i} className={lines[i] === "" ? "h-2" : "mb-1 leading-relaxed"}>
              {processLine(lines[i], i)}
            </p>,
          );
        }
      }
    }

    if (inTable) {
      result.push(renderTable(currentTable, "end"));
    }

    return result;
  };

  const filteredMessages = chatMessages.filter((m) =>
    m.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const startEditing = (e: React.MouseEvent, chat: Chat) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditingTitle(chat.title);
  };

  const saveTitle = (e: React.FormEvent | React.FocusEvent) => {
    e.preventDefault();
    if (editingChatId) {
      setChats((prev) =>
        prev.map((c) => (c.id === editingChatId ? { ...c, title: editingTitle || c.title } : c)),
      );
      setEditingChatId(null);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={`${isMaximized ? "fixed inset-0 z-[200] rounded-none" : "fixed bottom-24 right-6 w-[320px] sm:w-[420px] h-[550px] z-[100] rounded-[32px]"} bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-500 origin-bottom-right transition-all`}
        >
          {supportView === "menu" ? (
            <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
              {/* Menu Header */}
              <div
                className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
                style={{ borderColor: "var(--fun-stroke-1)" }}
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">{t("help.menu.title")}</h3>
                  <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">{t("help.menu.desc")}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-9 w-9 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Menu Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-start gap-4 pt-8">
                {/* AI Assistant Card */}
                <div
                  onClick={() => {
                    setSupportView("chat");
                    if (chats.length === 0) {
                      createNewChat();
                    }
                  }}
                  className="group p-4 sm:p-5 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] hover:border-[var(--fun-purple)]/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-sm flex items-start gap-4"
                >
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-all overflow-hidden relative">
                    <img
                      src="/nexy-kafa-buyuk.png"
                      alt="Nexy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold fun-text tracking-tight">{t("help.menu.ai.title")}</h4>
                    </div>
                    <p className="text-[10px] sm:text-[11px] fun-text-muted mt-1 leading-normal">{t("help.menu.ai.desc")}</p>
                  </div>
                </div>

                {/* Live Support Card */}
                <div
                  onClick={() => {
                    if (liveUser) {
                      if (liveMessages.length > 0) {
                        setSupportView("live_chat");
                      } else {
                        setSupportView("live_details");
                      }
                    } else {
                      setSupportView("live_login");
                    }
                  }}
                  className="group p-4 sm:p-5 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] hover:border-[var(--fun-purple)]/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-sm flex items-start gap-4"
                >
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold fun-text tracking-tight">{t("help.menu.live.title")}</h4>
                    </div>
                    <p className="text-[10px] sm:text-[11px] fun-text-muted mt-1 leading-normal">{t("help.menu.live.desc")}</p>
                  </div>
                </div>

                {/* Past Sessions History List */}
                {pastSessions.length > 0 && (
                  <div className="mt-2 space-y-2 select-none">
                    <h4 className="text-xs font-bold fun-text px-1">
                      {lang === "tr" ? "Geçmiş Destek Talepleriniz" : "Your Past Support Tickets"}
                    </h4>
                    <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1">
                      {pastSessions.map((session) => (
                        <div
                          key={session.id}
                          onClick={() => {
                            setLiveMessages(session.messages);
                            setIsPastSession(true);
                            setSupportView("live_chat");
                          }}
                          className="p-3 rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] hover:border-[var(--fun-purple)] transition-colors cursor-pointer flex justify-between items-center text-xs"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <p className="font-semibold fun-text truncate">{session.subject}</p>
                            <p className="text-[10px] fun-text-muted mt-0.5">
                              {new Date(session.timestamp).toLocaleDateString([], { day: "numeric", month: "short" })} • {session.importance}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 fun-text-muted" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : supportView === "live_login" ? (
            <LiveLoginView
              onBack={() => setSupportView("menu")}
              onLoginSuccess={(user) => {
                setLiveUser(user);
                setSupportView("live_details");
              }}
              lang={lang}
            />
          ) : supportView === "live_details" ? (
            <LiveTicketDetailsView
              lang={lang}
              onBack={() => setSupportView("menu")}
              onSubmit={(details) => {
                // Save subject & importance to localStorage so they persist for archive saving
                localStorage.setItem("live_support_subject", details.subject);
                localStorage.setItem("live_support_importance", details.importance);

                // Pre-populate chat with the compiled ticket details
                const initialMsg = `**Yeni Canlı Destek Talebi**\n\n📌 **Konu:** ${details.subject}\n⚡ **Önem Seviyesi:** ${details.importance}\n📝 **Açıklama:** ${details.description}`;
                setLiveMessages([
                  {
                    role: "user",
                    text: initialMsg,
                    id: "system-details-init",
                    timestamp: Date.now()
                  }
                ]);
                setSupportView("live_chat");
              }}
            />
          ) : supportView === "live_chat" ? (
            <LiveChatView
              user={liveUser!}
              messages={liveMessages}
              setMessages={setLiveMessages}
              onBack={() => {
                if (isPastSession) {
                  setIsPastSession(false);
                  const activeMsgs = localStorage.getItem("live_support_messages");
                  setLiveMessages(activeMsgs ? JSON.parse(activeMsgs) : []);
                }
                setSupportView("menu");
              }}
              onEndSession={() => {
                // Archive current session on close (keeps account logged in)
                if (liveMessages.length > 0 && liveUser) {
                  const newSession = {
                    id: Math.random().toString(36).substring(2, 9),
                    email: liveUser.email,
                    subject: localStorage.getItem("live_support_subject") || "Destek Talebi",
                    importance: localStorage.getItem("live_support_importance") || "Orta",
                    timestamp: Date.now(),
                    messages: liveMessages,
                  };
                  const updatedHistory = [newSession, ...pastSessions];
                  setPastSessions(updatedHistory);
                  localStorage.setItem("live_support_history", JSON.stringify(updatedHistory));
                }
                setLiveMessages([]);
                setSupportView("menu");
                localStorage.removeItem("live_support_messages");
                localStorage.removeItem("live_support_subject");
                localStorage.removeItem("live_support_importance");
              }}
              onLogout={() => {
                // Log out from the live support account completely
                setLiveUser(null);
                setLiveMessages([]);
                setSupportView("menu");
                localStorage.removeItem("live_support_messages");
                localStorage.removeItem("live_support_user");
                localStorage.removeItem("live_support_subject");
                localStorage.removeItem("live_support_importance");
                localStorage.removeItem("live_support_agent_name");
              }}
              lang={lang}
              isAgentTyping={liveAgentTyping}
              setIsAgentTyping={setLiveAgentTyping}
              isMaximized={isMaximized}
              readOnly={isPastSession}
            />
          ) : (
            <>
              {/* Sidebar */}
              <div
                className={`${isSidebarOpen ? "flex" : "hidden"} ${isMaximized ? "md:flex" : ""} absolute inset-0 z-[210] md:relative md:z-0 md:inset-auto w-72 flex-col bg-[var(--fun-surface)] border-r border-[var(--fun-stroke-1)] animate-in slide-in-from-left duration-300 shadow-2xl md:shadow-none`}
              >
                <div className="p-4 border-b border-[var(--fun-stroke-1)] flex items-center justify-between">
                  <button
                    onClick={createNewChat}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--fun-purple)] text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                    {t("nexy.new_chat")}
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden ml-2 p-2 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setActiveChatId(chat.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${activeChatId === chat.id ? "bg-[var(--fun-purple)] text-white shadow-md" : "hover:bg-[var(--fun-stroke-1)] fun-text"}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden flex-1">
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        {editingChatId === chat.id ? (
                          <form onSubmit={saveTitle} className="flex-1 min-w-0" onClick={e => e.stopPropagation()}>
                            <input
                              autoFocus
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onBlur={saveTitle}
                              className="w-full bg-white/20 text-white rounded px-1 outline-none text-sm"
                            />
                          </form>
                        ) : (
                          <span className="text-sm font-medium truncate">{chat.title}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        {editingChatId === chat.id ? (
                          <button onClick={saveTitle} className="p-1 hover:bg-white/20 rounded">
                            <Check className="h-3.5 w-3.5 text-white" />
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={(e) => startEditing(e, chat)}
                              className={`p-1.5 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all ${activeChatId === chat.id ? "hover:bg-white/20 text-white" : "hover:bg-[var(--fun-stroke-1)] fun-text-muted"}`}
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => deleteChat(e, chat.id)}
                              className={`p-1.5 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all ${activeChatId === chat.id ? "hover:bg-white/20 text-white" : "hover:bg-red-500 hover:text-white text-red-500"}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col min-w-0 animate-in fade-in duration-300">
              <div
                className={`p-2 sm:p-3 border-b flex items-center bg-[var(--fun-surface)] ${isMaximized ? "rounded-none" : "rounded-t-[32px]"} h-20 sm:h-24`}
                style={{ borderColor: "var(--fun-stroke-1)" }}
              >
                <div className="flex flex-1 items-center gap-2">
                  <button
                    onClick={() => setSupportView("menu")}
                    className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
                    title={t("cookies.cancel")}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {isMaximized && (
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="p-2 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                  )}
                  <div className="relative">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-zinc-800" style={{ backgroundColor: "#000000" }}>
                      <img
                        src="/nexy-kafa-buyuk.png"
                        alt="Nexy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <div className="flex items-center gap-2">
                      <p className="fun-text text-lg font-bold leading-none tracking-tight">
                        Nexy
                      </p>
                    </div>
                  </div>
                </div>
            <div className="flex-1 flex items-center justify-end gap-1">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
              >
                {isMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {showSearch && (
            <div className="px-5 py-3 border-b border-[var(--fun-stroke-1)] bg-[var(--fun-surface)] animate-in slide-in-from-top-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nexy.search_placeholder")}
                className="w-full bg-transparent text-xs fun-text outline-none"
              />
            </div>
          )}
          <div
            ref={scrollRef}
            className={`flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 bg-dots scroll-smooth ${isMaximized ? "max-w-6xl mx-auto w-full" : ""}`}
          >
            {(searchQuery ? filteredMessages : chatMessages).map((m, i) => {
              const isMsgTyping = m.role === "nexy" && m.displayedText !== m.text;
              return (
                <div
                  key={i}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} ${isMsgTyping ? "" : "animate-in fade-in slide-in-from-bottom-4 duration-500"}`}
                >
                  <div
                    className={`relative group/msg max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-[13px] leading-relaxed ${m.role === "user" ? "bg-gradient-to-br from-[var(--fun-purple)] to-[#8E78FF] text-white rounded-br-none shadow-xl" : "bg-[var(--fun-surface)] fun-text rounded-bl-none border border-[var(--fun-stroke-1)] shadow-md"}`}
                  >
                    {formatText(m.displayedText || "")}
                  </div>
                  {m.role === "nexy" && m.displayedText === m.text && (
                    <div className="mt-2 flex items-center gap-2 px-1 animate-in fade-in slide-in-from-top-1">
                      <button
                        onClick={() => copyToClipboard(m.text, i)}
                        className={`h-8 w-8 flex items-center justify-center rounded-full border border-[var(--fun-stroke-1)] transition-all active:scale-95 ${copiedId === i ? "bg-green-500 text-white border-green-500" : "bg-[var(--fun-card)] fun-text hover:bg-[var(--fun-purple)] hover:text-white"}`}
                        title={t("nexy.copy_tooltip")}
                      >
                        {copiedId === i ? (
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => speak(m.text, i)}
                        className={`h-8 w-8 flex items-center justify-center rounded-full border border-[var(--fun-stroke-1)] transition-all active:scale-95 ${speakingMessageIndex === i ? "bg-red-500 text-white border-red-500" : "bg-[var(--fun-card)] fun-text hover:bg-[var(--fun-purple)] hover:text-white"}`}
                        title={speakingMessageIndex === i ? "Durdur" : t("nexy.read_tooltip")}
                      >
                        {speakingMessageIndex === i ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {isThinking && (
              <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="bg-[var(--fun-surface)] fun-text p-4 rounded-2xl rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSend}
            className={`p-4 sm:p-6 border-t space-y-2 bg-[var(--fun-surface)]/50 backdrop-blur-xl ${isMaximized ? "rounded-none sm:rounded-b-[32px]" : "rounded-b-[32px]"}`}
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <div className={`relative ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t("nexy.placeholder")}
                className="w-full rounded-[20px] bg-[var(--fun-surface)] border-2 border-[var(--fun-stroke-1)] py-3 pl-12 pr-14 text-[13px] outline-none focus:border-[var(--fun-purple)] focus:ring-4 focus:ring-[var(--fun-purple)]/10 transition-all fun-text shadow-inner"
              />
              <button
                type="button"
                onClick={startListening}
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all z-10 ${isListening ? "bg-red-500 text-white scale-110 shadow-lg shadow-red-500/40 animate-pulse" : "fun-text-muted hover:bg-[var(--fun-stroke-1)] hover:text-[var(--fun-purple)]"}`}
              >
                <Mic className="h-4 w-4" />
              </button>
              {isThinking ? (
                <button
                  type="button"
                  onClick={handleStopRequest}
                  aria-label="Durdur"
                  title="Durdur"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-red-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/30 z-10"
                >
                  <Square className="h-4 w-4 fill-white text-white" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!userInput.trim() || isThinking}
                  aria-label={t("nexy.aria_send")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-purple-500/30 z-10"
                >
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-[9px] text-center fun-text-muted font-medium opacity-50 px-2 tracking-wide">
              {t("nexy.disclaimer")}
            </p>
          </form>
          </div>
          </>
          )}
        </div>
      )}

      <div
        className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500 transition-transform ${isThinking && !isOpen ? "-translate-y-4" : "translate-y-0"}`}
      >
        {!isOpen && !isMinimized && showPopup && (
          <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl backdrop-blur-md z-[120]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-xs fun-text hover:bg-[var(--fun-stroke-1)] transition-colors shadow-lg"
            >
              ✕
            </button>
            <p className="text-sm fun-text leading-relaxed font-medium">{t("help.popup")}</p>
            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
          </div>
        )}
        <div
          className={`flex items-center gap-2 transition-all duration-500 ${isMinimized ? "translate-x-[calc(100%-40px)]" : ""}`}
        >
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text shadow-xl hover:bg-[var(--fun-surface)] transition-all duration-300 ${isOpen ? "opacity-0 w-0 h-0 overflow-hidden pointer-events-none -mr-2" : "opacity-100 w-10 h-10"}`}
          >
            {isMinimized ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
          {/* Use pointer-events-none wrapper or direct classes so particles never block clicks */}
          <div className="sp pointer-events-none">
            <button
              className={`sparkle-button ${isOpen ? "--active: 1" : ""} ${isMinimized ? "opacity-50 pointer-events-none" : ""} pointer-events-auto`}
              onClick={toggleChat}
              aria-label={t("nexy.aria_help")}
              style={isOpen ? ({ "--active": 1 } as any) : {}}
            >
              <span className="spark"></span>
              <span className="backdrop"></span>
              <svg
                className="sparkle"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="sparkle-text font-bold">{t("nexy.help_button")}</span>
            </button>
            {!(isThinking || isTyping) && (
              <div className="particle-pen">
                {[...Array(20)].map((_, i) => (
                  <svg
                    key={i}
                    className="particle"
                    viewBox="0 0 15 15"
                    fill="none"
                    style={
                      {
                        "--x": Math.random() * 100,
                        "--y": Math.random() * 100,
                        "--size": Math.random() * 0.5 + 0.1,
                        "--duration": Math.random() * 3 + 2,
                        "--delay": Math.random() * 5,
                      } as any
                    }
                  >
                    <path
                      d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function TypingIndicator() {
  return (
    <div className="loader">
      <svg id="pegtopone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <path
            d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
      <svg id="pegtoptwo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <path
            d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
      <svg id="pegtopthree" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <path
            d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </div>
  );
}
