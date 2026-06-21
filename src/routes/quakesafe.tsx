import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import {
  ShieldAlert,
  MapPin,
  Bell,
  Users,
  Smartphone,
  Cpu,
  Wifi,
  Cloud,
  Zap,
  Activity,
  Clock,
  HeartHandshake
} from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  component: QuakeSafePage,
});

function QuakeSafePage() {
  const { t, lang } = useLang();

  const features = [
    {
      icon: <Bell className="h-8 w-8" />,
      title: t("quakesafe.features.1.title"),
      desc: t("quakesafe.features.1.desc")
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t("quakesafe.features.2.title"),
      desc: t("quakesafe.features.2.desc")
    },
    {
      icon: <ShieldAlert className="h-8 w-8" />,
      title: t("quakesafe.features.3.title"),
      desc: t("quakesafe.features.3.desc")
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t("quakesafe.features.4.title"),
      desc: t("quakesafe.features.4.desc")
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t("quakesafe.features.5.title"),
      desc: t("quakesafe.features.5.desc")
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: t("quakesafe.features.6.title"),
      desc: t("quakesafe.features.6.desc")
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: t("quakesafe.features.7.title"),
      desc: t("quakesafe.features.7.desc")
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: t("quakesafe.features.8.title"),
      desc: t("quakesafe.features.8.desc")
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("quakesafe.features.9.title"),
      desc: t("quakesafe.features.9.desc")
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: t("quakesafe.features.10.title"),
      desc: t("quakesafe.features.10.desc")
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("quakesafe.features.11.title"),
      desc: t("quakesafe.features.11.desc")
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: t("quakesafe.features.12.title"),
      desc: t("quakesafe.features.12.desc")
    }
  ];

  return (
    <main>
      <section className="pt-32 pb-20 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[600px] flex items-center bg-[#0F172A] border border-white/10">
            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
               <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <img src="/assets/logos/quakesafe_seffaf.png" alt="QuakeSafe" className="h-16 w-16 md:h-20 md:w-20 object-contain" />
                    <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter">QuakeSafe</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight capitalize">
                    {t("quakesafe.hero.title")}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-400 max-w-[600px] mx-auto lg:mx-0">
                    {t("quakesafe.hero.desc")}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                     <ArrowButton href="https://quakesafe.funteknoloji.com" variant="light" className="w-full sm:w-auto !bg-white !text-[#0F172A]">
                       {t("nav.open_platform")}
                     </ArrowButton>
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
               <span className="badge-fun badge-fun-purple">{t("home.features.badge")}</span>
               <h2 className="text-4xl md:text-5xl font-bold fun-text">{t("quakesafe.features.title")}</h2>
               <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
                 {t("quakesafe.features.desc")}
               </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-3xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group h-full">
                   <div className="h-16 w-16 rounded-2xl bg-[var(--fun-surface)] flex items-center justify-center text-[var(--fun-purple)] mb-6 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500">
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold fun-text mb-3">{f.title}</h3>
                   <p className="fun-text-muted leading-relaxed text-sm">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-5">
         <ScrollReveal>
            <div className="max-w-[1880px] mx-auto rounded-[40px] bg-[var(--fun-purple)] p-12 md:p-24 text-center text-white overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-grid-white" />
               </div>
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-6xl font-bold mb-8">{t("quakesafe.cta.title")}</h2>
                  <p className="text-xl md:text-2xl text-white/80 max-w-[800px] mx-auto mb-12">
                    {t("quakesafe.cta.desc")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <ArrowButton href="https://quakesafe.funteknoloji.com" variant="light" className="!text-[var(--fun-purple)]">
                      {t("nav.explore_platform")}
                    </ArrowButton>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>
    </main>
  );
}
