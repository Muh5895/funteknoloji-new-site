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
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageKey, setMessageKey] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'nexy' | 'user', text: string, displayedText?: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nexy_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure displayedText matches text for historical messages
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      if (!isOpen) {
        setMessageKey("Merhaba! Ben Nexy, Fun Teknoloji asistanıyım. Size nasıl yardımcı olabilirim?");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const typeMessage = (fullText: string, msgIndex: number) => {
    let currentText = "";
    let charIndex = 0;
    const speed = 30; // ms per character

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setChatMessages(prev => prev.map((m, i) => i === msgIndex ? { ...m, displayedText: currentText } : m));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setMessageKey("");
    if (!isOpen && chatMessages.length === 0) {
      const initialText = "Merhaba! Ben Nexy, Fun Teknoloji asistanıyım. Size nasıl yardımcı olabilirim?";
      setChatMessages([{ role: 'nexy', text: initialText, displayedText: "" }]);
      setIsTyping(true);
      setTimeout(() => typeMessage(initialText, 0), 500);
    }
  };

  const getNexyBrainResponse = (input: string) => {
    const text = input.toLowerCase();
    const responses = {
      pricing: [
        "Fiyatlandırma politikalarımız üzerinde çalışıyoruz. En güncel paketler için Fiyatlandırma sayfamızı takip edebilirsiniz. Şu an için bekleme listemize katılmak en iyi seçenek!",
        "Şu an için tüm hizmetlerimiz için size özel teklif sunuyoruz, detaylar yakında sayfalarımızda olacak. Genelde proje bazlı fiyatlandırma yapıyoruz.",
        "Paketlerimiz güncelleniyor. Fun Teknoloji olarak her bütçeye uygun teknoloji çözümleri üretmeyi hedefliyoruz."
      ],
      services: [
        "Yapay zeka entegrasyonu, özel yazılım geliştirme, mobil uygulama ve siber güvenlik alanlarında profesyonel çözümler sunuyoruz. Hangi alanla ilgileniyorsunuz?",
        "Dijital dönüşüm yolculuğunuzda size en modern teknoloji yığını ile eşlik ediyoruz. React, Next.js, AI modelleri ve daha fazlasını kullanıyoruz.",
        "İş süreçlerinizi otomatize edecek yapay zeka çözümlerimiz hakkında detaylı bilgi için Hizmetler sayfamıza bakabilirsiniz. Verimliliğinizi %40'a kadar artırabiliriz."
      ],
      founder: [
        "Fun Teknoloji, Muhammed Erbay tarafından 2025 yılında vizyoner bir teknoloji şirketi olarak kurulmuştur.",
        "Kurucumuz Muhammed Erbay, teknolojiyi herkes için erişilebilir ve faydalı kılma vizyonuyla bu yola çıktı. Kendisi genç ve hırslı bir girişimcidir.",
        "2025'te Muhammed Erbay liderliğinde kurulan Fun Teknoloji, Türkiye'nin dijital geleceğine odaklanıyor. Muhammed Bey bizzat projelerin mimarisini denetliyor."
      ],
      contact: [
        "Bize iletişim sayfasındaki formdan veya support@funteknoloji.com adresinden ulaşabilirsiniz! 7/24 destek veriyoruz.",
        "Sorularınız için her zaman buradayız, iletişim kısmından bize yazmaktan çekinmeyin. Ayrıca Discord kanalımızda çok aktif bir topluluğumuz var.",
        "Discord topluluğumuza katılarak da ekibimizle doğrudan iletişime geçebilirsiniz. Linki İletişim sayfasında bulabilirsiniz."
      ],
      about: [
        "Fun Teknoloji, teknolojiyi 'eğlenceli' ve 'faydalı' kılmak için kuruldu. Yapay zeka ve yazılım bizim tutkumuz.",
        "Misyonumuz, işletmeleri geleceğin teknolojileriyle bugünden tanıştırmak. Vizyonumuz ise global çapta bir teknoloji üssü olmak.",
        "Hakkımızda sayfasında tüm tarihimizi ve değerlerimizi bulabilirsiniz. İnovasyon, kalite ve güvenilirlik en önemli ilkelerimizdir."
      ],
      careers: [
        "Ekibimiz sürekli büyüyor! Kariyer fırsatları için bize özgeçmişinizi gönderebilir veya LinkedIn sayfamızı takip edebilirsiniz.",
        "Yetenekli mühendisler, tasarımcılar ve yapay zeka meraklıları ile çalışmaktan her zaman mutluluk duyarız.",
        "Şu an spesifik bir ilanımız olmasa da, yetenekli insanlara her zaman kapımız açık. Bize yazın!"
      ],
      tech: [
        "Geliştirmelerimizde modern teknolojiler kullanıyoruz. React, TypeScript, TanStack, Tailwind ve çeşitli LLM modelleri vazgeçilmezimiz.",
        "Sistemlerimizi yüksek performans ve ölçeklenebilirlik odaklı tasarlıyoruz. Cloud teknolojilerini en verimli şekilde kullanıyoruz.",
        "Fun Teknoloji olarak sürekli AR-GE yapıyoruz. En yeni frameworkleri ve yapay zeka tekniklerini ilk biz uyguluyoruz."
      ],
      greeting: [
        "Merhaba! Size nasıl yardımcı olabilirim? Bugün teknoloji dolu bir gün!",
        "Selamlar! Ben Nexy, Fun Teknoloji'nin yapay zeka asistanıyım. Sizi dinliyorum.",
        "Hoş geldiniz! Merak ettiğiniz bir şey mi var? Size Fun Teknoloji hakkında her şeyi anlatabilirim."
      ],
      default: [
        t("nexy.chat.response"),
        "Bu konuda size daha detaylı yardımcı olabilmemiz için lütfen iletişim formunu doldurun.",
        "Harika bir soru! Ama bu konuda henüz tam bir bilgim yok. İsterseniz ekibimize sorabilirim?",
        "Size nasıl daha iyi yardımcı olabilirim? Teknoloji çözümlerimiz, kurucumuz veya hizmetlerimiz hakkında konuşabiliriz."
      ]
    };

    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    if (text.includes("merhaba") || text.includes("selam") || text.includes("hi") || text.includes("hello")) {
      return getRandom(responses.greeting);
    }
    if (text.includes("fiyat") || text.includes("paket") || text.includes("ücret") || text.includes("price") || text.includes("cost") || text.includes("qiymət")) {
      return getRandom(responses.pricing);
    }
    if (text.includes("neler") || text.includes("yap") || text.includes("hizmet") || text.includes("service") || text.includes("xidmət") || text.includes("işler")) {
      return getRandom(responses.services);
    }
    if (text.includes("kim") || text.includes("kurucu") || text.includes("founder") || text.includes("muhammed") || text.includes("erbay")) {
      return getRandom(responses.founder);
    }
    if (text.includes("iletişim") || text.includes("ulaş") || text.includes("contact") || text.includes("əlaqə") || text.includes("mail") || text.includes("e-posta")) {
      return getRandom(responses.contact);
    }
    if (text.includes("hakkında") || text.includes("nedir") || text.includes("ne zaman") || text.includes("mission") || text.includes("vision") || text.includes("hakkınızda")) {
      return getRandom(responses.about);
    }
    if (text.includes("iş") || text.includes("kariyer") || text.includes("career") || text.includes("çalış") || text.includes("başvuru")) {
      return getRandom(responses.careers);
    }
    if (text.includes("teknoloji") || text.includes("tech") || text.includes("yazılım") || text.includes("program") || text.includes("kod")) {
      return getRandom(responses.tech);
    }
    return getRandom(responses.default);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const userMsg = { role: 'user' as const, text: userInput, displayedText: userInput };
    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getNexyBrainResponse(userInput);
      const nexyMsgIndex = newMsgs.length;
      setChatMessages([...newMsgs, { role: 'nexy', text: response, displayedText: "" }]);
      typeMessage(response, nexyMsgIndex);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("nexy.toast.copy"));
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = { tr: "tr-TR", en: "en-US", az: "tr-TR", de: "de-DE", fr: "fr-FR", es: "es-ES" };
      ut.lang = langMap[useLang().lang] || "tr-TR";
      ut.rate = 1.0;
      ut.pitch = 1.1;
      window.speechSynthesis.speak(ut);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 animate-in slide-in-from-right-10 duration-500">
      {/* Pop-up message when closed */}
      {messageKey && !isOpen && (
        <div className="relative max-w-[250px] rounded-2xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] p-4 shadow-2xl">
          <button onClick={() => setMessageKey("")} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] flex items-center justify-center text-xs fun-text hover:bg-[var(--fun-stroke-1)] transition-colors">✕</button>
          <p className="text-sm fun-text leading-relaxed">{messageKey}</p>
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-[var(--fun-card)] border-r border-b border-[var(--fun-stroke-1)]" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[420px] h-[550px] rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right">
          <div className="p-5 border-b flex items-center justify-between bg-[var(--fun-surface)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="flex items-center gap-3">
              <img src="/nexy.png" alt="Nexy" className="h-12 w-12 object-contain" />
              <div>
                <p className="font-bold fun-text">Nexy</p>
                <p className="text-[10px] fun-text-muted font-medium uppercase tracking-widest">Fun Teknoloji Asistanı</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-dots scroll-smooth">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative group/msg max-w-[85%] p-4 rounded-2xl text-[15px] ${m.role === 'user' ? 'bg-[var(--fun-purple)] text-white rounded-tr-none' : 'bg-[var(--fun-surface)] fun-text rounded-tl-none border border-[var(--fun-stroke-1)]'}`}>
                  {m.displayedText}
                  {m.role === 'nexy' && m.displayedText === m.text && (
                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                      <button onClick={() => copyToClipboard(m.text)} className="h-5 w-5 flex items-center justify-center rounded bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-colors" title="Kopyala">
                        <Copy className="h-3 w-3" />
                      </button>
                      <button onClick={() => speak(m.text)} className="h-5 w-5 flex items-center justify-center rounded bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-colors" title="Sesli Oku">
                        <Volume2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[var(--fun-surface)] p-4 rounded-2xl rounded-tl-none border border-[var(--fun-stroke-1)]">
                  <TypingIndicator />
                </div>
              </div>
            )}
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
              <button type="submit" disabled={isTyping} aria-label="Gönder" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-[var(--fun-purple)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mascot Trigger */}
      <div className={`flex items-center gap-2 transition-all duration-500 ${isMinimized ? 'translate-x-[calc(100%-40px)]' : ''}`}>
        {!isOpen && (
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] fun-text shadow-xl hover:bg-[var(--fun-surface)] transition-colors"
          >
            {isMinimized ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        )}

        <button
          className={`group relative cursor-pointer outline-none border-none bg-transparent p-0 transition-all active:scale-95 ${isMinimized ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={toggleChat}
          aria-label="Yardım al"
        >
          <div className={`relative z-10 flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 ${isOpen ? 'rotate-12 scale-95 brightness-75 bg-[var(--fun-purple)] text-white' : 'bg-[var(--fun-surface)] border-2 border-[var(--fun-purple)] fun-text hover:scale-105 shadow-xl'}`}>
            <MessageCircleQuestion className={`h-7 w-7 ${isOpen ? 'text-white' : 'text-[var(--fun-purple)]'}`} />
            <span className="font-bold text-lg whitespace-nowrap">Yardım</span>
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
