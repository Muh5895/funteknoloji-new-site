import { createFileRoute, Link } from "@tanstack/react-router";
<<<<<<< Updated upstream
import { useLang } from "../lib/i18n";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
=======
import { useState } from "react";
>>>>>>> Stashed changes

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

<<<<<<< Updated upstream
interface BlogPost {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tag: string;
  created_at: string;
}

function BlogPage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("blog")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          const formattedPosts = data.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description || p.content || "",
            image_url: p.image_url || p.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
            tag: p.tag || "Teknoloji",
            created_at: p.created_at
          }));
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error("Blog fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
=======
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
>>>>>>> Stashed changes

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">{t("blog.badge")}</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">{t("blog.title")}</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("blog.desc")}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="main-container">
<<<<<<< Updated upstream
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-[var(--fun-surface)] rounded-2xl mb-4"></div>
                  <div className="h-4 w-24 bg-[var(--fun-surface)] rounded mb-2"></div>
                  <div className="h-6 w-full bg-[var(--fun-surface)] rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-[var(--fun-surface)] rounded"></div>
=======
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
>>>>>>> Stashed changes
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-[var(--fun-surface)]">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
<<<<<<< Updated upstream
                  <span className="text-xs font-bold text-[var(--fun-purple)] uppercase tracking-wider mb-2 block">{post.tag}</span>
                  <h3 className="text-xl font-bold fun-text mb-2 group-hover:text-[var(--fun-purple)] transition-colors">{post.title}</h3>
                  <p className="text-fun-text-muted text-sm line-clamp-2">{post.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <h2 className="text-2xl font-medium fun-text-muted">{t("blog.empty")}</h2>
            </div>
          )}
=======
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
>>>>>>> Stashed changes
        </div>
      </section>
    </main>
  );
}
