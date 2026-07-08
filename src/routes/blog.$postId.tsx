import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import { getBlogPost } from "../lib/engine";
import { translateText } from "../lib/translate";
import { useLang, type Lang } from "../lib/i18n";
import ArrowButton from "../components/ArrowButton";
import ScrollReveal from "../components/ScrollReveal";
import { MoreVertical, Copy, Volume2, Languages, Info, X, Check, VolumeX } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog/$postId")({
  component: PostPage,
});

const FLAG_MAP: Record<string, string> = {
  tr: "https://flagcdn.com/tr.svg",
  en: "https://flagcdn.com/us.svg",
  az: "https://flagcdn.com/az.svg",
  de: "https://flagcdn.com/de.svg",
  fr: "https://flagcdn.com/fr.svg",
  es: "https://flagcdn.com/es.svg",
  ru: "https://flagcdn.com/ru.svg",
  ar: "https://flagcdn.com/sa.svg",
  it: "https://flagcdn.com/it.svg",
  pt: "https://flagcdn.com/pt.svg",
  ja: "https://flagcdn.com/jp.svg",
  zh: "https://flagcdn.com/cn.svg",
};

const LANG_LABELS: Record<string, string> = {
  tr: "Türkçe",
  en: "English",
  az: "Azerice",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  ar: "العربية",
  it: "Italiano",
  pt: "Português",
  ja: "日本語",
  zh: "中文",
};

