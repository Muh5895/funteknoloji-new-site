import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Site Haritası – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji web sitesindeki tüm sayfalara genel bakış." },
      { property: "og:title", content: "Site Haritası – Fun Teknoloji" },
      { property: "og:url", content: "https://build-dream-flow-91.lovable.app/sitemap" },
    ],
    links: [{ rel: "canonical", href: "https://build-dream-flow-91.lovable.app/sitemap" }],
  }),
  component: SitemapPage,
});

const sections = [
  {
    title: "Şirket",
    links: [
      { to: "/about", label: "Hakkımızda", desc: "Bizi daha yakından tanıyın" },
      { to: "/team", label: "Ekibimiz", desc: "Dinamik ekibimiz" },
    ],
  },
  {
    title: "Platform",
    links: [
      { to: "/services", label: "Hizmetler", desc: "Tüm hizmetlerimiz" },
      { to: "/pricing", label: "Fiyatlandırma", desc: "Fiyat planları" },
    ],
  },
  {
    title: "Kaynaklar",
    links: [
      { to: "/blog", label: "Blog", desc: "En son yazılar" },
      { to: "/contact", label: "İletişim", desc: "Bize ulaşın" },
    ],
  },
];

function SitemapPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="px-4 lg:px-5">
        <div className="main-container">
          <div className="text-center mb-14">
            <span className="badge-fun badge-fun-gray mb-4 inline-block">Site Haritası</span>
            <h1 className="text-heading-3 md:text-heading-2 font-medium fun-text mb-3">Tüm Sayfalar</h1>
            <p className="text-tagline-1 fun-text-muted max-w-[600px] mx-auto">Fun Teknoloji web sitesindeki tüm bölümlere göz atın.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((sec) => (
              <div key={sec.title} className="rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}>
                <h2 className="text-heading-6 font-medium fun-text mb-4">{sec.title}</h2>
                <ul className="space-y-3">
                  {sec.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="group flex items-start gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-[var(--fun-surface)]">
                        <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--fun-purple)" }} />
                        <span>
                          <span className="block text-sm font-medium fun-text group-hover:underline">{l.label}</span>
                          <span className="block text-xs fun-text-muted">{l.desc}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
