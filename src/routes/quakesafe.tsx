import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import { Bell, MapPin, ShieldAlert, Users, Smartphone, Cpu, Wifi, Cloud, Zap, Activity, Clock, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  head: () => ({
    meta: [{ title: "QuakeSafe - Deprem Güvenliği" }],
  }),
  component: QuakeSafePage,
});

function QuakeSafePage() {
  const { t } = useLang();

  const features = [
    { icon: <Bell />, title: t("quakesafe.features.1.title"), desc: t("quakesafe.features.1.desc") },
    { icon: <MapPin />, title: t("quakesafe.features.2.title"), desc: t("quakesafe.features.2.desc") },
    { icon: <ShieldAlert />, title: t("quakesafe.features.3.title"), desc: t("quakesafe.features.3.desc") },
    { icon: <Users />, title: t("quakesafe.features.4.title"), desc: t("quakesafe.features.4.desc") },
    { icon: <Smartphone />, title: t("quakesafe.features.5.title"), desc: t("quakesafe.features.5.desc") },
    { icon: <Cpu />, title: t("quakesafe.features.6.title"), desc: t("quakesafe.features.6.desc") },
    { icon: <Wifi />, title: t("quakesafe.features.7.title"), desc: t("quakesafe.features.7.desc") },
    { icon: <Cloud />, title: t("quakesafe.features.8.title"), desc: t("quakesafe.features.8.desc") },
    { icon: <Zap />, title: t("quakesafe.features.9.title"), desc: t("quakesafe.features.9.desc") },
    { icon: <Activity />, title: t("quakesafe.features.10.title"), desc: t("quakesafe.features.10.desc") },
    { icon: <Clock />, title: t("quakesafe.features.11.title"), desc: t("quakesafe.features.11.desc") },
    { icon: <HeartHandshake />, title: t("quakesafe.features.12.title"), desc: t("quakesafe.features.12.desc") },
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
                    QuakeSafe v2.4
                  </span>
                  <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-6 fun-text">
                    {t("quakesafe.hero.title")}
                  </h1>
                  <p className="text-tagline-1 fun-text-muted mb-10 max-w-[600px]">
                    {t("quakesafe.hero.desc")}
                  </p>
                  <ArrowButton href="https://quakesafe.funteknoloji.com" variant="dark">
                    {t("nav.open_platform")}
                  </ArrowButton>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] flex items-center justify-center p-12">
                   <div className="absolute inset-0 bg-dots opacity-20" />
                   <img src="/assets/logos/quakesafe_seffaf.png" alt="QuakeSafe" className="w-full h-full object-contain relative z-10" />
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
                {t("quakesafe.features.title")}
              </h2>
              <p className="text-tagline-1 fun-text-muted max-w-[700px] mx-auto">
                {t("quakesafe.features.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-colors h-full">
                  <div className="h-12 w-12 rounded-xl bg-[var(--fun-card)] flex items-center justify-center text-[var(--fun-purple)] mb-6">
                    {f.icon}
                  </div>
                  <h3 className="text-heading-6 font-medium mb-3 fun-text">{f.title}</h3>
                  <p className="text-tagline-1 fun-text-muted">{f.desc}</p>
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
               <h2 className="text-heading-3 md:text-heading-2 font-medium text-white mb-6">
                 {t("quakesafe.cta.title")}
               </h2>
               <p className="text-tagline-1 text-white/60 max-w-[700px] mx-auto mb-10">
                 {t("quakesafe.cta.desc")}
               </p>
               <ArrowButton href="https://quakesafe.funteknoloji.com" variant="light">
                 {t("nav.explore_platform")}
               </ArrowButton>
             </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
