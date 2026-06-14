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
      logo: "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024",
      desc: "Ana platform güncellemeleri ve kurumsal yenilikler."
    },
    {
      name: "Account",
      logo: "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024",
      desc: "Kullanıcı hesapları ve profil yönetimi iyileştirmeleri."
    },
    {
      name: "Developer",
      logo: "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024",
      desc: "API ve geliştirici araçları güncellemeleri."
    },
    {
      name: "QuakeSafe",
      logo: "/assets/logos/QuakeSafe Logo.png",
      desc: "QuakeSafe projesi özelindeki tüm yenilikler."
    }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <header className="mb-20 text-center">
            <span className="badge-fun badge-fun-purple mb-4 inline-block">Sistem</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold fun-text mb-4">Değişiklik Günlüğü</h1>
            <p className="fun-text-muted text-lg max-w-[700px] mx-auto">Platformumuz ve projelerimizdeki kategorize edilmiş güncellemeler.</p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <ScrollReveal key={i}>
              <div className="group p-10 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all h-full">
                <div className="flex items-center gap-6 mb-8">
                   <div className="h-20 w-20 rounded-2xl bg-[var(--fun-surface)] p-4 flex items-center justify-center border border-[var(--fun-stroke-1)] group-hover:scale-110 transition-transform">
                      <img src={cat.logo} alt={cat.name} className="max-w-full max-h-full object-contain" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold fun-text">{cat.name}</h2>
                      <p className="text-sm fun-text-muted mt-1">Son Güncelleme: 15 Haziran 2026</p>
                   </div>
                </div>
                <p className="fun-text text-lg leading-relaxed">{cat.desc}</p>
                <div className="mt-10 pt-8 border-t border-[var(--fun-stroke-1)]">
                   <button className="text-[var(--fun-purple)] font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">Tüm Değişiklikleri Gör →</button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
