import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/changelog/funid")({
  head: () => ({
    meta: [{ title: "FunID Değişiklik Günlüğü" }],
  }),
  component: FunIDChangelogPage,
});

function FunIDChangelogPage() {
  const { t } = useLang();

  const updates = [
    {
      version: "v1.2.0",
      date: "24 Temmuz 2026",
      title: "Gelişmiş Güvenlik ve Bölgesel Güvenlik Kalkanı",
      changes: [
        "İki Adımlı Doğrulama (2FA) altyapısı optimize edilerek doğrulama hızı artırıldı.",
        "Kullanıcı talebi doğrultusunda VPN engelleme ve yabancı ülkelerden erişim kısıtlama özellikleri eklendi.",
        "Sıra dışı oturum açma aktivitelerini e-posta ile bildiren anlık uyarı sistemi devreye girdi."
      ]
    },
    {
      version: "v1.0.0",
      date: "12 Şubat 2025",
      title: "FunID Birleşik Kimlik Doğrulama Sistemi",
      changes: [
        "Fun Teknoloji'nin tüm ekosistem uygulamaları için ortak kimlik doğrulama modülü kuruldu.",
        "Şifre sıfırlama, profil dondurma ve tescilli iki adımlı güvenlik doğrulaması (2FA) sağlandı."
      ]
    }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 bg-background">
      <div className="max-w-[800px] mx-auto">
        <ScrollReveal>
          <div className="mb-8">
            <ArrowButton to="/changelog" variant="light" direction="left" className="!py-2 !px-4 !text-sm border border-[var(--fun-stroke-1)]">
              {t("nav.changelog")}
            </ArrowButton>
          </div>
          <header className="mb-14">
            <span className="badge-fun badge-fun-purple mb-4 inline-block">FunID</span>
            <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">
              FunID Güvenlik & Hesap Güncellemeleri
            </h1>
            <p className="fun-text-muted text-base leading-relaxed">
              FunID birleşik kimlik ve güvenlik portalındaki en son tescilli güncellemeleri ve güvenlik kalkanı geliştirmelerini inceleyin.
            </p>
          </header>
        </ScrollReveal>

        <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-6 before:w-0.5 before:bg-[var(--fun-stroke-1)] pl-2">
          {updates.map((up, i) => (
            <ScrollReveal key={i}>
              <div className="relative pl-12">
                {/* Timeline node */}
                <div className="absolute left-4 top-1.5 h-4.5 w-4.5 rounded-full bg-[var(--fun-purple)] ring-4 ring-background" />
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-[var(--fun-purple)] uppercase tracking-wider">{up.version}</span>
                  <span className="text-xs font-semibold fun-text-muted">{up.date}</span>
                </div>
                <h3 className="text-xl font-bold fun-text mb-4">{up.title}</h3>
                <ul className="space-y-3 list-disc pl-5 text-muted-foreground text-sm leading-relaxed">
                  {up.changes.map((change, idx) => (
                    <li key={idx}>{change}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
