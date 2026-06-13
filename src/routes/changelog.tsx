import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
});

function ChangelogPage() {
  const { t } = useLang();
  const changes = [
    {
      version: "v1.2.0",
      date: "14 Haziran 2026",
      items: [
        "Azerbaycan dili seçeneği 'Azerice' olarak güncellendi.",
        "Marka Kiti sayfası yayına alındı.",
        "Nexy asistanı için yanıt çeşitliliği artırıldı ve animasyonlar optimize edildi.",
        "SSS sayfası kategorili yapıya geçirildi.",
        "Blog ve İletişim sayfalarındaki Supabase bağlantı hataları giderildi."
      ]
    },
    {
      version: "v1.1.0",
      date: "10 Haziran 2026",
      items: [
        "Koyu mod kontrast ayarları iyileştirildi.",
        "Ana sayfa özellikleri bölümüne yeni görseller eklendi.",
        "Hız ve performans optimizasyonları yapıldı."
      ]
    },
    {
      version: "v1.0.0",
      date: "1 Haziran 2026",
      items: [
        "Fun Teknoloji platformu ilk kararlı sürümüyle yayında!",
        "Yapay zeka destekli asistan Nexy entegre edildi.",
        "6 dilde tam i18n desteği sağlandı."
      ]
    }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16 text-center">
          <span className="badge-fun badge-fun-purple mb-4 inline-block">Güncellemeler</span>
          <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">Değişiklik Günlüğü</h1>
          <p className="fun-text-muted text-lg">Platformumuzdaki en son yenilikler ve iyileştirmeler.</p>
        </header>

        <div className="space-y-12">
          {changes.map((group, i) => (
            <div key={i} className="relative pl-8 border-l border-[var(--fun-stroke-1)]">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[var(--fun-purple)] border-4 border-[var(--color-background)]" />
              <div className="mb-4">
                <span className="text-[var(--fun-purple)] font-bold text-xl">{group.version}</span>
                <span className="mx-3 text-[var(--fun-stroke-2)]">•</span>
                <span className="fun-text-muted text-sm">{group.date}</span>
              </div>
              <ul className="space-y-3">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 fun-text">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
