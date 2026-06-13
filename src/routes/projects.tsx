import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useLang();

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-16">
          <span className="badge-fun badge-fun-gray mb-4 inline-block">{t("nav.projects")}</span>
          <h1 className="text-heading-2 font-bold fun-text mb-4">Geleceği İnşa Ediyoruz</h1>
          <p className="max-w-[700px] mx-auto fun-text-muted text-lg">Yenilikçi teknolojilerle geliştirdiğimiz çözüm odaklı projelerimiz.</p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 bg-[var(--fun-surface)] rounded-[32px] border-2 border-dashed border-[var(--fun-stroke-1)]">
           <div className="h-20 w-20 rounded-full bg-[var(--fun-card)] flex items-center justify-center mb-6 shadow-xl">
             <svg className="h-10 w-10 text-[var(--fun-purple)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </div>
           <h2 className="text-3xl font-bold fun-text mb-2">Yakında</h2>
           <p className="fun-text-muted max-w-[450px] text-center">Heyecan verici projelerimiz üzerinde çalışıyoruz. Çok yakında burada paylaşacağız.</p>
        </div>
      </div>
    </main>
  );
}
