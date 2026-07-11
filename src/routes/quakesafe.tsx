import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import {
  ShieldAlert,
  MapPin,
  Bell,
  Users,
  Smartphone,
  Cpu,
  Cloud,
  Zap,
  Activity,
  Clock,
  HeartHandshake,
  Terminal,
  Webhook,
  BellRing,
} from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  head: () => ({
    meta: [{ title: "QuakeSafe - Deprem Güvenliği" }],
  }),
  component: QuakeSafePage,
});

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl px-6 md:px-8 bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-6 w-full cursor-pointer group text-left"
      >
        <span className="font-bold fun-text text-sm md:text-base group-hover:text-[var(--fun-purple)] transition-colors">{q}</span>
        <span className={`ml-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg className="h-5 w-5 fun-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] pb-6" : "max-h-0"}`}>
        <p className="text-xs md:text-sm fun-text-muted leading-relaxed pt-4 border-t border-[var(--fun-stroke-1)]">
          {a}
        </p>
      </div>
    </div>
  );
}

function QuakeSafePage() {
  const { t } = useLang();

  const features = [
    {
      icon: <Bell className="h-8 w-8" />,
      title: t("quakesafe.features.1.title"),
      desc: t("quakesafe.features.1.desc"),
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t("quakesafe.features.2.title"),
      desc: t("quakesafe.features.2.desc"),
    },
    {
      icon: <ShieldAlert className="h-8 w-8" />,
      title: t("quakesafe.features.3.title"),
      desc: t("quakesafe.features.3.desc"),
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t("quakesafe.features.4.title"),
      desc: t("quakesafe.features.4.desc"),
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t("quakesafe.features.5.title"),
      desc: t("quakesafe.features.5.desc"),
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: t("quakesafe.features.6.title"),
      desc: t("quakesafe.features.6.desc"),
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: t("quakesafe.features.8.title"),
      desc: t("quakesafe.features.8.desc"),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("quakesafe.features.9.title"),
      desc: t("quakesafe.features.9.desc"),
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: t("quakesafe.features.10.title"),
      desc: t("quakesafe.features.10.desc"),
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("quakesafe.features.11.title"),
      desc: t("quakesafe.features.11.desc"),
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: t("quakesafe.features.12.title"),
      desc: t("quakesafe.features.12.desc"),
    },
  ];

  return (
    <main className="space-y-0">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[500px] flex items-center bg-[#0D0E16] border border-white/10">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#864FFE]/15 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-full h-full bg-dots opacity-10" />
            </div>

            <div className="main-container relative z-10 py-20 lg:py-28 text-center max-w-[900px] mx-auto">
              <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <div className="h-20 w-20 rounded-full border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden shadow-2xl">
                  <img
                    src="/assets/logos/quakesafe_seffaf.png"
                    alt="QuakeSafe Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-3xl font-extrabold text-white tracking-tighter">QuakeSafe</span>
              </div>

              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-extrabold text-white leading-tight capitalize mb-6">
                {t("quakesafe.hero.title")}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-[700px] mx-auto mb-10 leading-relaxed">
                {t("quakesafe.hero.desc")}
              </p>

              <div className="flex justify-center">
                <ArrowButton
                  href="https://quakesafe.funteknoloji.com"
                  variant="light"
                  className="h-14 px-8 !bg-white !text-black hover:!bg-[var(--fun-purple)] hover:!text-white"
                >
                  {t("nav.open_platform")}
                </ArrowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Core Features Network Section */}
      <section className="py-24 px-4 lg:px-0">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
              <span className="badge-fun badge-fun-gray">{t("home.features.badge")}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold fun-text">
                {t("quakesafe.features.title")}
              </h2>
              <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
                {t("quakesafe.features.desc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group h-full">
                  <div className="h-16 w-16 rounded-2xl bg-[var(--fun-surface)] flex items-center justify-center text-[var(--fun-purple)] mb-6 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold fun-text mb-3">{f.title}</h3>
                  <p className="fun-text-muted leading-relaxed text-sm">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Software Integration & Benefits Section */}
      <section className="py-24 px-4 lg:px-5 bg-gradient-to-br from-[var(--fun-surface)] to-[var(--color-background)] border-t border-[var(--fun-stroke-1)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <span className="badge-fun badge-fun-purple">Yazılım Entegrasyonu & API</span>
              <h2 className="text-3xl md:text-5xl font-extrabold fun-text leading-tight">
                Akıllı Yazılım ve API Entegrasyonları
              </h2>
              <p className="fun-text-muted text-base md:text-lg leading-relaxed">
                QuakeSafe, modern yazılım ekosisteminizle tam uyumlu çalışır. Tek bir API çağrısı ile tüm acil durum senaryolarını tetikleyin.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold fun-text text-base">SaaS Tabanlı Yönetim Paneli</h4>
                    <p className="text-sm fun-text-muted">Tüm tesislerinizin sismik durumunu tek bir ekrandan gerçek zamanlı takip edin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <Webhook className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold fun-text text-base">Gelişmiş Webhook & API Desteği</h4>
                    <p className="text-sm fun-text-muted">Deprem anında kendi sunucularınıza ve IoT cihazlarınıza otomatik sinyal gönderin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <BellRing className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold fun-text text-base">Anlık Çoklu Bildirim Kanalı</h4>
                    <p className="text-sm fun-text-muted">E-posta, SMS, Push bildirimleri ve özel sesli arama servisleri ile tüm ekibi anında uyarın.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-[40px] overflow-hidden border border-[var(--fun-stroke-1)] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Yazılım Entegrasyonu"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <span className="text-xs text-[var(--fun-purple)] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2 inline-block">Milisaniyelik Güvenlik</span>
                  <p className="text-white text-base font-semibold">Yazılım ve API Dashboard İzleme</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* QuakeSafe FAQ Section */}
      <section className="py-24 px-4 lg:px-0 bg-[var(--fun-surface)] border-y border-[var(--fun-stroke-1)]">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4">
              <span className="badge-fun badge-fun-gray">Merak Edilenler</span>
              <h2 className="text-3xl md:text-4xl font-extrabold fun-text">QuakeSafe Sıkça Sorulan Sorular</h2>
              <p className="fun-text-muted text-sm max-w-[500px] mx-auto">
                Deprem uyarı sistemimiz hakkında en çok yöneltilen soruların yanıtlarına göz atın.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal>
              <FAQItem
                q="Sistem depremi ne kadar süre öncesinden haber verebilir?"
                a="Depremin merkez üssünün sismik veri kaynaklarımıza olan uzaklığına bağlı olarak, yıkıcı S-dalgaları ulaşmadan önce 5 ila 45 saniye arasında erken uyarı süresi kazanılabilir. Bu süre hayati öneme sahiptir."
              />
            </ScrollReveal>
            <ScrollReveal>
              <FAQItem
                q="İnternet veya elektrik kesildiğinde sistem çalışır mı?"
                a="Evet. QuakeSafe yazılımsal altyapısı, yedekli sunucu lokasyonları ve akıllı yerel kesintisiz ağ protokolleri üzerinden kesintisiz bir şekilde çalışmaya devam edecek şekilde dizayn edilmiştir."
              />
            </ScrollReveal>
            <ScrollReveal>
              <FAQItem
                q="Otomasyon sistemleri evime veya iş yerime nasıl entegre edilir?"
                a="QuakeSafe API ve akıllı yazılım entegrasyonu, mevcut akıllı ev hub'larınız ve işletmenizin IoT sistemleri üzerinden doğrudan yazılımsal tetikleyicilerle kontrol edilir."
              />
            </ScrollReveal>
            <ScrollReveal>
              <FAQItem
                q="Hatalı alarm riskine karşı nasıl bir önlem bulunuyor?"
                a="Bulut tabanlı AI motorumuz sismik gürültüleri filtreleme teknolojisine sahiptir. Hatalı alarmları sıfıra indirmek için çoklu sismik doğrulama algoritması kullanılır."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] bg-[var(--fun-purple)] p-12 md:p-24 text-center text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-white" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-extrabold mb-8">{t("quakesafe.cta.title")}</h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-[800px] mx-auto mb-12">
                {t("quakesafe.cta.desc")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ArrowButton
                  href="https://quakesafe.funteknoloji.com"
                  variant="light"
                  className="!text-[var(--fun-purple)] font-semibold h-14 px-8"
                >
                  {t("nav.explore_platform")}
                </ArrowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
