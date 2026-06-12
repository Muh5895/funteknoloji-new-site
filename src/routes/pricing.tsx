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
    <main className="min-h-screen flex flex-col">
      <section className="pt-32 pb-16 px-4 lg:px-5 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-[1290px] w-full mx-auto text-center">
          <div className="mb-12 animate-in fade-in zoom-in duration-700">
            <span className="badge-fun badge-fun-gray mb-6 inline-block uppercase tracking-widest text-xs font-bold">{t("pricing.badge")}</span>
            <h1 className="text-5xl md:text-8xl font-bold fun-text mb-8 tracking-tight">
               {t("pricing.title").split("Yakında")[0]}
               <span className="text-[var(--fun-purple)]">Yakında</span>
               {t("pricing.title").split("Yakında")[1]}
            </h1>
            <p className="max-w-[700px] mx-auto text-xl md:text-2xl fun-text-muted leading-relaxed opacity-80 mb-12">
              {t("pricing.desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href="https://waitlist.funteknoloji.com" className="btn-fun btn-fun-dark h-16 px-10 text-lg">{t("pricing.waitlist")}</a>
               <Link to="/contact" className="btn-fun btn-fun-light h-16 px-10 text-lg border-2">{t("pricing.contact")}</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 pointer-events-none grayscale select-none">
             {[1,2,3].map(i => (
               <div key={i} className="rounded-[32px] p-10 border bg-[var(--fun-card)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="h-4 w-24 bg-[var(--fun-stroke-2)] rounded-full mb-4"></div>
                  <div className="h-10 w-32 bg-[var(--fun-stroke-1)] rounded-xl mb-8"></div>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-[var(--fun-surface)] rounded-full"></div>
                    <div className="h-4 w-5/6 bg-[var(--fun-surface)] rounded-full"></div>
                    <div className="h-4 w-4/6 bg-[var(--fun-surface)] rounded-full"></div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </main>
  );
}
