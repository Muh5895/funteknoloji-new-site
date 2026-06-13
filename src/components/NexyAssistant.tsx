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
                </div>
              </div>
            ))}
          </div>
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
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 py-2 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.2s]" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.4s]" />
    </div>
  );
}
