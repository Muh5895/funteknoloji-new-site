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
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  component: QuakeSafePage,
});

function QuakeSafePage() {
  const { t } = useLang();

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

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[700px] flex items-center bg-[#050505] border border-white/5 shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--fun-purple)_0%,_transparent_70%)] opacity-20" />
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
              <div className="space-y-10 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                    {t("nav.quakesafe")} Early Access
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic">
                  {t("quakesafe.hero.title")}
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-[600px] mx-auto lg:mx-0 leading-relaxed font-medium">
                  {t("quakesafe.hero.desc")}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                  <ArrowButton
                    href="https://quakesafe.funteknoloji.com"
                    variant="light"
                    className="w-full sm:w-auto !bg-white !text-black h-14 !px-10 text-lg font-bold"
                  >
                    {t("nav.open_platform")}
                  </ArrowButton>
                  <ArrowButton
                    href="https://waitlist.funteknoloji.com"
                    variant="dark"
                    className="w-full sm:w-auto h-14 !px-10 text-lg font-bold border border-white/10 hover:bg-white/5"
                  >
                    {t("nav.waitlist")}
                  </ArrowButton>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                  {[
                    { label: "Saniyeler Önemli", value: "0.5s Yanıt" },
                    { label: "Kesintisiz", value: "Mesh Ağı" },
                    { label: "Güvenli", value: "Uçtan Uca" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                        {stat.label}
                      </p>
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square rounded-[60px] border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-transparent p-1 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1518005020251-58296d87ba67"
                    className="w-full h-full object-cover grayscale opacity-60 hover:scale-110 transition-transform duration-1000"
                    alt="QuakeSafe Tech"
                  />
                  <div className="absolute bottom-8 left-8 right-8 z-20 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src="/assets/logos/quakesafe_seffaf.png"
                        alt="QuakeSafe"
                        className="h-16 w-16 object-contain"
                      />
                      <span className="text-3xl font-black tracking-tighter uppercase italic">
                        QuakeSafe
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full bg-[var(--fun-purple)] animate-shimmer"
                            style={{ width: "60%", animationDelay: `${i * 0.2}s` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-[var(--fun-purple)]/20 blur-[100px] rounded-full" />
                <div className="absolute -bottom-20 -left-20 h-60 w-60 bg-blue-500/10 blur-[120px] rounded-full" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 lg:px-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--fun-purple)]/5 blur-[150px] pointer-events-none" />

        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--fun-purple)]/10 border border-[var(--fun-purple)]/20">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--fun-purple)]">
                  {t("home.features.badge")}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black fun-text tracking-tighter uppercase italic">
                {t("quakesafe.features.title")}
              </h2>
              <p className="fun-text-muted text-xl max-w-[800px] mx-auto font-medium">
                {t("quakesafe.features.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="p-10 rounded-[40px] border border-white/5 bg-[#0A0A0A] hover:bg-[#0D0D0D] hover:border-white/10 transition-all group h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="h-5 w-5 text-[var(--fun-purple)]" />
                  </div>
                  <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500 shadow-xl border border-white/5">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold fun-text mb-4 tracking-tight">{f.title}</h3>
                  <p className="fun-text-muted leading-relaxed font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[60px] bg-[var(--fun-purple)] p-16 md:p-32 text-center text-white overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(134,79,254,0.3)]">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-grid-white opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/10 blur-[150px] rounded-full rotate-12" />
            </div>

            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none max-w-[1000px] mx-auto">
                {t("quakesafe.cta.title")}
              </h2>
              <p className="text-xl md:text-3xl text-white/80 max-w-[800px] mx-auto font-medium leading-relaxed">
                {t("quakesafe.cta.desc")}
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <ArrowButton
                  href="https://quakesafe.funteknoloji.com"
                  variant="light"
                  className="h-16 !px-12 text-xl font-bold !bg-white !text-[var(--fun-purple)] shadow-2xl"
                >
                  {t("nav.explore_platform")}
                </ArrowButton>
                <ArrowButton
                  href="https://waitlist.funteknoloji.com"
                  variant="dark"
                  className="h-16 !px-12 text-xl font-bold !bg-black !text-white border-none shadow-2xl hover:scale-105"
                >
                  {t("quakesafe.cta.button")}
                </ArrowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
