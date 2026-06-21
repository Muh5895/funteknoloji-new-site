import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useEffect, useState, useMemo } from "react";
import { getBlogPosts } from "../lib/engine";
import { translateText } from "../lib/translate";
import { Search, X } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/blog/")({
  head: ({ t }: { t: (k: string) => string }) => ({
    meta: [{ title: t("title.blog") }],
  }),
  component: BlogPage,
});

interface BlogPost {
  title: string;
  description: string;
  text: string;
  image_url: string;
  author: string;
  created_at: string;
}

function BlogPage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchBar] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBlogPosts();

        if (data) {
          const formattedPosts = await Promise.all(data.map(async (p: any) => {
            let title = p.title || t("blog.index.untitled");
            let description = p.description || p.text?.substring(0, 150) || "";

            if (lang !== 'tr') {
              title = await translateText({ text: title, targetLang: lang });
              description = await translateText({ text: description, targetLang: lang });
            }

            return {
              ...p,
              title,
              description,
              image_url: p.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
            };
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
  }, [lang, t]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
            <div className="main-container text-center">
              <span className="badge-fun badge-fun-white mb-4 inline-block">{t("blog.badge")}</span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">{t("blog.title")}</h1>
              <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("blog.desc")}</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20">
        <div className="main-container">
          <div className="mb-12 max-w-[600px] mx-auto relative group">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fun-purple)] group-focus-within:scale-110 transition-transform">
               <Search className="h-5 w-5" />
             </div>
             <input
               type="text"
               placeholder={t("blog.index.search_placeholder")}
               value={searchQuery}
               onChange={(e) => setSearchBar(e.target.value)}
               className="w-full bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] rounded-2xl py-4 pl-12 pr-12 fun-text outline-none focus:border-[var(--fun-purple)] transition-colors shadow-sm"
             />
             {searchQuery && (
               <button
                 onClick={() => setSearchBar("")}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-fun-text-muted hover:text-fun-text transition-colors"
               >
                 <X className="h-5 w-5" />
               </button>
             )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-[var(--fun-surface)] rounded-2xl mb-4"></div>
                  <div className="h-4 w-24 bg-[var(--fun-surface)] rounded mb-2"></div>
                  <div className="h-6 w-full bg-[var(--fun-surface)] rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-[var(--fun-surface)] rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <ScrollReveal key={post.title}>
                  <Link to={`/blog/${post.title.replaceAll(' ', '-')}`} className="group block">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-[var(--fun-surface)]">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-xl font-bold fun-text mb-2 group-hover:text-[var(--fun-purple)] transition-colors">{post.title}</h3>
                    <p className="text-fun-text-muted text-sm line-clamp-2">{post.description}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <h2 className="text-2xl font-medium fun-text-muted">
                 {searchQuery ? t("blog.index.no_results") : t("blog.empty")}
               </h2>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
