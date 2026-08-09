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
  Clock,
  Languages,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/nexy")({
  head: () => ({
    meta: [
      { title: "Nexy - Yapay Zeka Tabanlı Akıllı İş Asistanı" },
      {
        name: "description",
        content:
          "Nexy; Fun Teknoloji tarafından geliştirilen, 12+ dilde destek veren ve 7/24 kesintisiz, insan benzeri akıcı konuşmalar kurabilen yenilikçi yapay zeka asistanıdır.",
      },
      {
        name: "keywords",
        content:
          "Nexy, yapay zeka asistanı, akıllı arama, çok dilli yapay zeka, chatbot, Fun Teknoloji AI, müşteri desteği otomasyonu",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Nexy - Yapay Zeka Tabanlı Akıllı İş Asistanı" },
      {
        property: "og:description",
        content:
          "Saniyeler içinde akıllı yanıtlar, döküman aramaları ve gelişmiş çok dilli diyalog yetenekleriyle Nexy her an yanınızda.",
      },
      { property: "og:url", content: "https://funteknoloji.com/nexy" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://funteknoloji.com/nexy.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@funteknoloji_" },
      { name: "twitter:title", content: "Nexy - Fun Teknoloji AI Asistanı" },
      {
        name: "twitter:description",
        content:
          "İşlerinizi kolaylaştıran, dökümanlarınız arasında akıllı arama yapabilen yapay zeka destekli dijital asistan.",
      },
      { name: "twitter:image", content: "https://funteknoloji.com/nexy.png" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/nexy" }],
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
                <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-bold text-white leading-tight">
                  {t("nexy.hero.title")}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-[600px] mx-auto lg:mx-0">
                  {t("nexy.hero.desc")}
                </p>
                <div className="flex justify-center lg:justify-start">
                  <ArrowButton
                    onClick={() => window.dispatchEvent(new CustomEvent("open-nexy-chat"))}
                    variant="light"
                    className="h-14 px-8 !bg-white !text-black hover:!bg-[var(--fun-purple)] hover:!text-white"
                  >
                    {t("nexy.use_now")}
                  </ArrowButton>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] flex flex-col gap-8">
                  <div className="absolute -inset-10 bg-[var(--fun-purple)]/20 blur-[80px] rounded-full animate-pulse" />
                  <div className="relative bg-[#0A0C14] border border-white/5 rounded-[40px] p-8 sm:p-10 shadow-2xl backdrop-blur-3xl overflow-hidden group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--fun-purple)]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex items-center gap-6 mb-8">
                      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-black flex items-center justify-center shadow-2xl border border-white/5 p-4 overflow-hidden">
                        <img
                          src="/nexy-kafa-buyuk.png"
                          alt="Nexy"
                          className="w-full h-full object-contain scale-150"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Nexy</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-green-500 font-medium uppercase tracking-widest">
                            {t("nexy.status.active")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
                          <p className="text-white/90 text-sm leading-relaxed">{t("nexy.msg1")}</p>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[var(--fun-purple)] rounded-2xl rounded-tr-none p-4 text-white text-sm shadow-xl">
                            {t("nexy.demo.query")}
                          </div>
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
              <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-[#12161F] to-[#0A0C14] rounded-[40px] border border-white/5 shadow-2xl overflow-hidden min-h-[350px] lg:min-h-[480px]">
                {/* Background glow lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[var(--fun-purple)]/15 blur-[80px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-[var(--fun-purple)]/20 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-dashed border-[var(--fun-purple)]/10" />

                {/* Main high fidelity icon in the center */}
                <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                  <div className="h-28 w-28 rounded-[32px] bg-black flex items-center justify-center shadow-2xl border border-white/10 p-5 overflow-hidden transform hover:scale-105 transition-all duration-500">
                    <img
                      src="/nexy-kafa-buyuk.png"
                      alt="Nexy"
                      className="w-full h-full object-contain scale-150"
                    />
                  </div>
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
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold fun-text text-xl mb-1">24/7</h4>
                      <p className="text-xs fun-text-muted font-medium">
                        {t("home.stats.support")}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                      <Languages className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold fun-text text-xl mb-1">12+</h4>
                      <p className="text-xs fun-text-muted font-medium">
                        {t("nexy.capabilities.3.title")}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold fun-text text-xl mb-1">∞</h4>
                      <p className="text-xs fun-text-muted font-medium">
                        {t("nexy.capabilities.4.title")}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 rounded-3xl bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold fun-text text-xl mb-1">AI</h4>
                      <p className="text-xs fun-text-muted font-medium">
                        {t("nexy.capabilities.1.title")}
                      </p>
                    </div>
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
