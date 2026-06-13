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
            {lang === "tr" ? "Hizmet Politikası" : "Service Policy"}
          </h1>
          <div className="h-1 w-20 bg-[var(--fun-purple)] mx-auto rounded-full mb-6"></div>
          <p className="fun-text-muted text-lg">{lang === "tr" ? "Son güncelleme: 1 Ocak 2026" : "Last updated: January 1, 2026"}</p>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <div className="rounded-[32px] p-8 md:p-12 border bg-white dark:bg-[#0D0D0D] shadow-xl shadow-black/5" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            {lang === "tr" ? (
              <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
                <section>
                  <p className="text-xl leading-relaxed opacity-80">Fun Teknoloji hizmetlerini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Bu şartlar, platformumuzdaki tüm etkileşimlerinizi kapsar.</p>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">1</span>
                      Hizmet Kullanımı
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Hizmetlerimizi yalnızca yasal amaçlarla ve bu politikaya uygun olarak kullanmayı kabul edersiniz. Sistemlerimize zarar verecek, performansı düşürecek veya yetkisiz erişim sağlayacak her türlü girişim kesinlikle yasaktır.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">2</span>
                      Sorumluluk Sınırı
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Fun Teknoloji, hizmetlerin kullanımından kaynaklanan doğrudan veya dolaylı zararlardan, veri kayıplarından, iş kesintilerinden veya kar mahrumiyetinden sorumlu tutulamaz. Hizmetler "olduğu gibi" sunulmaktadır.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">3</span>
                      Fikri Mülkiyet
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Hizmetlerimizdeki tüm içerik, tasarım, logo, yazılım ve ticari markalar Fun Teknoloji'ye aittir. Yazılı iznimiz olmadan kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.</p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
                <section>
                  <p className="text-xl leading-relaxed opacity-80">By using Fun Teknoloji services, you agree to the following terms. These terms cover all your interactions on our platform.</p>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">1</span>
                      Service Use
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">You agree to use our services only for lawful purposes and in accordance with this policy. Any attempt to damage our systems, degrade performance, or gain unauthorized access is strictly prohibited.</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">2</span>
                      Limitation of Liability
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">Fun Teknoloji cannot be held liable for any direct or indirect damages, data loss, business interruption, or loss of profits arising from the use of the services. Services are provided "as is".</p>
                  </div>
                </section>

                <section className="grid md:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <div className="md:col-span-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--fun-purple)] text-white text-sm">3</span>
                      Intellectual Property
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg opacity-70">All content, design, logos, software, and trademarks in our services belong to Fun Teknoloji. They cannot be copied, reproduced, or used for commercial purposes without our written permission.</p>
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
