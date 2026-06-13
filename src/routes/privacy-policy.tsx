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
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full w-fit mx-auto border border-[var(--fun-stroke-1)]">
             <p className="fun-text-muted text-sm font-medium">{lang === "tr" ? "Son Güncelleme Tarihi: 19/03/2026" : "Last Updated: March 19, 2026"}</p>
          </div>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <div className="rounded-[40px] p-8 md:p-12 border bg-white dark:bg-[#0D0D0D] shadow-xl shadow-black/5" style={{ borderColor: 'var(--fun-stroke-1)' }}>
            <div className="prose dark:prose-invert max-w-none fun-text space-y-12">
               <section>
                  <p className="text-xl leading-relaxed opacity-80">Gizlilik Politikamız, kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır. Gizliliğiniz ve güvenliğiniz önceliğimizdir.</p>
               </section>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <PolicySection title="Topladığımız Bilgiler" num="1">
                     Web sitemizi ziyaret ettiğinizde, hesap oluşturduğunuzda veya hizmetlerimizle etkileşime geçtiğinizde sizden bazı kişisel bilgiler toplayabiliriz. Bu bilgiler şunları içerebilir:
                     <ul className="mt-4 space-y-2 opacity-70">
                        <li>• Ad ve soyad</li>
                        <li>• E-posta adresi</li>
                        <li>• İletişim bilgileri</li>
                        <li>• Tarafınızca gönüllü olarak sağlanan diğer bilgiler</li>
                     </ul>
                  </PolicySection>

                  <PolicySection title="Bilgilerinizi Nasıl Kullanıyoruz" num="2">
                     Topladığımız bilgileri aşağıdaki amaçlarla kullanabiliriz:
                     <ul className="mt-4 space-y-2 opacity-70">
                        <li>• Hizmetlerimizi sunmak ve geliştirmek</li>
                        <li>• Kullanıcı deneyimini kişiselleştirmek</li>
                        <li>• Hesabınızla ilgili bilgilendirme yapmak</li>
                        <li>• Kampanya ve yenilikler hakkında iletişim kurmak</li>
                        <li>• Site trafiğini analiz ederek hizmetlerimizi iyileştirmek</li>
                     </ul>
                  </PolicySection>

                  <PolicySection title="Veri Güvenliği" num="3">
                     Kişisel verilerinizin güvenliğini ciddiye alıyoruz. Yetkisiz erişim, değiştirme, ifşa veya yok etmeye karşı korumak için endüstri standartlarında güvenlik önlemleri uyguluyoruz. Ancak, internet üzerinden veri iletiminin veya elektronik depolamanın %100 güvenli olmadığını unutmayın.
                  </PolicySection>

                  <PolicySection title="Üçüncü Taraflarla Paylaşım" num="4">
                     Kişisel verileriniz: Açık izniniz olmadan satılmaz veya ticari amaçla paylaşılmaz. Yasal zorunluluklar gerektirdiğinde veya hizmet sağlayıcılarla gizlilik şartına bağlı kalmaları koşuluyla paylaşılabilir.
                  </PolicySection>

                  <PolicySection title="Çerezler" num="5">
                     Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler kullanabilir. Çerezler sayesinde siteyi nasıl kullandığınıza dair bilgiler toplanır. Tarayıcı ayarlarınızı değiştirerek çerezleri reddedebilir veya uyarı alabilirsiniz.
                  </PolicySection>

                  <PolicySection title="Değişiklikler" num="6">
                     Bu Gizlilik Politikası zaman zaman güncellenebilir. Yapılan değişiklikler bu sayfada yayınlanır ve yürürlük tarihi güncellenir. Güncellemeleri takip etmek için bu sayfayı düzenli olarak kontrol etmenizi öneririz.
                  </PolicySection>
               </div>

               <section className="border-t pt-10" style={{ borderColor: 'var(--fun-stroke-1)' }}>
                  <h2 className="text-2xl font-bold mb-4">İletişim</h2>
                  <p className="opacity-70">Gizlilik Politikamız veya kişisel verilerinizin işlenmesi hakkında herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz:</p>
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
