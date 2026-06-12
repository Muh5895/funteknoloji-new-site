import { createFileRoute } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Ekibimiz – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji'nin dinamik ekibini tanıyın." },
      { property: "og:title", content: "Ekibimiz – Fun Teknoloji" },
      { property: "og:description", content: "Fun Teknoloji'nin dinamik ekibini tanıyın." },
      { property: "og:url", content: "https://build-dream-flow-91.lovable.app/team" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Ekibimiz – Fun Teknoloji" },
      { name: "twitter:description", content: "Fun Teknoloji'nin dinamik ekibini tanıyın." },
    ],
    links: [{ rel: "canonical", href: "https://build-dream-flow-91.lovable.app/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { t } = useLang();
  const team = [
    {
      name: "Muhammed Erbay",
      role: "Kurucu & CEO",
      desc: "Yapay zeka ve yazılım geliştirme alanında vizyoner lider.",
      image: "https://framerusercontent.com/images/0ZbQRx8lUAVCEu2vriydHRwGC0.jpg?width=1080&height=1080"
    },
  ];

  const colors = ["from-[#D4F5E9] to-[#A8E6CF]"];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">{t("team.badge")}</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">{t("team.title")}</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("team.desc")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="rounded-3xl p-8 border transition-colors duration-500" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                {member.image ? (
                  <div className="h-24 w-24 rounded-2xl overflow-hidden mb-6 border-2" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center mb-6`}>
                    <span className="text-2xl font-bold text-white">{member.name[0]}</span>
                  </div>
                )}
                <h3 className="text-heading-6 font-medium mb-1 fun-text">{member.name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: '#864FFE' }}>{member.role}</p>
                <p className="text-tagline-1 fun-text-muted">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="bg-[#12161F] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 px-5">
          <div className="main-container text-center">
            <h2 className="text-heading-4 md:text-heading-3 font-medium text-white mb-4">{t("team.join.title")}</h2>
            <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8">{t("team.join.desc")}</p>
            <ArrowButton to="/contact" variant="light">{t("home.cta.button")}</ArrowButton>
          </div>
        </div>
      </section>
    </main>
  );
}
