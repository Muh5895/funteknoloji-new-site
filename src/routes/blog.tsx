import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

function BlogPage() {
  const { t } = useLang();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const tagColors: Record<string, string> = {
    "Yapay Zeka": "bg-[#864FFE]/10 text-[#864FFE]",
    "Web Geliştirme": "bg-[#4A90E2]/10 text-[#4A90E2]",
    "Güvenlik": "bg-[#FF6B6B]/10 text-[#FF6B6B]",
    "Ürünler": "bg-[#D4F5E9] text-[#12161F]",
    "Bulut": "bg-[#1890FF]/10 text-[#1890FF]",
    "Mobil": "bg-[#FF8C00]/10 text-[#FF8C00]",
  };

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

      <section className="py-16 md:py-24">
        <div className="main-container">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-tagline-1 fun-text-muted">Yükleniyor...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <article key={post.id || i} className="rounded-3xl border overflow-hidden transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="h-[200px] flex items-center justify-center" style={{ backgroundColor: 'var(--fun-surface)' }}>
                    <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--fun-card)' }}>
                      <span className="text-2xl font-bold fun-text-muted">{i + 1}</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[post.tag] || 'bg-[#864FFE]/10 text-[#864FFE]'}`}>{post.tag || 'Teknoloji'}</span>
                      <span className="text-xs fun-text-muted">{post.created_at ? new Date(post.created_at).toLocaleDateString('tr-TR') : ''}</span>
                    </div>
                    <h3 className="text-heading-6 font-medium mb-2 fun-text">{post.title}</h3>
                    <p className="text-tagline-1 fun-text-muted mb-4">{post.description}</p>
                    <span className="text-sm font-medium fun-text inline-flex items-center gap-1 cursor-pointer hover:text-[#864FFE] transition-colors">
                      Devamını oku
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-tagline-1 fun-text-muted">{t("blog.empty")}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
