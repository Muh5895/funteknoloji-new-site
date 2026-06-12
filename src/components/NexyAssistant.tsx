import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { X, Send, Bot } from "lucide-react";

export default function NexyAssistant() {
  const { t, lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t("asistan.merhaba") }]);
    }
  }, [lang, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages as any);
    setInputValue("");

    // Simulate Nexy response
    setTimeout(() => {
      const responses = [
        "Size nasıl yardımcı olabilirim?",
        "Hizmetlerimiz hakkında bilgi almak ister misiniz?",
        "Projeleriniz için buradayız!",
        "Harika bir soru! Ekibimiz size en kısa sürede dönüş yapacaktır.",
        "Fun Teknoloji ile geleceği inşa ediyoruz."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-48px)] overflow-hidden rounded-3xl border shadow-2xl animate-scale-in origin-bottom-right flex flex-col" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
          <div className="flex items-center justify-between p-4 border-b shrink-0" style={{ borderColor: 'var(--fun-stroke-1)', backgroundColor: 'var(--fun-surface)' }}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#864FFE] flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
              <div>
                <p className="text-sm font-bold fun-text">Nexy</p>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[10px] fun-text-muted">Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="fun-text-muted hover:fun-text transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4 flex flex-col scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl p-3 text-sm animate-fade-in ${m.role === 'assistant' ? 'bg-[var(--fun-surface)] fun-text self-start rounded-tl-none' : 'bg-[#864FFE] text-white self-end rounded-tr-none'}`}>
                {m.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t shrink-0" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t("asistan.chat.placeholder")}
                className="flex-1 bg-[var(--fun-surface)] border-none rounded-full px-4 py-2 text-sm focus:outline-none fun-text"
              />
              <button onClick={handleSend} className="h-9 w-9 rounded-full bg-[#864FFE] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0 cursor-pointer">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assistant Button - Mascot version */}
      <div className="relative group flex items-center justify-center">
        {!isOpen && (
           <div className="absolute bottom-full right-0 mb-4 bg-[var(--fun-card)] px-4 py-2 rounded-2xl shadow-lg border border-[var(--fun-stroke-1)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             <p className="text-xs font-medium fun-text">{t("asistan.merhaba")}</p>
             <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)] rotate-45"></div>
           </div>
        )}

        {/* The character Nexy peeking from the side */}
        {!isOpen && (
           <div className="absolute right-full mr-2 bottom-0 h-16 w-16 pointer-events-none transition-transform group-hover:-translate-y-1">
              <div className="relative h-full w-full">
                 <div className="absolute bottom-0 left-0 h-14 w-14 bg-[var(--fun-green)] rounded-full border-2 border-[var(--fun-stroke-1)] shadow-md flex items-center justify-center overflow-hidden">
                    <div className="flex gap-1.5 translate-y-[-2px]">
                       <div className="h-1.5 w-1.5 bg-[#12161F] rounded-full"></div>
                       <div className="h-1.5 w-1.5 bg-[#12161F] rounded-full"></div>
                    </div>
                    <div className="absolute bottom-3 w-4 h-2 border-b-2 border-[#12161F] rounded-full"></div>
                 </div>
                 <div className="absolute top-1 right-1 h-5 w-5 bg-[#864FFE] rounded-full border-2 border-white shadow-sm flex items-center justify-center animate-bounce-slow">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                 </div>
              </div>
           </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-[#864FFE] text-white shadow-xl hover:scale-110 transition-transform relative z-10 cursor-pointer"
        >
          {isOpen ? <X size={28} /> : <Bot size={28} />}
        </button>
      </div>
    </div>
  );
}
