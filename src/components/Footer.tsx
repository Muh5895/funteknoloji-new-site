import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const LOGO_DARK = "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024";
const LOGO_LIGHT = "https://framerusercontent.com/images/cOsd9aFSLcyMQvEdo60L3fUo.png?width=1563&height=1563";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <footer className="fun-surface relative overflow-hidden px-4 lg:px-0" style={{ backgroundColor: 'var(--fun-surface)' }}>
      <div className="main-container">
        <div className="grid grid-cols-12 gap-x-0 gap-y-12 pt-16 pb-16 lg:gap-x-8 xl:pt-24">
          {/* Logo & description */}
          <div className="col-span-12 lg:col-span-4">
            <div className="max-w-[306px]">
              <div className="flex items-center gap-2">
                <img src={isDark ? LOGO_LIGHT : LOGO_DARK} alt="Fun Teknoloji" width={40} height={40} className="h-10 w-10 object-contain" />
                <span className="text-lg font-semibold fun-text">Fun Teknoloji</span>
              </div>
              <p className="mt-4 mb-7 fun-text-muted text-tagline-1">
                Yenilikçi çözümlerimizle geleceği bugünden inşa ediyoruz.
              </p>
              <div className="flex items-center gap-3">
                <SocialLink href="https://discord.com/invite/f8K8FuZRTX" label="Discord">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037a19.736 19.736 0 0 0-4.885 1.515a.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.077 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.128c-.592.35-1.214.647-1.872.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </SocialLink>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 lg:col-span-8">
            <div className="col-span-6 md:col-span-4">
              <FooterSection title="Şirket">
                <FooterLink to="/about">Hakkımızda</FooterLink>
                <FooterLink to="/team">Ekibimiz</FooterLink>
                <FooterLink to="/contact">İletişim</FooterLink>
                <FooterLink to="/sitemap">Site Haritası</FooterLink>
              </FooterSection>
            </div>
            <div className="col-span-6 md:col-span-4">
              <FooterSection title="Platform">
                <FooterLink to="/services">Hizmetler</FooterLink>
                <FooterLink to="/pricing">Fiyatlandırma</FooterLink>
                <FooterLink to="/projects">Projelerimiz</FooterLink>
              </FooterSection>
            </div>
            <div className="col-span-6 md:col-span-4">
              <FooterSection title="Kaynaklar">
                <FooterLink to="/blog">Blog</FooterLink>
                <FooterLink to="/faq">SSS</FooterLink>
                <FooterLink to="/docs">Dokümantasyon</FooterLink>
              </FooterSection>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 md:flex-row" style={{ borderColor: 'var(--fun-stroke-1)' }}>
          <p className="text-sm fun-text-muted">© 2026 Fun Teknoloji. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm fun-text-muted hover:fun-text transition-colors">Gizlilik Politikası</Link>
            <Link to="/service-policy" className="text-sm fun-text-muted hover:fun-text transition-colors">Hizmet Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[var(--fun-card)] fun-text" aria-label={label}>
      {children}
    </a>
  );
}

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <p className="text-heading-6 font-normal fun-text">{title}</p>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

function FooterLink({ to, href, children }: { to?: string; href?: string; children: React.ReactNode }) {
  const className = "text-tagline-1 fun-text-muted hover:fun-text transition-colors";
  if (to) return <li><Link to={to} className={className}>{children}</Link></li>;
  return <li><a href={href || "#"} className={className}>{children}</a></li>;
}
