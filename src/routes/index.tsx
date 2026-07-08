import ScrollReveal from "../components/ScrollReveal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import ArrowButton from "../components/ArrowButton";
import { useLang } from "../lib/i18n";
import CountUp from "../components/CountUp";
import {
  Cpu,
  Smartphone,
  ShieldCheck,
  Zap,
  Globe,
  Code2,
  Database,
  Search,
  HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fun Teknoloji - Geleceğin Teknolojileri" },
      { name: "description", content: "AI & Software Solutions" },
      { property: "og:title", content: "Fun Teknoloji - Geleceğin Teknolojileri" },
      { property: "og:description", content: "AI & Software Solutions" },
      { property: "og:url", content: "https://funteknoloji.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Fun Teknoloji" },
      { name: "twitter:description", content: "AI & Software Solutions" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  return (
    <main className="space-y-0">
      <HeroSection t={t} />
      <ScrollReveal>
        <StatsSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <WhatWeDoSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturesSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorksSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <ServicesSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <FAQSection t={t} />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection t={t} />
      </ScrollReveal>
    </main>
  );
}

/* ============ HERO ============ */
function HeroSection({ t }: { t: (k: string) => string }) {
  return (
    <section className="pt-28 px-4 lg:px-5">
      <div
        className="max-w-[1880px] mx-auto relative pt-20 md:pt-32 border overflow-hidden rounded-3xl xl:rounded-[32px] animate-in fade-in slide-in-from-bottom-8 duration-1000"
        style={{ backgroundColor: "var(--fun-surface)", borderColor: "var(--fun-stroke-1)" }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 opacity-50 dark:opacity-40 pointer-events-none flex items-center justify-center">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[60px] md:blur-[140px] bg-[radial-gradient(circle,rgba(108,92,231,0.4)_0%,transparent_70%)] animate-pulse duration-[4000ms]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[60px] md:blur-[140px] bg-[radial-gradient(circle,rgba(134,79,254,0.4)_0%,transparent_70%)] animate-pulse duration-[6000ms]" />
          {/* Mobile specific glow - more vivid */}
          <div className="absolute md:hidden inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(108,92,231,0.25)_0%,transparent_60%)]" />
          <div className="absolute md:hidden inset-0 bg-gradient-to-b from-[var(--fun-purple)]/10 via-transparent to-transparent" />
        </div>

        <div className="hidden md:block absolute w-full h-full top-0 left-0 z-10">
          <div
            className="absolute left-[7%] 2xl:left-[16%] w-px h-full top-0"
            style={{ backgroundColor: "var(--fun-stroke-1)" }}
          />
          <div
            className="absolute right-[7%] 2xl:right-[16%] w-px h-full top-0"
            style={{ backgroundColor: "var(--fun-stroke-1)" }}
          />
          <div
            className="absolute w-full h-px top-[43%]"
            style={{ backgroundColor: "var(--fun-stroke-1)" }}
          />
        </div>

        <div className="main-container relative z-30 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-12 lg:mb-24 w-full">
            <span className="badge-fun badge-fun-gray mb-6 inline-block text-xs tracking-wider animate-in fade-in zoom-in duration-700 delay-100 fill-mode-both">
              {t("home.hero.badge")}
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#12161F] via-[#2A2E38] to-[#40444F] dark:from-white dark:via-white/90 dark:to-white/50">
                {t("home.hero.title")}
              </span>
            </h1>
            <p className="max-w-[950px] mx-auto mb-10 md:mb-16 text-xl md:text-2xl lg:text-3xl fun-text-muted leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
              {t("home.hero.desc")}
            </p>
            <div className="flex md:flex-row flex-col gap-5 items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-both">
              <ArrowButton
                to="/services"
                variant="dark"
                className="w-full md:w-auto h-16 px-8 text-xl font-medium shadow-2xl shadow-indigo-500/20"
              >
                {t("home.hero.explore")}
              </ArrowButton>
              <ArrowButton
                href="https://waitlist.funteknoloji.com"
                variant="light"
                className="w-full md:w-auto h-16 px-8 text-xl font-medium border-2"
              >
                {t("home.hero.start")}
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ STATS SECTION ============ */
function StatsSection({ t }: { t: (k: string) => string }) {
  return (
    <section className="py-20 border-y px-4 lg:px-0" style={{ borderColor: "var(--fun-stroke-1)" }}>
      <div className="main-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">10+</div>
            <div className="text-sm fun-text-muted uppercase tracking-wider">
              {t("home.stats.users")}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">
              <CountUp end={150} />+
            </div>
            <div className="text-sm fun-text-muted uppercase tracking-wider">
              {t("home.stats.projects")}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">
              <CountUp end={1} />
            </div>
            <div className="text-sm fun-text-muted uppercase tracking-wider">
              {t("home.stats.team")}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">
              <CountUp end={24} />
              /7
            </div>
            <div className="text-sm fun-text-muted uppercase tracking-wider">
              {t("home.stats.support")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ WHAT WE DO ============ */
function WhatWeDoSection({ t }: { t: (k: string) => string }) {
  return (
    <section className="px-4 lg:px-5">
      <div className="bg-[#12161F] max-w-[1880px] rounded-3xl xl:rounded-[32px] px-5 mx-auto">
        <div className="max-w-[1400px] mx-auto py-20 lg:py-32 xl:py-40">
          <h2 className="text-center text-white font-light text-heading-4 sm:text-heading-3 md:text-heading-2 lg:text-heading-1 leading-[1.3]">
            {t("home.whatwedo.text")}
          </h2>
        </div>
      </div>
    </section>
  );
}

/* ============ FEATURES ============ */
function FeaturesSection({ t }: { t: (k: string) => string }) {
  return (
    <section className="px-4 lg:px-5 mt-10">
      <div
        className="mx-auto max-w-[1880px] rounded-3xl py-20 lg:py-32"
        style={{ backgroundColor: "var(--fun-surface)" }}
      >
        <div className="main-container">
          <div className="mb-12 space-y-4 text-center lg:mx-auto lg:max-w-[740px]">
            <span className="badge-fun badge-fun-white">{t("home.features.badge")}</span>
            <h2 className="text-heading-3 md:text-heading-2 font-medium fun-text">
              {t("home.features.title")}
            </h2>
            <p className="text-tagline-1 fun-text-muted">{t("home.features.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="rounded-[32px] p-8 md:p-10 relative overflow-hidden group border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-all duration-500"
              style={{ backgroundColor: "var(--fun-card)" }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <Cpu className="h-40 w-40" />
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors duration-500">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 fun-text">{t("home.features.card1.title")}</h3>
              <p className="fun-text-muted leading-relaxed mb-6">{t("home.features.card1.desc")}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-xs fun-text">
                  Neural Networks
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-xs fun-text">
                  LLM
                </span>
              </div>
            </div>

            <div
              className="rounded-[32px] p-8 md:p-10 relative overflow-hidden group border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-all duration-500"
              style={{ backgroundColor: "var(--fun-card)" }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <Globe className="h-40 w-40" />
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors duration-500">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 fun-text">{t("home.features.card2.title")}</h3>
              <p className="fun-text-muted leading-relaxed mb-6">{t("home.features.card2.desc")}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-xs fun-text">
                  Global CDN
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-xs fun-text">
                  Autoscale
                </span>
              </div>
            </div>

            <div
              className="rounded-[32px] p-8 md:p-10 relative overflow-hidden group border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-all duration-500"
              style={{ backgroundColor: "var(--fun-card)" }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <ShieldCheck className="h-40 w-40" />
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors duration-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 fun-text">{t("home.features.card3.title")}</h3>
              <p className="fun-text-muted leading-relaxed mb-6">{t("home.features.card3.desc")}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-xs fun-text">
                  AES-256
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-xs fun-text">
                  SSL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ HOW IT WORKS ============ */
function HowItWorksSection({ t }: { t: (k: string) => string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const steps = [
    {
      title: t("home.howitworks.step1.title"),
      desc: t("home.howitworks.step1.desc"),
      bg: "var(--fun-green)",
    },
    {
      title: t("home.howitworks.step2.title"),
      desc: t("home.howitworks.step2.desc"),
      bg: "var(--fun-surface)",
    },
    {
      title: t("home.howitworks.step3.title"),
      desc: t("home.howitworks.step3.desc"),
      bg: "var(--fun-green)",
    },
  ];
  return (
    <section className="py-20 md:py-32 px-4 lg:px-0 overflow-hidden">
      <div className="main-container">
        <div className="mb-12 text-center lg:mx-auto lg:max-w-[730px]">
          <span className="badge-fun badge-fun-gray mb-4 inline-block">
            {t("home.howitworks.badge")}
          </span>
          <h2 className="text-heading-3 md:text-heading-2 font-medium mb-3 fun-text">
            {t("home.howitworks.title")}
          </h2>
          <p className="text-tagline-1 fun-text-muted">{t("home.howitworks.desc")}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex w-full max-w-[408px] flex-col justify-between rounded-[20px] p-10 min-h-[320px] hover:scale-105 transition-all duration-500 relative"
              style={{ backgroundColor: step.bg }}
            >
              <div className="text-center">
                <div
                  className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#6C5CE7] transition-colors duration-500 relative overflow-hidden"
                  style={{ backgroundColor: "var(--fun-card)" }}
                >
                  <span className="text-2xl font-bold fun-text-muted group-hover:text-white transition-colors relative z-10">
                    {i + 1}
                  </span>
                  <div className="absolute inset-0 bg-[#6C5CE7] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-heading-6 md:text-heading-5 font-medium fun-text">
                  {step.title}
                </h3>
                <p className="text-tagline-1 fun-text-muted">{step.desc}</p>
              </div>

              {/* Tick animation overlay on hover */}
              <div className="absolute top-4 right-4">
                <div
                  className={`h-8 w-8 rounded-full bg-[var(--fun-purple)] flex items-center justify-center transition-all duration-500 ${hoveredIndex === i ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"}`}
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      className={`transition-all duration-700 delay-300 ${hoveredIndex === i ? "stroke-dashoffset-0 animate-in fade-in duration-500" : "stroke-dashoffset-100"}`}
                      strokeDasharray="24"
                      strokeDashoffset={hoveredIndex === i ? 0 : 24}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <ArrowButton to="/services" variant="dark">
            {t("home.hero.explore")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
function ServicesSection({ t }: { t: (k: string) => string }) {
  const services = [
    {
      title: t("home.services.item1.title"),
      desc: t("home.services.item1.desc"),
      icon: <Cpu className="h-8 w-8" />,
    },
    {
      title: t("home.services.item2.title"),
      desc: t("home.services.item2.desc"),
      icon: <Code2 className="h-8 w-8" />,
    },
    {
      title: t("home.services.item3.title"),
      desc: t("home.services.item3.desc"),
      icon: <Smartphone className="h-8 w-8" />,
    },
    {
      title: t("home.services.item4.title"),
      desc: t("home.services.item4.desc"),
      icon: <Database className="h-8 w-8" />,
    },
    {
      title: t("home.services.item5.title"),
      desc: t("home.services.item5.desc"),
      icon: <Search className="h-8 w-8" />,
    },
    {
      title: t("home.services.item6.title"),
      desc: t("home.services.item6.desc"),
      icon: <HeartHandshake className="h-8 w-8" />,
    },
  ];

  return (
    <section className="py-14 md:py-24 overflow-hidden px-4 lg:px-0">
      <div className="main-container">
        <div className="mb-12 text-left md:text-center lg:max-w-[850px] lg:mx-auto">
          <span className="badge-fun badge-fun-gray mb-5 inline-block">
            {t("home.services.badge")}
          </span>
          <h2 className="text-heading-3 md:text-heading-2 font-medium mb-3 fun-text">
            {t("home.services.title")}
          </h2>
          <p className="text-tagline-1 fun-text-muted lg:max-w-[530px] lg:mx-auto">
            {t("home.services.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div key={i} className={`${i === 0 ? "md:col-span-2" : ""} group`}>
              <div
                className={`h-full rounded-3xl border p-6 md:p-8 ${i === 0 ? "grid grid-cols-1 md:grid-cols-12 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}`}
                style={{
                  backgroundColor: "var(--fun-surface)",
                  borderColor: "var(--fun-stroke-1)",
                }}
              >
                {/* Mobile: Icon first, then content */}
                <div className="md:hidden flex justify-start mb-6">
                  <div className="h-20 w-20 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-lg text-[var(--fun-purple)] bg-[var(--fun-card)]">
                    {service.icon}
                  </div>
                </div>

                <aside
                  className={`${i === 0 ? "md:col-span-4" : ""} md:pt-8 flex flex-col justify-between space-y-5 text-left`}
                >
                  <div className="space-y-2">
                    <h3 className="text-heading-5 md:text-heading-4 font-medium fun-text">
                      {service.title}
                    </h3>
                    <p className="text-tagline-1 fun-text-muted">{service.desc}</p>
                  </div>
                  <div className="flex justify-start">
                    <Link
                      to="/services"
                      className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full ring-8 ring-[var(--fun-card)] transition-all hover:bg-[var(--fun-purple)]"
                      style={{ backgroundColor: "var(--fun-text)" }}
                    >
                      <svg
                        className="h-5 w-5"
                        style={{ color: "var(--fun-surface)" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </aside>

                {/* Desktop: Image/Icon block */}
                <div
                  className={`${i === 0 ? "md:col-span-8" : ""} hidden md:flex rounded-xl overflow-hidden min-h-[240px] md:min-h-[300px] transition-transform duration-500 items-center justify-center relative`}
                  style={{
                    background: "linear-gradient(135deg, var(--fun-stroke-2), var(--fun-surface))",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-center p-8 relative z-10">
                    <div
                      className="mx-auto h-20 w-20 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-lg text-[var(--fun-purple)]"
                      style={{ backgroundColor: "var(--fun-card)" }}
                    >
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
function TestimonialsSection({ t }: { t: (k: string) => string }) {
  const testimonials = [
    { name: t("home.testimonials.t1.name"), text: t("home.testimonials.t1.text") },
    { name: t("home.testimonials.t2.name"), text: t("home.testimonials.t2.text") },
    { name: t("home.testimonials.t3.name"), text: t("home.testimonials.t3.text") },
    { name: t("home.testimonials.t4.name"), text: t("home.testimonials.t4.text") },
    { name: t("home.testimonials.t5.name"), text: t("home.testimonials.t5.text") },
    { name: t("home.testimonials.t6.name"), text: t("home.testimonials.t6.text") },
  ];

  const colors = [
    "from-[#F4F8E7] to-[#D485FF]",
    "from-[#E8F4FD] to-[#4A90E2]",
    "from-[#FFE8E8] to-[#FF6B6B]",
    "from-[#F0E6FF] to-[#8B5CF6]",
    "from-[#E6F7FF] to-[#1890FF]",
    "from-[#FFF7E6] to-[#FF8C00]",
  ];

  return (
    <section className="py-16 md:py-24 px-4 lg:px-0">
      <div className="main-container">
        <div className="text-center mb-14">
          <span className="badge-fun badge-fun-green mb-4 inline-block">
            {t("home.testimonials.badge")}
          </span>
          <h2 className="text-heading-3 md:text-heading-2 font-medium xl:max-w-[906px] xl:mx-auto fun-text">
            {t("home.testimonials.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="rounded-[20px] p-6 sm:p-8 border"
              style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
            >
              <div className="flex items-center justify-between pb-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7.257.486c.275-.648 1.211-.648 1.486 0l1.623 3.827a1 1 0 00.68.484l4.213.331c.714.056 1.003.93.459 1.387l-3.21 2.696a1 1 0 00-.259.783l.98 4.031c.166.683-.591 1.223-1.203.857l-3.606-2.16a1 1 0 00-1.04 0l-3.607 2.16c-.611.366-1.369-.174-1.203-.857l.981-4.031a1 1 0 00-.26-.783L.282 6.515C-.261 6.058.028 5.184.742 5.128l4.213-.331a1 1 0 00.68-.484L7.257.486z"
                        fill="#864FFE"
                      />
                    </svg>
                  ))}
                </div>
                <svg className="h-5 w-5 fun-text" viewBox="0 0 25 24" fill="none">
                  <path
                    d="M17.844 4.242h2.76l-6.03 6.777 7.094 9.223h-5.554l-4.35-5.594-4.978 5.594h-2.762l6.45-7.25-6.806-8.75h5.696l3.932 5.113 4.548-5.113zm-.969 14.376h1.53L8.532 5.782H6.891l9.984 12.836z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="pb-6 text-tagline-1 fun-text" style={{ opacity: 0.8 }}>
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`h-11 w-11 rounded-full bg-gradient-to-br ${colors[i]} flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform`}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  <span className="text-sm font-bold text-white relative z-10">{t.name[0]}</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold fun-text">{t.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQSection({ t }: { t: (k: string) => string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: t("home.faq.q1"), a: t("home.faq.a1") },
    { q: t("home.faq.q2"), a: t("home.faq.a2") },
    { q: t("home.faq.q3"), a: t("home.faq.a3") },
    { q: t("home.faq.q4"), a: t("home.faq.a4") },
    { q: t("home.faq.q5"), a: t("home.faq.a5") },
    { q: t("home.faq.q6"), a: t("home.faq.a6") },
    { q: t("home.faq.q7"), a: t("home.faq.a7") },
  ];

  return (
    <section className="px-4 lg:px-5">
      <div
        className="max-w-[1880px] mx-auto py-20 md:py-28 rounded-2xl md:rounded-[32px]"
        style={{ backgroundColor: "var(--fun-surface)" }}
      >
        <div className="main-container">
          <div className="text-center space-y-4 max-w-[720px] mx-auto mb-14">
            <span className="badge-fun badge-fun-white uppercase">{t("home.faq.badge")}</span>
            <h2 className="text-heading-3 md:text-heading-2 font-medium fun-text">
              {t("home.faq.title")}
            </h2>
            <p className="text-tagline-1 fun-text-muted">{t("home.faq.desc")}</p>
          </div>

          <div className="max-w-[770px] mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl md:rounded-[32px] px-6 md:px-8"
                style={{ backgroundColor: "var(--fun-card)" }}
              >
                <button
                  className="flex items-center justify-between py-6 md:py-8 w-full cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="flex-1 text-left text-tagline-1 lg:text-heading-6 font-normal fun-text">
                    {faq.q}
                  </span>
                  <span
                    className={`ml-2.5 block transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  >
                    <svg
                      className="h-4 w-4 fun-text"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${openIndex === i ? "max-h-[500px]" : "max-h-0"}`}
                >
                  <div className="pt-6 pb-8" style={{ borderTop: "1px solid var(--fun-stroke-2)" }}>
                    <p className="text-tagline-1 fun-text-muted">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CTA ============ */
function CTASection({ t }: { t: (k: string) => string }) {
  return (
    <section className="px-4 lg:px-5 py-16 md:py-24">
      <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="main-container text-center relative z-10">
          <h2 className="text-heading-3 md:text-heading-2 lg:text-heading-2 font-medium text-white mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-tagline-1 text-white/60 max-w-[600px] mx-auto mb-10">
            {t("home.cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <ArrowButton to="/contact" variant="light">
              {t("home.cta.button")}
            </ArrowButton>
            <Link
              to="/about"
              className="btn-fun bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <span>{t("home.cta.more")}</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
