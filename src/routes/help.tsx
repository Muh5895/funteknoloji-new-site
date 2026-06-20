import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import {
  LifeBuoy,
  MessageCircle,
  FileText,
  ShieldQuestion,
  Mail,
  Discord
} from "lucide-react";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  const { t } = useLang();

  const categories = [
    {
      title: t("faq.cat.general"),
      icon: <ShieldQuestion className="h-6 w-6" />,
      desc: t("home.faq.desc")
    },
    {
      title: t("nav.docs"),
      icon: <FileText className="h-6 w-6" />,
      desc: t("docs.desc")
    },
    {
      title: t("nav.contact"),
      icon: <MessageCircle className="h-6 w-6" />,
      desc: t("contact.desc")
    }
  ];

  return (
    <main className="pt-32 pb-20">
      <section className="px-4 lg:px-5 mb-16">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5 bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)]">
            <div className="main-container text-center">
              <span className="badge-fun badge-fun-purple mb-4 inline-block">
                <LifeBuoy className="h-4 w-4 mr-2 inline" />
                {t("help.title")}
              </span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">
                {t("help.popup")}
              </h1>
              <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">
                {t("footer.description")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-10">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-3xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] h-full flex flex-col hover:border-[var(--fun-purple)] transition-colors group">
                  <div className="h-14 w-14 rounded-2xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-6 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 fun-text">{cat.title}</h3>
                  <p className="fun-text-muted mb-8 flex-1">{cat.desc}</p>
                  <ArrowButton
                    to={i === 0 ? "/faq" : i === 1 ? "/docs" : "/contact"}
                    variant="light"
                    className="w-full justify-center"
                  >
                    {t("home.cta.more")}
                  </ArrowButton>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-20 p-10 md:p-16 rounded-[40px] bg-[#12161F] text-white text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--fun-purple)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("contact.community.title")}</h2>
                <p className="text-white/60 text-lg mb-10 max-w-[600px] mx-auto">
                  {t("contact.community.desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ArrowButton href="https://discord.gg/funteknoloji" variant="light" className="h-14 px-8">
                    {t("contact.community.button")}
                  </ArrowButton>
                  <ArrowButton to="/contact" variant="dark" className="h-14 px-8 border border-white/20">
                    {t("contact.title")}
                  </ArrowButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
