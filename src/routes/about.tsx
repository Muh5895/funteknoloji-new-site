import { createFileRoute } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Hakkımızda – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji'yi daha yakından tanıyın. Misyonumuz, vizyonumuz ve değerlerimiz." },
      { property: "og:title", content: "Hakkımızda – Fun Teknoloji" },
      { property: "og:description", content: "Fun Teknoloji'yi daha yakından tanıyın." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="bg-[#F3F5F8] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5">
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">Hakkımızda</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4">
              Teknolojiyle geleceği <br className="hidden md:block" /> birlikte inşa ediyoruz.
            </h1>
            <p className="max-w-[700px] mx-auto text-tagline-1 text-[#12161F]/60">
              Fun Teknoloji olarak, yapay zeka ve yazılım alanında yenilikçi çözümler sunarak işletmelerin dijital dönüşüm yolculuğuna rehberlik ediyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#12161F] rounded-3xl p-10 md:p-14">
              <span className="badge-fun bg-white/10 text-white mb-6 inline-block">Misyonumuz</span>
              <h2 className="text-heading-5 md:text-heading-4 font-medium text-white mb-4">
                İşletmeleri teknolojiyle güçlendirmek
              </h2>
              <p className="text-tagline-1 text-white/60">
                Her ölçekteki işletmenin yapay zeka ve ileri teknoloji çözümlerinden yararlanmasını sağlayarak, dijital dünyada rekabet avantajı elde etmelerine yardımcı olmak.
              </p>
            </div>
            <div className="bg-[#D4F5E9] rounded-3xl p-10 md:p-14">
              <span className="badge-fun bg-white mb-6 inline-block">Vizyonumuz</span>
              <h2 className="text-heading-5 md:text-heading-4 font-medium text-[#12161F] mb-4">
                Geleceği bugünden tasarlamak
              </h2>
              <p className="text-tagline-1 text-[#12161F]/60">
                Türkiye'nin ve dünyanın lider teknoloji şirketlerinden biri olarak, yapay zeka destekli inovatif çözümlerle topluma ve iş dünyasına değer katmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 lg:px-5">
        <div className="bg-[#F3F5F8] max-w-[1880px] mx-auto rounded-3xl py-16 md:py-24">
          <div className="main-container">
            <div className="text-center mb-14">
              <h2 className="text-heading-4 md:text-heading-3 font-medium">Rakamlarla Fun Teknoloji</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: "2019", label: "Kuruluş Yılı" },
                { num: "500+", label: "Mutlu Müşteri" },
                { num: "1200+", label: "Tamamlanan Proje" },
                { num: "50+", label: "Ekip Üyesi" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-heading-3 md:text-heading-2 font-medium text-[#12161F]">{stat.num}</p>
                  <p className="text-tagline-1 text-[#12161F]/60 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="text-center mb-14">
            <span className="badge-fun badge-fun-green mb-4 inline-block">Değerlerimiz</span>
            <h2 className="text-heading-4 md:text-heading-3 font-medium">Bizi biz yapan ilkeler</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "İnovasyon", desc: "Sürekli yenilik arayışı ile teknolojinin sınırlarını zorluyoruz." },
              { title: "Güvenilirlik", desc: "Müşterilerimize karşı şeffaf ve güvenilir bir iş ortağıyız." },
              { title: "Kalite", desc: "Her projede en yüksek kalite standartlarını hedefliyoruz." },
              { title: "İş Birliği", desc: "Ekibimiz ve müşterilerimizle güçlü iş birlikleri kuruyoruz." },
              { title: "Sürdürülebilirlik", desc: "Çevreye duyarlı ve sürdürülebilir teknoloji çözümleri geliştiriyoruz." },
              { title: "Müşteri Odaklılık", desc: "Müşterilerimizin ihtiyaçlarını her zaman ön planda tutuyoruz." },
            ].map((value, i) => (
              <div key={i} className="bg-[#F3F5F8] rounded-2xl p-8 hover:bg-[#D4F5E9] transition-colors duration-500">
                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center mb-6">
                  <span className="text-lg font-bold text-[#12161F]/30">{i + 1}</span>
                </div>
                <h3 className="text-heading-6 font-medium mb-2">{value.title}</h3>
                <p className="text-tagline-1 text-[#12161F]/60">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
