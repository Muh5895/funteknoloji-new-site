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
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/nexy")({
  component: NexyPage,
});

function NexyPage() {
  const { t } = useLang();

  const handleOpenChat = () => {
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
    <main className="bg-[var(--fun-surface)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[700px] flex items-center bg-[#12161F] border border-white/10 shadow-2xl">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/30 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--fun-purple)_0%,_transparent_50%)] opacity-20" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-dots opacity-30" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-32">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl animate-in fade-in slide-in-from-bottom duration-700">
                  <Sparkles className="h-4 w-4 text-[#A78BFA] animate-pulse" />
                  <span className="text-sm font-bold tracking-widest text-white/90 uppercase">
                    {t("nexy.hero.badge")}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  {t("nexy.hero.title")}
                </h1>

                <p className="text-lg md:text-2xl text-white/60 max-w-[600px] mx-auto lg:mx-0 leading-relaxed font-medium">
                  {t("nexy.hero.desc")}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                  <button
                    onClick={handleOpenChat}
                    className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#12161F] font-bold text-xl hover:bg-[#A78BFA] hover:text-white transition-all shadow-xl hover:shadow-[#A78BFA]/30 active:scale-95"
                  >
                    <MessageSquare className="h-6 w-6" />
                    Sohbet Et
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end perspective-1000">
                <div className="relative w-full max-w-[500px] animate-in zoom-in-95 duration-1000">
                  <div className="absolute -inset-10 bg-[var(--fun-purple)]/30 blur-[100px] rounded-full animate-pulse" />

                  <div className="relative bg-[#1A1F2E]/80 border border-white/10 rounded-[48px] p-8 sm:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-3xl transform hover:rotate-y-[-5deg] hover:rotate-x-[5deg] transition-transform duration-700">
                    <div className="flex items-center gap-8 mb-12">
                      <div className="relative h-28 w-28 shrink-0">
                        <div className="absolute inset-0 bg-[var(--fun-purple)] rounded-3xl blur-2xl opacity-20 animate-pulse" />
                        <div className="h-full w-full rounded-3xl bg-gradient-to-br from-[var(--fun-purple)]/20 to-transparent flex items-center justify-center border border-white/10 p-5 overflow-hidden shadow-inner">
                          <img
                            src="/nexy.png"
                            alt="Nexy"
                            className="w-full h-full object-contain scale-125"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500 border-4 border-[#1A1F2E] flex items-center justify-center shadow-lg">
                          <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-4xl font-black text-white tracking-tight">Nexy</h2>
                          <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/20 uppercase tracking-widest">
                            Live
                          </span>
                        </div>
                        <p className="text-[#A78BFA] font-bold tracking-[0.2em] uppercase text-xs">
                          {t("nexy.status.active")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-3xl rounded-tl-none p-5 border border-white/5 shadow-sm">
                        <p className="text-white/80 text-[15px] leading-relaxed font-medium">
                          {t("nexy.msg1")}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[var(--fun-purple)] rounded-3xl rounded-tr-none p-5 text-white text-[15px] shadow-xl font-medium max-w-[80%]">
                          {t("nexy.demo.query")}
                        </div>
                      </div>
                      <div className="flex justify-center pt-4">
                        <div className="flex gap-1.5 items-center px-4 py-2 rounded-full bg-white/5 border border-white/5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce" />
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.2s]" />
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] animate-bounce [animation-delay:0.4s]" />
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">
                            Nexy yazıyor
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 px-4 lg:px-0">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--fun-purple)]/10 border border-[var(--fun-purple)]/20">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--fun-purple)]">
                  {t("nexy.capabilities.badge")}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black fun-text tracking-tighter uppercase italic">
                {t("nexy.capabilities.title")}
              </h2>
              <p className="fun-text-muted text-xl max-w-[800px] mx-auto font-medium">
                {t("nexy.capabilities.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-10 rounded-[48px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] hover:translate-y-[-10px] transition-all group h-full text-center shadow-sm hover:shadow-2xl hover:shadow-[var(--fun-purple)]/5">
                  <div className="mx-auto h-24 w-24 rounded-[32px] bg-[var(--fun-surface)] flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-700 shadow-inner">
                    {c.icon}
                  </div>
                  <h3 className="text-2xl font-bold fun-text mb-4 tracking-tight">{c.title}</h3>
                  <p className="fun-text-muted leading-relaxed text-[15px] font-medium px-4">
                    {c.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-32 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[60px] bg-white p-12 md:p-32 border border-[var(--fun-stroke-1)] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--fun-surface)]/50 -skew-x-12 translate-x-1/4 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="relative">
                <div className="aspect-[4/3] bg-[var(--fun-surface)] rounded-[48px] border border-[var(--fun-stroke-1)] overflow-hidden flex items-center justify-center shadow-inner group">
                  <Bot className="h-56 w-56 text-[var(--fun-purple)] opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-16 space-y-8">
                    <div className="w-full bg-white p-6 rounded-3xl shadow-xl border border-[var(--fun-stroke-1)] animate-in slide-in-from-left duration-700">
                      <div className="h-2.5 w-1/3 bg-[var(--fun-purple)]/20 rounded-full mb-3" />
                      <div className="h-2.5 w-full bg-[var(--fun-purple)]/10 rounded-full" />
                    </div>
                    <div className="w-full bg-[var(--fun-purple)]/10 p-6 rounded-3xl shadow-xl border border-[var(--fun-purple)]/20 animate-in slide-in-from-right duration-1000">
                      <div className="h-2.5 w-3/4 bg-[var(--fun-purple)]/30 rounded-full mb-3" />
                      <div className="h-2.5 w-1/2 bg-[var(--fun-purple)]/30 rounded-full" />
                    </div>
                    <div className="w-full bg-white p-6 rounded-3xl shadow-xl border border-[var(--fun-stroke-1)] animate-in slide-in-from-left duration-1300">
                      <div className="h-2.5 w-2/3 bg-[var(--fun-purple)]/20 rounded-full mb-3" />
                      <div className="h-2.5 w-full bg-[var(--fun-purple)]/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black fun-text leading-none tracking-tighter uppercase italic">
                    {t("nexy.why.title")}
                  </h2>
                  <p className="text-xl fun-text-muted leading-relaxed font-medium">
                    {t("nexy.why.desc")}
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  {[
                    "Yapay zeka ile kişiselleştirilmiş deneyim",
                    "7/24 kesintisiz ve hızlı yanıt",
                    "Dinamik ve akıllı veri işleme",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <span className="text-lg font-bold fun-text">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <button
                    onClick={handleOpenChat}
                    className="btn-fun btn-fun-dark !px-12 !py-5 text-lg"
                  >
                    Hemen Deneyin
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
