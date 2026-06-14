import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import {
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Cpu,
  Search,
  Sparkles,
  Bot,
  BrainCircuit,
  MessageCircle
} from "lucide-react";

export const Route = createFileRoute("/nexy")({
  component: NexyPage,
});

function NexyPage() {
  const { t, lang } = useLang();

  const capabilities = [
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: lang === 'tr' ? "Gelişmiş Zeka" : "Advanced Intelligence",
      desc: lang === 'tr' ? "Sorularınızı anlar ve size en doğru bilgiyi saniyeler içinde sunar." : "Understands your questions and provides accurate information in seconds."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: lang === 'tr' ? "Hızlı Yanıt" : "Instant Response",
      desc: lang === 'tr' ? "Bekleme süresi olmadan, 7/24 kesintisiz destek sağlar." : "Provides 24/7 continuous support without any waiting time."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: lang === 'tr' ? "Çok Dilli Destek" : "Multi-language Support",
      desc: lang === 'tr' ? "İhtiyaç duyduğunuz her dilde sizinle iletişim kurabilir." : "Can communicate with you in any language you need."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: lang === 'tr' ? "Güvenli Etkileşim" : "Secure Interaction",
      desc: lang === 'tr' ? "Konuşmalarınız gizli tutulur ve verileriniz asla paylaşılmaz." : "Your conversations are kept private and your data is never shared."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-[40px] overflow-hidden relative min-h-[600px] flex items-center bg-[#12161F] border border-white/10">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/20 via-transparent to-transparent" />
               <div className="absolute top-0 right-0 w-1/2 h-full bg-dots opacity-20" />
            </div>

            <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
               <div className="space-y-8 text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-[var(--fun-purple)]" />
                    <span className="text-sm font-medium text-white/80">Fun Teknoloji AI Asistanı</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    Nexy ile Tanışın
                  </h1>
                  <p className="text-xl text-white/60 max-w-[600px]">
                    İşinizi kolaylaştıran, sorularınızı yanıtlayan ve size rehberlik eden yapay zeka tabanlı dijital asistanınız.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <ArrowButton to="/contact" variant="light">
                       Daha Fazla Bilgi
                     </ArrowButton>
                  </div>
               </div>
               <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[500px]">
                     <div className="absolute -inset-10 bg-[var(--fun-purple)]/20 blur-[80px] rounded-full animate-pulse" />
                     <div className="relative bg-[var(--fun-card)] border border-white/10 rounded-[40px] p-10 shadow-2xl backdrop-blur-2xl">
                        <div className="flex items-center gap-6 mb-8">
                           <div className="h-24 w-24 rounded-3xl bg-[var(--fun-purple)] flex items-center justify-center shadow-2xl">
                              <Bot className="h-12 w-12 text-white" />
                           </div>
                           <div>
                              <h2 className="text-3xl font-bold text-white">Nexy</h2>
                              <p className="text-[var(--fun-purple)] font-medium tracking-widest uppercase text-xs">Aktif Destek</p>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
                              <p className="text-white/80 text-sm">Merhaba! Ben Nexy. Size bugün nasıl yardımcı olabilirim? Projelerimiz, hizmetlerimiz veya kurucumuz hakkında bilgi verebilirim.</p>
                           </div>
                           <div className="flex justify-end">
                              <div className="bg-[var(--fun-purple)] rounded-2xl rounded-tr-none p-4 text-white text-sm shadow-xl">
                                 Hizmetleriniz hakkında bilgi verir misin?
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-4 lg:px-0">
        <div className="main-container">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
               <span className="badge-fun badge-fun-gray">Yetenekler</span>
               <h2 className="text-4xl md:text-5xl font-bold fun-text">Nexy Neler Yapabilir?</h2>
               <p className="fun-text-muted text-lg max-w-[700px] mx-auto">
                 Yapay zeka teknolojisi ile donatılmış Nexy, her an yanınızda.
               </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i}>
                <div className="p-8 rounded-[32px] border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)] transition-all group h-full text-center">
                   <div className="mx-auto h-16 w-16 rounded-2xl bg-[var(--fun-surface)] flex items-center justify-center text-[var(--fun-purple)] mb-6 group-hover:bg-[var(--fun-purple)] group-hover:text-white transition-all duration-500">
                      {c.icon}
                   </div>
                   <h3 className="text-xl font-bold fun-text mb-3">{c.title}</h3>
                   <p className="fun-text-muted leading-relaxed text-sm">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nexy */}
      <section className="py-24 px-4 lg:px-5">
         <ScrollReveal>
            <div className="max-w-[1880px] mx-auto rounded-[40px] bg-[var(--fun-surface)] p-12 md:p-24 border border-[var(--fun-stroke-1)]">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                     <div className="aspect-square bg-[var(--fun-card)] rounded-[40px] border border-[var(--fun-stroke-1)] overflow-hidden flex items-center justify-center">
                        <MessageCircle className="h-40 w-40 text-[var(--fun-purple)] opacity-20" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 space-y-6">
                           <div className="w-full bg-[var(--fun-surface)] p-4 rounded-2xl border border-[var(--fun-stroke-1)] animate-in slide-in-from-left duration-500">
                              <div className="h-2 w-1/2 bg-[var(--fun-purple)]/20 rounded-full mb-2" />
                              <div className="h-2 w-full bg-[var(--fun-purple)]/10 rounded-full" />
                           </div>
                           <div className="w-full bg-[var(--fun-purple)]/10 p-4 rounded-2xl border border-[var(--fun-purple)]/20 animate-in slide-in-from-right duration-700">
                              <div className="h-2 w-3/4 bg-[var(--fun-purple)]/30 rounded-full mb-2" />
                              <div className="h-2 w-1/2 bg-[var(--fun-purple)]/30 rounded-full" />
                           </div>
                           <div className="w-full bg-[var(--fun-surface)] p-4 rounded-2xl border border-[var(--fun-stroke-1)] animate-in slide-in-from-left duration-1000">
                              <div className="h-2 w-2/3 bg-[var(--fun-purple)]/20 rounded-full mb-2" />
                              <div className="h-2 w-full bg-[var(--fun-purple)]/10 rounded-full" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <h2 className="text-4xl md:text-5xl font-bold fun-text">Geleceğin İletişim Formu</h2>
                     <p className="text-lg fun-text-muted">
                        Nexy, sadece bir chatbot değil. İşletmenizin dijital yüzü ve müşterilerinizin en büyük yardımcısıdır.
                        Doğal dil işleme (NLP) teknolojisi ile karmaşık soruları anlar ve kurumsal kimliğinize uygun yanıtlar üretir.
                     </p>
                     <ul className="space-y-4">
                        {[
                          "Dinamik Öğrenme Kapasitesi",
                          "Kurumsal Kimlik Uyumu",
                          "Hızlı Entegrasyon",
                          "Analitik Raporlama"
                        ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                 <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                 </svg>
                              </div>
                              <span className="font-medium fun-text">{item}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>
    </main>
  );
}
