import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/changelog/quakesafe")({
  head: () => ({
    meta: [{ title: "QuakeSafe Değişiklik Günlüğü" }],
  }),
  component: QuakeSafeChangelogPage,
});

function QuakeSafeChangelogPage() {
  const { t } = useLang();

  const updates = [
    {
      version: "v1.5.0",
      date: "25 Temmuz 2026",
      title: "Medikal Güvenlik Kartı ve NFC Optimizasyonu",
      changes: [
        "Acil durumlarda ilk müdahale ekiplerinin kan grubu ve acil durum kişilerine hızlı erişmesi için QR ve NFC kod altyapısı yenilendi.",
        "Medikal kart verilerinin görünürlük ayarları (Herkese Açık/Gizli) kullanıcı talebine göre optimize edildi.",
        "IoT erken uyarı vibrasyon sensörlerinin kalibrasyonu hassaslaştırılarak algılama performansı artırıldı."
      ]
    },
    {
      version: "v1.0.0",
      date: "12 Şubat 2025",
      title: "QuakeSafe Hayat Kurtarma Platformu İlk Sürüm",
      changes: [
        "Yapay zeka ve sensör ağları entegrasyonu ile deprem anında erken uyarı sistemi tamamlandı.",
        "Afet sonrası koordinasyon, kan grubu ve acil durum kişilerini bir arada sunan medikal profil özellikleri yayına alındı."
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
            <span className="badge-fun badge-fun-purple mb-4 inline-block">QuakeSafe</span>
            <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">
              QuakeSafe Afet Güvenliği Güncellemeleri
            </h1>
            <p className="fun-text-muted text-base leading-relaxed">
              Erken uyarı sensörleri, medikal kimlik kartları ve QuakeSafe afet koordinasyon altyapısındaki en son kararlı güncellemeleri keşfedin.
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
