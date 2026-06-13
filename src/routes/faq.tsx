import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

function FAQPage() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("Genel");

  const categories = ["Genel", "Hizmetler", "Teknik", "Güvenlik"];

  const faqs = [
    {
      category: "Genel",
      q: "Fun Teknoloji nedir?",
      a: "Fun Teknoloji, yapay zeka ve modern teknolojileri kullanarak işletmelere değer katan yenilikçi bir teknoloji şirketidir."
    },
    {
      category: "Genel",
      q: "Fun Teknoloji ne zaman kuruldu?",
      a: "Fun Teknoloji, 2025 yılında Muhammed Erbay tarafından vizyoner bir teknoloji girişimi olarak kurulmuştur."
    },
    {
      category: "Hizmetler",
      q: "Hangi hizmetleri sunuyorsunuz?",
      a: "Yazılım geliştirme, yapay zeka entegrasyonu, veri analitiği, siber güvenlik ve bulut çözümleri sunuyoruz."
    },
    {
      category: "Hizmetler",
      q: "Özel yazılım süreci nasıl işliyor?",
      a: "İhtiyaç analizi, prototipleme, geliştirme, test ve yayına alma aşamalarından oluşan şeffaf bir süreç izliyoruz."
    },
    {
      category: "Teknik",
      q: "Hangi teknolojileri kullanıyorsunuz?",
      a: "React, Next.js, TypeScript, Python, PyTorch, Supabase ve AWS gibi modern teknoloji yığınlarını kullanıyoruz."
    },
    {
      category: "Teknik",
      q: "API desteğiniz var mı?",
      a: "Evet, kurumsal çözümlerimiz için kapsamlı API desteği ve dokümantasyon sağlıyoruz."
    },
    {
      category: "Güvenlik",
      q: "Verilerim güvende mi?",
      a: "Evet, tüm verileriniz endüstri standardı şifreleme yöntemleri ve güvenli bulut altyapısı ile korunmaktadır."
    },
    {
      category: "Güvenlik",
      q: "Gizlilik politikanız nedir?",
      a: "Kullanıcı verilerinin gizliliği bizim için en öncelikli konudur. Detaylı bilgi için Gizlilik Politikası sayfamıza bakabilirsiniz."
    }
  ];

  const filteredFaqs = faqs.filter(f => f.category === activeCategory);

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="badge-fun badge-fun-gray mb-4 inline-block">S.S.S</span>
          <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">Sıkça Sorulan Sorular</h1>
          <p className="fun-text-muted text-lg">Hizmetlerimiz ve süreçlerimiz hakkında merak edilenler.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-[var(--fun-purple)] text-white shadow-lg' : 'bg-[var(--fun-card)] fun-text border border-[var(--fun-stroke-1)] hover:border-[var(--fun-purple)]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="rounded-3xl bg-[var(--fun-card)] border overflow-hidden transition-all duration-300" style={{ borderColor: openIndex === i ? 'var(--fun-purple)' : 'var(--fun-stroke-1)' }}>
              <button
                className="flex items-center justify-between py-6 px-8 w-full text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-xl font-bold fun-text">{faq.q}</span>
                <span className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="h-6 w-6 fun-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="px-8 pb-8 text-lg fun-text-muted leading-relaxed">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
