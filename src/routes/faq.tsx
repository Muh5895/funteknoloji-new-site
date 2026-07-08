import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [{ title: "SSS - Fun Teknoloji" }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    { id: "general", label: t("faq.cat.general") },
    { id: "services", label: t("faq.cat.services") },
    { id: "technical", label: t("faq.cat.technical") },
    { id: "security", label: t("faq.cat.security") },
  ];

  const faqs = [
    {
      category: "general",
      q: t("faq.q1.q"),
      a: t("faq.q1.a"),
    },
    {
      category: "general",
      q: t("faq.q2.q"),
      a: t("faq.q2.a"),
    },
    {
      category: "general",
      q: t("faq.q3.q"),
      a: t("faq.q3.a"),
    },
    {
      category: "services",
      q: t("faq.q4.q"),
      a: t("faq.q4.a"),
    },
    {
      category: "services",
      q: t("faq.q5.q"),
      a: t("faq.q5.a"),
    },
    {
      category: "services",
      q: t("faq.q6.q"),
      a: t("faq.q6.a"),
    },
    {
      category: "technical",
      q: t("faq.q7.q"),
      a: t("faq.q7.a"),
    },
    {
      category: "technical",
      q: t("faq.q8.q"),
      a: t("faq.q8.a"),
    },
    {
      category: "technical",
      q: t("faq.q9.q"),
      a: t("faq.q9.a"),
    },
    {
      category: "security",
      q: t("faq.q10.q"),
      a: t("faq.q10.a"),
    },
    {
      category: "security",
      q: t("faq.q11.q"),
      a: t("faq.q11.a"),
    },
  ];

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="badge-fun badge-fun-gray mb-4 inline-block">{t("faq.badge")}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold fun-text mb-4">
              {t("faq.title")}
            </h1>
            <p className="fun-text-muted text-lg">{t("faq.desc")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat.id ? "bg-[var(--fun-purple)] text-white shadow-lg" : "bg-[var(--fun-card)] fun-text border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)]"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <ScrollReveal key={i}>
              <div
                className="rounded-3xl bg-[var(--fun-card)] border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: openIndex === i ? "var(--fun-purple)" : "var(--fun-stroke-1)",
                }}
              >
                <button
                  className="flex items-center justify-between py-6 px-8 w-full text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-xl font-bold fun-text">{faq.q}</span>
                  <span
                    className={`transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  >
                    <svg
                      className="h-6 w-6 fun-text"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
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
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? "max-h-[500px]" : "max-h-0"}`}
                >
                  <div className="px-8 pb-8 text-lg fun-text-muted leading-relaxed">{faq.a}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
