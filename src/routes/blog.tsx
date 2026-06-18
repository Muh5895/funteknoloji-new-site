import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useState, useEffect } from "react";
import { getBlogPostsFn } from "../lib/supabase-server";

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
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<any[]>([]);

  const fallbackPosts = [
    {
        id: "1",
        title: {
            tr: "Yapay Zeka 2025'te İş Dünyasını Nasıl Dönüştürüyor?",
            en: "How is AI Transforming the Business World in 2025?",
            de: "Wie transformiert KI die Geschäftswelt im Jahr 2025?",
            fr: "Comment l'IA transforme-t-elle le monde des affaires en 2025 ?",
            es: "¿Cómo está transformando la IA el mundo empresarial en 2025?"
        },
        desc: {
            tr: "Yapay zekanın iş süreçlerindeki etkisi ve gelecek trendleri hakkında kapsamlı bir analiz.",
            en: "A comprehensive analysis of the impact of AI on business processes and future trends.",
            de: "Eine umfassende Analyse der Auswirkungen von KI auf Geschäftsprozesse und zukünftige Trends.",
            fr: "Une analyse complète de l'impact de l'IA sur les processus d'affaires et les tendances futures.",
            es: "Un análisis exhaustivo del impacto de la IA en los procesos de negocio y las tendencias futures."
        },
        date: "15 Nisan 2025",
        tag: "Yapay Zeka"
    },
    {
        id: "2",
        title: {
            tr: "Modern Web Geliştirme Trendleri",
            en: "Modern Web Development Trends",
            de: "Moderne Webentwicklungstrends",
            fr: "Tendances du développement web moderne",
            es: "Tendencias modernas de desarrollo web"
        },
        desc: {
            tr: "React, Next.js ve modern frontend teknolojileriyle hızlı ve ölçeklenebilir web uygulamaları.",
            en: "Fast and scalable web applications with React, Next.js, and modern frontend technologies.",
            de: "Schnelle und skalierbare Webanwendungen mit React, Next.js und modernen Frontend-Technologien.",
            fr: "Applications web rapides et évolutives avec React, Next.js et les technologies frontend modernes.",
            es: "Aplicaciones web rápidas y escalables con React, Next.js y tecnologías frontend modernes."
        },
        date: "10 Nisan 2025",
        tag: "Web Geliştirme"
    },
    {
        id: "3",
        title: {
            tr: "Siber Güvenlikte Yapay Zeka Kullanımı",
            en: "Use of AI in Cybersecurity",
            de: "Einsatz von KI in der Cybersicherheit",
            fr: "Utilisation de l'IA dans la cybersécurité",
            es: "Uso de la IA en la ciberseguridad"
        },
        desc: {
            tr: "Yapay zeka destekli güvenlik çözümleri ile tehditleri proaktif olarak tespit edin.",
            en: "Proactively detect threats with AI-powered security solutions.",
            de: "Erkennen Sie Bedrohungen proaktiv mit KI-gestützten Sicherheitslösungen.",
            fr: "Détectez les menaces de manière proactive grâce à des solutions de sécurité basées sur l'IA.",
            es: "Detecte amenazas de forma proactiva con soluciones de seguridad basadas en IA."
        },
        date: "5 Nisan 2025",
        tag: "Güvenlik"
    },
    {
        id: "4",
        title: {
            tr: "QuakeSafe: Afet Anında Bilgiye Hızlı Erişim",
            en: "QuakeSafe: Fast Access to Information During Disasters",
            de: "QuakeSafe: Schneller Zugriff auf Informationen bei Katastrophen",
            fr: "QuakeSafe : Accès rapide à l'information lors de catastrophes",
            es: "QuakeSafe: Acceso rápido a la información durante desastres"
        },
        desc: {
            tr: "QuakeSafe uygulaması, deprem ve acil durumlarda kritik bilgilere internet olmasa bile ulaşmanızı sağlar.",
            en: "The QuakeSafe application allows you to access critical information during earthquakes and emergencies even without internet.",
            de: "Die QuakeSafe-Anwendung ermöglicht den Zugriff auf kritische Informationen bei Erdbeben und Notfällen auch ohne Internet.",
            fr: "L'application QuakeSafe vous permet d'accéder aux informations critiques lors de tremblements de terre et d'urgences, même sans internet.",
            es: "La aplicación QuakeSafe le permite acceder a información crítica durante terremotos y emergencias incluso sin internet."
        },
        date: "1 Nisan 2025",
        tag: "Ürünler"
    },
    {
        id: "5",
        title: {
            tr: "Bulut Bilişimde Maliyet Optimizasyonu",
            en: "Cost Optimization in Cloud Computing",
            de: "Kostenoptimierung im Cloud-Computing",
            fr: "Optimisation des coûts dans le cloud computing",
            es: "Optimización de costes en la computación en la nube"
        },
        desc: {
            tr: "Bulut altyapı maliyetlerinizi optimize etmek için pratik stratejiler ve en iyi uygulamalar.",
            en: "Practical strategies and best practices for optimizing your cloud infrastructure costs.",
            de: "Praktische Strategien und Best Practices zur Optimierung Ihrer Cloud-Infrastrukturkosten.",
            fr: "Optimisation des coûts dans le cloud computing",
            es: "Optimización de costes en la computación en la nube"
        },
        date: "25 Mart 2025",
        tag: "Bulut"
    },
    {
        id: "6",
        title: {
            tr: "Mobil Uygulama Geliştirmede En İyi Pratikler",
            en: "Best Practices in Mobile App Development",
            de: "Best Practices in der Entwicklung mobiler Apps",
            fr: "Meilleures pratiques en matière de développement d'applications mobiles",
            es: "Mejores prácticas en el desarrollo de aplicaciones móviles"
        },
        desc: {
            tr: "Cross-platform geliştirme, performans optimizasyonu ve kullanıcı deneyimi ipuçları.",
            en: "Cross-platform development, performance optimization, and user experience tips.",
            de: "Plattformübergreifende Entwicklung, Leistungsoptimierung und Tipps zur Benutzererfahrung.",
            fr: "Développement multiplateforme, optimisation des performances et conseils sur l'expérience utilisateur.",
            es: "Desarrollo multiplataforma, optimización del rendimiento y consejos sobre la experiencia del usuario."
        },
        date: "20 Mart 2025",
        tag: "Mobil"
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const data = await getBlogPostsFn();
            if (data && data.length > 0) {
                setPosts(data.map(item => ({
                    ...item,
                    title: typeof item.title === 'string' ? { tr: item.title, en: item.title } : item.title,
                    desc: typeof item.desc === 'string' ? { tr: item.desc, en: item.desc } : item.desc,
                })));
            } else {
                setPosts(fallbackPosts);
            }
        } catch (err) {
            console.error("Failed to fetch blog posts:", err);
            setPosts(fallbackPosts);
        }
    };
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
            <span className="badge-fun badge-fun-white mb-4 inline-block">Blog</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">{t("nav.blog")}</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">En son teknoloji haberleri, içgörüler ve rehberler.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={i} className="rounded-3xl border overflow-hidden transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                <Link to={`/blog/${post.id}`} className="block h-[200px] flex items-center justify-center transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--fun-surface)' }}>
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--fun-card)' }}>
                    <span className="text-2xl font-bold fun-text-muted">{i + 1}</span>
                  </div>
                </Link>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[post.tag] || ''}`}>{post.tag}</span>
                    <span className="text-xs fun-text-muted">{post.date}</span>
                  </div>
                  <h3 className="text-heading-6 font-medium mb-2 fun-text">
                    {post.title[lang] || post.title["en"] || post.title["tr"]}
                  </h3>
                  <p className="text-tagline-1 fun-text-muted mb-4">
                    {post.desc[lang] || post.desc["en"] || post.desc["tr"]}
                  </p>
                  <Link to={`/blog/${post.id}`} className="text-sm font-medium fun-text inline-flex items-center gap-1 cursor-pointer hover:text-[#864FFE] transition-colors">
                    {t("blog.read_more")}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
