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
                </div>
              </div>
            ))}
          </div>

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
      </button>
    </div>
  );
}
