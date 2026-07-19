import { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, Send, MessageSquare, LogOut, Eye, EyeOff, Bot } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

interface LiveLoginViewProps {
  onBack: () => void;
  onLoginSuccess: (user: { email: string }) => void;
  lang: string;
}

export function LiveLoginView({ onBack, onLoginSuccess, lang }: LiveLoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(lang === "tr" ? "Lütfen tüm alanları doldurun." : "Please fill in all fields.");
      return;
    }
    if (!email.includes("@")) {
      toast.error(lang === "tr" ? "Geçerli bir e-posta girin." : "Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else if (data?.user) {
        toast.success(lang === "tr" ? "Giriş başarılı!" : "Login successful!");
        onLoginSuccess({ email: data.user.email || email });
      }
    } catch (err: any) {
      toast.error(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
      {/* Header */}
      <div
        className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
        style={{ borderColor: "var(--fun-stroke-1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-[var(--fun-purple)] leading-tight">
              {lang === "tr" ? "Canlı Desteğe Giriş Yap" : "Login to Live Support"}
            </h3>
            <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">
              {lang === "tr" ? "Devam etmek için oturum açın" : "Sign in to continue"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 p-5 sm:p-6 flex flex-col justify-center gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold fun-text">
            {lang === "tr" ? "E-posta" : "Email"}
          </label>
          <input
            type="email"
            placeholder="ornek@funteknoloji.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] px-4 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all fun-text"
          />
        </div>

        <div className="space-y-1.5 relative">
          <label className="text-xs font-semibold fun-text">
            {lang === "tr" ? "Şifre" : "Password"}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] pl-4 pr-10 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all fun-text"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 mt-2 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? (lang === "tr" ? "Giriş Yapılıyor..." : "Signing In...") : (lang === "tr" ? "Giriş Yap" : "Sign In")}
        </button>
      </form>
    </div>
  );
}

interface LiveChatViewProps {
  user: { email: string };
  messages: { role: "agent" | "user"; text: string; id: string; timestamp: number }[];
  setMessages: React.Dispatch<React.SetStateAction<{ role: "agent" | "user"; text: string; id: string; timestamp: number }[]>>;
  onBack: () => void;
  onLogout: () => void;
  lang: string;
  isAgentTyping: boolean;
  setIsAgentTyping: (typing: boolean) => void;
  isMaximized: boolean;
}

export function LiveChatView({
  user,
  messages,
  setMessages,
  onBack,
  onLogout,
  lang,
  isAgentTyping,
  setIsAgentTyping,
  isMaximized,
}: LiveChatViewProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAgentTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAgentTyping) return;

    const userText = input.trim();
    const userMsg = {
      role: "user" as const,
      text: userText,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsAgentTyping(true);

    // Call /api/nexy mimicking Live Support Agent "Can"
    const prompt = `System: Sen Fun Teknoloji şirketinin canlı destek ekibinden Can'sın.
    Giriş yapan kullanıcının e-postası: ${user.email}.
    Sen bir yapay zeka değilsin, gerçek bir canlı destek temsilcisisin. Doğal, dost canlısı, profesyonel ve çözüm odaklı konuş.
    Kullanıcının dilinde cevap ver (${lang}).
    Cevaplarını kısa tut (maksimum 1-2 cümle) ve Pollinations veya başka servislerin adını geçirme, sadece Fun Teknoloji adına yardımcı ol.

    Konuşma Geçmişi:
    ${messages.slice(-6).map(m => `${m.role === "user" ? "User" : "Agent Can"}: ${m.text}`).join("\n")}
    User: ${userText}`;

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
        setMessages((prev) => [
          ...prev,
          {
            role: "agent" as const,
            text: cleanText || (lang === "tr" ? "Size nasıl yardımcı olabilirim?" : "How can I assist you?"),
            id: Math.random().toString(36).substring(2, 9),
            timestamp: Date.now()
          }
        ]);
        setIsAgentTyping(false);
      }, 1500);
    } catch (e) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent" as const,
            text: lang === "tr" ? "Bağlantı hatası oluştu, lütfen tekrar deneyin." : "Connection error, please try again.",
            id: Math.random().toString(36).substring(2, 9),
            timestamp: Date.now()
          }
        ]);
        setIsAgentTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
      {/* Header */}
      <div
        className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
        style={{ borderColor: "var(--fun-stroke-1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">
              Can
            </h3>
            <p className="text-[10px] sm:text-xs text-green-500 font-semibold mt-0.5 animate-pulse">
              {lang === "tr" ? "Çevrimiçi" : "Online"}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          title={lang === "tr" ? "Oturumu Kapat" : "Logout"}
          className="h-9 w-9 rounded-full hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-dots"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold fun-text">
                {lang === "tr" ? "Canlı Sohbet Başlatıldı" : "Live Chat Started"}
              </p>
              <p className="text-[10px] sm:text-[11px] fun-text-muted max-w-[200px] mt-1 leading-normal">
                {lang === "tr" ? "Müşteri temsilcimiz Can kısa süre içinde size yardımcı olacaktır." : "Our customer agent Can will assist you shortly."}
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed ${m.role === "user" ? "bg-[var(--fun-purple)] text-white rounded-br-none shadow-lg shadow-purple-500/10" : "bg-[var(--fun-surface)] fun-text border border-[var(--fun-stroke-1)] rounded-bl-none shadow-sm"}`}
            >
              {m.text}
            </div>
            <span className="text-[9px] fun-text-muted mt-1 px-1 font-medium opacity-50">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}

        {isAgentTyping && (
          <div className="flex flex-col items-start space-y-1">
            <div className="bg-[var(--fun-surface)] rounded-2xl rounded-bl-none px-4 py-3 border border-[var(--fun-stroke-1)]">
              <div className="flex gap-1.5 items-center">
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t bg-[var(--fun-surface)]/50 backdrop-blur-xl"
        style={{ borderColor: "var(--fun-stroke-1)" }}
      >
        <div className={`relative ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === "tr" ? "Mesajınızı yazın..." : "Type your message..."}
            className="w-full rounded-[20px] bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] py-3 pl-4 pr-12 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-4 focus:ring-[var(--fun-purple)]/10 transition-all fun-text shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAgentTyping}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-purple-500/30 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
