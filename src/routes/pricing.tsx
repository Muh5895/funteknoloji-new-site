import { createFileRoute, Link } from "@tanstack/react-router";
<<<<<<< Updated upstream
import { useLang } from "../lib/i18n";
=======
>>>>>>> Stashed changes

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Fiyatlandırma – Fun Teknoloji" },
<<<<<<< Updated upstream
      { name: "description", content: "Fun Teknoloji fiyatlandırma planları. İhtiyacınıza uygun planı seçin." },
=======
      { name: "description", content: "Fun Teknoloji fiyatlandırma politikası. Şeffaf ve esnek çözümler." },
      { property: "og:title", content: "Fiyatlandırma – Fun Teknoloji" },
      { property: "og:description", content: "Fun Teknoloji fiyatlandırma politikası. Şeffaf ve esnek çözümler." },
>>>>>>> Stashed changes
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
<<<<<<< Updated upstream
  const { t } = useLang();
=======
>>>>>>> Stashed changes
  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
<<<<<<< Updated upstream
            <span className="badge-fun badge-fun-white mb-4 inline-block">{t("pricing.badge")}</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">
               {t("pricing.title").includes("Yakında") ? (
                 <>
                   {t("pricing.title").split("Yakında")[0]}
                   <span className="text-[var(--fun-purple)]">Yakında</span>
                   {t("pricing.title").split("Yakında")[1]}
                 </>
               ) : t("pricing.title")}
            </h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("pricing.desc")}</p>
=======
            <span className="badge-fun badge-fun-white mb-4 inline-block">Fiyatlandırma</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">Şeffaf ve Esnek Çözümler</h1>
            <p className="max-w-[800px] mx-auto text-tagline-1 fun-text-muted mb-8">
              Fun Teknoloji olarak, her projenin kendine özgü ihtiyaçları olduğunu biliyoruz.
              Bu nedenle sabit paketler yerine, projenizin kapsamına ve gereksinimlerine göre özelleştirilmiş fiyatlandırma sunuyoruz.
            </p>
>>>>>>> Stashed changes
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
      <section className="py-20 md:py-32">
        <div className="main-container text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
             <a href="https://waitlist.funteknoloji.com" className="btn-fun btn-fun-dark h-16 px-10 text-lg">{t("pricing.waitlist")}</a>
             <Link to="/contact" className="btn-fun btn-fun-light h-16 px-10 text-lg border-2">{t("pricing.contact")}</Link>
=======
      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-4 md:text-heading-3 font-medium mb-6 fun-text">Neden Özelleştirilmiş Fiyatlandırma?</h2>
              <ul className="space-y-6">
                {[
                  { t: "Tam İhtiyacınıza Göre", d: "Kullanmadığınız özellikler için ödeme yapmazsınız." },
                  { t: "Ölçeklenebilir Yapı", d: "Projeniz büyüdükçe kaynaklarınızı kolayca artırabilirsiniz." },
                  { t: "Bütçe Dostu", d: "Farklı bütçelere uygun, esnek ödeme planları oluşturuyoruz." },
                  { t: "Şeffaf Süreç", d: "Tüm maliyet kalemlerini en başta net bir şekilde paylaşıyoruz." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-[#864FFE]/10 text-[#864FFE]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold fun-text">{item.t}</h4>
                      <p className="text-sm fun-text-muted">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[40px] p-10 border text-center" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
              <h3 className="text-heading-5 font-medium mb-4 fun-text">Teklif Alın</h3>
              <p className="fun-text-muted mb-8">Projeniz için en uygun maliyet analizini birlikte yapalım.</p>
              <div className="flex flex-col gap-4">
                <Link to="/contact" className="btn-fun btn-fun-dark w-full py-4 justify-center">
                  Bize Ulaşın
                </Link>
                <p className="text-xs fun-text-muted">Genellikle 24 saat içinde dönüş yapıyoruz.</p>
              </div>
            </div>
>>>>>>> Stashed changes
          </div>

<<<<<<< Updated upstream
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 pointer-events-none select-none">
             {[1,2,3].map(i => (
               <div key={i} className="rounded-[32px] p-10 border bg-[var(--fun-card)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="h-4 w-24 bg-[var(--fun-stroke-2)] rounded-full mb-4 mx-auto"></div>
                  <div className="h-10 w-32 bg-[var(--fun-stroke-1)] rounded-xl mb-8 mx-auto"></div>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-[var(--fun-surface)] rounded-full"></div>
                    <div className="h-4 w-5/6 bg-[var(--fun-surface)] rounded-full mx-auto"></div>
                    <div className="h-4 w-4/6 bg-[var(--fun-surface)] rounded-full mx-auto"></div>
                  </div>
               </div>
             ))}
          </div>
        </div>
=======
      <section className="px-4 lg:px-5 pb-16 md:pb-24">
         <div className="max-w-[1880px] mx-auto rounded-3xl py-16 md:py-24" style={{ backgroundColor: 'var(--fun-surface)' }}>
           <div className="main-container">
             <div className="text-center mb-14">
               <h2 className="text-heading-4 md:text-heading-3 font-medium fun-text">İş Sürecimiz</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { step: "01", t: "Analiz", d: "İhtiyaçlarınızı ve hedeflerinizi detaylıca analiz ediyoruz." },
                 { step: "02", t: "Planlama", d: "En verimli teknolojik altyapıyı ve çözüm yolunu planlıyoruz." },
                 { step: "03", t: "Teklif", d: "Kapsamlı bir çalışma planı ve şeffaf bir fiyat teklifi sunuyoruz." }
               ].map((item, i) => (
                 <div key={i} className="text-center">
                   <div className="text-4xl font-bold text-[#864FFE]/20 mb-4">{item.step}</div>
                   <h4 className="text-xl font-semibold mb-2 fun-text">{item.t}</h4>
                   <p className="fun-text-muted text-sm">{item.d}</p>
                 </div>
               ))}
             </div>
           </div>
         </div>
>>>>>>> Stashed changes
      </section>
    </main>
  );
}
