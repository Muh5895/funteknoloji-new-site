import { createFileRoute } from "@tanstack/react-router";
<<<<<<< Updated upstream
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/docs")({
=======

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Dokümantasyon – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji ürün ve hizmetleri için teknik dokümantasyon." },
    ],
  }),
>>>>>>> Stashed changes
  component: DocsPage,
});

function DocsPage() {
<<<<<<< Updated upstream
  const { t } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1290px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="font-bold fun-text mb-4 uppercase tracking-widest text-sm opacity-50">Başlangıç</h3>
            <ul className="space-y-3">
              <li><a href="#" className="fun-text font-medium border-l-2 border-[var(--fun-purple)] pl-4">Giriş</a></li>
              <li><a href="#" className="fun-text-muted hover:fun-text pl-4">Hızlı Kurulum</a></li>
              <li><a href="#" className="fun-text-muted hover:fun-text pl-4">Temel Kavramlar</a></li>
            </ul>
          </div>
        </aside>
        <div className="lg:col-span-3">
          <div className="prose dark:prose-invert max-w-none fun-text">
            <h1 className="text-5xl font-bold mb-8">Dokümantasyon</h1>
            <p className="text-xl opacity-70">Fun Teknoloji ürünleri ve API'ları için teknik rehber.</p>
            <div className="p-8 rounded-3xl bg-[var(--fun-surface)] border-2 border-dashed border-[var(--fun-stroke-1)] mt-12 text-center">
              <p className="fun-text-muted">Bu bölüm yapım aşamasındadır.</p>
            </div>
          </div>
=======
  const sections = [
    {
      title: "Başlangıç",
      items: ["Hızlı Başlangıç", "Kurulum", "Temel Kavramlar", "Kimlik Doğrulama"],
    },
    {
      title: "API Referansı",
      items: ["Endpoints", "Hata Kodları", "Webhooks", "Rate Limiting"],
    },
    {
      title: "Çözümler",
      items: ["Yapay Zeka Entegrasyonu", "Veri Analitiği", "Bulut Altyapı", "Siber Güvenlik"],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-24">
      <div className="flex-grow main-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold uppercase tracking-wider fun-text mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm fun-text-muted hover:fun-text transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Content */}
          <article className="lg:col-span-9">
            <div className="max-w-3xl">
              <span className="badge-fun badge-fun-gray mb-4 inline-block">Dokümantasyon</span>
              <h1 className="text-heading-3 md:text-heading-2 font-medium mb-6 fun-text">Fun Teknoloji'ye Hoş Geldiniz</h1>
              <p className="text-lg fun-text-muted mb-10 leading-relaxed">
                Modern teknoloji çözümlerimizi projelerinize nasıl entegre edebileceğinizi öğrenin.
                Bu dökümantasyon, API kullanımından özel yazılım çözümlerimize kadar her konuda size rehberlik edecektir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                  <h3 className="font-medium fun-text mb-2">Hızlı Başlangıç</h3>
                  <p className="text-sm fun-text-muted mb-4">Sadece 5 dakikada ilk entegrasyonunuzu yapın.</p>
                  <a href="#" className="text-sm font-medium text-[#864FFE] hover:underline">Rehberi Gör →</a>
                </div>
                <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                  <h3 className="font-medium fun-text mb-2">API Referansı</h3>
                  <p className="text-sm fun-text-muted mb-4">Tüm endpoint'ler ve parametreler hakkında detaylı bilgi.</p>
                  <a href="#" className="text-sm font-medium text-[#864FFE] hover:underline">API'yi İncele →</a>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-heading-5 font-medium mb-4 fun-text">Gereksinimler</h2>
                  <p className="fun-text-muted mb-4">
                    Servislerimizi kullanmaya başlamadan önce bir API anahtarına ihtiyacınız vardır.
                    Panel üzerinden ücretsiz bir hesap oluşturarak anahtarınızı alabilirsiniz.
                  </p>
                  <div className="bg-[#12161F] p-4 rounded-xl font-mono text-sm text-white/80 overflow-x-auto">
                    <code>npm install @funteknoloji/sdk</code>
                  </div>
                </section>
              </div>
            </div>
          </article>
>>>>>>> Stashed changes
        </div>
      </div>
    </main>
  );
}
