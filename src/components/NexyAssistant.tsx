import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { askNexy } from "../lib/engine";
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
  MessageCircleQuestion,
  Mic,
  Square,
  Maximize2,
  Minimize2,
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
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { role: "nexy" | "user"; text: string; displayedText?: string }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const stopBotRef = useRef(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowPopup(false);
    };
    window.addEventListener("open-nexy-chat", handleOpen);
    return () => window.removeEventListener("open-nexy-chat", handleOpen);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("nexy_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatMessages(
          parsed.map((m: { role: "nexy" | "user"; text: string }) => ({
            ...m,
            displayedText: m.text,
          })),
        );
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }

    // Initialize Speech Recognition
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any })
        .webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition() as SpeechRecognition;
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

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
      recognitionRef.current.lang = langMap[lang] || "tr-TR";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          // Avoid duplicate words by simple check (could be more advanced)
          setUserInput((prev) => {
            const lastWord = prev.trim().split(" ").pop();
            const firstWordNew = finalTranscript.trim().split(" ")[0];
            if (lastWord === firstWordNew) {
              return prev + " " + finalTranscript.trim().split(" ").slice(1).join(" ");
            }
            return prev + (prev ? " " : "") + finalTranscript.trim();
          });
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [lang]);

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
  }, [chatMessages, isThinking]);

  const typingIntervalRef = useRef<number | null>(null);

  const typeMessage = (fullText: string, msgIndex: number) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    stopBotRef.current = false;

    let currentText = "";
    let charIndex = 0;
    const speed = 25;

    typingIntervalRef.current = window.setInterval(() => {
      if (stopBotRef.current) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setChatMessages((prev) =>
          prev.map((m, i) =>
            i === msgIndex ? { ...m, text: currentText, displayedText: currentText } : m,
          ),
        );
        return;
      }

      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setChatMessages((prev) =>
          prev.map((m, i) => (i === msgIndex ? { ...m, displayedText: currentText } : m)),
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
      window.speechSynthesis.cancel();
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
    try {
      const response = await askNexy({ input, lang });
      return response;
    } catch (err) {
      return t("nexy.resp.default.0");
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isTyping || isThinking) return;

    const userMsg = { role: "user" as const, text: userInput, displayedText: userInput };
    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    const savedInput = userInput;
    setUserInput("");
    setIsTyping(true);
    setIsThinking(true);
    stopBotRef.current = false;

    let response = await getNexyBrainResponse(savedInput);

    if (stopBotRef.current) {
      setIsThinking(false);
      setIsTyping(false);
      return;
    }

    const redirectMatch = response.match(/\[REDIRECT:(.+)\]/);
    if (redirectMatch) {
      const path = redirectMatch[1];
      response = response.replace(/\[REDIRECT:.+\]/, "").trim();
      const redirectMsg = t("nexy.redirect_msg") || "Tamamdır, seni hemen yönlendiriyorum...";
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { role: "nexy", text: redirectMsg, displayedText: redirectMsg },
        ]);
        setTimeout(() => {
          navigate({ to: path as any });
        }, 1500);
      }, 500);
    }

    const nexyMsgIndex = newMsgs.length;
    setChatMessages([...newMsgs, { role: "nexy", text: response, displayedText: "" }]);
    setIsThinking(false);
    setIsTyping(true);
    typeMessage(response, nexyMsgIndex);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(t("nexy.toast.copy"), { duration: 2000 });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speak = (text: string, id: number) => {
    if ("speechSynthesis" in window) {
      if (isReading === id) {
        window.speechSynthesis.cancel();
        setIsReading(null);
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
      ut.onstart = () => setIsReading(id);
      ut.onend = () => setIsReading(null);
      window.speechSynthesis.speak(ut);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      toast.error("Tarayıcınız ses tanımayı desteklemiyor.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const stopBot = () => {
    stopBotRef.current = true;
    setIsTyping(false);
    setIsThinking(false);
    window.speechSynthesis.cancel();
    setIsReading(null);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500 ${isFullscreen ? "inset-0 p-4 sm:p-6" : "bottom-6 right-6"}`}
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
      {isOpen && (
        <div
          className={`rounded-[32px] bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right transition-all ${isFullscreen ? "w-full h-full" : "w-[320px] sm:w-[420px] h-[550px]"}`}
        >
          <div
            className="p-4 sm:p-5 border-b flex items-center justify-between bg-[var(--fun-surface)]"
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--fun-purple)]/10 rounded-xl blur-lg animate-pulse" />
                <img
                  src="/nexy.png"
                  alt="Nexy"
                  className="h-14 w-14 object-contain relative z-10 transition-transform hover:scale-110"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold fun-text">Nexy</p>
                  <button
                    onClick={() => toast.warning(t("nexy.beta_warning"))}
                    className="bg-[var(--fun-purple)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter hover:scale-105 transition-transform"
                  >
                    {t("nexy.beta_tag")}
                  </button>
                </div>
                <p className="text-[10px] fun-text-muted font-medium uppercase tracking-widest">
                  {t("nexy.assistant_title")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
              >
                {isFullscreen ? (
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
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 bg-dots scroll-smooth custom-scrollbar"
          >
            {chatMessages.map((m, i) => {
              return (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex flex-col gap-2 max-w-[90%] sm:max-w-[85%]">
                    <div
                      className={`relative group/msg p-4 rounded-2xl text-[15px] ${m.role === "user" ? "bg-[var(--fun-purple)] text-white rounded-tr-none shadow-lg" : "bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm"}`}
                    >
                      <div className="markdown-content prose prose-sm max-w-none prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:p-3 prose-pre:rounded-xl">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.displayedText || ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                    {m.role === "nexy" && m.displayedText === m.text && (
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <button
                          onClick={() => copyToClipboard(m.text, i)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${copiedId === i ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-[var(--fun-surface)] fun-text-muted border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] hover:text-[var(--fun-purple)]"}`}
                        >
                          {copiedId === i ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          {copiedId === i ? "Kopyalandı" : t("nexy.copy_tooltip")}
                        </button>
                        <button
                          onClick={() => speak(m.text, i)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${isReading === i ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-[var(--fun-surface)] fun-text-muted border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] hover:text-[var(--fun-purple)]"}`}
                        >
                          {isReading === i ? (
                            <VolumeX className="h-3 w-3" />
                          ) : (
                            <Volume2 className="h-3 w-3" />
                          )}
                          {isReading === i ? "Durdur" : t("nexy.read_tooltip")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-[var(--fun-surface)] fun-text p-4 rounded-2xl rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm w-fit overflow-hidden animate-in fade-in zoom-in-95">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
          <div
            className="p-4 border-t bg-[var(--fun-surface)]/50"
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <div className="relative flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("nexy.placeholder")}
                  rows={1}
                  className="w-full max-h-32 rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] py-3 pl-4 pr-12 text-sm outline-none focus:border-[var(--fun-purple)] transition-all fun-text resize-none custom-scrollbar"
                  style={{ height: userInput.split("\n").length > 1 ? "auto" : "46px" }}
                />
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`absolute right-2 bottom-1.5 h-8 w-8 rounded-xl flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-[var(--fun-surface)] fun-text-muted hover:text-[var(--fun-purple)]"}`}
                >
                  {isListening ? (
                    <Square className="h-4 w-4 fill-current" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </button>
              </div>
              <button
                onClick={isTyping || isThinking ? stopBot : () => handleSend()}
                aria-label={t("nexy.aria_send")}
                className={`h-11 w-11 rounded-2xl flex items-center justify-center transition-all shadow-lg shrink-0 ${isTyping || isThinking ? "bg-red-500 text-white hover:bg-red-600" : "bg-[var(--fun-purple)] text-white hover:opacity-90 disabled:opacity-50"}`}
              >
                {isTyping || isThinking ? (
                  <Square className="h-5 w-5 fill-current" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`flex items-center gap-2 transition-all duration-500 ${isMinimized ? "translate-x-[calc(100%-40px)]" : ""}`}
      >
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[var(--fun-stroke-1)] text-slate-900 shadow-xl hover:bg-slate-50 transition-all duration-300 ${isOpen ? "opacity-0 w-0 h-0 overflow-hidden pointer-events-none -mr-2" : "opacity-100 w-10 h-10"}`}
        >
          {isMinimized ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
        <button
          className={`group relative cursor-pointer outline-none border-none bg-transparent p-0 transition-all active:scale-95 ${isMinimized ? "opacity-50 pointer-events-none" : ""}`}
          onClick={toggleChat}
          aria-label={t("nexy.aria_help")}
        >
          <div
            className={`relative z-10 flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 ${isOpen ? "bg-[var(--fun-purple)] text-white shadow-inner" : "bg-white border-2 border-[var(--fun-purple)] text-[var(--fun-purple)] hover:scale-105 shadow-xl hover:shadow-[var(--fun-purple)]/20"}`}
          >
            <MessageCircleQuestion
              className={`h-7 w-7 ${isOpen ? "text-white" : "text-[var(--fun-purple)]"}`}
            />
            <span className="font-bold text-lg whitespace-nowrap">{t("nexy.help_button")}</span>
          </div>
          <div className="absolute inset-0 bg-[var(--fun-purple)] rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

function TypingIndicator() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const states =
    lang === "tr"
      ? ["Düşünüyor...", "Veriler inceleniyor...", "Cevap hazırlanıyor..."]
      : ["Thinking...", "Analyzing data...", "Preparing response..."];

  useEffect(() => {
    const itv = setInterval(() => setStep((s) => (s + 1) % states.length), 2000);
    return () => clearInterval(itv);
  }, [states.length]);

  return (
    <div className="flex flex-col gap-3 min-w-[160px]">
      <div className="flex gap-1.5 items-center">
        <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)] animate-bounce shadow-[0_0_8px_var(--fun-purple)]" />
        <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.2s] shadow-[0_0_8px_var(--fun-purple)]" />
        <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.4s] shadow-[0_0_8px_var(--fun-purple)]" />
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wider animate-pulse opacity-70">
        {states[step]}
      </p>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full bg-[var(--fun-stroke-1)] rounded-full animate-pulse" />
        <div className="h-1.5 w-5/6 bg-[var(--fun-stroke-1)] rounded-full animate-pulse [animation-delay:0.2s]" />
      </div>
    </div>
  );
}
