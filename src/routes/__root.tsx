import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroSplash from "../components/IntroSplash";
import HelpButton from "../components/HelpButton";
import { LanguageProvider } from "../lib/i18n";

const THEME_INIT = `
(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');var l=localStorage.getItem('lang');if(l==='en'||l==='tr')document.documentElement.lang=l;}catch(e){}})();
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold fun-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold fun-text">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm fun-text-muted">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <div className="mt-6">
          <Link to="/" className="btn-fun btn-fun-dark">Ana Sayfa</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fun Teknoloji – Geleceği Bugün Keşfedin" },
      { name: "description", content: "Yapay zeka, yazılım geliştirme ve akıllı sistemler alanında öncü çözümlerle işinizi dijital dönüşümün merkezine taşıyoruz." },
      { name: "author", content: "Fun Teknoloji" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Fun Teknoloji – Geleceği Bugün Keşfedin" },
      { property: "og:description", content: "Yenilikçi çözümlerimiz ve gelişmiş altyapımız ile iş süreçlerinizi hızlandırın." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: "Fun Teknoloji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@funteknoloji_" },
      { name: "twitter:title", content: "Fun Teknoloji – Geleceği Bugün Keşfedin" },
      { name: "twitter:description", content: "Yenilikçi teknoloji çözümleri." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Fun Teknoloji",
          url: "https://build-dream-flow-91.lovable.app",
          sameAs: [
            "https://www.instagram.com/funteknoloji/",
            "https://www.youtube.com/@FunTeknoloji",
            "https://www.linkedin.com/company/funteknoloji",
            "https://x.com/funteknoloji_",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <IntroSplash />
      <Header />
      <Outlet />
      <Footer />
      <HelpButton />
    </LanguageProvider>
  );
}
