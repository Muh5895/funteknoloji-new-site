import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  const { t } = useLang();

  const team = [
    {
      name: "Muhammed Erbay",
      role: "Founder & CEO",
      image: "https://framerusercontent.com/images/0ZbQRx8lUAVCEu2vriydHRwGC0.jpg?width=1080&height=1080",
      bio: "Teknoloji tutkunu ve Fun Teknoloji'nin kurucusu. Geleceğin yapay zeka çözümleri üzerine çalışıyor."
    }
  ];

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

      <section className="py-20 md:py-32">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="aspect-square rounded-[32px] overflow-hidden mb-6 bg-[var(--fun-surface)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-bold fun-text mb-1">{member.name}</h3>
                <p className="text-[var(--fun-purple)] font-medium mb-3">{member.role}</p>
                <p className="text-fun-text-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
