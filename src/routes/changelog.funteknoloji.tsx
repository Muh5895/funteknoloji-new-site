import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/changelog/funteknoloji")({
  head: () => ({
    meta: [{ title: "Fun Teknoloji Güncellemeleri" }],
  }),
  component: FunTeknolojiChangelogPage,
});

function FunTeknolojiChangelogPage() {
  const { t } = useLang();

  const updates = [
    {
      version: "v2.1.0",
      date: "25 Temmuz 2026",
      title: "Altyapı ve Kararlılık Güncellemesi",
      changes: [
        "Tüm yapay zeka asistan sorgu motorları optimize edilerek cevap süreleri %40 düşürüldü.",
        "Güvenli kimlik doğrulama portalı FunID ile tam entegrasyon sağlandı.",
        "Tescilli ürün ekosistemimiz için yeni birleşik arayüz tasarımı devreye alındı."
      ]
    },
    {
      version: "v2.0.0",
      date: "12 Şubat 2025",
      title: "Fun Teknoloji Ekosistem Lansmanı",
      changes: [
        "Şirket vizyonu doğrultusunda fason yazılım geliştirme durdurularak %100 tescilli ürün modeline geçildi.",
        "Yapay zeka asistanı Nexy ve afet erken uyarı platformu QuakeSafe duyuruldu.",
        "Merkezi kimlik ve güvenlik yönetim portalı FunID ilk kararlı sürümüyle yayına alındı."
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
            <span className="badge-fun badge-fun-purple mb-4 inline-block">Fun Teknoloji</span>
            <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">
              Şirket & Ekosistem Güncellemeleri
            </h1>
            <p className="fun-text-muted text-base leading-relaxed">
              Fun Teknoloji tescilli ürün ekosistemindeki en güncel kurumsal ve yapısal gelişmeleri takip edin.
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
