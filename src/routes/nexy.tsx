import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import { Sparkles, BrainCircuit, MessageCircle, Zap, Globe, Shield, Search } from "lucide-react";

export const Route = createFileRoute("/nexy")({
  head: () => ({
    meta: [{ title: "Nexy Asistan - Fun Teknoloji" }],
  }),
  component: NexyPage,
});

function NexyPage() {
  const { t, lang } = useLang();

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
    <main>
      <section className="pt-32 pb-20 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[750px] sm:min-h-[600px] flex items-center bg-[#12161F] border border-white/10 dark:border-white/10">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-dots opacity-20" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {t("nexy.hero.title")}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-[600px] mx-auto lg:mx-0">
                  {t("nexy.hero.desc")}
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] flex flex-col gap-8">
                  <div className="absolute -inset-10 bg-[var(--fun-purple)]/20 blur-[80px] rounded-full animate-pulse" />
                  <div className="relative bg-[#1A1F2B] border border-white/10 rounded-[40px] p-10 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="h-24 w-24 rounded-3xl bg-[var(--fun-purple)]/10 flex items-center justify-center shadow-2xl border border-[var(--fun-purple)]/20 p-4 overflow-hidden">
                        <img
                          src="/nexy-kafa.png"
                          alt="Nexy"
                          className="w-full h-full object-contain scale-125"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">Nexy</h2>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
                        <p className="text-white/90 text-sm">{t("nexy.msg1")}</p>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[var(--fun-purple)] rounded-2xl rounded-tr-none p-4 text-white text-sm shadow-xl">
                          {t("nexy.demo.query")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 flex justify-center">
                    <ArrowButton
                      onClick={() => window.dispatchEvent(new CustomEvent("open-nexy-chat"))}
                      variant="light"
                      className="w-full sm:w-auto"
                    >
                      {lang === "tr" ? "Kullan" : "Use"}
                    </ArrowButton>
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
            <div className="text-center mb-20 space-y-4">
              <span className="badge-fun badge-fun-gray">{t("nexy.capabilities.badge")}</span>
              <h2 className="text-4xl md:text-5xl font-bold fun-text">
                {t("nexy.capabilities.title")}
              </h2>
              <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
                {t("nexy.capabilities.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group h-full text-center">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-[var(--fun-surface)] flex items-center justify-center text-[var(--fun-purple)] mb-6 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500">
                    {c.icon}
                  </div>
                  <h3 className="text-xl font-bold fun-text mb-3">{c.title}</h3>
                  <p className="fun-text-muted leading-relaxed text-sm">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] bg-[var(--fun-surface)] p-8 md:p-16 border border-[var(--fun-stroke-1)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-video lg:aspect-square max-h-[300px] lg:max-h-[500px] bg-[var(--fun-card)] rounded-[40px] border border-[var(--fun-stroke-1)] overflow-hidden flex items-center justify-center">
                  <MessageCircle className="h-40 w-40 text-[var(--fun-purple)] opacity-20" />
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold fun-text leading-tight">
                  {t("nexy.why.title")}
                </h2>
                <p className="text-lg md:text-xl fun-text-muted leading-relaxed">
                  {t("nexy.why.desc")}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)]">
                    <h4 className="font-bold fun-text mb-2">24/7</h4>
                    <p className="text-xs fun-text-muted">{t("home.stats.support")}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)]">
                    <h4 className="font-bold fun-text mb-2">12+</h4>
                    <p className="text-xs fun-text-muted">{t("nexy.capabilities.3.title")}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)]">
                    <h4 className="font-bold fun-text mb-2">∞</h4>
                    <p className="text-xs fun-text-muted">{t("nexy.capabilities.4.title")}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)]">
                    <h4 className="font-bold fun-text mb-2">AI</h4>
                    <p className="text-xs fun-text-muted">{t("nexy.capabilities.1.title")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
