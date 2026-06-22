import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import { ChevronLeft, Calendar, Tag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/changelog/$slug")({
  component: ChangelogDetailLayout,
});

function ChangelogDetailLayout() {
  const params = useParams({ strict: false });
  const slug = params.slug;
  const { t, lang } = useLang();

  // Mock data for changelog entries based on slug
  const getDetails = (id: string) => {
    const data: Record<string, any> = {
      funteknoloji: {
        name: "Fun Teknoloji",
        version: "v2.4.0",
        date: "15 June 2026",
        updates: [
          {
            title: "Nexy AI Integration",
            desc: "Advanced AI assistant now integrated across all platforms.",
          },
          {
            title: "Hydration Fixes",
            desc: "Improved React hydration logic for better performance.",
          },
          { title: "UI Refresh", desc: "Global styling update with HeroUI inspiration." },
        ],
      },
      account: {
        name: "Account",
        version: "v1.8.2",
        date: "02 May 2026",
        updates: [
          { title: "Profile Security", desc: "Two-factor authentication support added." },
          { title: "UI Improvements", desc: "Smoother transitions in the settings panel." },
        ],
      },
      developer: {
        name: "Developer",
        version: "v3.0.1",
        date: "20 April 2026",
        updates: [
          { title: "New API Documentation", desc: "Fully automated Swagger/OpenAPI docs." },
          { title: "SDK Release", desc: "Official Fun Teknoloji SDK for Node.js." },
        ],
      },
      quakesafe: {
        name: "QuakeSafe",
        version: "v2.4.0",
        date: "15 June 2026",
        updates: [
          { title: "Early Warning System", desc: "Seismic sensor network integration completed." },
          { title: "Mesh Networking", desc: "Device-to-device communication without internet." },
          { title: "Global Map", desc: "Real-time earthquake tracking visualization." },
        ],
      },
    };
    return data[id] || data["funteknoloji"];
  };

  const details = getDetails(slug);

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[800px] mx-auto">
        <ScrollReveal>
          <Link
            to="/changelog"
            className="inline-flex items-center gap-2 fun-text-muted hover:text-[var(--fun-purple)] transition-colors mb-12 group"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-bold uppercase tracking-widest">
              {lang === "tr" ? "Geri Dön" : "Back to Changelog"}
            </span>
          </Link>

          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="badge-fun badge-fun-purple">{details.version}</span>
              <div className="flex items-center gap-2 fun-text-muted text-sm font-medium">
                <Calendar className="h-4 w-4" />
                {details.date}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black fun-text mb-6 tracking-tighter italic uppercase">
              {details.name}
            </h1>
            <p className="text-xl fun-text-muted leading-relaxed font-medium">
              {lang === "tr"
                ? `${details.name} için en son güncellemeler ve iyileştirmeler.`
                : `Latest updates and improvements for ${details.name}.`}
            </p>
          </header>

          <div className="space-y-12">
            <h2 className="text-2xl font-bold fun-text flex items-center gap-3">
              <Tag className="h-6 w-6 text-[var(--fun-purple)]" />
              {lang === "tr" ? "Neler Değişti?" : "What's New?"}
            </h2>

            <div className="grid gap-6">
              {details.updates.map((update: any, i: number) => (
                <ScrollReveal key={i}>
                  <div className="p-8 rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group relative overflow-hidden">
                    <div className="flex items-start gap-5">
                      <div className="h-10 w-10 rounded-full bg-[var(--fun-purple)]/10 flex items-center justify-center shrink-0 text-[var(--fun-purple)]">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold fun-text mb-2">{update.title}</h3>
                        <p className="fun-text-muted leading-relaxed">{update.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <footer className="mt-24 p-12 rounded-[40px] bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] text-center">
            <h3 className="text-2xl font-bold fun-text mb-4">
              {lang === "tr" ? "Sorunuz mu var?" : "Have questions?"}
            </h3>
            <p className="fun-text-muted mb-8">
              {lang === "tr"
                ? "Güncellemeler hakkında daha fazla bilgi almak için bizimle iletişime geçin."
                : "Contact us to learn more about the latest updates."}
            </p>
            <Link to="/contact" className="btn-fun btn-fun-dark">
              {t("nav.contact")}
            </Link>
          </footer>
        </ScrollReveal>
      </div>
    </main>
  );
}
