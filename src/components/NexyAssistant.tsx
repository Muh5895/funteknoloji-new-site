import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { toast } from "sonner";
import {
  X,
  Copy,
  Volume2,
  Send,
  ChevronRight,
  ChevronLeft,
  MessageCircleQuestion
} from "lucide-react";

export default function NexyAssistant() {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'nexy' | 'user', text: string, displayedText?: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nexy_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatMessages(parsed.map((m: any) => ({ ...m, displayedText: m.text })));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem("nexy_chat", JSON.stringify(chatMessages.map(({ role, text }) => ({ role, text }))));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const typingIntervalRef = useRef<number | null>(null);

  const typeMessage = (fullText: string, msgIndex: number) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    let currentText = "";
    let charIndex = 0;
    const speed = 30;

    typingIntervalRef.current = window.setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setChatMessages(prev => prev.map((m, i) => i === msgIndex ? { ...m, displayedText: currentText } : m));
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
    if (!isOpen && chatMessages.length === 0) {
      const initialText = t("nexy.msg1");
      setChatMessages([{ role: 'nexy', text: initialText, displayedText: "" }]);
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        typeMessage(initialText, 0);
      }, 1000);
    }
  };

  const getNexyBrainResponse = async (input: string) => {
    const systemPrompt = `Sen Fun Teknoloji şirketinin yapay zeka asistanı Nexy'sin.
    Şirket Hakkında: Fun Teknoloji, yapay zeka, özel yazılım geliştirme ve dijital dönüşüm alanlarında uzmanlaşmış bir teknoloji şirketidir.
    Kurucu: Muhammed Erbay.
    Hizmetler: Web/Mobil Yazılım, Yapay Zeka Entegrasyonu, Dijital Dönüşüm Danışmanlığı.
    Dil: Kullanıcının dilinde (${lang}) cevap ver.
    Tarz: Profesyonel, yardımsever ve samimi ol.
    Kısa ve öz cevaplar ver.`;

    try {
      const response = await fetch('/api/nexy/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input }
          ],
          model: 'openai'
        })
      });

      if (!response.ok) throw new Error();
      const text = await response.text();
      return text;
    } catch (err) {
      // Fallback to static responses if AI fails
      return t("nexy.resp.default.0");
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;
    const userMsg = { role: 'user' as const, text: userInput, displayedText: userInput };
    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    const savedInput = userInput;
    setUserInput("");
    setIsTyping(true);
    setIsThinking(true);

    const response = await getNexyBrainResponse(savedInput);
    const nexyMsgIndex = newMsgs.length;
    setChatMessages([...newMsgs, { role: 'nexy', text: response, displayedText: "" }]);
    setIsThinking(false);
    setIsTyping(true);
    typeMessage(response, nexyMsgIndex);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("nexy.toast.copy"), { description: "Mesaj panoya kopyalandı.", duration: 3000 });
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        tr: "tr-TR", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES", az: "tr-TR",
        ru: "ru-RU", ar: "ar-SA", it: "it-IT", pt: "pt-PT", ja: "ja-JP", zh: "zh-CN"
      };
      ut.lang = langMap[lang] || "tr-TR";
      ut.rate = 1.0;
      ut.pitch = 1.1;
      window.speechSynthesis.speak(ut);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500">
      {!isOpen && !isMinimized && showPopup && (
        <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl backdrop-blur-md">
          <button onClick={() => setShowPopup(false)} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-xs fun-text hover:bg-[var(--fun-stroke-1)] transition-colors shadow-lg">✕</button>
          <p className="text-sm fun-text leading-relaxed font-medium">{t("help.popup")}</p>
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
        </div>
      )}
      {isOpen && (
        <div className="w-[320px] sm:w-[420px] h-[550px] rounded-[32px] bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right">
          <div className="p-5 border-b flex items-center justify-between bg-[var(--fun-surface)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="flex items-center gap-3">
              <img src="/nexy.png" alt="Nexy" className="h-12 w-12 object-contain" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold fun-text">Nexy</p>
                  <button onClick={() => toast.warning(t("nexy.beta_warning"))} className="bg-[var(--fun-purple)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter hover:scale-105 transition-transform">{t("nexy.beta_tag")}</button>
                </div>
                <p className="text-[10px] fun-text-muted font-medium uppercase tracking-widest">{t("nexy.assistant_title")}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"><X className="h-4 w-4" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-dots scroll-smooth">
            {chatMessages.map((m, i) => {
              const isCurrentlyThinking = isThinking && i === chatMessages.length - 1 && m.role === 'nexy';
              return (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`relative group/msg max-w-[85%] p-4 rounded-2xl text-[15px] ${m.role === 'user' ? 'bg-[var(--fun-purple)] text-white rounded-tr-none shadow-lg' : 'bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm'}`}>
                    {isCurrentlyThinking ? <TypingIndicator /> : m.displayedText}
                    {m.role === 'nexy' && m.displayedText === m.text && !isCurrentlyThinking && (
                      <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                        <button onClick={() => copyToClipboard(m.text)} className="h-5 w-5 flex items-center justify-center rounded bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-colors" title={t("nexy.copy_tooltip")}><Copy className="h-3 w-3" /></button>
                        <button onClick={() => speak(m.text)} className="h-5 w-5 flex items-center justify-center rounded bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-colors" title={t("nexy.read_tooltip")}><Volume2 className="h-3 w-3" /></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="relative">
              <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={t("nexy.placeholder")} className="w-full rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-3 pl-4 pr-12 text-sm outline-none focus:border-[var(--fun-purple)] transition-colors fun-text" />
              <button type="submit" disabled={isTyping} aria-label={t("nexy.aria_send")} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </div>
      )}
      <div className={`flex items-center gap-2 transition-all duration-500 ${isMinimized ? 'translate-x-[calc(100%-40px)]' : ''}`}>
        <button onClick={() => setIsMinimized(!isMinimized)} className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text shadow-xl hover:bg-[var(--fun-surface)] transition-all duration-300 ${isOpen ? 'opacity-0 w-0 h-0 overflow-hidden pointer-events-none -mr-2' : 'opacity-100 w-10 h-10'}`}>
          {isMinimized ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
        <button className={`group relative cursor-pointer outline-none border-none bg-transparent p-0 transition-all active:scale-95 ${isMinimized ? 'opacity-50 pointer-events-none' : ''}`} onClick={toggleChat} aria-label={t("nexy.aria_help")}>
          <div className={`relative z-10 flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 ${isOpen ? 'bg-[var(--fun-purple)] text-white shadow-inner' : 'bg-[var(--fun-surface)] border-2 border-[var(--fun-purple)] fun-text hover:scale-105 shadow-xl hover:shadow-[var(--fun-purple)]/20'}`}>
            <MessageCircleQuestion className={`h-7 w-7 ${isOpen ? 'text-white' : 'text-[var(--fun-purple)]'}`} />
            <span className="font-bold text-lg whitespace-nowrap">{t("nexy.help_button")}</span>
          </div>
          <div className="absolute inset-0 bg-[var(--fun-purple)] rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 py-1">
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.2s]" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.4s]" />
    </div>
  );
}