function PostPage() {
  const { postId: rawPostId } = Route.useParams();
  const postId = rawPostId.replaceAll("-", " ");
  const { lang, setLang, t } = useLang();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [menuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // TTS States
  const [isReading, setIsReading] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fetchPost = useCallback(
    async (isInitial = true) => {
      if (isInitial) setLoading(true);
      else setContentLoading(true);

      try {
        const data = await getBlogPost(postId);

        if (data) {
          let title = data[`title_${lang}`] || data.title || data.heading;
          let text =
            data[`text_${lang}`] ||
            data[`content_${lang}`] ||
            data.text ||
            data.content ||
            data.description;

          // Real-time Translation Fallback
          if (lang !== "tr" && !data[`title_${lang}`] && !data[`text_${lang}`]) {
            title = await translateText({ text: data.title || data.heading, targetLang: lang });
            text = await translateText({
              text: data.text || data.content || data.description,
              targetLang: lang,
            });
          }

          const formatted = {
            ...data,
            displayTitle: title,
            displayText: text,
          };
          setPost(formatted);
        }
      } catch (err) {
        console.error("Fetch post error:", err);
      } finally {
        if (isInitial) setLoading(false);
        else {
          setTimeout(() => setContentLoading(false), 500);
        }
      }
    },
    [postId, lang],
  );

  useEffect(() => {
    fetchPost();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [postId]);

  useEffect(() => {
    if (post) {
      fetchPost(false);
    }
    window.speechSynthesis.cancel();
    setIsReading(false);
    setHighlightIdx(null);
  }, [lang]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    if (post) {
      navigator.clipboard.writeText(`${post.displayTitle}\n\n${post.displayText}`);
      toast.success(t("blog.post.copied"));
      setMobileMenuOpen(false);
    }
  };

  const handleReadAloud = () => {
    if (!post) return;
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setHighlightIdx(null);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const fullText = `${post.displayTitle}. ${post.displayText}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utteranceRef.current = utterance;

      const langMap: Record<string, string> = {
        tr: "tr-TR",
        en: "en-US",
        de: "de-DE",
        fr: "fr-FR",
        es: "es-ES",
        az: "tr-TR",
        ru: "ru-RU",
        ar: "ar-SA",
        it: "it-IT",
        pt: "pt-PT",
        ja: "ja-JP",
        zh: "zh-CN",
      };
      utterance.lang = langMap[lang] || "tr-TR";

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          // For mobile compatibility, ensure we use charIndex correctly
          const index = event.charIndex;
          // Use a small timeout to ensure state update syncs with speech
          setTimeout(() => {
            requestAnimationFrame(() => {
              setHighlightIdx(index);
            });
          }, 10);
        }
      };

      // Fallback for some mobile browsers that don't trigger onboundary reliably
      utterance.onstart = () => {
        setIsReading(true);
      };

      utterance.onend = () => {
        setIsReading(false);
        setHighlightIdx(null);
      };

      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      toast.info(t("blog.post.reading_started"));
      setMobileMenuOpen(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="h-12 w-12 border-4 border-[var(--fun-purple)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!post)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold fun-text mb-4">{t("blog.post.not_found")}</h1>
        <ArrowButton to="/blog" variant="dark">
          {t("error.home")}
        </ArrowButton>
      </div>
    );

  const renderHighlightedText = (text: string, offset: number = 0) => {
    if (!isReading || highlightIdx === null) return text;

    const relativeIdx = highlightIdx - offset;
    // For mobile browsers, onboundary might be slightly off.
    // We check a small range around the current index.
    if (relativeIdx < -20 || relativeIdx >= text.length) return text;

    // Find the word being spoken
    let start = Math.max(0, relativeIdx);
    // Find previous space to get start of word if index is in middle
    while (start > 0 && text[start - 1] !== " " && text[start - 1] !== "\n") start--;

    let end = relativeIdx;
    while (end < text.length && text[end] !== " " && text[end] !== "\n") end++;

    if (start >= text.length) return text;

    return (
      <>
        {text.substring(0, start)}
        <mark className="bg-[var(--fun-purple)] text-white rounded px-0.5 transition-all duration-100 ease-in-out">
          {text.substring(start, end)}
        </mark>
        {text.substring(end)}
      </>
    );
  };

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 bg-[var(--color-background)]">
      <div className="max-w-[900px] mx-auto">
        {/* Actions Header */}
        <div className="mb-12 flex items-center justify-between relative">
          <ArrowButton
            to="/blog"
            variant="light"
            direction="left"
            className="!py-2 !px-4 !text-sm border border-[var(--fun-stroke-1)]"
          >
            {t("blog.post.all_posts")}
          </ArrowButton>

          <div className="flex items-center gap-3" ref={menuRef}>
            {lang !== "tr" && (
              <button
                onClick={() => toast.warning(t("blog.post.translation_warning"))}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:scale-105 transition-transform"
              >
                <Info className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!menuOpen)}
              className={`h-10 w-10 flex items-center justify-center rounded-full border border-[var(--fun-stroke-1)] transition-all ${menuOpen ? "bg-[var(--fun-purple)] text-white border-[var(--fun-purple)]" : "bg-[var(--fun-card)] fun-text hover:border-[var(--fun-purple)]"}`}
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] shadow-2xl z-50 p-2 animate-in slide-in-from-top-2 duration-200">
                <button
                  disabled={contentLoading}
                  onClick={handleCopy}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--fun-surface)] transition-colors fun-text text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="h-4 w-4" /> {t("blog.post.copy_text")}
                </button>
                <button
                  disabled={contentLoading}
                  onClick={handleReadAloud}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--fun-surface)] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed ${isReading ? "text-red-500" : "fun-text"}`}
                >
                  {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {isReading ? t("blog.post.stop_reading") : t("blog.post.read_aloud")}
                </button>
                <div className="h-px bg-[var(--fun-stroke-1)] my-2" />
                <button
                  onClick={() => {
                    setLangMenuOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[var(--fun-surface)] transition-colors fun-text text-sm"
                >
                  <div className="flex items-center gap-3">
                    <Languages className="h-4 w-4" /> {t("blog.post.change_language")}
                  </div>
                  <span className="uppercase text-[10px] font-bold bg-[var(--fun-surface)] px-2 py-0.5 rounded-md">
                    {lang}
                  </span>
                </button>
              </div>
            )}

            {/* Language Selection Sub-menu */}
            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 max-h-[400px] overflow-y-auto rounded-2xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] shadow-2xl z-50 p-2 animate-in zoom-in-95 duration-200 custom-scrollbar">
                <div className="sticky top-0 bg-[var(--fun-card)] z-10 flex items-center justify-end px-3 py-2 border-b border-[var(--fun-stroke-1)] mb-1">
                  <button onClick={() => setLangMenuOpen(false)} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </div>
                {Object.entries(LANG_LABELS).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code as Lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-sm ${lang === code ? "bg-[var(--fun-purple)] text-white shadow-lg" : "hover:bg-[var(--fun-surface)] fun-text"}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={FLAG_MAP[code]}
                        className="h-5 w-5 rounded-full object-cover border border-white/20"
                        alt=""
                      />
                      {label}
                    </div>
                    {lang === code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <ScrollReveal>
            <div className="mb-12 rounded-[40px] overflow-hidden aspect-video md:aspect-[21/9] shadow-2xl border border-[var(--fun-stroke-1)] group bg-[var(--fun-surface)]">
              <img
                src={post.image_url}
                alt={post.displayTitle}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Post Title */}
        <ScrollReveal>
          <div className="mb-12">
            {contentLoading ? (
              <div className="space-y-4">
                <div className="h-16 w-full bg-[var(--fun-surface)] rounded-2xl animate-pulse" />
                <div className="h-16 w-3/4 bg-[var(--fun-surface)] rounded-2xl animate-pulse" />
              </div>
            ) : (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold fun-text leading-[1.1] tracking-tight">
                {renderHighlightedText(post.displayTitle)}
              </h1>
            )}
          </div>
        </ScrollReveal>

        {/* Content Body */}
        <ScrollReveal>
          <div className="relative">
            {contentLoading && (
              <div className="absolute inset-0 z-10 space-y-6 bg-[var(--color-background)]/80 backdrop-blur-sm animate-in fade-in duration-300">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 bg-[var(--fun-surface)] rounded-full animate-pulse ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/6"}`}
                  ></div>
                ))}
              </div>
            )}
            <div className="prose prose-xl dark:prose-invert max-w-none fun-text leading-relaxed whitespace-pre-wrap selection:bg-[var(--fun-purple)] selection:text-white pb-12">
              {renderHighlightedText(post.displayText, post.displayTitle.length + 2)}
            </div>
          </div>
        </ScrollReveal>

        {/* Author & Meta Footer */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-[var(--fun-stroke-1)]">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-[var(--fun-purple)] to-[#6C5CE7] flex items-center justify-center text-white shadow-xl shadow-purple-500/20 ring-4 ring-[var(--fun-card)] overflow-hidden">
                {post.author_image ? (
                  <img
                    src={post.author_image}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">{post.author?.[0] || "F"}</span>
                )}
              </div>
              <div>
                <p className="font-bold text-xl fun-text">{post.author || "Fun Teknoloji"}</p>
                <p className="text-sm font-bold fun-text-muted uppercase tracking-widest">
                  {t("blog.post.author_label")}
                </p>
              </div>
            </div>
            <div className="text-right flex flex-col items-center md:items-end">
              <p className="text-sm font-bold fun-text-muted px-4 py-2 bg-[var(--fun-surface)] rounded-full border border-[var(--fun-stroke-1)]">
                {new Date(post.created_at).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Related Callout */}
        <ScrollReveal>
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 bg-[var(--fun-surface)] p-10 rounded-[40px] border border-[var(--fun-stroke-1)]">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold fun-text mb-2">{t("blog.post.explore_more")}</h3>
              <p className="fun-text-muted">{t("blog.post.stay_updated")}</p>
            </div>
            <ArrowButton to="/blog" variant="dark">
              {t("blog.post.all_posts")}
            </ArrowButton>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
