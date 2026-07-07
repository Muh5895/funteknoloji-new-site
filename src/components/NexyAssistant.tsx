import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { KNOWLEDGE_BASE } from "../lib/knowledge";
import { toast } from "sonner";
import {
  X,
  Copy,
  Volume2,
  Send,
  ChevronRight,
  ChevronLeft,
  Mic,
  Maximize2,
  Minimize2,
  Search as SearchIcon
} from "lucide-react";

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'nexy' | 'user', text: string, displayedText?: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
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
    const history = chatMessages.slice(-6).map(m => `${m.role === 'nexy' ? 'Assistant' : 'User'}: ${m.text}`).join('\n');
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
      const response = await fetch(`/api/nexy/${encodeURIComponent(prompt)}?model=openai&cache=false`);
      if (!response.ok) throw new Error();
      let text = await response.text();

      // Filter out Pollinations ads
      text = text.replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, '');
      text = text.replace(/🌸[\s\S]*?Ad[\s\S]*?🌸/gi, '');
      text = text.replace(/Powered by Pollinations\.AI[\s\S]*?accessible for everyone\./gi, '');
      text = text.replace(/\[Support our mission\]\(https:\/\/pollinations\.ai\/redirect\/kofi\)/gi, '');

      return text.trim();
    } catch (err) {
      return t("nexy.resp.default.0");
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    if (!navigator.onLine) {
      toast.error(t("error.offline") || "İnternet bağlantınız yok.");
      return;
    }
    const userMsg = { role: 'user' as const, text: userInput, displayedText: userInput };
    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    const savedInput = userInput;
    setUserInput("");
    setIsTyping(true);
    setIsThinking(true);

    let response = await getNexyBrainResponse(savedInput);

    // Check for REDIRECT command
    const redirectMatch = response.match(/\[REDIRECT:(.+)\]/);
    if (redirectMatch) {
      const path = redirectMatch[1];
      response = response.replace(/\[REDIRECT:.+\]/, '').trim();

      setTimeout(() => {
        navigate({ to: path as any });
      }, 2500);
    }

    const nexyMsgIndex = newMsgs.length;
    setChatMessages([...newMsgs, { role: 'nexy', text: response, displayedText: "" }]);
    setIsThinking(false);
    setIsTyping(true);
    typeMessage(response, nexyMsgIndex);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error(lang === 'tr' ? "Tarayıcınız ses tanımayı desteklemiyor." : "Your browser does not support speech recognition.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = lang === 'tr' ? 'tr-TR' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info(lang === 'tr' ? "Sizi dinliyorum..." : "Listening...");
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast.error(lang === 'tr' ? "Ses algılanamadı." : "Speech not detected.");
    };
    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(prev => prev + (prev ? " " : "") + transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("nexy.toast.copy"), { description: "Mesaj panoya kopyalandı.", duration: 3000 });
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        tr: "tr-TR", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES", az: "tr-TR",
        ru: "ru-RU", ar: "ar-SA", it: "it-IT", pt: "pt-PT", ja: "ja-JP", zh: "zh-CN"
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

  if (!visible) return null;

  const formatText = (text: string) => {
    const lines = text.split('\n');
    const result: React.ReactNode[] = [];
    let currentTable: string[][] = [];
    let inTable = false;

    const processLine = (line: string, key: string | number) => {
      let parts = line.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, pi) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${key}-${pi}`} className="font-extrabold">{part.slice(2, -2)}</strong>;
        }
        let italicParts = part.split(/(\*.*?\*)/g);
        return italicParts.map((iPart, ji) => {
          if (iPart.startsWith('*') && iPart.endsWith('*')) {
            return <em key={`${key}-${pi}-${ji}`} className="italic opacity-90">{iPart.slice(1, -1)}</em>;
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
        <div key={`table-wrapper-${tableKey}`} className="overflow-x-auto my-3 border rounded-xl border-[var(--fun-stroke-1)] bg-[var(--fun-card)] shadow-sm">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[var(--fun-surface)] text-[var(--fun-purple)] font-bold">
              <tr>
                {headers.map((cell, idx) => (
                  <th key={idx} className="p-2.5 border-b border-[var(--fun-stroke-1)] whitespace-nowrap">{processLine(cell, `th-${idx}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-[var(--fun-surface)]/50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-2.5 border-t border-[var(--fun-stroke-1)]">{processLine(cell, `td-${rowIdx}-${cellIdx}`)}</td>
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

      if (line.startsWith('|') && line.includes('|')) {
        const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());

        if (cells.every(c => c.match(/^[ \-:]+$/))) {
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
        if (line || lines[i] === '') {
          result.push(<p key={i} className={lines[i] === '' ? 'h-2' : 'mb-1 leading-relaxed'}>{processLine(lines[i], i)}</p>);
        }
      }
    }

    if (inTable) {
      result.push(renderTable(currentTable, 'end'));
    }

    return result;
  };

  const filteredMessages = chatMessages.filter(m =>
    m.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500 transition-transform ${isThinking ? '-translate-y-4' : 'translate-y-0'}`}>
      {!isOpen && !isMinimized && showPopup && (
        <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl backdrop-blur-md">
          <button onClick={() => setShowPopup(false)} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-xs fun-text hover:bg-[var(--fun-stroke-1)] transition-colors shadow-lg">✕</button>
          <p className="text-sm fun-text leading-relaxed font-medium">{t("help.popup")}</p>
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
        </div>
      )}
      {isOpen && (
        <div className={`${isMaximized ? 'fixed inset-4 w-auto h-auto z-[100]' : 'w-[320px] sm:w-[420px] h-[550px]'} rounded-[32px] bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right transition-all`}>
          <div className="p-5 border-b flex items-center justify-between bg-[var(--fun-surface)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="flex flex-1 items-center justify-center gap-4 ml-8">
              <img src="/nexy-kafa.png" alt="Nexy" className="h-14 w-14 sm:h-20 sm:w-20 object-contain" />
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <p className="font-bold fun-text text-xl sm:text-2xl">Nexy</p>
                  <button onClick={() => toast.warning(t("nexy.beta_warning"))} className="bg-[var(--fun-purple)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter hover:scale-105 transition-transform">{t("nexy.beta_tag")}</button>
                </div>
                <p className="text-[10px] text-[var(--fun-purple)] font-medium tracking-widest uppercase">{t("nexy.status.active")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowSearch(!showSearch)} className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"><SearchIcon className="h-4 w-4" /></button>
              <button onClick={() => setIsMaximized(!isMaximized)} className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors">
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"><X className="h-4 w-4" /></button>
            </div>
          </div>
          {showSearch && (
            <div className="px-5 py-3 border-b border-[var(--fun-stroke-1)] bg-[var(--fun-surface)] animate-in slide-in-from-top-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'tr' ? "Mesajlarda ara..." : "Search messages..."}
                className="w-full bg-transparent text-xs fun-text outline-none"
              />
            </div>
          )}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-dots scroll-smooth">
            {(searchQuery ? filteredMessages : chatMessages).map((m, i) => {
              return (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`relative group/msg max-w-[85%] p-4 rounded-2xl text-[15px] ${m.role === 'user' ? 'bg-[var(--fun-purple)] text-white rounded-tr-none shadow-lg' : 'bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)] shadow-sm'}`}>
                    {formatText(m.displayedText || "")}
                    {m.role === 'nexy' && m.displayedText === m.text && (
                      <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col gap-1 opacity-100 lg:opacity-0 lg:group-hover/msg:opacity-100 transition-opacity">
                        <button onClick={() => copyToClipboard(m.text)} className="h-7 w-7 sm:h-5 sm:w-5 flex items-center justify-center rounded bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-colors shadow-sm" title={t("nexy.copy_tooltip")}><Copy className="h-4 w-4 sm:h-3 sm:w-3" /></button>
                        <button onClick={() => speak(m.text)} className={`h-7 w-7 sm:h-5 sm:w-5 flex items-center justify-center rounded border border-[var(--fun-stroke-1)] transition-colors shadow-sm ${isSpeaking ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[var(--fun-card)] fun-text hover:bg-[var(--fun-purple)] hover:text-white'}`} title={isSpeaking ? "Durdur" : t("nexy.read_tooltip")}>
                          {isSpeaking ? <X className="h-4 w-4 sm:h-3 sm:w-3" /> : <Volume2 className="h-4 w-4 sm:h-3 sm:w-3" />}
                        </button>
                      </div>
                    )}
                  </div>
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
          <form onSubmit={handleSend} className="p-4 border-t space-y-2" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="relative">
              <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={t("nexy.placeholder")} className="w-full rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-3 pl-10 pr-12 text-sm outline-none focus:border-[var(--fun-purple)] transition-colors fun-text" />
              <button type="button" onClick={startListening} className={`absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full flex items-center justify-center transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'fun-text-muted hover:bg-[var(--fun-stroke-1)]'}`}>
                <Mic className="h-4 w-4" />
              </button>
              <button type="submit" disabled={isTyping} aria-label={t("nexy.aria_send")} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"><Send className="h-4 w-4" /></button>
            </div>
            <p className="text-[10px] text-center fun-text-muted opacity-60 px-2">{t("nexy.disclaimer")}</p>
          </form>
        </div>
      )}
      <div className={`flex items-center gap-2 transition-all duration-500 ${isMinimized ? 'translate-x-[calc(100%-40px)]' : ''}`}>
        <button onClick={() => setIsMinimized(!isMinimized)} className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text shadow-xl hover:bg-[var(--fun-surface)] transition-all duration-300 ${isOpen ? 'opacity-0 w-0 h-0 overflow-hidden pointer-events-none -mr-2' : 'opacity-100 w-10 h-10'}`}>
          {isMinimized ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
        <div className="sp">
          <button
            className={`sparkle-button ${isOpen ? '--active: 1' : ''} ${isMinimized ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={toggleChat}
            aria-label={t("nexy.aria_help")}
            style={isOpen ? { '--active': 1 } as any : {}}
          >
            <span className="spark"></span>
            <span className="backdrop"></span>
            <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span className="sparkle-text font-bold">{t("nexy.help_button")}</span>
          </button>
          <div className="particle-pen">
            {[...Array(20)].map((_, i) => (
              <svg key={i} className="particle" viewBox="0 0 15 15" fill="none" style={{
                '--x': Math.random() * 100,
                '--y': Math.random() * 100,
                '--size': Math.random() * 0.5 + 0.1,
                '--duration': Math.random() * 3 + 2,
                '--delay': Math.random() * 5
              } as any}>
                <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="currentColor"></path>
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
    <div className="loader">
      <svg
        id="pegtopone"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g>
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
        </g>
      </svg>
      <svg
        id="pegtoptwo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g>
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
        </g>
      </svg>
      <svg
        id="pegtopthree"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <g>
          <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor"></path>
        </g>
      </svg>
    </div>
  );
}
