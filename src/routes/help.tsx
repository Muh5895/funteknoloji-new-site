import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/help")({
  head: (ctx) => ({
    meta: [
      { title: "Yardım Merkezi – Fun Teknoloji" },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const { t } = useLang();

  return (
    <main className="pt-32 pb-16 px-4 lg:px-5">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-heading-3 md:text-heading-2 font-medium mb-8 fun-text">{t("help.title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="p-8 rounded-3xl border" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
            <h2 className="text-heading-5 font-medium mb-4 fun-text">{t("nav.support")}</h2>
            <p className="fun-text-muted mb-6">{t("home.faq.subtitle")}</p>
            <a href="/contact" className="btn-fun btn-fun-dark">{t("nav.contact")}</a>
          </section>
          <section className="p-8 rounded-3xl border" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
            <h2 className="text-heading-5 font-medium mb-4 fun-text">{t("nav.faq")}</h2>
            <p className="fun-text-muted mb-6">{t("home.faq.title")}</p>
            <a href="/#faq" className="btn-fun btn-fun-light">{t("nav.faq")}</a>
          </section>
        </div>
      </div>
    </main>
  );
}
