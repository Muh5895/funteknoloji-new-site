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
  HeartHandshake,
  ShieldCheck,
  Radar,
  Radio,
  Globe,
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
      desc: t("quakesafe.features.1.desc"),
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t("quakesafe.features.2.title"),
      desc: t("quakesafe.features.2.desc"),
    },
    {
      icon: <ShieldAlert className="h-8 w-8" />,
      title: t("quakesafe.features.3.title"),
      desc: t("quakesafe.features.3.desc"),
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t("quakesafe.features.4.title"),
      desc: t("quakesafe.features.4.desc"),
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t("quakesafe.features.5.title"),
      desc: t("quakesafe.features.5.desc"),
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: t("quakesafe.features.6.title"),
      desc: t("quakesafe.features.6.desc"),
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: t("quakesafe.features.7.title"),
      desc: t("quakesafe.features.7.desc"),
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: t("quakesafe.features.8.title"),
      desc: t("quakesafe.features.8.desc"),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("quakesafe.features.9.title"),
      desc: t("quakesafe.features.9.desc"),
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: t("quakesafe.features.10.title"),
      desc: t("quakesafe.features.10.desc"),
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("quakesafe.features.11.title"),
      desc: t("quakesafe.features.11.desc"),
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: t("quakesafe.features.12.title"),
      desc: t("quakesafe.features.12.desc"),
    },
  ];

  const highlights = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: lang === "tr" ? "Maksimum Güvenlik" : "Maximum Security",
      text:
        lang === "tr"
          ? "Uçtan uca şifrelenmiş veri iletimi."
          : "End-to-end encrypted data transmission.",
    },
    {
      icon: <Radar className="h-6 w-6" />,
      title: lang === "tr" ? "Anlık Analiz" : "Instant Analysis",
      text:
        lang === "tr"
          ? "Yapay zeka destekli sismik veri işleme."
          : "AI-powered seismic data processing.",
    },
    {
      icon: <Radio className="h-6 w-6" />,
      title: lang === "tr" ? "Kesintisiz İletişim" : "Seamless Comm.",
      text:
        lang === "tr"
          ? "Mesh ağ teknolojisi ile internetsiz mesajlaşma."
          : "Offline messaging via mesh network.",
    },
  ];

  return (
    <main className="bg-black text-white selection:bg-[var(--fun-purple)]/30">
      <section className="pt-32 pb-20 px-4 lg:px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#864FFE15,transparent)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]" />

        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[48px] overflow-hidden relative min-h-[700px] flex items-center bg-[#050505] border border-white/5 shadow-[0_0_80px_-20px_rgba(134,79,254,0.15)]">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--fun-purple)]/10 via-transparent to-transparent" />
            </div>

            <div className="main-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-32">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <img
                    src="/assets/logos/quakesafe_seffaf.png"
                    alt="QuakeSafe"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-sm font-bold text-white/90 tracking-tight">
                    QuakeSafe v2.4
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                  {t("quakesafe.hero.title")}
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 max-w-[600px] mx-auto lg:mx-0 leading-relaxed">
                  {t("quakesafe.hero.desc")}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                  <ArrowButton
                    href="https://quakesafe.funteknoloji.com"
                    variant="light"
                    className="w-full sm:w-auto !bg-white !text-black !h-16 !px-10 !text-lg font-bold hover:scale-105 transition-transform"
                  >
                    {t("nav.open_platform")}
                  </ArrowButton>
                  <div className="flex items-center gap-4 px-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-black bg-slate-800 overflow-hidden"
                        >
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-white/60">12k+ Active Users</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                  {highlights.map((h, i) => (
                    <div key={i} className="space-y-2">
                      <div className="text-[var(--fun-purple)]">{h.icon}</div>
                      <p className="font-bold text-white text-sm">{h.title}</p>
                      <p className="text-xs text-white/40">{h.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative lg:block hidden">
                <div className="absolute -inset-20 bg-[var(--fun-purple)]/20 blur-[120px] rounded-full animate-pulse" />
                <div className="relative aspect-square rounded-[60px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-grid-white opacity-5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-10 border border-[var(--fun-purple)]/30 rounded-full animate-ping opacity-20" />
                      <div className="absolute -inset-20 border border-[var(--fun-purple)]/20 rounded-full animate-ping opacity-10" />
                      <img
                        src="/assets/logos/quakesafe_seffaf.png"
                        alt="QuakeSafe"
                        className="h-48 w-48 object-contain drop-shadow-[0_0_50px_rgba(134,79,254,0.5)] group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  {/* Floating UI Elements */}
                  <div className="absolute top-10 right-10 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl animate-bounce">
                    <Activity className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="absolute bottom-10 left-10 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold tracking-widest uppercase">
                        System Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-24 px-4 lg:px-0 relative">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-24 space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] text-sm font-bold border border-[var(--fun-purple)]/20">
                {t("home.features.badge")}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {t("quakesafe.features.title")}
              </h2>
              <p className="text-slate-400 text-lg max-w-[700px] mx-auto leading-relaxed">
                {t("quakesafe.features.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-[40px] border border-white/5 bg-[#0A0A0A] hover:bg-[#111111] hover:border-[var(--fun-purple)]/50 transition-all group h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--fun-purple)]/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-[var(--fun-purple)]/10 transition-colors" />
                  <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[var(--fun-purple)] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[60px] bg-[var(--fun-purple)] p-12 md:p-32 text-center text-white overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(134,79,254,0.4)]">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-white" />
            </div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-black/20 blur-[100px] rounded-full" />

            <div className="relative z-10 space-y-12">
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter italic uppercase">
                {t("quakesafe.cta.title")}
              </h2>
              <p className="text-xl md:text-3xl text-white/90 max-w-[900px] mx-auto leading-relaxed font-medium">
                {t("quakesafe.cta.desc")}
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <ArrowButton
                  href="https://quakesafe.funteknoloji.com"
                  variant="light"
                  className="!bg-white !text-[var(--fun-purple)] !h-20 !px-12 !text-xl font-black hover:scale-110 transition-transform shadow-2xl"
                >
                  {t("nav.explore_platform")}
                </ArrowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 text-center opacity-40">
        <p className="text-sm font-medium tracking-[0.2em] uppercase">
          QuakeSafe © 2025 by Fun Teknoloji
        </p>
      </section>
    </main>
  );
}
