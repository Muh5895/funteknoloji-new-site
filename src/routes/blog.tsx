import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

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
      const { data, error } = await supabase
        .from("blog")
        .select("id, title, description, image_url, tag, created_at")
        .order("created_at", { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

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
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-[var(--fun-surface)]">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
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
        </div>
      </section>
    </main>
  );
}
