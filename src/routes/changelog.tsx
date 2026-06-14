import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
});

function ChangelogPage() {
  const { t } = useLang();

  const categories = [
    {
      name: "Fun Teknoloji",
      logo: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      desc: "Ana platform güncellemeleri ve kurumsal yenilikler."
    },
    {
      name: "Account",
      logo: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      desc: "Kullanıcı hesapları ve profil yönetimi iyileştirmeleri."
    },
    {
      name: "Developer",
      logo: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      desc: "API ve geliştirici araçları güncellemeleri."
    },
    {
      name: "QuakeSafe",
      logo: "/assets/logos/quakesafe_seffaf.png",
      desc: "QuakeSafe projesi özelindeki tüm yenilikler."
    }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto">
        <ScrollReveal>
          <header className="mb-20 text-center">
            <span className="badge-fun badge-fun-purple mb-4 inline-block">Sistem</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold fun-text mb-4">Değişiklik Günlüğü</h1>
            <p className="fun-text-muted text-lg max-w-[700px] mx-auto">Platformumuz ve projelerimizdeki kategorize edilmiş güncellemeler.</p>
          </header>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={i}>
              <div className="group p-8 md:p-12 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-3xl bg-white p-6 flex items-center justify-center border border-[var(--fun-stroke-1)] group-hover:scale-110 transition-transform shrink-0">
                   <img
                    src={cat.logo}
                    alt={cat.name}
                    className="max-w-full max-h-full object-contain"
                   />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                     <h2 className="text-2xl md:text-3xl font-bold fun-text">{cat.name}</h2>
                     <span className="text-xs font-bold uppercase tracking-widest bg-[var(--fun-surface)] px-3 py-1 rounded-full fun-text-muted border border-[var(--fun-stroke-1)]">v2.4.0</span>
                  </div>
                  <p className="fun-text text-lg leading-relaxed mb-6">{cat.desc}</p>
                  <div className="flex items-center gap-6">
                     <p className="text-sm font-medium fun-text-muted">Son Güncelleme: 15 Haziran 2026</p>
                     <button className="text-[var(--fun-purple)] font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-2">
                       <span>İncele</span>
                       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
