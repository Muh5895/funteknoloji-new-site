import ScrollReveal from "../components/ScrollReveal";
import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Müşteri Yorumları – Fun Teknoloji" },
      { name: "description", content: "Müşterilerimizin Fun Teknoloji hakkındaki görüşlerini ve deneyimlerini keşfedin." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { t } = useLang();
  const reviews = [
    { name: "Ahmet Yılmaz", text: "Küçük bir işletme sahibi olarak, sunduğunuz yazılım çözümleri operasyonel verimliliğimizi artırmada hayat kurtarıcı oldu. Beklentilerimi gerçekten aştı." },
    { name: "Zeynep Kaya", text: "Yapay zeka entegrasyonu kesinlikle inanılmaz! İş süreçlerimizi otomatize ederek büyük zaman tasarrufu sağladık." },
    { name: "Murat Demir", text: "Bu teknoloji veri analitiği süreçlerimizde devrim yarattı. İçgörüler o kadar derin ki, kararlarımızı artık çok daha güvenle alıyoruz." },
    { name: "Elif Şahin", text: "Bir proje yöneticisi olarak bu araç, ekipler arası koordinasyonu sağlamak için paha biçilemez oldu. Kullanıcı dostu arayüzü harika!" },
    { name: "Caner Özkan", text: "Geliştirme süreçlerinin hızı ve kalitesi akıllara durgunluk verici. Olağanüstü kalite standartlarını korurken projelerimizi vaktinde teslim alabildik." },
    { name: "Selin Aydın", text: "Bu platform dijital varlığımızı yönetme şeklimizi dönüştürdü. Teknoloji o kadar modern ve etkileyici ki, tüm ekibimiz hayran kaldı." },
  ];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5 animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">{t("home.testimonials.badge")}</span>
            <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">Müşterilerimiz Ne Diyor?</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">Fun Teknoloji ile dönüşüm yaşayan iş ortaklarımızın hikayelerini keşfedin.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="h-5 w-5 text-[var(--fun-purple)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg fun-text italic">"{r.text}"</p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-[var(--fun-stroke-1)]">
                    <p className="font-bold fun-text">{r.name}</p>
                    <p className="text-sm fun-text-muted">Doğrulanmış Müşteri</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
