import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji blog yazıları, teknoloji haberleri ve içgörüler." },
      { property: "og:title", content: "Blog – Fun Teknoloji" },
      { property: "og:description", content: "Fun Teknoloji blog yazıları, teknoloji haberleri ve içgörüler." },
      { property: "og:url", content: "https://build-dream-flow-91.lovable.app/blog" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Blog – Fun Teknoloji" },
      { name: "twitter:description", content: "Fun Teknoloji blog yazıları, teknoloji haberleri ve içgörüler." },
    ],
    links: [{ rel: "canonical", href: "https://build-dream-flow-91.lovable.app/blog" }],
  }),
  component: BlogPage,
});

const posts = [
  {
    id: 1,
    title: "Yapay Zeka 2025'te İş Dünyasını Nasıl Dönüştürüyor?",
    desc: "Yapay zekanın iş süreçlerindeki etkisi ve gelecek trendleri hakkında kapsamlı bir analiz.",
    content: "Yapay zeka teknolojileri, 2025 yılı itibarıyla iş dünyasının her katmanında kendine yer bulmaya başladı. Veri analitiğinden müşteri ilişkileri yönetimine, üretim süreçlerinden stratejik karar alma mekanizmalarına kadar AI, verimliliği artıran en temel unsur haline geldi.\n\nÖzellikle generatif yapay zeka sistemleri, içerik üretimi ve yazılım geliştirme süreçlerini %40'a varan oranlarda hızlandırdı. Fun Teknoloji olarak biz de bu dönüşümün merkezinde yer alarak, işletmelere özel AI çözümleri geliştiriyoruz.",
    date: "15 Nisan 2025",
    tag: "Yapay Zeka"
  },
  {
    id: 2,
    title: "Modern Web Geliştirme Trendleri",
    desc: "React, Next.js ve modern frontend teknolojileriyle hızlı ve ölçeklenebilir web uygulamaları.",
    content: "Web dünyası her geçen gün daha hızlı ve daha etkileşimli hale geliyor. Server-side rendering, edge computing ve yeni nesil CSS frameworkleri (Tailwind v4 gibi) kullanıcı deneyimini zirveye taşıyor.\n\nPerformans artık sadece bir 'tercih' değil, bir zorunluluk. Fun Teknoloji projelerinde en son teknolojileri kullanarak milisaniyelerle yarışan arayüzler sunuyoruz.",
    date: "10 Nisan 2025",
    tag: "Web Geliştirme"
  },
  {
    id: 3,
    title: "Siber Güvenlikte Yapay Zeka Kullanımı",
    desc: "Yapay zeka destekli güvenlik çözümleri ile tehditleri proaktif olarak tespit edin.",
    content: "Geleneksel güvenlik yöntemleri artık karmaşık siber saldırılara karşı tek başına yeterli değil. Yapay zeka, ağ trafiğini gerçek zamanlı analiz ederek anormal davranışları milisaniyeler içinde tespit edebiliyor.\n\nProaktif savunma mekanizmaları, veri ihlallerini %80 oranında azaltma potansiyeline sahip.",
    date: "5 Nisan 2025",
    tag: "Güvenlik"
  },
  {
    id: 4,
    title: "QuakeSafe: Afet Anında Bilgiye Hızlı Erişim",
    desc: "QuakeSafe uygulaması, deprem ve acil durumlarda kritik bilgilere internet olmasa bile ulaşmanızı sağlar.",
    content: "Deprem kuşağında yaşayan bir toplum olarak, afet anında doğru bilgiye ulaşmanın hayati önemini biliyoruz. QuakeSafe, offline çalışma özelliği ve akıllı bildirim sistemiyle hayat kurtarmayı hedefleyen bir Fun Teknoloji projesidir.",
    date: "1 Nisan 2025",
    tag: "Ürünler"
  },
  {
    id: 5,
    title: "Bulut Bilişimde Maliyet Optimizasyonu",
    desc: "Bulut altyapı maliyetlerinizi optimize etmek için pratik stratejiler ve en iyi uygulamalar.",
    content: "Bulut hizmetleri ölçeklenebilirlik sunsa da, yanlış yapılandırılan kaynaklar büyük maliyetlere neden olabilir. FinOps yaklaşımları ve yapay zeka destekli kaynak yönetimi ile altyapı maliyetlerinizi %30 oranında düşürebilirsiniz.",
    date: "25 Mart 2025",
    tag: "Bulut"
  },
  {
    id: 6,
    title: "Mobil Uygulama Geliştirmede En İyi Pratikler",
    desc: "Cross-platform geliştirme, performans optimizasyonu ve kullanıcı deneyimi ipuçları.",
    content: "Mobil kullanıcılar artık masaüstü deneyimine yakın hız ve akıcılık bekliyor. Native-like performans sunan frameworkler ve kullanıcı odaklı tasarım prensipleri, uygulama başarısının anahtarıdır.",
    date: "20 Mart 2025",
    tag: "Mobil"
  },
];

