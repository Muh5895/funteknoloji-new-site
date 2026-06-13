import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

function FAQPage() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Fun Teknoloji nedir?", a: "Fun Teknoloji, yapay zeka ve modern teknolojileri kullanarak işletmelere değer katan yenilikçi bir teknoloji şirketidir." },
    { q: "Hangi hizmetleri sunuyorsunuz?", a: "Yazılım geliştirme, yapay zeka entegrasyonu, veri analitiği ve siber güvenlik hizmetleri sunuyoruz." },
    { q: "Bekleme listesine nasıl katılırım?", a: "Ana sayfamızdaki 'Bekleme Listesine Katıl' butonuna tıklayarak kayıt olabilirsiniz." },
    { q: "Projeleriniz nelerdir?", a: "En büyük projelerimizden biri olan QuakeSafe ve diğer yenilikçi çözümlerimiz hakkında Projelerimiz sayfasından bilgi alabilirsiniz." }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="badge-fun badge-fun-gray mb-4 inline-block">S.S.S</span>
          <h1 className="text-heading-2 font-bold fun-text mb-4">Sıkça Sorulan Sorular</h1>
          <p className="fun-text-muted text-lg">Hizmetlerimiz ve süreçlerimiz hakkında merak edilenler.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-[var(--fun-card)] border" style={{ borderColor: 'var(--fun-stroke-1)' }}>
              <button
                className="flex items-center justify-between py-6 px-8 w-full text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-xl font-medium fun-text">{faq.q}</span>
                <span className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="h-6 w-6 fun-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${openIndex === i ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="px-8 pb-8 text-lg fun-text-muted opacity-80">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
