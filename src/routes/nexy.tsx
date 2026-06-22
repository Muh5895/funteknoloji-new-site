import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import { BrainCircuit, Zap, Globe, Shield, Search, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/nexy")({
  component: NexyPage,
});

function NexyPage() {
  const { t, lang } = useLang();

  const openNexyChat = () => {
    window.dispatchEvent(new CustomEvent("open-nexy-chat"));
  };

  const capabilities = [
    { icon: <BrainCircuit />, title: t("nexy.capabilities.1.title"), desc: t("nexy.capabilities.1.desc") },
    { icon: <Zap />, title: t("nexy.capabilities.2.title"), desc: t("nexy.capabilities.2.desc") },
    { icon: <Globe />, title: t("nexy.capabilities.3.title"), desc: t("nexy.capabilities.3.desc") },
    { icon: <Shield />, title: t("nexy.capabilities.4.title"), desc: t("nexy.capabilities.4.desc") },
    { icon: <Search />, title: t("nexy.capabilities.5.title"), desc: t("nexy.capabilities.5.desc") },
    { icon: <MessageCircle />, title: t("nexy.capabilities.6.title"), desc: t("nexy.capabilities.6.desc") },
  ];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5 bg-[var(--fun-surface)]">
            <div className="main-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="badge-fun badge-fun-purple mb-4 inline-block">
                    {t("nexy.hero.badge")}
                  </span>
                  <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-6 fun-text">
                    {t("nexy.hero.title")}
                  </h1>
                  <p className="text-tagline-1 fun-text-muted mb-10 max-w-[600px]">
                    {t("nexy.hero.desc")}
                  </p>
                  <button
                    onClick={openNexyChat}
                    className="btn-fun btn-fun-dark"
                  >
                    {lang === "tr" ? "Sohbet Et" : "Chat Now"}
                  </button>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] flex items-center justify-center p-12">
                   <div className="absolute inset-0 bg-dots opacity-20" />
                   <div className="relative z-10 w-full max-w-[300px]">
                      <img src="/nexy.png" alt="Nexy" className="w-full h-full object-contain" />
                      <div className="mt-8 p-6 bg-[var(--fun-surface)] rounded-2xl rounded-tl-none border border-[var(--fun-stroke-1)]">
                         <p className="text-sm fun-text leading-relaxed">{t("nexy.msg1")}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-heading-3 md:text-heading-2 font-medium fun-text mb-4">
                {t("nexy.capabilities.title")}
              </h2>
              <p className="text-tagline-1 fun-text-muted max-w-[700px] mx-auto">
                {t("nexy.capabilities.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-colors h-full">
                  <div className="h-12 w-12 rounded-xl bg-[var(--fun-card)] flex items-center justify-center text-[var(--fun-purple)] mb-6">
                    {c.icon}
                  </div>
                  <h3 className="text-heading-6 font-medium mb-3 fun-text">{c.title}</h3>
                  <p className="text-tagline-1 fun-text-muted">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-5 pb-16 md:pb-24">
        <ScrollReveal>
          <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--fun-purple)]/10 to-transparent" />
             <div className="relative z-10">
               <h2 className="text-heading-3 md:text-heading-2 font-medium text-white mb-6 italic uppercase">
                 {t("nexy.why.title")}
               </h2>
               <p className="text-tagline-1 text-white/60 max-w-[700px] mx-auto mb-10">
                 {t("nexy.why.desc")}
               </p>
               <button
                  onClick={openNexyChat}
                  className="btn-fun btn-fun-light"
                >
                  {lang === "tr" ? "Hemen Dene" : "Try Now"}
               </button>
             </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
