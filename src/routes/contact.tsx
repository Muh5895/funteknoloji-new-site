import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

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
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [mathProblem, setMathProblem] = useState({ q: "", a: 0 });
  const [lastSubmit, setLastSubmit] = useState(0);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setMathProblem({ q: `${n1} + ${n2}`, a: n1 + n2 });
    setCaptchaAnswer("");
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Geçersiz e-posta formatı.");
      return false;
    }
    if (formData.subject.length <= 7) {
      alert("Konu en az 8 karakter olmalıdır.");
      return false;
    }
    if (formData.message.length <= 15) {
      alert("Mesaj en az 16 karakter olmalıdır.");
      return false;
    }
    return true;
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Rate limit check (30 seconds)
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      alert("Çok sık mesaj gönderiyorsunuz. Lütfen biraz bekleyin.");
      return;
    }

    generateCaptcha();
    setShowCaptcha(true);
  };

  const handleFinalSubmit = async () => {
    if (parseInt(captchaAnswer) !== mathProblem.a) {
      alert("Hatalı cevap. Lütfen tekrar deneyin.");
      generateCaptcha();
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('contact').insert([formData]);

    if (!error) {
      alert("Mesajınız başarıyla gönderildi! ✅");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowCaptcha(false);
      setLastSubmit(Date.now());
    } else {
      alert("Bir hata oluştu. Lütfen sonra tekrar deneyin.");
    }
    setLoading(false);
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
                <form onSubmit={handlePreSubmit} className="space-y-6">
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
                  <ContactInfoItem icon="📧" title="E-posta" value="support@funteknoloji.com" />
                  <ContactInfoItem icon="🕐" title="Çalışma Saatleri" value="Pazartesi - Cuma: 09:00 - 18:00" />
                </div>
              </div>
              <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: 'var(--fun-card)', border: '1px solid var(--fun-stroke-1)' }}>
                <h3 className="text-heading-6 font-medium mb-4 fun-text">Topluluğumuza Katılın</h3>
                <p className="text-tagline-1 fun-text-muted mb-6">Discord üzerinden bizimle ve topluluğumuzla iletişime geçebilirsiniz.</p>
                <a href="https://discord.com/invite/f8K8FuZRTX" target="_blank" rel="noopener noreferrer" className="btn-fun bg-[#5865F2] text-white hover:opacity-90 w-full">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037a19.736 19.736 0 0 0-4.885 1.515a.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.077 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.128c-.592.35-1.214.647-1.872.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  Discord'a Katıl
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCaptcha && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-[32px] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold fun-text mb-2">Güvenlik Doğrulaması</h3>
            <p className="fun-text-muted mb-8 text-sm">Lütfen robot olmadığınızı kanıtlamak için aşağıdaki soruyu cevaplayın.</p>

            <div className="bg-[var(--fun-surface)] rounded-2xl p-6 text-center mb-8">
              <span className="text-3xl font-bold fun-text">{mathProblem.q} = ?</span>
            </div>

            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className="w-full rounded-xl px-4 py-4 text-center text-xl font-bold outline-none border-2 border-[var(--fun-stroke-1)] focus:border-[var(--fun-purple)] transition-colors mb-6 bg-transparent fun-text"
              placeholder="Cevabınız"
              autoFocus
            />

            <div className="flex gap-4">
              <button onClick={() => setShowCaptcha(false)} className="flex-1 btn-fun btn-fun-light !py-3">İptal</button>
              <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 btn-fun btn-fun-dark !py-3">
                {loading ? "Gönderiliyor..." : "Doğrula ve Gönder"}
              </button>
            </div>
          </div>
        </div>
      )}
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
