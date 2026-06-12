import { createFileRoute, Link } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Hizmetlerimiz – Fun Teknoloji" },
      { name: "description", content: "Yapay zeka, yazılım geliştirme ve dijital dönüşüm hizmetlerimizi keşfedin." },
      { property: "og:title", content: "Hizmetlerimiz – Fun Teknoloji" },
      { property: "og:description", content: "Yapay zeka, yazılım geliştirme ve dijital dönüşüm hizmetlerimizi keşfedin." },
      { property: "og:url", content: "https://build-dream-flow-91.lovable.app/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Hizmetlerimiz – Fun Teknoloji" },
      { name: "twitter:description", content: "Yapay zeka, yazılım geliştirme ve dijital dönüşüm hizmetlerimizi keşfedin." },
    ],
    links: [{ rel: "canonical", href: "https://build-dream-flow-91.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = [
    { title: "Yapay Zeka Çözümleri", desc: "Makine öğrenimi, doğal dil işleme ve bilgisayarlı görü teknolojileriyle iş süreçlerinizi akıllı hale getirin.", features: ["Makine Öğrenimi Modelleri", "Doğal Dil İşleme", "Bilgisayarlı Görü", "Tahmine Dayalı Analitik"] },
    { title: "Web Geliştirme", desc: "Modern, hızlı ve ölçeklenebilir web uygulamaları tasarlayıp geliştiriyoruz.", features: ["Responsive Tasarım", "Progressive Web Apps", "E-Ticaret Çözümleri", "API Geliştirme"] },
    { title: "Mobil Uygulama Geliştirme", desc: "iOS ve Android platformları için kullanıcı dostu, performanslı mobil uygulamalar.", features: ["Cross-Platform Geliştirme", "Native Uygulamalar", "UI/UX Tasarım", "App Store Optimizasyonu"] },
    { title: "Bulut Çözümleri", desc: "İşletmenizin altyapısını buluta taşıyarak esneklik ve ölçeklenebilirlik sağlıyoruz.", features: ["Bulut Migrasyon", "DevOps Otomasyonu", "Sunucusuz Mimari", "Veri Yedekleme"] },
    { title: "Veri Analitiği", desc: "Büyük veri setlerinden anlamlı içgörüler çıkararak iş kararlarınızı destekliyoruz.", features: ["İş Zekası Raporları", "Gerçek Zamanlı Analitik", "Veri Görselleştirme", "Öngörücü Modelleme"] },
    { title: "Siber Güvenlik", desc: "İşletmenizin dijital varlıklarını korumak için kapsamlı güvenlik çözümleri.", features: ["Güvenlik Denetimleri", "Sızma Testleri", "Uyumluluk Danışmanlığı", "7/24 İzleme"] },
    { title: "Dijital Pazarlama", desc: "Yapay zeka destekli pazarlama stratejileri ile markanızın görünürlüğünü artırıyoruz.", features: ["SEO Optimizasyonu", "Sosyal Medya Yönetimi", "İçerik Pazarlama", "Performans Pazarlama"] },
    { title: "Danışmanlık & Eğitim", desc: "Dijital dönüşüm yolculuğunuzda stratejik rehberlik ve eğitim programları.", features: ["Dijital Strateji", "Teknoloji Danışmanlığı", "Kurumsal Eğitimler", "Workshop'lar"] },
  ];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">Hizmetlerimiz</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">İşinizi büyütecek <br className="hidden md:block" /> profesyonel çözümler.</h1>
            <p className="max-w-[700px] mx-auto text-tagline-1 fun-text-muted">Yapay zeka, yazılım geliştirme ve dijital dönüşüm alanlarında kapsamlı hizmetler sunuyoruz.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className={`${i === 0 ? 'md:col-span-2' : ''} group`}>
                <div className={`h-full rounded-3xl p-8 md:p-10 transition-colors duration-500 ${i === 0 ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : ''}`} style={{ backgroundColor: 'var(--fun-surface)' }}>
                  <div className="space-y-6">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--fun-card)' }}>
                      <span className="text-xl font-bold fun-text-muted">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-heading-5 md:text-heading-4 font-medium fun-text">{service.title}</h3>
                    <p className="text-tagline-1 fun-text-muted">{service.desc}</p>
                    <Link to="/contact" className="inline-flex h-12 w-12 items-center justify-center rounded-full ring-8 ring-[var(--fun-card)] transition-all hover:bg-[#6C5CE7]" style={{ backgroundColor: 'var(--fun-text)' }}>
                      <svg className="h-5 w-5" style={{ color: 'var(--color-background)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </Link>
                  </div>
                  <div>
                    <ul className="space-y-3 mt-6 md:mt-0">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--fun-card)' }}>
                          <svg className="h-5 w-5 shrink-0 text-[#6C5CE7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-tagline-1 fun-text">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5">
          <div className="main-container text-center">
            <h2 className="text-heading-4 md:text-heading-3 font-medium text-white mb-4">Projeniz için doğru çözümü bulalım</h2>
            <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8">Size özel bir teklif için hemen iletişime geçin.</p>
            <ArrowButton to="/contact" variant="light">İletişime Geçin</ArrowButton>
          </div>
        </div>
      </section>
    </main>
  );
}
