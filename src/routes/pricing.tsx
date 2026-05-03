import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Fiyatlandırma – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji fiyatlandırma planları. İhtiyacınıza uygun planı seçin." },
      { property: "og:title", content: "Fiyatlandırma – Fun Teknoloji" },
      { property: "og:description", content: "İhtiyacınıza uygun planı seçin." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Başlangıç",
      desc: "Küçük işletmeler ve bireysel girişimciler için ideal.",
      price: annual ? "799" : "99",
      period: annual ? "/yıl" : "/ay",
      features: ["5 Yapay Zeka Projesi", "10GB Depolama", "E-posta Desteği", "Temel Analitik", "API Erişimi"],
      popular: false,
      bg: "bg-white",
    },
    {
      name: "Profesyonel",
      desc: "Büyüyen işletmeler ve ekipler için en popüler plan.",
      price: annual ? "2.399" : "299",
      period: annual ? "/yıl" : "/ay",
      features: ["Sınırsız Yapay Zeka Projesi", "100GB Depolama", "Öncelikli Destek", "Gelişmiş Analitik", "API Erişimi", "Özel Entegrasyonlar", "Ekip Yönetimi"],
      popular: true,
      bg: "bg-[#12161F]",
    },
    {
      name: "Kurumsal",
      desc: "Büyük ölçekli işletmeler ve özel ihtiyaçlar için.",
      price: "Özel",
      period: "",
      features: ["Her şey Profesyonel'deki", "Sınırsız Depolama", "7/24 Destek", "Özel SLA", "Adanmış Hesap Yöneticisi", "Güvenlik Denetimi", "Özel Eğitim"],
      popular: false,
      bg: "bg-white",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="bg-[#F3F5F8] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5">
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">Fiyatlandırma</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4">
              İhtiyacınıza uygun planı seçin
            </h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 text-[#12161F]/60 mb-8">
              Esnek fiyatlandırma seçenekleriyle her ölçekteki işletme için uygun çözümler sunuyoruz.
            </p>
            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white rounded-full p-1.5">
              <button
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${!annual ? 'bg-[#12161F] text-white' : 'text-[#12161F]/60'}`}
                onClick={() => setAnnual(false)}
              >
                Aylık
              </button>
              <button
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${annual ? 'bg-[#12161F] text-white' : 'text-[#12161F]/60'}`}
                onClick={() => setAnnual(true)}
              >
                Yıllık <span className="text-xs text-[#6C5CE7]">%33 tasarruf</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`${plan.bg} ${plan.popular ? 'text-white ring-2 ring-[#6C5CE7]' : 'border border-[#E8EBF0]'} rounded-3xl p-8 md:p-10 relative`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6C5CE7] text-white text-xs font-medium px-4 py-1.5 rounded-full">En Popüler</span>
                )}
                <div className="mb-8">
                  <h3 className="text-heading-6 font-medium mb-2">{plan.name}</h3>
                  <p className={`text-tagline-1 ${plan.popular ? 'text-white/60' : 'text-[#12161F]/60'}`}>{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-heading-3 md:text-heading-2 font-medium">
                    {plan.price === "Özel" ? plan.price : `₺${plan.price}`}
                  </span>
                  <span className={`text-tagline-1 ${plan.popular ? 'text-white/60' : 'text-[#12161F]/60'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <svg className={`h-5 w-5 shrink-0 ${plan.popular ? 'text-[#D4F5E9]' : 'text-[#6C5CE7]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={`text-tagline-1 ${plan.popular ? 'text-white/80' : 'text-[#12161F]/80'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`btn-fun w-full text-center ${plan.popular ? 'bg-white text-[#12161F] hover:bg-[#D4F5E9]' : 'btn-fun-dark'}`}
                >
                  {plan.price === "Özel" ? "İletişime Geçin" : "Başlayın"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="bg-[#F3F5F8] max-w-[1880px] mx-auto rounded-3xl py-16 md:py-24">
          <div className="main-container">
            <div className="text-center mb-14">
              <h2 className="text-heading-4 md:text-heading-3 font-medium">Sıkça Sorulan Sorular</h2>
            </div>
            <div className="max-w-[770px] mx-auto space-y-4">
              {[
                { q: "Plan değişikliği yapabilir miyim?", a: "Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik bir sonraki fatura döneminde geçerli olur." },
                { q: "Ücretsiz deneme süresi var mı?", a: "Evet, tüm planlarımız için 14 günlük ücretsiz deneme süresi sunuyoruz." },
                { q: "İptal politikası nedir?", a: "İstediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut dönemin sonuna kadar erişiminiz devam eder." },
              ].map((faq, i) => (
                <PricingFAQ key={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PricingFAQ({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl md:rounded-[32px] px-6 md:px-8">
      <button className="flex items-center justify-between py-6 md:py-8 w-full cursor-pointer" onClick={() => setOpen(!open)}>
        <span className="flex-1 text-left text-tagline-1 lg:text-heading-6 font-normal text-[#12161F]">{q}</span>
        <span className={`ml-2.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="border-t border-[#DDE1E8] pt-6 pb-8">
          <p className="text-tagline-1 text-[#12161F]/60">{a}</p>
        </div>
      </div>
    </div>
  );
}
