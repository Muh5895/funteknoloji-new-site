import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { submitContactForm } from "../lib/supabase-server";
import { toast } from "sonner";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact – Fun Teknoloji" },
      { name: "description", content: "AI & Software Solutions" },
      { property: "og:title", content: "Contact – Fun Teknoloji" },
      { property: "og:description", content: "AI & Software Solutions" },
      { property: "og:url", content: "https://funteknoloji.com/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact – Fun Teknoloji" },
      { name: "twitter:description", content: "AI & Software Solutions" },
    ],
    links: [{ rel: "canonical", href: "https://funteknoloji.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useLang();
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
      toast.error(t("contact.form.invalid_email"));
      return false;
    }

    const isGibberish = (str: string) => {
      const noVowels = !/[aeiouyüöıiə]/.test(str.toLowerCase());
      const tooRepetitive = /(.)\1{4,}/.test(str);
      return noVowels || tooRepetitive;
    };

    if (formData.subject.length <= 7) {
       toast.error(t("contact.form.invalid_subject"));
       return false;
    }
    if (isGibberish(formData.subject)) {
       toast.error(t("inline.contact.subject_error"));
       return false;
    }

    if (formData.message.length <= 15) {
       toast.error(t("contact.form.invalid_message"));
       return false;
    }
    if (isGibberish(formData.message)) {
       toast.error(t("inline.contact.message_error"));
       return false;
    }
    return true;
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const now = Date.now();
    if (now - lastSubmit < 30000) {
      toast.error(t("contact.form.rate_limit"));
      return;
    }

    generateCaptcha();
    setShowCaptcha(true);
  };

  const handleFinalSubmit = async () => {
    if (parseInt(captchaAnswer) !== mathProblem.a) {
      toast.error(t("contact.captcha.error"));
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      await submitContactForm({ data: formData });
      toast.success(t("contact.form.success").replace(" ✅", ""));
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowCaptcha(false);
      setLastSubmit(Date.now());
    } catch (err: any) {
      if (err.message === "RATE_LIMIT") {
        toast.error(t("contact.form.rate_limit"));
      } else {
        toast.error(t("contact.form.error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="pt-32 pb-16 px-4 lg:px-5">
        <ScrollReveal>
          <div className="max-w-[1880px] mx-auto rounded-3xl xl:rounded-[32px] py-20 md:py-28 px-5" style={{ backgroundColor: 'var(--fun-surface)' }}>
            <div className="main-container text-center">
              <span className="badge-fun badge-fun-white mb-4 inline-block">{t("contact.title")}</span>
              <h1 className="text-heading-2 md:text-heading-1 lg:text-heading-huge font-medium mb-4 fun-text">{t("contact.desc")}</h1>
              <p className="max-w-[600px] mx-auto text-tagline-1 fun-text-muted">{t("contact.desc")}</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 md:p-10 border" style={{ backgroundColor: 'var(--fun-card)', borderColor: 'var(--fun-stroke-1)' }}>
                <h2 className="text-heading-5 font-medium mb-8 fun-text">{t("contact.form.send")}</h2>
                <form onSubmit={handlePreSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium fun-text mb-2">{t("contact.form.name")}</label>
                      <input id="contact-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder={t("contact.form.name")} required />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium fun-text mb-2">{t("contact.form.email")}</label>
                      <input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder="example@mail.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium fun-text mb-2">{t("contact.form.subject")}</label>
                    <input id="contact-subject" name="subject" type="text" value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder={t("contact.form.subject")} required />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium fun-text mb-2">{t("contact.form.message")}</label>
                    <textarea id="contact-message" name="message" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={6} className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-colors" style={{ backgroundColor: 'var(--fun-surface)', borderColor: 'var(--fun-stroke-1)', borderWidth: 1, color: 'var(--fun-text)' }} placeholder={t("contact.form.message")} required />
                  </div>
                  <button type="submit" className="btn-fun btn-fun-dark w-full sm:w-auto">
                    {t("contact.form.send")}
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#12161F] rounded-3xl p-8 md:p-10 text-white">
                <h3 className="text-heading-6 font-medium mb-6">{t("contact.info.title")}</h3>
                <div className="space-y-6">
                  <ContactInfoItem
                    icon="📧"
                    title={t("contact.info.email")}
                    value="support@funteknoloji.com"
                    href="mailto:support@funteknoloji.com"
                  />
                </div>
              </div>
              <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: 'var(--fun-card)', border: '1px solid var(--fun-stroke-1)' }}>
                <h3 className="text-heading-6 font-medium mb-4 fun-text">{t("contact.community.title")}</h3>
                <p className="text-tagline-1 fun-text-muted mb-6">{t("contact.community.desc")}</p>
                <a href="https://discord.com/invite/f8K8FuZRTX" target="_blank" rel="noopener noreferrer" className="btn-fun bg-[#5865F2] text-white hover:opacity-90 w-full">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037a19.736 19.736 0 0 0-4.885 1.515a.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.077 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.128c-.592.35-1.214.647-1.872.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  {t("contact.community.button")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCaptcha && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-[32px] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold fun-text mb-2">{t("contact.captcha.title")}</h3>
            <p className="fun-text-muted mb-8 text-sm">{t("contact.captcha.desc")}</p>

            <div className="bg-[var(--fun-surface)] rounded-2xl p-6 text-center mb-8 relative group">
              <span className="text-3xl font-bold fun-text">{mathProblem.q} = ?</span>
              <button type="button" onClick={generateCaptcha} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[var(--fun-stroke-1)] transition-colors text-fun-text-muted" title={t("contact.captcha.refresh")}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className="w-full rounded-xl px-4 py-4 text-center text-xl font-bold outline-none border-2 border-[var(--fun-stroke-1)] focus:border-[var(--fun-purple)] transition-colors mb-6 bg-transparent fun-text"
              placeholder={t("contact.captcha.verify")}
              autoFocus
            />

            <div className="flex gap-4">
              <button onClick={() => setShowCaptcha(false)} className="flex-1 btn-fun btn-fun-light !py-3">{t("contact.captcha.cancel")}</button>
              <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 btn-fun btn-fun-dark !py-3">
                {loading ? "..." : t("contact.captcha.verify")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


function ContactInfoItem({ icon, title, value, href }: { icon: string; title: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm text-white/40 mb-1">{title}</p>
        {href ? (
          <a href={href} className="text-tagline-1 text-white hover:text-[var(--fun-purple)] transition-colors">{value}</a>
        ) : (
          <p className="text-tagline-1 text-white">{value}</p>
        )}
      </div>
    </div>
  );
}
