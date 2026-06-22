import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { KNOWLEDGE_BASE } from "../lib/knowledge";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  X,
  Copy,
  Volume2,
  Send,
  ChevronRight,
  ChevronLeft,
  Mic,
  Search as SearchIcon,
  Maximize2,
  Minimize2,
  Square,
  Check,
  VolumeX,
} from "lucide-react";

export default function NexyAssistant() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: "nexy" | "user"; text: string; displayedText?: string; copied?: boolean }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nexy_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatMessages(parsed.map((m: any) => ({ ...m, displayedText: m.text })));
      } catch (e) {}
    }

    const handleOpenChat = () => {
      setIsOpen(true);
      setShowPopup(false);
    };
    window.addEventListener("open-nexy-chat", handleOpenChat);
    return () => window.removeEventListener("open-nexy-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem(
        "nexy_chat",
        JSON.stringify(chatMessages.map(({ role, text }) => ({ role, text }))),
      );
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking, isTyping]);

  const typingIntervalRef = useRef<number | null>(null);

  const typeMessage = (fullText: string, msgIndex: number) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    let currentText = "";
    let charIndex = 0;
    const speed = 20;

    typingIntervalRef.current = window.setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setChatMessages((prev) =>
          prev.map((m, i) => (i === msgIndex ? { ...m, displayedText: currentText } : m)),
        );
        charIndex++;
      } else {
        stopTyping();
      }
    }, speed);
  };

  const stopTyping = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setIsTyping(false);
    setIsThinking(false);
  };

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
    if (!isOpen && chatMessages.length === 0) {
      const initialText = t("nexy.msg1");
      setChatMessages([{ role: "nexy", text: initialText, displayedText: "" }]);
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        typeMessage(initialText, 0);
      }, 1000);
    }
  };

  const getNexyBrainResponse = async (input: string) => {
    const history = chatMessages
      .slice(-6)
      .map((m) => ({
        role: m.role === "nexy" ? "assistant" : "user",
        content: m.text,
      }));

    const systemPrompt = `Sen Fun Teknoloji şirketinin yapay zeka asistanı Nexy'sin.
    Bilgi Bankası: ${KNOWLEDGE_BASE}
    Dil: Kullanıcının dilinde (${lang}) cevap ver.
    Tarz: Profesyonel, yardımsever ve samimi ol.
    Önemli: Eğer kullanıcı bir sayfaya gitmek isterse cevabının sonuna [REDIRECT:/sayfa] ekle ve BU REDIRECT'ten önce mutlaka kullanıcıya o sayfaya yönlendirdiğini kendi cümlenle söyle (Örn: Seni fiyatlandırma sayfamıza yönlendiriyorum).
    Markdown Desteği: Tablo, kalın yazı, liste gibi markdown özelliklerini kullanabilirsin.
    Kısa ve öz cevaplar ver.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: input },
    ];

    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          model: "openai",
          stream: false,
          cache: false,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      return text;
    } catch (err) {
      console.error("Nexy API Error:", err);
      return t("nexy.resp.default.0") || "Üzgünüm, şu an cevap veremiyorum.";
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isTyping || isThinking) return;

    if (!navigator.onLine) {
      toast.error(t("error.offline") || "İnternet bağlantınız yok.");
      return;
    }
    const userMsg = { role: "user" as const, text: userInput, displayedText: userInput };
    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    const savedInput = userInput;
    setUserInput("");
    setIsTyping(true);
    setIsThinking(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    let response = await getNexyBrainResponse(savedInput);

    // If typing was stopped manually while fetching
    if (!isThinking && !isTyping) return;

    // Check for REDIRECT command
    const redirectMatch = response.match(/\[REDIRECT:(.+)\]/);
    if (redirectMatch) {
      const path = redirectMatch[1];
      response = response.replace(/\[REDIRECT:.+\]/, "").trim();

      setTimeout(() => {
        navigate({ to: path as any });
      }, 2500);
    }

    const nexyMsgIndex = newMsgs.length;
    setChatMessages([...newMsgs, { role: "nexy", text: response, displayedText: "" }]);
    setIsThinking(false);
    setIsTyping(true);
    typeMessage(response, nexyMsgIndex);
  };

  const startListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Tarayıcınız ses tanımayı desteklemiyor.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = lang === "tr" ? "tr-TR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setUserInput((prev) => {
          const trimmedPrev = prev.trim();
          const trimmedFinal = finalTranscript.trim();
          if (trimmedPrev.toLowerCase().endsWith(trimmedFinal.toLowerCase())) return prev;
          return prev + (prev ? " " : "") + trimmedFinal;
        });
      }
    };

    try {
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setChatMessages((prev) => prev.map((m, i) => (i === index ? { ...m, copied: true } : m)));
    toast.success(t("nexy.toast.copy") || "Kopyalandı!", { duration: 2000 });
    setTimeout(() => {
      setChatMessages((prev) => prev.map((m, i) => (i === index ? { ...m, copied: false } : m)));
    }, 2000);
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
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
      ut.onstart = () => setIsSpeaking(true);
      ut.onend = () => setIsSpeaking(false);
      ut.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(ut);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!visible) return null;

  const filteredMessages = chatMessages.filter((m) =>
    m.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={`fixed z-[100] flex flex-col animate-in slide-in-from-right-10 duration-500 transition-all ${isFullscreen ? "inset-0 p-0 sm:p-4 lg:p-8 items-stretch" : "bottom-6 right-6 items-end gap-4"}`}
    >
      {!isOpen && !isMinimized && showPopup && (
        <div className="relative max-w-[320px] rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-6 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 text-center group">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-sm fun-text hover:bg-red-500 hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm fun-text leading-relaxed font-semibold">
            {t("help.popup")}
          </p>
          <div className="absolute -bottom-2 right-12 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
        </div>
      )}
      {isOpen && (
        <div
          className={`bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 transition-all ${isFullscreen ? "w-full h-full rounded-[0px] sm:rounded-[32px]" : "w-[320px] sm:w-[420px] h-[550px] rounded-[32px] origin-bottom-right"}`}
        >
          <div
            className="p-5 border-b flex items-center justify-between bg-[var(--fun-surface)]"
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/nexy.png"
                  alt="Nexy"
                  className="h-16 w-16 object-contain transition-transform hover:scale-110"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold fun-text text-lg">Nexy</p>
                  <button
                    onClick={() => toast.warning(t("nexy.beta_warning"))}
                    className="bg-[var(--fun-purple)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter hover:scale-105 transition-transform"
                  >
                    {t("nexy.beta_tag")}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
                title={isFullscreen ? "Küçült" : "Büyült"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
              >
                <SearchIcon className="h-4 w-4" />
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
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 fun-text-muted" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === "tr" ? "Mesajlarda ara..." : "Search messages..."}
                  className="w-full bg-[var(--fun-card)] rounded-xl py-2 pl-9 pr-4 text-xs fun-text outline-none border border-[var(--fun-stroke-1)] focus:border-[var(--fun-purple)]"
                />
              </div>
            </div>
          )}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-8 bg-dots scroll-smooth custom-scrollbar"
          >
            {(searchQuery ? filteredMessages : chatMessages).map((m, i) => {
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`relative group/msg max-w-[90%] p-5 rounded-2xl text-[15px] leading-relaxed ${m.role === "user" ? "bg-[var(--fun-purple)] text-white rounded-tr-none shadow-lg" : "bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm"}`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[var(--fun-card)] prose-pre:border prose-pre:border-[var(--fun-stroke-1)]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.displayedText || ""}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {m.role === "nexy" && m.displayedText === m.text && (
                    <div className="flex items-center gap-3 px-1">
                      <button
                        onClick={() => copyToClipboard(m.text, i)}
                        className={`flex items-center justify-center h-10 w-10 rounded-xl border border-[var(--fun-stroke-1)] transition-all ${m.copied ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20" : "bg-[var(--fun-surface)] fun-text hover:bg-[var(--fun-purple)] hover:text-white"}`}
                        title={lang === "tr" ? "Kopyala" : "Copy"}
                      >
                        {m.copied ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => speak(m.text)}
                        className={`flex items-center justify-center h-10 w-10 rounded-xl border border-[var(--fun-stroke-1)] transition-all bg-[var(--fun-surface)] fun-text hover:bg-[var(--fun-purple)] hover:text-white`}
                        title={isSpeaking ? (lang === "tr" ? "Durdur" : "Stop") : (lang === "tr" ? "Dinle" : "Listen")}
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {isThinking && (
              <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                <div
                  className="bg-[var(--fun-surface)] fun-text p-6 rounded-2xl rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm flex items-center justify-center transition-all duration-300"
                  style={{ minHeight: "80px" }}
                >
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
          <div
            className="p-4 border-t bg-[var(--fun-surface)]/50 backdrop-blur-sm"
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <div className="relative group">
              <textarea
                ref={textareaRef}
                rows={1}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("nexy.placeholder")}
                className="w-full rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] py-3.5 pl-12 pr-14 text-sm outline-none focus:border-[var(--fun-purple)] focus:ring-4 focus:ring-[var(--fun-purple)]/5 transition-all fun-text resize-none max-h-32 custom-scrollbar"
                style={{ height: "auto" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <div className="absolute left-2 bottom-2">
                <button
                  type="button"
                  onClick={startListening}
                  className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white shadow-lg shadow-red-500/20 pulse-animation" : "fun-text-muted hover:bg-[var(--fun-stroke-1)] hover:text-[var(--fun-purple)]"}`}
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute right-2 bottom-2">
                {isTyping || isThinking ? (
                  <button
                    onClick={stopTyping}
                    className="h-9 w-9 rounded-xl bg-red-500 text-white flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-red-500/20 transform active:scale-95"
                    title={lang === "tr" ? "Durdur" : "Stop"}
                  >
                    <Square className="h-4 w-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSend()}
                    disabled={!userInput.trim()}
                    className="h-9 w-9 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-30 disabled:grayscale transform active:scale-95 shadow-lg shadow-[var(--fun-purple)]/20"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-[10px] text-center fun-text-muted opacity-50 mt-3 font-medium">
              {t("nexy.disclaimer")}
            </p>
          </div>
        </div>
      )}
      <div
        className={`flex items-center gap-2 transition-all duration-500 ${isMinimized ? "translate-x-[calc(100%-40px)]" : ""}`}
      >
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text shadow-xl hover:bg-[var(--fun-surface)] transition-all duration-300 ${isOpen ? "opacity-0 w-0 h-0 overflow-hidden pointer-events-none -mr-2" : "opacity-100 w-10 h-10"}`}
        >
          {isMinimized ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
        <div className="sp">
          <button
            className={`sparkle-button ${isOpen ? "--active: 1" : ""} ${isMinimized ? "opacity-50 pointer-events-none" : ""}`}
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
                fill="black"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                fill="black"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                fill="black"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
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
  );
}

function TypingIndicator() {
  return (
    <div className="loader scale-150">
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