const tagColors: Record<string, string> = {
  "Yapay Zeka": "bg-[#864FFE]/10 text-[#864FFE]",
  "Web Geliştirme": "bg-[#4A90E2]/10 text-[#4A90E2]",
  "Güvenlik": "bg-[#FF6B6B]/10 text-[#FF6B6B]",
  "Ürünler": "bg-[#D4F5E9] text-[#12161F]",
  "Bulut": "bg-[#1890FF]/10 text-[#1890FF]",
  "Mobil": "bg-[#FF8C00]/10 text-[#FF8C00]",
};

function BlogPage() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectedPost = posts.find(p => p.id === selectedPostId);

  if (selectedPost) {
    return (
      <main className="min-h-screen">
        <section className="pt-32 pb-16 px-4 lg:px-5">
          <div className="max-w-[1000px] mx-auto">
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center gap-2 text-sm fun-text-muted hover:fun-text mb-8 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Geri Dön
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[selectedPost.tag] || ''}`}>{selectedPost.tag}</span>
              <span className="text-sm fun-text-muted">{selectedPost.date}</span>
            </div>

            <h1 className="text-heading-3 md:text-heading-2 font-medium mb-8 fun-text">{selectedPost.title}</h1>

            <div className="rounded-3xl h-[400px] mb-10 flex items-center justify-center border" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)' }}>
               <span className="text-6xl font-bold fun-text-muted opacity-20">{selectedPost.id}</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl fun-text font-medium mb-6 leading-relaxed">
                {selectedPost.desc}
              </p>
              <div className="space-y-6">
                {selectedPost.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="fun-text-muted text-lg leading-relaxed whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--fun-stroke-1)' }}>
              <h3 className="text-heading-6 font-medium mb-6 fun-text">Diğer Yazılar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.filter(p => p.id !== selectedPost.id).slice(0, 2).map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPostId(p.id);
                      window.scrollTo(0, 0);
                    }}
                    className="text-left p-6 rounded-2xl border hover:shadow-md transition-all"
                    style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}
                  >
                    <span className="text-xs fun-text-muted block mb-2">{p.date}</span>
                    <h4 className="font-medium fun-text">{p.title}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">Blog</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">Teknoloji Dünyasından</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">En son teknoloji haberleri, içgörüler ve rehberler.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article
                key={i}
                className="rounded-3xl border overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
                style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}
                onClick={() => {
                  setSelectedPostId(post.id);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="h-[200px] flex items-center justify-center transition-transform group-hover:scale-105 duration-500" style={{ backgroundColor: 'var(--fun-surface)' }}>
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--fun-card)' }}>
                    <span className="text-2xl font-bold fun-text-muted">{post.id}</span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[post.tag] || ''}`}>{post.tag}</span>
                    <span className="text-xs fun-text-muted">{post.date}</span>
                  </div>
                  <h3 className="text-heading-6 font-medium mb-2 fun-text group-hover:text-[#864FFE] transition-colors">{post.title}</h3>
                  <p className="text-tagline-1 fun-text-muted mb-4 line-clamp-2">{post.desc}</p>
                  <span className="text-sm font-medium fun-text inline-flex items-center gap-1 transition-colors group-hover:gap-2">
                    Devamını oku
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
