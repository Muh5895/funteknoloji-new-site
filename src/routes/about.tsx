import ScrollReveal from "../components/ScrollReveal";
import { createFileRoute } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";
import { useLang } from "../lib/i18n";
import { useEffect, useState, useRef } from "react";
import { teamMembers } from "../constants/team";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About – Fun Teknoloji" },
      { name: "description", content: "AI & Software Solutions" },
      { property: "og:title", content: "About – Fun Teknoloji" },
      { property: "og:description", content: "AI & Software Solutions" },
      { property: "og:url", content: "https://funteknoloji.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "About – Fun Teknoloji" },
      { name: "twitter:description", content: "AI & Software Solutions" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
            <div className="main-container text-center">
              <span className="badge-fun badge-fun-white mb-4 inline-block">{t("about.badge")}</span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">{t("about.title")}</h1>
              <p className="max-w-[700px] mx-auto text-tagline-1 fun-text-muted">{t("about.desc")}</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <section className="py-16 md:py-24">
          <div className="main-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#12161F] rounded-3xl p-10 md:p-14">
                <span className="badge-fun bg-white/10 text-white mb-6 inline-block">{t("about.mission.badge")}</span>
                <h2 className="text-heading-5 md:text-heading-4 font-medium text-white mb-4">{t("about.mission.title")}</h2>
                <p className="text-tagline-1 text-white/60">{t("about.mission.desc")}</p>
              </div>
              <div className="rounded-3xl p-10 md:p-14" style={{ backgroundColor: 'var(--fun-green)' }}>
                <span className="badge-fun mb-6 inline-block" style={{ backgroundColor: 'var(--fun-card)' }}>{t("about.vision.badge")}</span>
                <h2 className="text-heading-5 md:text-heading-4 font-medium fun-text mb-4">{t("about.vision.title")}</h2>
                <p className="text-tagline-1 fun-text-muted">{t("about.vision.desc")}</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24 px-4 lg:px-5">
          <div className="max-w-[1880px] mx-auto rounded-3xl py-16 md:py-24" style={{ backgroundColor: 'var(--fun-surface)' }}>
            <div className="main-container">
              <div className="text-center mb-14"><h2 className="text-heading-3 md:text-heading-2 font-medium fun-text">{t("about.stats.title")}</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { num: "2025", label: t("about.stats.year") },
                  { num: "100+", label: t("about.stats.clients") },
                  { num: "50+", label: t("about.stats.projects") },
                  { num: `${teamMembers.length}`, label: t("about.stats.team") }
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-heading-3 md:text-heading-2 font-medium fun-text">{s.num}</p>
                    <p className="text-tagline-1 fun-text-muted mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 md:py-24">
          <div className="main-container">
            <div className="text-center mb-14">
              <span className="badge-fun badge-fun-green mb-4 inline-block">{t("about.values.badge")}</span>
              <h2 className="text-heading-3 md:text-heading-2 font-medium fun-text">{t("about.values.title")}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl p-8 transition-colors duration-500" style={{ backgroundColor: 'var(--fun-surface)' }}>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--fun-card)' }}>
                    <span className="text-lg font-bold fun-text-muted">{i}</span>
                  </div>
                  <h3 className="text-heading-6 font-medium mb-2 fun-text">{t(`about.values.${i}.title`)}</h3>
                  <p className="text-tagline-1 fun-text-muted">{t(`about.values.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-4 lg:px-5 pb-16 md:pb-24">
          <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="main-container text-center relative z-10">
              <h2 className="text-heading-3 md:text-heading-2 font-medium text-white mb-4">{t("about.cta.title")}</h2>
              <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8">{t("about.cta.desc")}</p>
              <ArrowButton to="/contact" variant="light">{t("about.cta.button")}</ArrowButton>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
