import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import { projects } from "../constants/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [{ title: "Projelerimiz - Fun Teknoloji" }],
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
            <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-bold fun-text mb-4">
              {t("projects.hero.title")}
            </h1>
            <p className="max-w-[700px] mx-auto fun-text-muted text-lg">
              {t("projects.hero.desc")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <div className="group p-8 rounded-[40px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all flex flex-col h-full overflow-hidden relative">
                <div
                  className={`h-28 w-28 rounded-3xl flex items-center justify-center mb-8 overflow-hidden ${project.color === "purple" ? "bg-[var(--fun-purple)]/10" : "bg-indigo-500/10"}`}
                >
                  <img
                    src={project.logo}
                    alt={`${project.name} Logo`}
                    className="h-full w-full object-cover scale-110"
                  />
                </div>
                <h2 className="text-3xl font-bold fun-text mb-4">{project.name}</h2>
                <p className="fun-text-muted text-lg mb-8 flex-1">{t(project.descKey)}</p>
                {project.link.startsWith("http") ? (
                  <ArrowButton
                    href={project.link}
                    target="_blank"
                    variant="dark"
                    className="w-full justify-center relative z-10"
                  >
                    {t("projects.view")}
                  </ArrowButton>
                ) : (
                  <ArrowButton
                    to={project.link as any}
                    variant="dark"
                    className="w-full justify-center relative z-10"
                  >
                    {t("projects.view")}
                  </ArrowButton>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="flex flex-col items-center justify-center py-20 bg-[var(--fun-surface)] rounded-[32px] border-2 border-dashed border-[var(--fun-stroke-1)]">
            <div className="h-16 w-16 rounded-full bg-[var(--fun-card)] flex items-center justify-center mb-6 shadow-xl">
              <svg
                className="h-8 w-8 text-[var(--fun-purple)] animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
