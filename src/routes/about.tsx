import { createFileRoute } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Hakkımızda – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji'yi daha yakından tanıyın. Misyonumuz, vizyonumuz ve değerlerimiz." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">Hakkımızda</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">Teknolojiyle geleceği <br className="hidden md:block" /> birlikte inşa ediyoruz.</h1>
            <p className="max-w-[700px] mx-auto text-tagline-1 fun-text-muted">Fun Teknoloji, 2025 yılında Muhammed Erbay tarafından kurulmuştur. Amacımız, yapay zeka ve modern teknolojileri kullanarak işletmelere ve bireylere değer katmak.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#12161F] rounded-3xl p-10 md:p-14">
              <span className="badge-fun bg-white/10 text-white mb-6 inline-block">Misyonumuz</span>
              <h2 className="text-heading-5 md:text-heading-4 font-medium text-white mb-4">İşletmeleri teknolojiyle güçlendirmek</h2>
              <p className="text-tagline-1 text-white/60">Her ölçekteki işletmenin yapay zeka ve ileri teknoloji çözümlerinden yararlanmasını sağlayarak, dijital dünyada rekabet avantajı elde etmelerine yardımcı olmak.</p>
            </div>
            <div className="rounded-3xl p-10 md:p-14" style={{ backgroundColor: 'var(--fun-green)' }}>
              <span className="badge-fun mb-6 inline-block" style={{ backgroundColor: 'var(--fun-card)' }}>Vizyonumuz</span>
              <h2 className="text-heading-5 md:text-heading-4 font-medium fun-text mb-4">Geleceği bugünden tasarlamak</h2>
              <p className="text-tagline-1 fun-text-muted">Türkiye'nin dijital geleceğine katkıda bulunmak için çalışmaya devam ediyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl py-16 md:py-24" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container">
            <div className="text-center mb-14"><h2 className="text-heading-4 md:text-heading-3 font-medium fun-text">Rakamlarla Fun Teknoloji</h2></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{ num: "2025", label: "Kuruluş Yılı" }, { num: "100+", label: "Mutlu Müşteri" }, { num: "50+", label: "Tamamlanan Proje" }, { num: "10+", label: "Ekip Üyesi" }].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-heading-3 md:text-heading-2 font-medium fun-text">{s.num}</p>
                  <p className="text-tagline-1 fun-text-muted mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="text-center mb-14">
            <span className="badge-fun badge-fun-green mb-4 inline-block">Değerlerimiz</span>
            <h2 className="text-heading-4 md:text-heading-3 font-medium fun-text">Bizi biz yapan ilkeler</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ title: "İnovasyon", desc: "Sürekli yenilik arayışı ile teknolojinin sınırlarını zorluyoruz." }, { title: "Güvenilirlik", desc: "Müşterilerimize karşı şeffaf ve güvenilir bir iş ortağıyız." }, { title: "Kalite", desc: "Her projede en yüksek kalite standartlarını hedefliyoruz." }, { title: "İş Birliği", desc: "Ekibimiz ve müşterilerimizle güçlü iş birlikleri kuruyoruz." }, { title: "Sürdürülebilirlik", desc: "Çevreye duyarlı ve sürdürülebilir teknoloji çözümleri geliştiriyoruz." }, { title: "Müşteri Odaklılık", desc: "Müşterilerimizin ihtiyaçlarını her zaman ön planda tutuyoruz." }].map((v, i) => (
              <div key={i} className="rounded-2xl p-8 transition-colors duration-500" style={{ backgroundColor: 'var(--fun-surface)' }}>
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--fun-card)' }}>
                  <span className="text-lg font-bold fun-text-muted">{i + 1}</span>
                </div>
                <h3 className="text-heading-6 font-medium mb-2 fun-text">{v.title}</h3>
                <p className="text-tagline-1 fun-text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5">
          <div className="main-container text-center">
            <h2 className="text-heading-4 md:text-heading-3 font-medium text-white mb-4">Birlikte çalışalım</h2>
            <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8">Projenizi hayata geçirmek için bize ulaşın.</p>
            <ArrowButton to="/contact" variant="light">İletişime Geçin</ArrowButton>
          </div>
        </div>
      </section>
    </main>
  );
}
