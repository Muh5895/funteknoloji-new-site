import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useLang();
  const projects = [
    {
      title: "QuakeSafe",
      desc: "Afet anında bilgiye hızlı erişim sağlayan, internet gerektirmeyen acil durum uygulaması.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
      link: "#"
    }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-16">
          <span className="badge-fun badge-fun-gray mb-4 inline-block">{t("nav.projects")}</span>
          <h1 className="text-heading-2 font-bold fun-text mb-4">Geleceği İnşa Ediyoruz</h1>
          <p className="max-w-[700px] mx-auto fun-text-muted text-lg">Yenilikçi teknolojilerle geliştirdiğimiz çözüm odaklı projelerimiz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group rounded-[32px] overflow-hidden border bg-[var(--fun-card)]" style={{ borderColor: 'var(--fun-stroke-1)' }}>
              <div className="aspect-video overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold fun-text mb-3">{p.title}</h3>
                <p className="fun-text-muted mb-6">{p.desc}</p>
                <a href={p.link} className="btn-fun btn-fun-dark">Detayları Gör</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
