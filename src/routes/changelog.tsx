import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Değişiklik Günlüğü - Fun Teknoloji" },
    ],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  const { t, lang } = useLang();

  const categories = [
    {
      name: "Fun Teknoloji",
      logo: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      desc: t("changelog.item1.desc")
    },
    {
      name: "Account",
      logo: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      desc: t("changelog.item2.desc")
    },
    {
      name: "Developer",
      logo: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      desc: t("changelog.item3.desc")
    },
    {
      name: "QuakeSafe",
      logo: "/assets/logos/quakesafe_seffaf.png",
      desc: t("changelog.item4.desc")
    }
  ];

  const handleSoon = () => {
    import("sonner").then(({ toast }) => {
      toast.info(t("changelog.coming_soon"), {
        description: t("changelog.details_soon"),
      });
    });
  };

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto">
        <ScrollReveal>
          <header className="mb-20 text-center">
            <span className="badge-fun badge-fun-purple mb-4 inline-block">{t("nav.changelog")}</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold fun-text mb-4 capitalize">{t("nav.changelog")}</h1>
            <p className="fun-text-muted text-lg max-w-[700px] mx-auto">{t("nav.changelog.desc")}</p>
          </header>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={i}>
              <div className="group p-8 md:p-12 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className={`h-24 w-24 md:h-36 md:w-36 rounded-3xl flex items-center justify-center border border-[var(--fun-stroke-1)] group-hover:scale-110 transition-transform shrink-0 overflow-hidden ${cat.name === 'QuakeSafe' ? 'bg-[#0F172A]' : 'bg-white p-4'}`}>
                   <img
                    src={cat.logo}
                    alt={cat.name}
                    className={`max-w-full max-h-full object-contain ${cat.name === 'QuakeSafe' ? 'w-full h-full scale-100' : 'scale-125'}`}
                   />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                     <h2 className="text-2xl md:text-3xl font-bold fun-text">{cat.name}</h2>
                  </div>
                  <div className="flex items-center justify-between gap-6 flex-wrap">
                     <p className="text-sm font-medium fun-text-muted">{t("changelog.last_update")}</p>
                     <button
                       onClick={handleSoon}
                       className="h-12 w-12 rounded-full flex items-center justify-center transition-all bg-[var(--fun-text)] hover:bg-[var(--fun-purple)] ring-8 ring-[var(--fun-card)] group/btn"
                     >
                       <svg className="h-5 w-5 text-[var(--fun-card)] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                       </svg>
                     </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
