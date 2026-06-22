import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import {
  Sparkles,
  BrainCircuit,
  MessageCircle,
  Zap,
  Globe,
  Shield,
  Search,
  Bot,
  Layers,
  Cpu,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/nexy")({
  component: NexyPage,
});

function NexyPage() {
  const { t, lang } = useLang();

  const openNexyChat = () => {
    window.dispatchEvent(new CustomEvent("open-nexy-chat"));
  };

  const capabilities = [
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: t("nexy.capabilities.1.title"),
      desc: t("nexy.capabilities.1.desc"),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("nexy.capabilities.2.title"),
      desc: t("nexy.capabilities.2.desc"),
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t("nexy.capabilities.3.title"),
      desc: t("nexy.capabilities.3.desc"),
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t("nexy.capabilities.4.title"),
      desc: t("nexy.capabilities.4.desc"),
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: t("nexy.capabilities.5.title"),
      desc: t("nexy.capabilities.5.desc"),
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: t("nexy.capabilities.6.title"),
      desc: t("nexy.capabilities.6.desc"),
    },
  ];

  return (
    <main className="bg-[#050505] selection:bg-[var(--fun-purple)]/30">
      <section className="pt-32 pb-20 px-4 lg:px-5 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-[var(--fun-purple)]/10 blur-[120px] rounded-full opacity-30" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>

        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[48px] overflow-hidden relative min-h-[700px] flex items-center bg-[#0A0A0A] border border-white/5 shadow-2xl">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-dots opacity-20" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24 lg:py-40">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="relative">
                    <Sparkles className="h-5 w-5 text-[var(--fun-purple)]" />
                    <div className="absolute inset-0 bg-[var(--fun-purple)] blur-md opacity-50" />
                  </div>
                  <span className="text-sm font-bold text-white/80 uppercase tracking-widest">
                    {t("nexy.hero.badge")}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                  {t("nexy.hero.title")}
                </h1>
                <p className="text-xl md:text-2xl text-white/50 max-w-[600px] mx-auto lg:mx-0 leading-relaxed font-medium">
                  {t("nexy.hero.desc")}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                  <button
                    onClick={openNexyChat}
                    className="group relative flex items-center gap-3 px-10 h-16 rounded-full bg-white text-black font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                  >
                    {lang === "tr" ? "Sohbet Et" : "Chat Now"}
                    <MessageSquare className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  </button>
                  <ArrowButton
                    to="/about"
                    variant="light"
                    className="!bg-white/5 !text-white !border-white/10 !h-16 !px-8 hover:!bg-white/10"
                  >
                    {lang === "tr" ? "Daha Fazla Bilgi" : "Learn More"}
                  </ArrowButton>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end perspective-1000">
                <div className="relative w-full max-w-[550px] animate-float">
                  <div className="absolute -inset-20 bg-[var(--fun-purple)]/30 blur-[100px] rounded-full animate-pulse" />
                  <div className="relative bg-[#0D0D0D]/80 border border-white/10 rounded-[60px] p-12 shadow-2xl backdrop-blur-3xl transform rotate-y-[-10deg] rotate-x-[5deg]">
                    <div className="flex items-center gap-8 mb-12">
                      <div className="h-28 w-28 rounded-3xl bg-[var(--fun-purple)]/10 flex items-center justify-center shadow-2xl border border-[var(--fun-purple)]/30 p-5 overflow-hidden group">
                        <img
                          src="/nexy.png"
                          alt="Nexy"
                          className="w-full h-full object-contain scale-125 group-hover:scale-150 transition-transform duration-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-4xl font-black text-white tracking-tighter italic">
                          Nexy AI
                        </h2>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-[var(--fun-purple)] font-black tracking-[0.2em] uppercase text-[10px]">
                            {t("nexy.status.active")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-3xl rounded-tl-none p-6 border border-white/5 transform hover:-translate-y-1 transition-transform">
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          {t("nexy.msg1")}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[var(--fun-purple)] rounded-3xl rounded-tr-none p-6 text-white text-sm shadow-2xl transform hover:-translate-y-1 transition-transform">
                          {t("nexy.demo.query")}
                        </div>
                      </div>
                      {/* Decorative Bubbles */}
                      <div className="absolute -right-6 -bottom-6 h-32 w-32 bg-[var(--fun-purple)]/20 blur-3xl -z-10" />
                    </div>
                  </div>
                  {/* Floating Cards */}
                  <div className="absolute -left-10 top-1/2 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl animate-bounce-slow">
                    <Cpu className="h-6 w-6 text-[var(--fun-purple)]" />
                  </div>
                  <div className="absolute -right-6 top-1/4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl animate-bounce">
                    <Layers className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-24 px-4 lg:px-0">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-24 space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-xs font-black uppercase tracking-[0.3em] border border-white/10">
                {t("nexy.capabilities.badge")}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {t("nexy.capabilities.title")}
              </h2>
              <p className="text-white/40 text-lg max-w-[700px] mx-auto leading-relaxed">
                {t("nexy.capabilities.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i}>
                <div className="p-10 rounded-[48px] border border-white/5 bg-[#0A0A0A] hover:bg-[#111111] hover:border-[var(--fun-purple)]/50 transition-all group h-full text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--fun-purple)]/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-[var(--fun-purple)]/10 transition-colors" />
                  <div className="mx-auto h-20 w-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
                    {c.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{c.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm group-hover:text-white/60 transition-colors">
                    {c.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[60px] bg-[#0A0A0A] p-12 md:p-32 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
              <div className="relative">
                <div className="aspect-square bg-white/[0.02] rounded-[60px] border border-white/5 overflow-hidden flex items-center justify-center">
                  <Bot className="h-64 w-64 text-[var(--fun-purple)] opacity-10 animate-pulse" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-16 space-y-8">
                    <div className="w-full bg-white/5 p-6 rounded-3xl border border-white/10 animate-in slide-in-from-left duration-700 backdrop-blur-xl">
                      <div className="h-2 w-1/2 bg-[var(--fun-purple)]/40 rounded-full mb-3" />
                      <div className="h-2 w-full bg-[var(--fun-purple)]/20 rounded-full" />
                    </div>
                    <div className="w-full bg-[var(--fun-purple)]/10 p-6 rounded-3xl border border-[var(--fun-purple)]/20 animate-in slide-in-from-right duration-1000 backdrop-blur-xl">
                      <div className="h-2 w-3/4 bg-[var(--fun-purple)]/50 rounded-full mb-3" />
                      <div className="h-2 w-1/2 bg-[var(--fun-purple)]/50 rounded-full" />
                    </div>
                    <div className="w-full bg-white/5 p-6 rounded-3xl border border-white/10 animate-in slide-in-from-left duration-1500 backdrop-blur-xl">
                      <div className="h-2 w-2/3 bg-[var(--fun-purple)]/40 rounded-full mb-3" />
                      <div className="h-2 w-full bg-[var(--fun-purple)]/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] text-xs font-black uppercase tracking-[0.2em] border border-[var(--fun-purple)]/20">
                  {lang === "tr" ? "Neden Nexy?" : "Why Nexy?"}
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight italic">
                  {t("nexy.why.title")}
                </h2>
                <p className="text-xl text-white/50 leading-relaxed font-medium">
                  {t("nexy.why.desc")}
                </p>
                <div className="pt-6">
                  <button
                    onClick={openNexyChat}
                    className="px-10 h-16 rounded-full bg-[var(--fun-purple)] text-white font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--fun-purple)]/20"
                  >
                    {lang === "tr" ? "Şimdi Başla" : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
