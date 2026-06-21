import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";

export const Route = createFileRoute("/projects")({
  head: ({ t }: { t: (k: string) => string }) => ({
    meta: [{ title: t("title.projects") }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useLang();

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1290px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="badge-fun badge-fun-gray mb-4 inline-block">{t("nav.projects")}</span>
            <h1 className="text-heading-2 font-bold fun-text mb-4">{t("projects.hero.title")}</h1>
            <p className="max-w-[700px] mx-auto fun-text-muted text-lg">{t("projects.hero.desc")}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <ScrollReveal>
            <div className="group p-8 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col h-full overflow-hidden relative">
               <div className="h-28 w-28 rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-8 overflow-hidden">
                  <img src="/assets/logos/quakesafe_seffaf.png" alt="QuakeSafe Logo" className="h-full w-full object-cover scale-110" />
               </div>
               <h2 className="text-3xl font-bold fun-text mb-4">QuakeSafe</h2>
               <p className="fun-text-muted text-lg mb-8 flex-1">{t("projects.quakesafe.desc")}</p>
               <ArrowButton to="/quakesafe" variant="dark" className="w-full justify-center relative z-10">{t("projects.view")}</ArrowButton>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="group p-8 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col h-full overflow-hidden relative">
               <div className="h-28 w-28 rounded-3xl bg-[var(--fun-purple)]/10 flex items-center justify-center mb-8 overflow-hidden">
                  <img src="/nexy.png" alt="Nexy Asistan Logo" className="h-full w-full object-cover scale-110" />
               </div>
               <h2 className="text-3xl font-bold fun-text mb-4">Nexy Asistan</h2>
               <p className="fun-text-muted text-lg mb-8 flex-1">{t("projects.nexy.desc")}</p>
               <ArrowButton to="/nexy" variant="dark" className="w-full justify-center relative z-10">{t("projects.view")}</ArrowButton>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="flex flex-col items-center justify-center py-20 bg-[var(--fun-surface)] rounded-[32px] border-2 border-dashed border-[var(--fun-stroke-1)]">
           <div className="h-16 w-16 rounded-full bg-[var(--fun-card)] flex items-center justify-center mb-6 shadow-xl">
             <svg className="h-8 w-8 text-[var(--fun-purple)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </div>
           <h2 className="text-2xl font-bold fun-text mb-2">{t("projects.soon.title")}</h2>
             <p className="fun-text-muted max-w-[450px] text-center">{t("projects.soon.desc")}</p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
