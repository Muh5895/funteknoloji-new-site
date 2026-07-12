import ScrollReveal from "../components/ScrollReveal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import ArrowButton from "../components/ArrowButton";
import { useLang } from "../lib/i18n";
import CountUp from "../components/CountUp";
import { teamMembers } from "../constants/team";
import { projects } from "../constants/projects";
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
            <h1 className="text-heading-1 md:text-heading-huge lg:text-[124px] lg:leading-[0.95] font-bold mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#12161F] via-[#2A2E38] to-[#40444F] dark:from-white dark:via-white/90 dark:to-white/50">
                {t("home.hero.title")}
              </span>
            </h1>
            <p className="max-w-[950px] mx-auto mb-10 md:mb-16 text-xl md:text-2xl lg:text-3xl fun-text-muted leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
              {t("home.hero.desc")}
            </p>
            <div className="flex md:flex-row flex-col gap-5 items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-both">
              <ArrowButton
                to="/projects"
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
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">{t("home.stats.users_count")}</div>
            <div className="text-sm fun-text-muted uppercase tracking-wider">
              {t("home.stats.users")}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">
              <CountUp end={projects.length} />
            </div>
            <div className="text-sm fun-text-muted uppercase tracking-wider">
              {t("home.stats.projects")}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold fun-text mb-2">
              <CountUp end={teamMembers.length} />
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
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Cpu className="h-40 w-40" />
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors duration-500">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 fun-text">{t("home.features.card1.title")}</h3>
              <p className="fun-text-muted leading-relaxed">{t("home.features.card1.desc")}</p>
            </div>

            <div
              className="rounded-[32px] p-8 md:p-10 relative overflow-hidden group border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-all duration-500"
              style={{ backgroundColor: "var(--fun-card)" }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Globe className="h-40 w-40" />
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors duration-500">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 fun-text">{t("home.features.card2.title")}</h3>
              <p className="fun-text-muted leading-relaxed">{t("home.features.card2.desc")}</p>
            </div>

            <div
              className="rounded-[32px] p-8 md:p-10 relative overflow-hidden group border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)] transition-all duration-500"
              style={{ backgroundColor: "var(--fun-card)" }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <ShieldCheck className="h-40 w-40" />
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors duration-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 fun-text">{t("home.features.card3.title")}</h3>
              <p className="fun-text-muted leading-relaxed">{t("home.features.card3.desc")}</p>
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
          <ArrowButton to="/projects" variant="dark">
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
      image: "/Ai.png",
    },
    {
      title: t("home.services.item2.title"),
      desc: t("home.services.item2.desc"),
      icon: <Code2 className="h-8 w-8" />,
      image: "/Web.png",
    },
    {
      title: t("home.services.item3.title"),
      desc: t("home.services.item3.desc"),
      icon: <Smartphone className="h-8 w-8" />,
      image: "/Telefon.png",
    },
    {
      title: t("home.services.item4.title"),
      desc: t("home.services.item4.desc"),
      icon: <Database className="h-8 w-8" />,
      image: "/Veri.png",
    },
    {
      title: t("home.services.item5.title"),
      desc: t("home.services.item5.desc"),
      icon: <Search className="h-8 w-8" />,
      image: "/Siber.png",
    },
    {
      title: t("home.services.item6.title"),
      desc: t("home.services.item6.desc"),
      icon: <HeartHandshake className="h-8 w-8" />,
      image: "/Danışmanlık.jpeg",
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
          <p className="text-tagline-1 fun-text-muted lg:max-w-[530px] lg:mx-auto md:text-center">
            {t("home.services.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div key={i} className={`${i === 0 ? "md:col-span-2" : ""} group`}>
              <div
                className="h-full rounded-[36px] border p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                style={{
                  backgroundColor: "var(--fun-surface)",
                  borderColor: "var(--fun-stroke-1)",
                }}
              >
                {/* Mobile: Image block (shows service image on mobile instead of just small icon block) - Sized up nicely and elegantly to h-28 w-28 to fill space without full widening */}
                <div className="md:hidden flex justify-start mb-3">
                  <div className="h-28 w-28 rounded-[24px] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-lg bg-[var(--fun-card)] border border-[var(--fun-stroke-1)]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <aside
                  className={`${i === 0 ? "md:col-span-9" : "md:col-span-7"} flex flex-col justify-center space-y-6 text-left md:order-2 py-2`}
                >
                  <div className="space-y-3">
                    <h3 className="text-heading-5 md:text-heading-3 font-bold fun-text tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-tagline-1 lg:text-base fun-text-muted leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="flex justify-start pt-2">
                    <Link
                      to="/projects"
                      className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full ring-8 ring-[var(--fun-card)] transition-all hover:bg-[var(--fun-purple)] hover:scale-105 active:scale-95"
                      style={{ backgroundColor: "var(--fun-text)" }}
                    >
                      <svg
                        className="h-5 w-5"
                        style={{ color: "var(--fun-surface)" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
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

                {/* Desktop: Image block - Placed first for LEFT side on desktop, adjusted to be larger, perfectly centered, and styled elegantly */}
                <div className={`${i === 0 ? "md:col-span-3 md:justify-start md:pl-2" : "md:col-span-5"} hidden md:flex items-center justify-center md:order-1`}>
                  <div
                    className={`rounded-[32px] overflow-hidden ${i === 0 ? "h-[220px] w-[220px]" : "h-[180px] w-[180px]"} transition-transform duration-500 relative border border-[var(--fun-stroke-1)] shadow-2xl flex items-center justify-center bg-black/5 dark:bg-white/5`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
