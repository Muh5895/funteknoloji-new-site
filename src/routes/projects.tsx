import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import { ShieldAlert, Bot } from "lucide-react";

export const Route = createFileRoute("/projects")({
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
            <h1 className="text-heading-2 font-bold fun-text mb-4">Geleceği İnşa Ediyoruz</h1>
            <p className="max-w-[700px] mx-auto fun-text-muted text-lg">Yenilikçi teknolojilerle geliştirdiğimiz çözüm odaklı projelerimiz.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <ScrollReveal>
            <div className="group p-8 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col h-full overflow-hidden relative">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ShieldAlert className="h-40 w-40" />
               </div>
               <div className="h-20 w-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-8">
                  <ShieldAlert className="h-10 w-10" />
               </div>
               <h2 className="text-3xl font-bold fun-text mb-4">QuakeSafe</h2>
               <p className="fun-text-muted text-lg mb-8 flex-1">Afet güvenliği teknolojisinde yeni bir dönem. Deprem anında ve sonrasında hayat kurtaran akıllı sistemler.</p>
               <ArrowButton to="/quakesafe" variant="dark" className="w-full justify-center">Projeyi İncele</ArrowButton>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="group p-8 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col h-full overflow-hidden relative">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Bot className="h-40 w-40" />
               </div>
               <div className="h-20 w-20 rounded-3xl bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)] mb-8">
                  <Bot className="h-10 w-10" />
               </div>
               <h2 className="text-3xl font-bold fun-text mb-4">Nexy Asistan</h2>
               <p className="fun-text-muted text-lg mb-8 flex-1">Fun Teknoloji'nin yapay zeka tabanlı dijital asistanı. İşletmeler ve kullanıcılar için akıllı rehber.</p>
               <ArrowButton to="/nexy" variant="dark" className="w-full justify-center">Asistanı Tanı</ArrowButton>
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
           <h2 className="text-2xl font-bold fun-text mb-2">Daha Fazlası Yakında</h2>
             <p className="fun-text-muted max-w-[450px] text-center">Heyecan verici yeni projelerimiz üzerinde çalışmaya devam ediyoruz.</p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
