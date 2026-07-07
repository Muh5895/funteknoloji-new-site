import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NexyAssistant from "../components/NexyAssistant";
import IntroSplash from "../components/IntroSplash";
import { LanguageProvider, useLang } from "../lib/i18n";
import { Toaster } from "../components/ui/sonner";
import { inject } from "@vercel/analytics";

const THEME_INIT = `
(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');document.documentElement.style.backgroundColor='black';}else{document.documentElement.style.backgroundColor='white';}var l=localStorage.getItem('lang');var supported=['tr','en','de','fr','es','az','ru','ar','it','pt','ja','zh'];if(l && supported.includes(l))document.documentElement.lang=l;}catch(e){}})();
`;

function NotFoundComponent() {
  const { t } = useLang();
  return (
    <div className="flex min-h-dvh items-center justify-center px-4" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold fun-text">{t("404.title")}</h1>
        <h2 className="mt-4 text-xl font-semibold fun-text">{t("404.subtitle")}</h2>
        <p className="mt-2 text-sm fun-text-muted">{t("404.desc")}</p>
        <div className="mt-6">
          <Link to="/" className="btn-fun btn-fun-dark">{t("404.home")}</Link>
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
      { title: "Fun Teknoloji" },
      { name: "description", content: "AI & Software Solutions" },
      { name: "author", content: "Fun Teknoloji" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Fun Teknoloji" },
      { property: "og:description", content: "AI & Software Solutions" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Fun Teknoloji" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@funteknoloji_" },
      { name: "twitter:title", content: "Fun Teknoloji" },
      { name: "twitter:description", content: "AI & Software Solutions" },
    ],
    links: [
      { rel: "icon", href: "/assets/logos/Fun Teknoloji Siyah Logo.png", media: "(prefers-color-scheme: light)" },
      { rel: "icon", href: "/assets/logos/Fun Teknoloji BGSİZ.png", media: "(prefers-color-scheme: dark)" },
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
          url: "https://funteknoloji.com",
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
  useEffect(() => {
    inject();
  }, []);

  return (
    <LanguageProvider>
      <IntroSplash />
      <Header />
      <Outlet />
      <NexyAssistant />
      <Footer />
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        expand={false}
      />
    </LanguageProvider>
  );
}
