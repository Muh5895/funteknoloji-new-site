import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const { lang } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 bg-[var(--fun-surface)] min-h-screen">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="badge-fun badge-fun-white mb-4 inline-block shadow-sm">{lang === "tr" ? "Yasal" : "Legal"}</span>
          <h1 className="text-4xl md:text-7xl font-bold fun-text mb-6 tracking-tight">
            {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
          </h1>
          <div className="h-1 w-20 bg-[var(--fun-purple)] mx-auto rounded-full mb-6"></div>
          <p className="fun-text-muted text-lg">{lang === "tr" ? "Son güncelleme: 1 Ocak 2026" : "Last updated: January 1, 2026"}</p>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <div className="rounded-[32px] p-8 md:p-12 border bg-white dark:bg-[#0D0D0D] shadow-xl shadow-black/5" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            {lang === "tr" ? (
              <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
                <section>
                  <p className="text-xl leading-relaxed opacity-80">Fun Teknoloji olarak gizliliğinize önem veriyoruz. Bu politika, hizmetlerimizi kullandığınızda bilgilerinizin nasıl toplandığını ve kullanıldığını açıklar.</p>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">1</span>
                      Toplanan Veriler
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Hizmetlerimizi kullandığınızda, adınız, e-posta adresiniz, telefon numaranız ve kullanım verileriniz gibi bazı bilgileri toplayabiliriz. Bu bilgiler size daha iyi hizmet sunabilmemiz için gereklidir.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">2</span>
                      Verilerin Kullanımı
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Toplanan veriler, hizmetlerimizi sağlamak, güvenliği artırmak, yeni özellikler geliştirmek ve sizinle iletişim kurmak için kullanılır. Verileriniz, yasal zorunluluklar dışında üçüncü taraflarla rızanız olmadan paylaşılmaz.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">3</span>
                      Çerezler (Cookies)
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Web sitemizdeki deneyiminizi kişiselleştirmek ve trafik analizi yapmak için çerezler kullanıyoruz. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.</p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
                <section>
                  <p className="text-xl leading-relaxed opacity-80">At Fun Teknoloji, we value your privacy. This policy explains how your information is collected and used when you use our services.</p>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">1</span>
                      Data Collected
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">When you use our services, we may collect information such as your name, email address, phone number, and usage data. This information is necessary to provide you with better service.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">2</span>
                      Use of Data
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">The collected data is used to provide our services, enhance security, develop new features, and communicate with you. Your data is not shared with third parties without your consent, except for legal requirements.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">3</span>
                      Cookies
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">We use cookies to personalize your experience on our website and perform traffic analysis. You can manage your cookie preferences through your browser settings.</p>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
