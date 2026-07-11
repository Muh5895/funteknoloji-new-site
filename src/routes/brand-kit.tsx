import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/brand-kit")({
  head: () => ({
    meta: [{ title: "Marka Kiti - Fun Teknoloji" }],
  }),
  component: BrandKitPage,
});

function BrandKitPage() {
  const { t } = useLang();

  const logos = [
    {
      id: "fun_main",
      title: t("brand_kit.logos.fun_main.title"),
      desc: t("brand_kit.logos.fun_main.desc"),
      url: "/assets/logos/Fun Teknoloji Logo.png",
      bg: "bg-white",
    },
    {
      id: "fun_black",
      title: t("brand_kit.logos.fun_black.title"),
      desc: t("brand_kit.logos.fun_black.desc"),
      url: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      bg: "bg-white",
    },
    {
      id: "fun_white",
      title: t("brand_kit.logos.fun_white.title"),
      desc: t("brand_kit.logos.fun_white.desc"),
      url: "/assets/logos/Fun Teknoloji BGSİZ.png",
      bg: "bg-black",
    },
    {
      id: "quakesafe",
      title: t("brand_kit.logos.quakesafe.title"),
      desc: t("brand_kit.logos.quakesafe.desc"),
      url: "/assets/logos/QuakeSafe Logo.png",
      bg: "bg-black",
    },
    {
      id: "nexy",
      title: t("brand_kit.logos.nexy.title"),
      desc: t("brand_kit.logos.nexy.desc"),
      url: "/nexy.png",
      bg: "bg-[var(--fun-surface)]",
    },
  ];

  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <header className="mb-16 text-center">
            <span className="badge-fun badge-fun-purple mb-4 inline-block">
              {t("brand_kit.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">{t("brand_kit.title")}</h1>
            <p className="fun-text-muted text-lg max-w-[700px] mx-auto">{t("brand_kit.desc")}</p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo, i) => (
            <ScrollReveal key={i}>
              <div className="group h-full rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] overflow-hidden transition-all hover:shadow-xl flex flex-col">
                <div
                  className={`aspect-square flex items-center justify-center ${logo.id === "fun_main" ? "p-0" : "p-12"} ${logo.bg}`}
                >
                  <img
                    src={logo.url}
                    alt={logo.title}
                    className={`${logo.id === "fun_main" ? "w-full h-full object-cover" : "max-w-full max-h-full object-contain"} group-hover:scale-105 transition-transform duration-500`}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold fun-text mb-2">{logo.title}</h3>
                  <p className="fun-text-muted text-sm mb-6 flex-1">{logo.desc}</p>
                  <button
                    onClick={() => handleDownload(logo.url, `${logo.title}.png`)}
                    className="w-full btn-fun btn-fun-dark"
                  >
                    <span>{t("brand_kit.download_png")}</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <section className="mt-20 p-8 md:p-12 rounded-[40px] bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)]">
          <h2 className="text-2xl font-bold fun-text mb-6">{t("brand_kit.colors.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <ColorCard hex="#864FFE" name={t("brand_kit.colors.purple")} />
            <ColorCard hex="#000000" name={t("brand_kit.colors.black")} />
          </div>
        </section>
      </div>
    </main>
  );
}

function ColorCard({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-20 w-full rounded-2xl shadow-inner border border-black/5"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="font-bold fun-text text-sm">{name}</p>
        <p className="text-xs fun-text-muted font-mono">{hex}</p>
      </div>
    </div>
  );
}
