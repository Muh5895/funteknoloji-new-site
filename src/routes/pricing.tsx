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

      <section className="py-20 md:py-32">
        <div className="main-container text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
             <a href="https://waitlist.funteknoloji.com" className="btn-fun btn-fun-dark h-16 px-10 text-lg">{t("pricing.waitlist")}</a>
             <Link to="/contact" className="btn-fun btn-fun-light h-16 px-10 text-lg border-2">{t("pricing.contact")}</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 pointer-events-none select-none">
             {[1,2,3].map(i => (
               <div key={i} className="rounded-[32px] p-10 border bg-[var(--fun-card)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="h-4 w-24 bg-[var(--fun-stroke-2)] rounded-full mb-4 mx-auto"></div>
                  <div className="h-10 w-32 bg-[var(--fun-stroke-1)] rounded-xl mb-8 mx-auto"></div>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-[var(--fun-surface)] rounded-full"></div>
                    <div className="h-4 w-5/6 bg-[var(--fun-surface)] rounded-full mx-auto"></div>
                    <div className="h-4 w-4/6 bg-[var(--fun-surface)] rounded-full mx-auto"></div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </main>
  );
}
