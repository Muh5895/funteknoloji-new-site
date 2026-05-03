import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "İletişim – Fun Teknoloji" },
      { name: "description", content: "Fun Teknoloji ile iletişime geçin. Projeleriniz için bize ulaşın." },
      { property: "og:title", content: "İletişim – Fun Teknoloji" },
      { property: "og:description", content: "Fun Teknoloji ile iletişime geçin." },
    ],
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
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <div className="bg-[#F3F5F8] max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5">
          <div className="main-container text-center">
            <span className="badge-fun badge-fun-white mb-4 inline-block">İletişim</span>
            <h1 className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-medium mb-4">
              Bizimle iletişime geçin
            </h1>
            <p className="max-w-[600px] mx-auto text-tagline-1 text-[#12161F]/60">
              Projeleriniz, sorularınız veya iş birliği teklifleriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E8EBF0] rounded-3xl p-8 md:p-10">
                <h2 className="text-heading-5 font-medium mb-8">Mesaj Gönderin</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#12161F] mb-2">Ad Soyad</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full rounded-xl border border-[#E8EBF0] px-4 py-3 text-sm outline-none focus:border-[#12161F] transition-colors"
                        placeholder="Adınız Soyadınız"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#12161F] mb-2">E-posta</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full rounded-xl border border-[#E8EBF0] px-4 py-3 text-sm outline-none focus:border-[#12161F] transition-colors"
                        placeholder="ornek@mail.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#12161F] mb-2">Konu</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full rounded-xl border border-[#E8EBF0] px-4 py-3 text-sm outline-none focus:border-[#12161F] transition-colors"
                      placeholder="Konu başlığı"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#12161F] mb-2">Mesaj</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      rows={6}
                      className="w-full rounded-xl border border-[#E8EBF0] px-4 py-3 text-sm outline-none focus:border-[#12161F] transition-colors resize-none"
                      placeholder="Mesajınızı yazın..."
                      required
                    />
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

            {/* Contact Info */}
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

              <div className="bg-[#D4F5E9] rounded-3xl p-8 md:p-10">
                <h3 className="text-heading-6 font-medium mb-4">Sosyal Medya</h3>
                <p className="text-tagline-1 text-[#12161F]/60 mb-6">Bizi sosyal medyada takip edin ve en güncel gelişmelerden haberdar olun.</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Instagram", url: "https://www.instagram.com/funteknoloji/" },
                    { name: "YouTube", url: "https://www.youtube.com/@FunTeknoloji" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/company/funteknoloji" },
                    { name: "X", url: "https://x.com/funteknoloji_" },
                  ].map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#12161F] hover:bg-[#12161F] hover:text-white transition-all">
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-4 lg:px-5 pb-16 md:pb-24">
        <div className="max-w-[1880px] mx-auto rounded-3xl overflow-hidden bg-[#F3F5F8] h-[300px] md:h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#12161F]/30 text-lg">🗺️</p>
            <p className="text-[#12161F]/30 text-sm mt-2">İstanbul, Türkiye</p>
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
