import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useEffect, useState, useRef } from "react";
import ArrowButton from "../components/ArrowButton";

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Müşteri Yorumları – Fun Teknoloji" },
      { name: "description", content: "Müşterilerimizin Fun Teknoloji hakkındaki görüşlerini keşfedin." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { t } = useLang();

  const reviews = [
    { name: t("home.testimonials.t1.name"), text: t("home.testimonials.t1.text"), company: "Tech Startup" },
    { name: t("home.testimonials.t2.name"), text: t("home.testimonials.t2.text"), company: "E-ticaret Çözümleri" },
    { name: t("home.testimonials.t3.name"), text: t("home.testimonials.t3.text"), company: "Lojistik A.Ş." },
    { name: t("home.testimonials.t4.name"), text: t("home.testimonials.t4.text"), company: "Freelance Tasarımcı" },
    { name: t("home.testimonials.t5.name"), text: t("home.testimonials.t5.text"), company: "Finans Grubu" },
    { name: t("home.testimonials.t6.name"), text: t("home.testimonials.t6.text"), company: "Yayıncılık Evi" },
  ];

  const colors = ["from-[#F4F8E7] to-[#D485FF]", "from-[#E8F4FD] to-[#4A90E2]", "from-[#FFE8E8] to-[#FF6B6B]", "from-[#F0E6FF] to-[#8B5CF6]", "from-[#E6F7FF] to-[#1890FF]", "from-[#FFF7E6] to-[#FF8C00]"];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5 animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-green mb-4 inline-block">{t("home.testimonials.badge")}</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">{t("nav.reviews")}</h1>
            <p className="max-w-[700px] mx-auto text-tagline-1 fun-text-muted">{t("nav.reviews.desc")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <ScrollReveal key={i}>
                <article className="h-full rounded-[32px] p-8 md:p-10 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="h-5 w-5 text-[#864FFE]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg fun-text leading-relaxed mb-8 italic">"{r.text}"</p>
                  <div className="flex items-center gap-4 border-t pt-6" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                    <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white font-bold text-xl`}>
                      {r.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold fun-text">{r.name}</h3>
                      <p className="text-sm fun-text-muted">{r.company}</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5 relative overflow-hidden group text-center">
           <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <h2 className="text-heading-4 md:text-heading-3 font-medium text-white mb-4 relative z-10">Siz de deneyiminizi paylaşın</h2>
           <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8 relative z-10">Fun Teknoloji ile işinizi nasıl büyüttüğünüzü duymak isteriz.</p>
           <ArrowButton to="/contact" variant="light" className="relative z-10">Geri Bildirim Gönder</ArrowButton>
        </div>
      </ScrollReveal>
    </main>
  );
}
