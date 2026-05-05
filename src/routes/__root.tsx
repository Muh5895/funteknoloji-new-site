import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[#12161F]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[#12161F]">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm text-[#12161F]/60">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-fun btn-fun-dark">
            Ana Sayfa
          </Link>
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
      { name: "description", content: "Yenilikçi çözümlerimiz ve gelişmiş altyapımız ile iş süreçlerinizi hızlandırın, ekiplerinizi güçlendirin ve teknolojiyle fark yaratın." },
      { name: "author", content: "Fun Teknoloji" },
      { property: "og:title", content: "Fun Teknoloji – Geleceği Bugün Keşfedin" },
      { property: "og:description", content: "Yenilikçi çözümlerimiz ve gelişmiş altyapımız ile iş süreçlerinizi hızlandırın, ekiplerinizi güçlendirin ve teknolojiyle fark yaratın." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@funteknoloji_" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" },
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
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
