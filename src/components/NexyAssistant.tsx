import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { KNOWLEDGE_BASE } from "../lib/knowledge";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";
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
  Lock,
  User,
  LogOut,
} from "lucide-react";

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
  const [supportView, setSupportView] = useState<"menu" | "chat" | "live_login" | "live_chat">("menu");

  // Live support authentication and messages with lazy state initializers to prevent Strict Mode reset
  const [liveUser, setLiveUser] = useState<{ email: string } | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("live_support_user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return null;
  });
  const [liveEmail, setLiveUserEmail] = useState("");
  const [livePassword, setLiveUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Pre-chat info states
  const [liveName, setLiveName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("live_support_name") || "";
    }
    return "";
  });
  const [liveSubject, setLiveSubject] = useState("");
  const [hasFilledPreChatInfo, setHasFilledPreChatInfo] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("live_support_info_filled") === "true";
    }
    return false;
  });

  const [liveSearchQuery, setLiveSearchQuery] = useState("");
  const [showLiveSearch, setShowLiveSearch] = useState(false);
  const [showEndChatConfirmation, setShowEndChatConfirmation] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("live_support_name", liveName);
    }
  }, [liveName]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("live_support_info_filled", hasFilledPreChatInfo ? "true" : "false");
    }
  }, [hasFilledPreChatInfo]);
  const [liveMessages, setLiveMessages] = useState<{ role: "agent" | "user"; text: string; id: string; timestamp: number }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("live_support_messages");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [];
  });
  const [liveAgentTyping, setLiveAgentTyping] = useState(false);

  useEffect(() => {
    if (liveUser) {
      localStorage.setItem("live_support_user", JSON.stringify(liveUser));
    } else {
      localStorage.removeItem("live_support_user");
    }
  }, [liveUser]);

  useEffect(() => {
    if (liveMessages.length > 0) {
      localStorage.setItem("live_support_messages", JSON.stringify(liveMessages));
    } else {
      localStorage.removeItem("live_support_messages");
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
    };
    window.addEventListener("open-nexy-chat", handleOpenChat);
    return () => window.removeEventListener("open-nexy-chat", handleOpenChat);
  }, []);

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
  }, [chatMessages, isThinking, isTyping, liveMessages, liveAgentTyping]);

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
      const response = await fetch(
        `/api/nexy/${encodeURIComponent(prompt)}?model=openai&cache=false`,
      );
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

  const getNexyBrainResponse = async (input: string) => {
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
      const response = await fetch(
        `/api/nexy/${encodeURIComponent(prompt)}?model=openai&cache=false`,
      );
      if (!response.ok) throw new Error();
      let text = await response.text();

      // Filter out Pollinations ads
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
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight">{t("help.menu.title")}</h3>
                  <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">{t("help.menu.desc")}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-start pt-6 gap-4">
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
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden bg-[var(--fun-purple)] text-[var(--fun-purple)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <img
                      src="/nexy-kafa-buyuk.png"
                      alt="Nexy"
                      className="h-full w-full object-cover"
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
                      setSupportView("live_chat");
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
              </div>
            </div>
          ) : supportView === "live_login" ? (
            <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
              {/* Login Header */}
              <div
                className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
                style={{ borderColor: "var(--fun-stroke-1)" }}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSupportView("menu")}
                    className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-[var(--fun-purple)] leading-tight">{t("help.menu.live.title")}</h3>
                    <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">{lang === "tr" ? "Giriş Yapın" : "Log In"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Login Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!liveEmail || !livePassword) {
                    toast.error(lang === "tr" ? "Lütfen tüm alanları doldurun." : "Please fill in all fields.");
                    return;
                  }
                  if (!liveEmail.includes("@")) {
                    toast.error(lang === "tr" ? "Geçersiz e-posta adresi." : "Invalid email address.");
                    return;
                  }

                  setIsLoggingIn(true);
                  try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                      email: liveEmail,
                      password: livePassword,
                    });

                    if (error) {
                      // Precise user friendly error messages for Supabase authentication
                      const errMsg = error.message.toLowerCase();
                      if (errMsg.includes("invalid login credentials") || errMsg.includes("invalid double quote") || errMsg.includes("email not confirmed")) {
                        toast.error(lang === "tr" ? "Hatalı şifre veya e-posta adresi!" : "Invalid email or password!");
                      } else if (errMsg.includes("banned") || errMsg.includes("suspended") || errMsg.includes("restricted")) {
                        toast.error(lang === "tr" ? "Hesabınız askıya alınmıştır (banlanmışsınız)." : "Your account has been banned/suspended.");
                      } else {
                        toast.error(error.message);
                      }
                      setIsLoggingIn(false);
                      return;
                    }

                    if (data?.user) {
                      setLiveUser({ email: data.user.email || liveEmail });
                      setSupportView("live_chat");
                      toast.success(lang === "tr" ? "Başarıyla giriş yapıldı!" : "Logged in successfully!");
                    }
                  } catch (err: any) {
                    toast.error(lang === "tr" ? "Sistem hatası oluştu. Lütfen tekrar deneyin." : "System error occurred. Please try again.");
                  } finally {
                    setIsLoggingIn(false);
                  }
                }}
                className="flex-1 p-5 sm:p-6 flex flex-col justify-start gap-4 pt-8"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold fun-text-muted">{t("contact.form.email")}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 fun-text-muted" />
                    <input
                      type="email"
                      required
                      disabled={isLoggingIn}
                      value={liveEmail}
                      onChange={(e) => setLiveUserEmail(e.target.value)}
                      placeholder={t("contact.form.email_placeholder")}
                      className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-2.5 pl-10 pr-4 text-xs outline-none focus:border-[var(--fun-purple)] transition-all fun-text disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold fun-text-muted">{lang === "tr" ? "Şifre" : "Password"}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 fun-text-muted" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={isLoggingIn}
                      value={livePassword}
                      onChange={(e) => setLiveUserPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-2.5 pl-10 pr-12 text-xs outline-none focus:border-[var(--fun-purple)] transition-all fun-text disabled:opacity-50"
                    />
                    <button
                      type="button"
                      disabled={isLoggingIn}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-zinc-400 hover:text-[var(--fun-purple)] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end -mt-2">
                  <a
                    href="https://account.funteknoloji.com/forgot-password"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs font-semibold text-[var(--fun-purple)] hover:underline cursor-pointer"
                  >
                    {lang === "tr" ? "Şifremi Unuttum" : "Forgot Password?"}
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full mt-2 py-3 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    lang === "tr" ? "Giriş Yap" : "Log In"
                  )}
                </button>
              </form>
            </div>
          ) : supportView === "live_chat" ? (
            !hasFilledPreChatInfo ? (
              <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
                {/* Header */}
                <div
                  className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
                  style={{ borderColor: "var(--fun-stroke-1)" }}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSupportView("menu")}
                      className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">{t("help.menu.live.title")}</h3>
                      <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">{lang === "tr" ? "Ön Bilgiler" : "Pre-Chat Info"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-9 w-9 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!liveName.trim() || !liveSubject.trim()) {
                      toast.error(lang === "tr" ? "Lütfen tüm alanları doldurun." : "Please fill in all fields.");
                      return;
                    }
                    setHasFilledPreChatInfo(true);
                    toast.success(lang === "tr" ? "Canlı destek başlatılıyor..." : "Starting live support...");
                  }}
                  className="flex-1 p-5 sm:p-6 flex flex-col justify-start gap-4 pt-8"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-bold fun-text-muted">{lang === "tr" ? "Adınız Soyadınız" : "Full Name"}</label>
                    <input
                      type="text"
                      required
                      value={liveName}
                      onChange={(e) => setLiveName(e.target.value)}
                      placeholder={lang === "tr" ? "Adınızı ve soyadınızı girin" : "Enter your full name"}
                      className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-2.5 px-4 text-xs outline-none focus:border-[var(--fun-purple)] transition-all fun-text"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold fun-text-muted">{lang === "tr" ? "Yardım Almak İstediğiniz Konu" : "Support Topic"}</label>
                    <input
                      type="text"
                      required
                      value={liveSubject}
                      onChange={(e) => setLiveSubject(e.target.value)}
                      placeholder={lang === "tr" ? "Destek almak istediğiniz konuyu yazın" : "What do you need help with?"}
                      className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-2.5 px-4 text-xs outline-none focus:border-[var(--fun-purple)] transition-all fun-text"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer"
                  >
                    {lang === "tr" ? "Canlı Sohbeti Başlat" : "Start Live Chat"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300 relative">
                {/* Chat Header */}
                <div
                  className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
                  style={{ borderColor: "var(--fun-stroke-1)" }}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSupportView("menu")}
                      className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center p-1 border border-zinc-800 bg-[var(--fun-purple)]">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[var(--fun-surface)]"></span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight fun-text leading-tight">{lang === "tr" ? "Can (Canlı Destek)" : "Can (Live Support)"}</h3>
                      <p className="text-[10px] fun-text-muted mt-0.5">{lang === "tr" ? "Çevrimiçi" : "Online"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowLiveSearch(!showLiveSearch)}
                      className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                      title={lang === "tr" ? "Arama" : "Search"}
                    >
                      <SearchIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                      title={isMaximized ? (lang === "tr" ? "Küçült" : "Minimize") : (lang === "tr" ? "Büyüt" : "Maximize")}
                    >
                      {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setShowEndChatConfirmation(true);
                      }}
                      className="h-8 w-8 rounded-full hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors"
                      title={lang === "tr" ? "Sohbeti Sonlandır" : "End Chat"}
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {showLiveSearch && (
                  <div className="px-5 py-3 border-b border-[var(--fun-stroke-1)] bg-[var(--fun-surface)] animate-in slide-in-from-top-2">
                    <input
                      autoFocus
                      type="text"
                      value={liveSearchQuery}
                      onChange={(e) => setLiveSearchQuery(e.target.value)}
                      placeholder={lang === "tr" ? "Mesajlarda ara..." : "Search messages..."}
                      className="w-full bg-transparent text-xs fun-text outline-none"
                    />
                  </div>
                )}

              {/* Chat Body */}
              <div
                ref={scrollRef}
                className={`flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-dots scroll-smooth ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}
              >
                {/* Inline Confirmation Pop-up Overlay */}
                {showEndChatConfirmation && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[220] flex items-center justify-center p-5 animate-in fade-in duration-300">
                    <div className="bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-2xl p-5 max-w-[280px] w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
                      <div className="h-10 w-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-3">
                        <LogOut className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold fun-text">{lang === "tr" ? "Sohbeti Sonlandır?" : "End Live Chat?"}</h4>
                      <p className="text-[11px] fun-text-muted mt-2 leading-relaxed">
                        {lang === "tr"
                          ? "Canlı sohbeti sonlandırmak istediğinize emin misiniz? Sohbet geçmişiniz silinecektir."
                          : "Are you sure you want to end the live chat? Your chat history will be deleted."}
                      </p>
                      <div className="flex gap-2.5 mt-4">
                        <button
                          type="button"
                          onClick={() => setShowEndChatConfirmation(false)}
                          className="flex-1 py-2 px-3 border border-[var(--fun-stroke-1)] rounded-xl text-xs font-semibold fun-text hover:bg-[var(--fun-surface)] transition-colors cursor-pointer"
                        >
                          {lang === "tr" ? "İptal" : "Cancel"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLiveMessages([]);
                            setHasFilledPreChatInfo(false);
                            setShowEndChatConfirmation(false);
                            setSupportView("menu");
                            toast.success(lang === "tr" ? "Canlı sohbet sonlandırıldı." : "Live support chat ended.");
                          }}
                          className="flex-1 py-2 px-3 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
                        >
                          {lang === "tr" ? "Evet, Sonlandır" : "Yes, End"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {(liveSearchQuery ? liveMessages.filter(m => m.text.toLowerCase().includes(liveSearchQuery.toLowerCase())) : liveMessages).length === 0 && (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 rounded-full bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-bold fun-text">{lang === "tr" ? "Canlı Destek Başlatıldı" : "Live Support Started"}</h4>
                    <p className="text-[10px] sm:text-xs md:text-sm fun-text-muted max-w-[280px] mx-auto mt-2 leading-normal">
                      {lang === "tr" ? "Sorunuzu yazın, temsilcimiz hemen yardımcı olacaktır." : "Type your question, our agent will help you immediately."}
                    </p>
                  </div>
                )}
                {(liveSearchQuery ? liveMessages.filter(m => m.text.toLowerCase().includes(liveSearchQuery.toLowerCase())) : liveMessages).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-[var(--fun-purple)] to-[#8E78FF] text-white rounded-tr-none shadow-md" : "bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm"}`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[8px] fun-text-muted mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {liveAgentTyping && (
                  <div className="flex justify-start animate-in fade-in duration-300">
                    <div className="bg-[var(--fun-surface)] fun-text p-3 rounded-2xl rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!userInput.trim() || liveAgentTyping) return;

                  const userMsgText = userInput;
                  setUserInput("");

                  const userMsg = {
                    role: "user" as const,
                    text: userMsgText,
                    id: Math.random().toString(36).substring(2, 9),
                    timestamp: Date.now()
                  };

                  setLiveMessages((prev) => [...prev, userMsg]);
                  setLiveAgentTyping(true);

                  // Call the AI /api/nexy mimicking a live support agent named Can
                  const prompt = `System: Sen Fun Teknoloji şirketinin canlı destek ekibinden Can'sın.
                  Giriş yapan kullanıcının e-postası: ${liveUser?.email}.
                  Giriş yapan kullanıcının adı: ${liveName}.
                  Kullanıcının destek almak istediği konu: ${liveSubject}.
                  Sen bir yapay zeka değilsin, gerçek bir canlı destek temsilcisisin. Doğal, dost canlısı, profesyonel ve çözüm odaklı konuş.
                  Kullanıcının dilinde cevap ver (${lang}).
                  Cevaplarını kısa tut (maksimum 1-2 cümle) ve Pollinations veya başka servislerin adını geçirme, sadece Fun Teknoloji adına yardımcı ol.

                  Konuşma Geçmişi:
                  ${liveMessages.slice(-6).map(m => `${m.role === "user" ? "User" : "Agent Can"}: ${m.text}`).join("\n")}
                  User: ${userMsgText}`;

                  try {
                    const response = await fetch(
                      `/api/nexy/${encodeURIComponent(prompt)}?model=openai&cache=false`
                    );
                    const text = await response.text();
                    const cleanText = text
                      .replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, "")
                      .replace(/Powered by Pollinations\.AI.*/gi, "")
                      .trim();

                    setTimeout(() => {
                      setLiveMessages((prev) => [
                        ...prev,
                        {
                          role: "agent" as const,
                          text: cleanText || (lang === "tr" ? "Size nasıl yardımcı olabilirim?" : "How can I assist you?"),
                          id: Math.random().toString(36).substring(2, 9),
                          timestamp: Date.now()
                        }
                      ]);
                      setLiveAgentTyping(false);
                    }, 1500);
                  } catch (e) {
                    setTimeout(() => {
                      setLiveMessages((prev) => [
                        ...prev,
                        {
                          role: "agent" as const,
                          text: lang === "tr" ? "Bağlantı hatası oluştu, lütfen tekrar deneyin." : "Connection error, please try again.",
                          id: Math.random().toString(36).substring(2, 9),
                          timestamp: Date.now()
                        }
                      ]);
                      setLiveAgentTyping(false);
                    }, 1500);
                  }
                }}
                className="p-4 border-t bg-[var(--fun-surface)]/50 backdrop-blur-xl rounded-b-[32px]"
                style={{ borderColor: "var(--fun-stroke-1)" }}
              >
                <div className={`relative ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={lang === "tr" ? "Mesajınızı yazın..." : "Type your message..."}
                    className="w-full rounded-[20px] bg-[var(--fun-surface)] border-2 border-[var(--fun-stroke-1)] py-3 pl-12 pr-14 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-4 focus:ring-[var(--fun-purple)]/10 transition-all fun-text shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={startListening}
                    className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white scale-110 shadow-lg shadow-red-500/40 animate-pulse" : "fun-text-muted hover:bg-[var(--fun-stroke-1)] hover:text-[var(--fun-purple)]"}`}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={!userInput.trim() || liveAgentTyping}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-purple-500/30 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
            )
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
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className={`p-2 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text ${isMaximized ? "md:hidden" : "hidden"}`}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
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
                      <span
                        className="rounded-full bg-[var(--fun-purple)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-500/20"
                      >
                        {t("nexy.beta_tag")}
                      </span>
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
                    className={`relative group/msg max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-[13px] leading-relaxed ${m.role === "user" ? "bg-gradient-to-br from-[var(--fun-purple)] to-[#8E78FF] text-white rounded-tr-none shadow-xl" : "bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)] shadow-md"}`}
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
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white scale-110 shadow-lg shadow-red-500/40 animate-pulse" : "fun-text-muted hover:bg-[var(--fun-stroke-1)] hover:text-[var(--fun-purple)]"}`}
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!userInput.trim() || isThinking}
                aria-label={t("nexy.aria_send")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-purple-500/30"
              >
                <Send className="h-4 w-4" />
              </button>
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
          <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl backdrop-blur-md">
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
          <div className="sp">
            <button
              className={`sparkle-button ${isOpen ? "active-sparkle" : ""} ${isMinimized ? "opacity-50 pointer-events-none" : ""}`}
              onClick={toggleChat}
              aria-label={t("nexy.aria_help")}
              style={{ "--active": isOpen ? 1 : 0 } as any}
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
