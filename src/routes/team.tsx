import { createFileRoute } from "@tanstack/react-router";
import ArrowButton from "../components/ArrowButton";

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
  const team = [
    { name: "Muhammed Erbay", role: "Kurucu & CEO", desc: "Yapay zeka ve yazılım geliştirme alanında vizyoner lider." },
    { name: "Ahmet Yılmaz", role: "CTO", desc: "Teknik altyapı ve sistem mimarisi uzmanı." },
    { name: "Zeynep Kaya", role: "Tasarım Direktörü", desc: "Kullanıcı deneyimi ve arayüz tasarımı sorumlusu." },
    { name: "Mehmet Demir", role: "Yazılım Mühendisi", desc: "Full-stack geliştirme ve API tasarımı." },
    { name: "Elif Aksoy", role: "Veri Bilimci", desc: "Makine öğrenimi ve veri analitiği uzmanı." },
    { name: "Can Özkan", role: "Pazarlama Müdürü", desc: "Dijital pazarlama ve marka stratejisi." },
  ];

  const colors = ["from-[#D4F5E9] to-[#A8E6CF]", "from-[#E8F4FD] to-[#4A90E2]", "from-[#F0E6FF] to-[#8B5CF6]", "from-[#FFE8E8] to-[#FF6B6B]", "from-[#FFF7E6] to-[#FF8C00]", "from-[#E6F7FF] to-[#1890FF]"];

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">Ekibimiz</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">Arkamızdaki güç</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">Tutkulu ve yetenekli ekibimizle geleceğin teknolojilerini bugünden inşa ediyoruz.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="rounded-3xl p-8 border transition-colors duration-500" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center mb-6`}>
                  <span className="text-2xl font-bold text-white">{member.name[0]}</span>
                </div>
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
            <h2 className="text-heading-4 md:text-heading-3 font-medium text-white mb-4">Ekibimize katılın</h2>
            <p className="text-tagline-1 text-white/60 max-w-[500px] mx-auto mb-8">Yetenekli profesyonelleri arıyoruz. Kariyer fırsatları için bize ulaşın.</p>
            <ArrowButton to="/contact" variant="light">İletişime Geçin</ArrowButton>
          </div>
        </div>
      </section>
    </main>
  );
}
