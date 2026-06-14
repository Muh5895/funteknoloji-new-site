import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/service-policy")({
  component: ServicePolicy,
});

function ServicePolicy() {
  const { lang } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 bg-[var(--fun-surface)] min-h-screen">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="badge-fun badge-fun-white mb-4 inline-block shadow-sm">{lang === "tr" ? "Yasal" : "Legal"}</span>
          <h1 className="text-4xl md:text-7xl font-bold fun-text mb-6 tracking-tight">
            {lang === "tr" ? "Kullanım Şartları" : "Terms of Service"}
          </h1>
          <div className="h-1 w-20 bg-[var(--fun-purple)] mx-auto rounded-full mb-6"></div>
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full w-fit mx-auto border border-[var(--fun-stroke-1)]">
             <p className="fun-text-muted text-sm font-medium">{lang === "tr" ? "Son Güncelleme Tarihi: 19/03/2026" : "Last Updated: March 19, 2026"}</p>
          </div>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <div className="rounded-[40px] p-8 md:p-12 border bg-white dark:bg-[#0D0D0D] shadow-xl shadow-black/5" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
               <section>
                  <p className="text-xl leading-relaxed opacity-80">Fun Teknoloji platformunu kullanarak, hizmetlerimizi güvenli, yasal ve etik kurallar çerçevesinde kullanmayı kabul etmiş olursunuz. İşte temel kullanım şartları:</p>
               </section>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <PolicySection title="Hesap Kullanımı" num="1">
                     Platformu kullanabilmek için doğru ve güncel bilgilerle bir hesap oluşturmanız gereklidir. Hesap bilgilerinizin gizliliğinden siz sorumlusunuz.
                  </PolicySection>

                  <PolicySection title="Yasal Uygunluk" num="2">
                     Platform üzerinde paylaştığınız içerik ve gerçekleştirdiğiniz işlemler, yürürlükteki tüm yasalar ve düzenlemelerle uyumlu olmalıdır.
                  </PolicySection>

                  <PolicySection title="Güvenlik ve Gizlilik" num="3">
                     Fun Teknoloji, verilerinizi korumak için gelişmiş güvenlik önlemleri uygular. Hesap güvenliğiniz için şifrelerinizi gizli tutmanız gerekir.
                  </PolicySection>

                  <PolicySection title="Sorumluluk Reddi" num="4">
                     Fun Teknoloji, platformdaki içerik ve üçüncü taraf bağlantılar için sınırlı sorumluluk kabul eder. Kullanıcılar, platformu kendi sorumlulukları çerçevesinde kullanır.
                  </PolicySection>

                  <PolicySection title="Hizmet Değişiklikleri" num="5">
                     Fun Teknoloji, platformun işlevselliğini geliştirmek amacıyla içerik, özellik veya kullanım koşullarında değişiklik yapma hakkını saklı tutar.
                  </PolicySection>

                  <PolicySection title="Yaptırımlar" num="6">
                     Kullanım şartlarının ihlali durumunda, platform hesapları geçici veya kalıcı olarak kısıtlayabilir veya kapatabilir.
                  </PolicySection>
               </div>

               <section className="border-t pt-10" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <h2 className="text-2xl font-bold mb-4">İletişim</h2>
                  <p className="opacity-70">Kullanım Şartları hakkında herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz:</p>
                  <p className="mt-4 font-bold text-[var(--fun-purple)]">📧 support@funteknoloji.com</p>
               </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicySection({ title, num, children }: { title: string; num: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm shrink-0">{num}</span>
        {title}
      </h2>
      <div className="text-lg opacity-70 leading-relaxed">{children}</div>
    </div>
  );
}
