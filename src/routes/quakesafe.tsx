import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import {
  ShieldAlert,
  MapPin,
  Bell,
  Users,
  Smartphone,
  Cpu,
  Wifi,
  Cloud,
  Zap,
  Activity,
  Clock,
  HeartHandshake
} from "lucide-react";

export const Route = createFileRoute("/quakesafe")({
  component: QuakeSafePage,
});

function QuakeSafePage() {
  const { t, lang } = useLang();

  const features = [
    {
      icon: <Bell className="h-8 w-8" />,
      title: lang === 'tr' ? "Anlık Uyarılar" : "Instant Alerts",
      desc: lang === 'tr' ? "Deprem dalgaları ulaşmadan saniyeler önce kritik uyarılar alın." : "Receive critical alerts seconds before earthquake waves arrive."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: lang === 'tr' ? "Konum Takibi" : "Location Tracking",
      desc: lang === 'tr' ? "Afet anında sevdiklerinizin nerede olduğunu gerçek zamanlı görün." : "See where your loved ones are in real-time during a disaster."
    },
    {
      icon: <ShieldAlert className="h-8 w-8" />,
      title: lang === 'tr' ? "Güvenli Alanlar" : "Safe Zones",
      desc: lang === 'tr' ? "En yakın toplanma merkezlerine ve güvenli bölgelere anında rota." : "Instant routes to nearest assembly centers and safe zones."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: lang === 'tr' ? "Aile Grupları" : "Family Groups",
      desc: lang === 'tr' ? "Tüm aile üyelerini tek bir ağda toplayın ve durumlarını takip edin." : "Gather all family members in one network and track their status."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: lang === 'tr' ? "Çevrimdışı Mod" : "Offline Mode",
      desc: lang === 'tr' ? "İnternet kesildiğinde bile kritik rehberlere ve haritalara erişin." : "Access critical guides and maps even when internet is down."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: lang === 'tr' ? "AI Analizi" : "AI Analysis",
      desc: lang === 'tr' ? "Yapay zeka ile hasar risk tahmini ve bölge güvenliği analizi." : "AI-driven damage risk estimation and zone safety analysis."
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: lang === 'tr' ? "Mesh Ağı" : "Mesh Network",
      desc: lang === 'tr' ? "Baz istasyonları çöktüğünde cihazlar arası iletişim yeteneği." : "Device-to-device communication when base stations fail."
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: lang === 'tr' ? "Bulut Yedekleme" : "Cloud Backup",
      desc: lang === 'tr' ? "Önemli belgelerinizi ve sağlık verilerinizi güvenli saklayın." : "Securely store your important documents and health data."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: lang === 'tr' ? "Hızlı Bildirim" : "Quick Report",
      desc: lang === 'tr' ? "Enkaz altındakiler için tek tuşla yetkililere konum bildirme." : "One-tap location reporting to authorities for those trapped."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: lang === 'tr' ? "Sağlık Takibi" : "Health Tracking",
      desc: lang === 'tr' ? "Acil durumlarda sağlık durumunuzu ve kan grubunuzu paylaşın." : "Share your health status and blood type in emergencies."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: lang === 'tr' ? "Geçmiş Analiz" : "Historical Analysis",
      desc: lang === 'tr' ? "Bölgenizdeki geçmiş deprem verilerini ve riskleri inceleyin." : "Examine historical earthquake data and risks in your area."
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: lang === 'tr' ? "Dayanışma Ağı" : "Solidarity Network",
      desc: lang === 'tr' ? "İhtiyaç sahipleriyle yardım edebilecekleri buluşturan platform." : "Platform connecting those in need with those who can help."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[600px] flex items-center bg-[#0F172A] border border-white/10">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" className="w-full h-full object-cover opacity-20" alt="QuakeSafe Background" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <img src="/assets/logos/QuakeSafe Logo.png" alt="QuakeSafe" className="h-16 w-16" />
                    <span className="text-3xl font-bold text-white tracking-tight">QuakeSafe</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    {lang === 'tr' ? "Hayat Kurtaran Teknoloji" : "Life-Saving Technology"}
                  </h1>
                  <p className="text-xl text-slate-400 max-w-[600px]">
                    {lang === 'tr'
                      ? "Yapay zeka ve sensör ağları ile deprem güvenliğinde yeni bir çağ. Saniyelerin bile önemli olduğu anlarda yanınızdayız."
                      : "A new era in earthquake safety with AI and sensor networks. We are with you when every second counts."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <ArrowButton href="https://waitlist.funteknoloji.com" variant="light" className="!bg-white !text-[#0F172A]">
                       {lang === 'tr' ? "Şimdi Katıl" : "Join Waitlist"}
                     </ArrowButton>
                  </div>
               </div>
               <div className="hidden lg:block relative">
                  <div className="absolute -inset-20 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse" />
                  <div className="relative border border-white/10 rounded-[32px] overflow-hidden bg-slate-900/50 backdrop-blur-xl shadow-2xl p-4">
                     <div className="aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                           <div className="h-20 w-20 rounded-full bg-red-500 animate-ping absolute" />
                           <div className="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center relative z-10">
                              <Bell className="h-10 w-10 text-white" />
                           </div>
                           <h2 className="text-white text-2xl font-bold mt-8">EARTHQUAKE WARNING</h2>
                           <p className="text-red-400 font-bold mt-2">Expected in 12s</p>
                           <div className="mt-8 w-full space-y-3">
                              <div className="h-12 w-full bg-white/10 rounded-xl border border-white/20" />
                              <div className="h-12 w-full bg-white/10 rounded-xl border border-white/20" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 lg:px-0">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
               <span className="badge-fun badge-fun-purple">Özellikler</span>
               <h2 className="text-4xl md:text-5xl font-bold fun-text">Kapsamlı Koruma Ağı</h2>
               <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
                 Afet öncesi, sırası ve sonrasında ihtiyacınız olan tüm araçlar tek bir platformda.
               </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-3xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group h-full">
                   <div className="h-16 w-16 rounded-2xl bg-[var(--fun-surface)] flex items-center justify-center text-[var(--fun-purple)] mb-6 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500">
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold fun-text mb-3">{f.title}</h3>
                   <p className="fun-text-muted leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Callout */}
      <section className="py-24 px-4 lg:px-5">
         <ScrollReveal>
            <div className="max-w-[1880px] mx-auto rounded-[40px] bg-[var(--fun-purple)] p-12 md:p-24 text-center text-white overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-grid-white" />
               </div>
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-6xl font-bold mb-8">Daha Güvenli Bir Gelecek İnşa Ediyoruz</h2>
                  <p className="text-xl md:text-2xl text-white/80 max-w-[800px] mx-auto mb-12">
                    Teknoloji sadece hayatı kolaylaştırmak için değil, onu korumak içindir. QuakeSafe ile riskleri minimize edin.
                  </p>
                  <ArrowButton href="https://waitlist.funteknoloji.com" variant="light">Erken Erişim Al</ArrowButton>
               </div>
            </div>
         </ScrollReveal>
      </section>
    </main>
  );
}
