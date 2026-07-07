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
  head: () => ({
    meta: [{ title: "QuakeSafe - Deprem Güvenliği" }],
  }),
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
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[700px] flex items-center bg-black border border-white/10">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent opacity-50" />
              <div className="absolute top-0 right-0 w-full h-full bg-grid-white/[0.02]" />
            </div>

            <div className="w-full px-6 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center py-20 lg:py-32">
               <div className="space-y-8 md:space-y-10 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-left duration-700">
                    <img src="/assets/logos/quakesafe_seffaf.png" alt="QuakeSafe" className="h-16 w-16 md:h-24 md:w-24 object-contain" />
                    <span className="text-3xl md:text-5xl font-bold text-white tracking-tighter">QuakeSafe</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.1] capitalize animate-in fade-in slide-in-from-left duration-1000 delay-200">
                    {t("quakesafe.hero.title")}
                  </h1>
                  <p className="text-lg md:text-2xl text-slate-400 max-w-[700px] mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-left duration-1000 delay-400">
                    {t("quakesafe.hero.desc")}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
                     <ArrowButton href="https://quakesafe.funteknoloji.com" variant="light" className="w-full sm:w-auto h-16 px-10 text-lg !bg-white !text-[#0F172A] shadow-2xl shadow-white/10">
                       {t("nav.open_platform")}
                     </ArrowButton>
                  </div>
               </div>

               <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000 delay-300">
                  <div className="absolute -inset-20 bg-red-600/10 blur-[120px] rounded-full" />
                  <div className="relative aspect-square rounded-[60px] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent" />
                      <ShieldAlert className="h-64 w-64 text-white opacity-20" />
                      <div className="absolute inset-0 p-12 flex flex-col justify-end">
                         <div className="space-y-4">
                            <div className="h-3 w-3/4 bg-white/20 rounded-full" />
                            <div className="h-3 w-1/2 bg-white/10 rounded-full" />
                         </div>
                      </div>
                  </div>
                  {/* Decorative card 1 */}
                  <div className="absolute -top-10 -right-10 p-6 rounded-3xl bg-white text-black shadow-2xl animate-bounce duration-[4000ms]">
                     <Bell className="h-8 w-8 mb-2" />
                     <p className="font-bold text-sm">EARLY WARNING</p>
                  </div>
                  {/* Decorative card 2 */}
                  <div className="absolute -bottom-10 -left-10 p-6 rounded-3xl bg-red-600 text-white shadow-2xl">
                     <Activity className="h-8 w-8 mb-2" />
                     <p className="font-bold text-sm">REAL-TIME DATA</p>
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
