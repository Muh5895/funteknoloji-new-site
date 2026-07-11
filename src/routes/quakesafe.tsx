import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useState, useRef, useEffect } from "react";
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
  Workflow,
  Wrench,
  Radio,
  FileCheck,
} from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  head: () => ({
    meta: [{ title: "QuakeSafe - Deprem Güvenliği" }],
  }),
  component: QuakeSafePage,
});

function Seismograph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 160);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    const points: number[] = Array(width).fill(height / 2);
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = "rgba(134, 79, 254, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Shift existing points left
      points.shift();

      // Calculate next seismic wave point
      offset += 0.15;
      const isSpike = Math.random() < 0.015;
      const baseWave = Math.sin(offset * 1.5) * 4;
      const noise = (Math.random() - 0.5) * 6;
      const spike = isSpike ? (Math.random() - 0.5) * 75 : 0;

      let nextY = height / 2 + baseWave + noise + spike;
      nextY = Math.max(10, Math.min(height - 10, nextY));
      points.push(nextY);

      // Draw wave path
      ctx.beginPath();
      ctx.strokeStyle = "rgba(134, 79, 254, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(134, 79, 254, 0.6)";

      ctx.moveTo(0, points[0]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(i, points[i]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#0B0D19] rounded-[28px] p-6 border border-white/5 shadow-inner">
      <div className="flex items-center justify-between mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-2 text-[var(--fun-purple)]">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          CANLI DEPREM VERİSİ (LIVE FEED)
        </span>
        <span className="bg-white/5 px-2.5 py-1 rounded-md text-[10px] text-white">QS-NODE #829</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-[160px] block" />
    </div>
  );
}

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
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[600px] flex items-center bg-[#0D0E16] border border-white/10">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#864FFE]/15 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-dots opacity-20" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <img
                    src="/assets/logos/quakesafe_seffaf.png"
                    alt="QuakeSafe"
                    className="h-12 w-12 object-contain"
                  />
                  <span className="text-3xl font-bold text-white tracking-tighter">QuakeSafe</span>
                </div>
                <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-extrabold text-white leading-tight capitalize">
                  {t("quakesafe.hero.title")}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-[600px] mx-auto lg:mx-0">
                  {t("quakesafe.hero.desc")}
                </p>
                <div className="flex justify-center lg:justify-start">
                  <ArrowButton
                    href="https://quakesafe.funteknoloji.com"
                    variant="light"
                    className="h-14 px-8 !bg-white !text-black hover:!bg-[var(--fun-purple)] hover:!text-white"
                  >
                    {t("nav.open_platform")}
                  </ArrowButton>
                </div>
              </div>

              {/* Seismograph Simulated Live Interface */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[550px] flex flex-col gap-6">
                  <div className="absolute -inset-10 bg-[var(--fun-purple)]/10 blur-[80px] rounded-full animate-pulse" />

                  {/* Realtime Seismograph Display */}
                  <Seismograph />

                  {/* Simulated Activity Stream */}
                  <div className="bg-[#12161F]/90 rounded-[28px] p-6 border border-white/5 text-left flex flex-col justify-between shadow-2xl backdrop-blur-3xl">
                    <div>
                      <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-red-500" />
                        Son Deprem Aktivitesi (Seismic Activity Log)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 font-mono font-bold">1.2</span>
                            <span className="text-sm text-slate-300 font-semibold">Marmara Denizi</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">10 sn önce</span>
                        </div>
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 text-xs rounded bg-orange-500/20 text-orange-400 font-mono font-bold">3.4</span>
                            <span className="text-sm text-slate-300 font-semibold">Kahramanmaraş</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">2 dk önce</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Aktif Düğüm (Nodes): 1,240</span>
                      <span className="text-green-500 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Sistem Çevrimiçi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* How QuakeSafe Works Section */}
      <section className="py-24 px-4 lg:px-5 bg-[var(--fun-surface)] border-y border-[var(--fun-stroke-1)]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4">
              <span className="badge-fun badge-fun-purple">Çalışma Prensibi</span>
              <h2 className="text-3xl md:text-5xl font-extrabold fun-text">QuakeSafe Nasıl Çalışır?</h2>
              <p className="fun-text-muted text-lg max-w-[650px] mx-auto">
                Yeni nesil afet teknolojimiz, milisaniyeler düzeyinde reaksiyon hızı ile çalışır.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="bg-[var(--fun-card)] p-8 rounded-[32px] border border-[var(--fun-stroke-1)] relative h-full flex flex-col justify-between">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center font-bold text-xl mb-6">
                    01
                  </div>
                  <h3 className="text-xl font-bold fun-text mb-3">Erken Algılama (P-Dalgası)</h3>
                  <p className="fun-text-muted text-sm leading-relaxed">
                    Sensör ağımız, deprem anında yüzeye ilk ulaşan ama yıkıcı olmayan P-dalgalarını saniyeler öncesinden yakalar.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-[var(--fun-card)] p-8 rounded-[32px] border border-[var(--fun-stroke-1)] relative h-full flex flex-col justify-between">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center font-bold text-xl mb-6">
                    02
                  </div>
                  <h3 className="text-xl font-bold fun-text mb-3">Anlık AI Analizi</h3>
                  <p className="fun-text-muted text-sm leading-relaxed">
                    Bulut tabanlı AI modellerimiz arka plandaki sismik gürültüyü filtreler, depremin merkez üssünü ve şiddetini saliseler içinde hesaplar.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-[var(--fun-card)] p-8 rounded-[32px] border border-[var(--fun-stroke-1)] relative h-full flex flex-col justify-between">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center font-bold text-xl mb-6">
                    03
                  </div>
                  <h3 className="text-xl font-bold fun-text mb-3">Erken Uyarı & Otomasyon</h3>
                  <p className="fun-text-muted text-sm leading-relaxed">
                    Gaz ve elektrik akışları otomatik kesilir, asansörler güvenli kata indirilir ve sakinlere kaçış rotası uyarısı gönderilir.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
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

      {/* Product Integration & Benefits Section */}
      <section className="py-24 px-4 lg:px-5 bg-gradient-to-br from-[var(--fun-surface)] to-[var(--color-background)] border-t border-[var(--fun-stroke-1)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <span className="badge-fun badge-fun-purple">Donanım & Entegrasyon</span>
              <h2 className="text-3xl md:text-5xl font-extrabold fun-text leading-tight">
                Her Yapıya Uygun, Profesyonel Entegrasyon
              </h2>
              <p className="fun-text-muted text-base md:text-lg leading-relaxed">
                QuakeSafe, sadece bir yazılımdan ibaret değildir. Endüstriyel sınıf sensörlerimiz ve akıllı kontrol rölelerimiz bina sistemlerinize bizzat entegre edilir.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold fun-text text-base">Kolay Tak Çalıştır Kurulum</h4>
                    <p className="text-sm fun-text-muted">Ana şebeke girişlerinize takılan akıllı cihazlarımız hızla kalibre edilir.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold fun-text text-base">RF & Lora Bağımsız İletişim</h4>
                    <p className="text-sm fun-text-muted">Hücresel şebekeler çalışmasa bile özel telsiz frekansları ile cihazlar kendi arasında haberleşir.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold fun-text text-base">Resmi Sertifikalı Koruma</h4>
                    <p className="text-sm fun-text-muted">Uluslararası standartlara uygun olarak üretilen sistemlerimiz yüksek dayanıklılık garantisine sahiptir.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-[40px] overflow-hidden border border-[var(--fun-stroke-1)] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Donanım Entegrasyonu"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <span className="text-xs text-[var(--fun-purple)] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2 inline-block">Milisaniyelik Güvenlik</span>
                  <p className="text-white text-base font-semibold">Endüstriyel Sismik Sensör Node Ünitesi</p>
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
            <FAQItem
              q="Sistem depremi ne kadar süre öncesinden haber verebilir?"
              a="Depremin merkez üssünün sensör ağımıza olan uzaklığına bağlı olarak, yıkıcı S-dalgaları ulaşmadan önce 5 ila 45 saniye arasında erken uyarı süresi kazanılabilir. Bu süre hayati öneme sahiptir."
            />
            <FAQItem
              q="İnternet veya elektrik kesildiğinde sistem çalışır mı?"
              a="Evet. QuakeSafe donanım üniteleri dahili yedek bataryaya ve yerel radyo frekans haberleşme modüllerine sahiptir, böylece şebekeden bağımsız çalışabilir."
            />
            <FAQItem
              q="Otomasyon sistemleri evime veya iş yerime nasıl entegre edilir?"
              a="Akıllı vana kontrol ünitelerimiz ve bina otomasyon rölelerimiz, mevcut sigorta kutunuza ve ana vanalarınıza uzman ekiplerimiz tarafından kolayca monte edilir."
            />
            <FAQItem
              q="Hatalı alarm riskine karşı nasıl bir önlem bulunuyor?"
              a="Sensörlerimiz ve bulut yapay zeka motorumuz gürültü filtreleme teknolojisine sahiptir. Hatalı alarmları sıfıra indirmek için çoklu düğüm doğrulama algoritması kullanılır."
            />
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
