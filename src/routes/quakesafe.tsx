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
  Cloud,
  Zap,
  Activity,
  Clock,
  HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  head: () => ({
    meta: [
      { title: "QuakeSafe - Yapay Zeka Destekli Deprem Güvenliği Altyapısı" },
      { name: "description", content: "QuakeSafe; yapay zeka ve akıllı sensör ağları kullanarak deprem öncesi, anı ve sonrasında saniyelerin kritik olduğu zamanlarda hayat kurtaran bir deprem güvenliği teknolojisidir." },
      { name: "keywords", content: "QuakeSafe, deprem güvenliği, anlık deprem uyarısı, afet yönetimi, deprem takip sistemi, mesh ağı, acil durum yardımı" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "QuakeSafe - Yapay Zeka Destekli Deprem Güvenliği Altyapısı" },
      { property: "og:description", content: "Deprem dalgaları ulaşmadan saniyeler önce kritik uyarılar alın, sevdiklerinizin konumunu anlık takip edin." },
      { property: "og:url", content: "https://funteknoloji.com/quakesafe" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://funteknoloji.com/assets/logos/quakesafe_seffaf.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@funteknoloji_" },
      { name: "twitter:title", content: "QuakeSafe - Deprem Güvenliği Teknolojileri" },
      { name: "twitter:description", content: "Deprem anında sevdiklerinizle güvende kalın. Yapay zeka ve mesh ağları ile kesintisiz iletişim." },
      { name: "twitter:image", content: "https://funteknoloji.com/assets/logos/quakesafe_seffaf.png" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/quakesafe" }],
  }),
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
    <main className="space-y-0">
      {/* Hero Section - Increased bottom margin and padding for breathing room */}
      <section className="pt-32 pb-24 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[550px] flex items-center bg-[#0D0E16] border border-white/10">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#864FFE]/15 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-full h-full bg-dots opacity-10" />
            </div>

            <div className="main-container relative z-10 py-24 lg:py-32 text-center max-w-[900px] mx-auto">
              <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <div className="h-20 w-20 rounded-full border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden shadow-2xl">
                  <img
                    src="/assets/logos/quakesafe_seffaf.png"
                    alt="QuakeSafe Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-3xl font-extrabold text-white tracking-tighter">QuakeSafe</span>
              </div>

              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-extrabold text-white leading-tight capitalize mb-6">
                {t("quakesafe.hero.title")}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-[700px] mx-auto mb-10 leading-relaxed">
                {t("quakesafe.hero.desc")}
              </p>

              <div className="flex justify-center">
                <ArrowButton
                  href="https://quakesafe.funteknoloji.com"
                  variant="light"
                  className="h-14 px-8 !bg-white !text-black hover:!bg-[var(--fun-purple)] hover:!text-white"
                >
                  {t("nav.open_platform")}
                </ArrowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Core Features Network Section */}
      <section className="py-24 px-4 lg:px-0">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
              <span className="badge-fun badge-fun-gray">{t("home.features.badge")}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold fun-text">
                {t("quakesafe.features.title")}
              </h2>
              <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
                {t("quakesafe.features.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group h-full">
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

      {/* Call To Action */}
      <section className="py-24 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] bg-[var(--fun-purple)] p-12 md:p-24 text-center text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-white" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-extrabold mb-8">{t("quakesafe.cta.title")}</h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-[800px] mx-auto mb-12">
                {t("quakesafe.cta.desc")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ArrowButton
                  href="https://quakesafe.funteknoloji.com"
                  variant="light"
                  className="!text-[var(--fun-purple)] font-semibold h-14 px-8"
                >
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
