import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ArrowButton from "../components/ArrowButton";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/brand-kit")({
  component: BrandKitPage,
});

function BrandKitPage() {
  const { t } = useLang();

  const logos = [
    {
      title: "Fun Teknoloji Logo (Renkli)",
      desc: "Ana kullanım için şeffaf arka planlı logomuz.",
      url: "/assets/logos/Fun Teknoloji Logo.png",
      bg: "bg-white"
    },
    {
      title: "Fun Teknoloji Siyah Logo",
      desc: "Açık renkli zeminlerde kullanım için siyah versiyon.",
      url: "/assets/logos/Fun Teknoloji Siyah Logo.png",
      bg: "bg-white"
    },
    {
      title: "Fun Teknoloji Beyaz Logo",
      desc: "Koyu renkli zeminlerde kullanım için beyaz versiyon.",
      url: "/assets/logos/Fun Teknoloji BGSİZ.png",
      bg: "bg-black"
    },
    {
      title: "QuakeSafe Logo",
      desc: "QuakeSafe projemizin resmi logosu.",
      url: "/assets/logos/QuakeSafe Logo.png",
      bg: "bg-black"
    },
    {
      title: "Nexy Asistan",
      desc: "Yapay zeka asistanımız Nexy'nin PNG versiyonu.",
      url: "/nexy.png",
      bg: "bg-[var(--fun-surface)]"
    }
  ];

  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
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
        <header className="mb-16 text-center">
          <span className="badge-fun badge-fun-purple mb-4 inline-block">Kurumsal</span>
          <h1 className="text-4xl md:text-5xl font-bold fun-text mb-4">Marka Kiti</h1>
          <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
            Fun Teknoloji logolarını ve görsel materyallerini buradan indirebilir, kullanım kılavuzuna göz atabilirsiniz.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo, i) => (
            <ScrollReveal key={i}>
              <div className="group h-full rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] overflow-hidden transition-all hover:shadow-xl flex flex-col">
                <div className={`aspect-square flex items-center justify-center ${logo.title.includes("(Renkli)") ? 'p-0' : 'p-12'} ${logo.bg}`}>
                  <img
                    src={logo.url}
                    alt={logo.title}
                    className={`${logo.title.includes("(Renkli)") ? 'w-full h-full object-cover' : 'max-w-full max-h-full object-contain'} group-hover:scale-105 transition-transform duration-500`}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold fun-text mb-2">{logo.title}</h3>
                  <p className="fun-text-muted text-sm mb-6 flex-1">{logo.desc}</p>
                  <button
                    onClick={() => handleDownload(logo.url, `${logo.title}.png`)}
                    className="w-full btn-fun btn-fun-dark"
                  >
                    <span>PNG İndir</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <section className="mt-20 p-8 md:p-12 rounded-[40px] bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)]">
          <h2 className="text-2xl font-bold fun-text mb-6">Renk Paletimiz</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
             <ColorCard hex="#864FFE" name="Purple" />
             <ColorCard hex="#000000" name="Black" />
          </div>
        </section>
      </div>
    </main>
  );
}

function ColorCard({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="space-y-2">
      <div className="h-20 w-full rounded-2xl shadow-inner border border-black/5" style={{ backgroundColor: hex }} />
      <div>
        <p className="font-bold fun-text text-sm">{name}</p>
        <p className="text-xs fun-text-muted font-mono">{hex}</p>
      </div>
    </div>
  );
}
