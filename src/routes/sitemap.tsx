import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Site Haritası – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji web sitesindeki tüm sayfalara genel bakış." },
      { property: "og:title", content: "Site Haritası – Fun Teknoloji" },
      { property: "og:url", content: "https://funteknoloji.com/sitemap" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/sitemap" }],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  const { t } = useLang();

  const sections = [
    {
      title: t("nav.company"),
      links: [
        { to: "/about", label: t("nav.about"), desc: t("nav.about.desc") },
        { to: "/team", label: t("nav.team"), desc: t("nav.team.desc") },
      ],
    },
    {
      title: t("nav.platform"),
      links: [
        { to: "/services", label: t("nav.services"), desc: t("nav.services.desc") },
        { to: "/pricing", label: t("nav.pricing"), desc: t("nav.pricing.desc") },
      ],
    },
    {
      title: t("nav.projects"),
      links: [
        { to: "/projects", label: t("nav.projects"), desc: t("nav.projects.desc") },
        { to: "/quakesafe", label: t("nav.quakesafe"), desc: t("sitemap.quakesafe.desc") },
        { to: "/nexy", label: t("nav.nexy"), desc: t("sitemap.nexy.desc") },
      ],
    },
    {
      title: t("nav.resources"),
      links: [
        { to: "/blog", label: t("nav.blog"), desc: t("nav.blog.desc") },
        { to: "/faq", label: t("nav.faq"), desc: t("nav.faq.desc") },
        { to: "/changelog", label: t("nav.changelog"), desc: t("nav.changelog.desc") },
        { to: "/brand-kit", label: t("nav.brand_kit"), desc: t("nav.brand_kit.desc") },
        { to: "/docs", label: t("nav.docs"), desc: t("nav.docs.desc") },
        { to: "/contact", label: t("nav.contact"), desc: t("nav.contact.desc") },
      ],
    },
  ];

  return (
    <main className="pt-32 pb-24">
      <section className="px-4 lg:px-5">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="badge-fun badge-fun-gray mb-4 inline-block">{t("nav.sitemap")}</span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium fun-text mb-3">
                {t("nav.sitemap")}
              </h1>
              <p className="text-tagline-1 fun-text-muted max-w-[600px] mx-auto">
                {t("nav.sitemap.desc")}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((sec) => (
              <ScrollReveal key={sec.title}>
                <div
                  className="rounded-3xl border p-6 md:p-8 h-full"
                  style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
                >
                  <h2 className="text-heading-6 font-medium fun-text mb-4">{sec.title}</h2>
                  <ul className="space-y-3">
                    {sec.links.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="group flex items-start gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-[var(--fun-surface)]"
                        >
                          <span
                            className="mt-1 h-2 w-2 rounded-full"
                            style={{ backgroundColor: "var(--fun-purple)" }}
                          />
                          <span>
                            <span className="block text-sm font-medium fun-text group-hover:underline">
                              {l.label}
                            </span>
                            <span className="block text-xs fun-text-muted">{l.desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
