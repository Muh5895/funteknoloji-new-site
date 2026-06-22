import ScrollReveal from "../components/ScrollReveal";
import { createFileRoute, Link } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";
import { useLang } from "../lib/i18n";
import { useEffect, useState, useRef } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Hizmetler - Fun Teknoloji" },
      { name: "description", content: "AI & Software Solutions" },
      { property: "og:title", content: "Hizmetler - Fun Teknoloji" },
      { property: "og:description", content: "AI & Software Solutions" },
      { property: "og:url", content: "https://funteknoloji.com/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Services – Fun Teknoloji" },
      { name: "twitter:description", content: "AI & Software Solutions" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLang();
  const services = [
    {
      title: t("home.services.item1.title"),
      desc: t("home.services.item1.desc"),
      features: [
        t("home.features.card1.title"),
        t("home.howitworks.step1.title"),
        t("home.howitworks.step2.title"),
        t("home.howitworks.step3.title"),
      ],
    },
    {
      title: t("home.services.item3.title"),
      desc: t("home.services.item3.desc"),
      features: [
        t("home.features.card2.title"),
        t("service.feature.ios_android"),
        t("service.feature.ui_ux"),
        t("service.feature.performance"),
      ],
    },
    {
      title: t("home.services.item2.title"),
      desc: t("home.services.item2.desc"),
      features: [
        t("service.feature.machine_learning"),
        t("service.feature.nlp"),
        t("service.feature.computer_vision"),
        t("service.feature.automation"),
      ],
    },
    {
      title: t("home.services.item4.title"),
      desc: t("home.services.item4.desc"),
      features: [
        t("service.feature.cloud_migration"),
        t("service.feature.devops"),
        t("service.feature.scalability"),
        t("service.feature.security"),
      ],
    },
    {
      title: t("home.services.item5.title"),
      desc: t("home.services.item5.desc"),
      features: [
        t("service.feature.big_data"),
        t("service.feature.bi"),
        t("service.feature.realtime_analytics"),
        t("service.feature.visualization"),
      ],
    },
    {
      title: t("home.services.item6.title"),
      desc: t("home.services.item6.desc"),
      features: [
        t("service.feature.security_audits"),
        t("service.feature.pentesting"),
        t("service.feature.compliance"),
        t("service.feature.monitoring"),
      ],
    },
  ];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div
            className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5"
            style={{ backgroundColor: "var(--fun-surface)" }}
          >
            <div className="main-container text-center">
              <span className="badge-fun badge-fun-white mb-4 inline-block">
                {t("home.services.badge")}
              </span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">
                {t("home.services.title")}
              </h1>
              <p className="max-w-[700px] mx-auto text-tagline-1 fun-text-muted">
                {t("home.services.desc")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-16 md:py-24 px-4 lg:px-0">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={i} className={i === 0 ? "md:col-span-2" : "h-full"}>
                <div
                  className={`h-full rounded-3xl p-8 md:p-10 transition-colors duration-500 hover:bg-[var(--fun-surface-hover)] ${i === 0 ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "flex flex-col"}`}
                  style={{
                    backgroundColor: "var(--fun-surface)",
                    border: "1px solid var(--fun-stroke-1)",
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="space-y-6 flex-1">
                      <div
                        className="h-14 w-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "var(--fun-card)" }}
                      >
                        <span className="text-xl font-bold fun-text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-heading-5 md:text-heading-4 font-medium fun-text">
                        {service.title}
                      </h3>
                      <p className="text-tagline-1 fun-text-muted">{service.desc}</p>
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/contact"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full ring-8 ring-[var(--fun-card)] transition-all hover:bg-[#6C5CE7]"
                        style={{ backgroundColor: "var(--fun-text)" }}
                      >
                        <svg
                          className="h-5 w-5"
                          style={{ color: "var(--color-background)" }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <ul className="space-y-3 mt-6 md:mt-0">
                      {service.features.map((f, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-3 rounded-xl p-4 transition-transform hover:translate-x-1"
                          style={{ backgroundColor: "var(--fun-card)" }}
                        >
                          <svg
                            className="h-5 w-5 shrink-0 text-[#6C5CE7]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span className="text-tagline-1 fun-text">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="main-container text-center relative z-10">
            <h2 className="text-heading-3 md:text-heading-2 font-medium text-white mb-4">
              {t("home.cta.title")}
            </h2>
            <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8">
              {t("home.cta.desc")}
            </p>
            <ArrowButton to="/contact" variant="light">
              {t("home.cta.button")}
            </ArrowButton>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
