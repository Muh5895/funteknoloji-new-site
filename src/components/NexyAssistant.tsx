<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import { useLang } from "../lib/i18n";

export default function NexyAssistant() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messageKey, setMessageKey] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'nexy' | 'user', text: string }[]>([]);
  const [userInput, setUserInput] = useState("");

  const messageKeys = ["nexy.msg1", "nexy.msg2", "nexy.msg3", "nexy.msg4", "nexy.msg5"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      if (!isOpen) {
        setIsTyping(true);
        const randomKey = messageKeys[Math.floor(Math.random() * messageKeys.length)];
        setTimeout(() => {
          setMessageKey(randomKey);
          setIsTyping(false);
        }, 1500);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setMessageKey("");
    if (!isOpen && chatMessages.length === 0) {
      setChatMessages([{ role: 'nexy', text: t("nexy.msg1") }]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMsgs = [...chatMessages, { role: 'user' as const, text: userInput }];
    setChatMessages(newMsgs);
    setUserInput("");

    setTimeout(() => {
      setChatMessages([...newMsgs, { role: 'nexy', text: t("nexy.chat.response") || "Size nasıl yardımcı olabilirim? Lütfen bekleme listemize katılın veya iletişim sayfasından bize ulaşın." }]);
    }, 1000);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500">
      {/* Pop-up message when closed */}
      {messageKey && !isOpen && (
        <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl">
          <button onClick={() => setMessageKey("")} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-xs fun-text hover:bg-[var(--fun-stroke-1)] transition-colors">✕</button>
          {isTyping ? <TypingIndicator /> : <p className="text-sm fun-text leading-relaxed">{t(messageKey)}</p>}
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[450px] rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right">
          <div className="p-4 border-b flex items-center justify-between bg-[var(--fun-surface)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="flex items-center gap-3">
              <img src="/nexy.png" alt="Nexy" className="h-10 w-10 object-contain" />
              <div>
                <p className="font-bold fun-text text-sm">Nexy</p>
                <p className="text-[10px] text-green-500 font-medium uppercase tracking-widest">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dots">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[var(--fun-purple)] text-white rounded-tr-none' : 'bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)]'}`}>
                  {m.text}
=======
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useLang } from "../lib/i18n";

export default function NexyAssistant() {
  const { lang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const welcome = lang === "az"
        ? "Salam! Mən Nexy, Fun Teknoloji asistanıyam. Sizə necə kömək edə bilərəm?"
        : lang === "tr"
          ? "Merhaba! Ben Nexy, Fun Teknoloji asistanıyım. Size nasıl yardımcı olabilirim?"
          : "Hello! I am Nexy, the Fun Teknoloji assistant. How can I help you?";
      setMessages([{ role: "bot", text: welcome }]);
    }
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simple "brain"
    setTimeout(() => {
      let reply = "";
      const msg = userMsg.toLowerCase();

      if (msg.includes("merhaba") || msg.includes("selam") || msg.includes("hello") || msg.includes("hi") || msg.includes("salam")) {
        reply = lang === "az" ? "Sizə də salam! Bu gün əla görünürsünüz." : lang === "tr" ? "Size de merhaba! Bugün harika görünüyorsunuz." : "Hello there! You look great today.";
      } else if (msg.includes("fiyat") || msg.includes("ücret") || msg.includes("pricing") || msg.includes("cost") || msg.includes("qiymət")) {
        reply = lang === "az" ? "Qiymətləndirmə səhifəmizdə sizə uyğun planları görə bilərsiniz, lakin hazırda bütün xidmətlərimiz ön baxış mərhələsindədir." : lang === "tr" ? "Fiyatlandırma sayfamızda size uygun planları görebilirsiniz, ancak şu an tüm servislerimiz ön gösterim aşamasındadır." : "You can see suitable plans on our pricing page, but currently all our services are in preview mode.";
      } else if (msg.includes("hizmet") || msg.includes("neler yapıyorsunuz") || msg.includes("services") || msg.includes("what do you do") || msg.includes("xidmət")) {
        reply = lang === "az" ? "Süni intellekt, proqram təminatının hazırlanması və ağıllı sistemlər üzrə mütəxəssisik. Xidmətlər səhifəmizə nəzər salın!" : lang === "tr" ? "Yapay zeka, yazılım geliştirme ve akıllı sistemler üzerine uzmanız. Hizmetler sayfamıza göz atın!" : "We specialize in AI, software development, and smart systems. Check out our services page!";
      } else if (msg.includes("kim") || msg.includes("who")) {
        reply = lang === "az" ? "Mən Nexy, Fun Teknoloji tərəfindən hazırlanmış ağıllı bir asistanam." : lang === "tr" ? "Ben Nexy, Fun Teknoloji tarafından geliştirilen akıllı bir asistanım." : "I am Nexy, a smart assistant developed by Fun Teknoloji.";
      } else {
        reply = lang === "az" ? "Anladım. Bu mövzuda sizə daha çox məlumat verməyim üçün xahiş edirəm bizimlə əlaqə forması vasitəsilə əlaqə saxlayın." : lang === "tr" ? "Anladım. Bu konuda size daha fazla bilgi vermem için lütfen bizimle iletişim formundan ulaşın." : "I see. For more info on this, please reach out via our contact form.";
      }

      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(lang === "az" ? "Kopyalandı!" : lang === "tr" ? "Kopyalandı!" : "Copied!");
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "az" ? "az-AZ" : lang === "tr" ? "tr-TR" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-4 w-[350px] md:w-[450px] h-[500px] md:h-[600px] flex flex-col rounded-3xl border shadow-2xl animate-scale-in origin-bottom-right overflow-hidden"
          style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--fun-stroke-1)', backgroundColor: 'var(--fun-surface)' }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#864FFE] text-white font-bold">N</div>
              <div>
                <p className="text-sm font-semibold fun-text">Nexy AI</p>
                <p className="text-xs fun-text-muted">{lang === "az" ? "Kömək etməyə hazırdır" : lang === "tr" ? "Yardımcı olmaya hazır" : "Ready to help"}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="fun-text-muted hover:fun-text">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 relative group ${m.role === 'user' ? 'bg-[#864FFE] text-white' : 'border fun-text'}`} style={m.role === 'bot' ? { backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)' } : {}}>
                  <p className="text-sm">{m.text}</p>
                  <div className={`mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <button onClick={() => copyToClipboard(m.text)} className="p-1 rounded hover:bg-black/10 transition-colors" title="Copy">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    </button>
                    <button onClick={() => speak(m.text)} className="p-1 rounded hover:bg-black/10 transition-colors" title="Speak">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    </button>
                  </div>
>>>>>>> Stashed changes
                </div>
              </div>
            ))}
          </div>
<<<<<<< Updated upstream
          <form onSubmit={handleSend} className="p-4 border-t" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] py-3 pl-4 pr-12 text-sm outline-none focus:border-[var(--fun-purple)] transition-colors fun-text"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-[var(--fun-purple)] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mascot Trigger */}
      <button
        className="group relative cursor-pointer outline-none border-none bg-transparent p-0"
        onClick={toggleChat}
        aria-label="Nexy asistanı aç"
      >
        <div className="absolute -inset-4 rounded-full bg-[var(--fun-purple)]/10 animate-pulse group-hover:bg-[var(--fun-purple)]/20 pointer-events-none" />
        <img
          src="/nexy.png"
          alt="Nexy"
          className={`h-24 w-auto object-contain transition-all duration-500 relative z-10 ${isOpen ? 'scale-90 brightness-75' : 'hover:scale-110 hover:-rotate-6'}`}
        />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-[var(--color-background)] animate-bounce" />
        )}
=======

          {/* Input */}
          <div className="p-4 border-t" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={lang === "az" ? "Mesaj yazın..." : lang === "tr" ? "Bir mesaj yazın..." : "Write a message..."}
                className="flex-1 bg-transparent border rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-[#864FFE]"
                style={{ borderColor: 'var(--fun-stroke-1)', color: 'var(--fun-text)' }}
              />
              <button onClick={handleSend} className="bg-[#864FFE] text-white p-2 rounded-xl hover:scale-105 transition-transform">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform bg-[#864FFE] text-white"
        aria-label="Nexy AI Assistant"
      >
        <span className="text-2xl font-bold">N</span>
>>>>>>> Stashed changes
      </button>
    </div>
  );
}
<<<<<<< Updated upstream

function TypingIndicator() {
  return (
    <div className="flex gap-1 py-2 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.2s]" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.4s]" />
    </div>
  );
}
=======
>>>>>>> Stashed changes
