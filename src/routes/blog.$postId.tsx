import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLang } from "../lib/i18n";
import ArrowButton from "../components/ArrowButton";
import LanguageSwitcher from "../components/LanguageSwitcher";

export const Route = createFileRoute("/blog/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  const { t, lang } = useLang();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('*')
          .eq('id', postId)
          .single();

        if (!error && data) {
          setPost(data);
        }
      } catch (err) {
        console.error("Fetch post error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-12 w-12 border-4 border-[var(--fun-purple)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold fun-text mb-4">Yazı Bulunamadı</h1>
      <ArrowButton to="/blog" variant="dark">Bloga Dön</ArrowButton>
    </div>
  );

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <article className="max-w-[900px] mx-auto">
        <div className="mb-8 flex items-center justify-between">
           <ArrowButton to="/blog" variant="light" className="!py-2 !px-4 !text-sm">← Geri</ArrowButton>
           <div className="flex items-center gap-4">
             <span className="text-sm fun-text-muted">Otomatik Çeviri:</span>
             <LanguageSwitcher />
           </div>
        </div>

        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 text-sm fun-text-muted uppercase tracking-widest font-bold">
            <span>{post.tag || 'Teknoloji'}</span>
            <div className="h-1 w-1 rounded-full bg-current"></div>
            <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold fun-text mb-8 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-12 w-12 rounded-full bg-[var(--fun-purple)] flex items-center justify-center text-white font-bold text-xl">
               {post.author?.[0] || 'F'}
             </div>
             <div className="text-left">
               <p className="font-bold fun-text">{post.author || 'Fun Teknoloji'}</p>
               <p className="text-xs fun-text-muted uppercase tracking-tighter">Yazar</p>
             </div>
          </div>
        </header>

        {post.image_url && (
          <div className="mb-16 rounded-[40px] overflow-hidden aspect-[21/9] shadow-2xl">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-xl dark:prose-invert max-w-none fun-text leading-relaxed whitespace-pre-wrap">
          {post.text || post.description}
        </div>
      </article>
    </main>
  );
}
