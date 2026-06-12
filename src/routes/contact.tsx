import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "İletişim – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji ile iletişime geçin. Projeleriniz için bize ulaşın." },
      { property: "og:title", content: "İletişim – Fun Teknoloji" },
      { property: "og:description", content: "Fun Teknoloji ile iletişime geçin. Projeleriniz için bize ulaşın." },
      { property: "og:url", content: "https://build-dream-flow-91.lovable.app/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "İletişim – Fun Teknoloji" },
      { name: "twitter:description", content: "Fun Teknoloji ile iletişime geçin. Projeleriniz için bize ulaşın." },
    ],
    links: [{ rel: "canonical", href: "https://build-dream-flow-91.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">İletişim</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4 fun-text">Bizimle iletişime geçin</h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">Projeleriniz, sorularınız veya iş birliği teklifleriniz için bize ulaşın.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 md:p-10 border" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                <h2 className="text-heading-5 font-medium mb-8 fun-text">Mesaj Gönderin</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium fun-text mb-2">Ad Soyad</label>
                      <input id="contact-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder="Adınız Soyadınız" required />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium fun-text mb-2">E-posta</label>
                      <input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder="ornek@mail.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium fun-text mb-2">Konu</label>
                    <input id="contact-subject" name="subject" type="text" value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder="Konu başlığı" required />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium fun-text mb-2">Mesaj</label>
                    <textarea id="contact-message" name="message" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={6} className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder="Mesajınızı yazın..." required />
                  </div>
                  <button type="submit" className="btn-fun btn-fun-dark w-full sm:w-auto">
                    Gönder
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#12161F] rounded-3xl p-8 md:p-10 text-white">
                <h3 className="text-heading-6 font-medium mb-6">İletişim Bilgileri</h3>
                <div className="space-y-6">
                  <ContactInfoItem icon="📍" title="Adres" value="İstanbul, Türkiye" />
                  <ContactInfoItem icon="📧" title="E-posta" value="info@funteknoloji.com" />
                  <ContactInfoItem icon="📞" title="Telefon" value="+90 (212) 000 00 00" />
                  <ContactInfoItem icon="🕐" title="Çalışma Saatleri" value="Pazartesi - Cuma: 09:00 - 18:00" />
                </div>
              </div>
              <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: 'var(--fun-green)' }}>
                <h3 className="text-heading-6 font-medium mb-4 fun-text">Sosyal Medya</h3>
                <p className="text-tagline-1 fun-text-muted mb-6">Bizi sosyal medyada takip edin.</p>
                <div className="flex flex-wrap gap-3">
                  {[{ name: "Instagram", url: "https://www.instagram.com/funteknoloji/" }, { name: "YouTube", url: "https://www.youtube.com/@FunTeknoloji" }, { name: "LinkedIn", url: "https://www.linkedin.com/company/funteknoloji" }, { name: "X", url: "https://x.com/funteknoloji_" }].map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:bg-[#12161F] hover:text-white" style={{ backgroundColor: 'var(--fun-card)', color: 'var(--fun-text)' }}>{s.name}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfoItem({ icon, title, value }: { icon: string; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm text-white/40 mb-1">{title}</p>
        <p className="text-tagline-1 text-white">{value}</p>
      </div>
    </div>
  );
}
