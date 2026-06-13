import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Fiyatlandırma – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji fiyatlandırma planları. İhtiyacınıza uygun planı seçin." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useLang();
  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">{t("pricing.badge")}</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">
               {t("pricing.title").includes("Yakında") ? (
                 <>
                   {t("pricing.title").split("Yakında")[0]}
                   <span className="text-[var(--fun-purple)]">Yakında</span>
                   {t("pricing.title").split("Yakında")[1]}
                 </>
               ) : t("pricing.title")}
            </h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("pricing.desc")}</p>
          </div>
        </div>
      </section>

    </main>
  );
}
