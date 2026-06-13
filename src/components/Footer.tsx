import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLang } from "../lib/i18n";

const LOGO_DARK = "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024";
const LOGO_LIGHT = "https://framerusercontent.com/images/cOsd9aFSLcyMQvEdo60L3fUo.png?width=1563&height=1563";

export default function Footer() {
  const { t } = useLang();
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
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-3">
                <SocialLink href="https://discord.com/invite/f8K8FuZRTX" label="Discord">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037a19.736 19.736 0 0 0-4.885 1.515a.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.077 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.128c-.592.35-1.214.647-1.872.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/company/funteknoloji/" label="LinkedIn">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </SocialLink>
                <SocialLink href="https://x.com/funteknoloji_" label="X">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.instagram.com/funteknoloji" label="Instagram">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.youtube.com/@FunTeknoloji" label="YouTube">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </SocialLink>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 lg:col-span-8">
            <div className="col-span-6 md:col-span-4">
              <FooterSection title={t("nav.company")}>
                <FooterLink to="/about">{t("nav.about")}</FooterLink>
                <FooterLink to="/team">{t("nav.team")}</FooterLink>
                <FooterLink to="/contact">{t("nav.contact")}</FooterLink>
                <FooterLink to="/sitemap">{t("nav.sitemap")}</FooterLink>
              </FooterSection>
            </div>
            <div className="col-span-6 md:col-span-4">
              <FooterSection title={t("nav.platform")}>
                <FooterLink to="/services">{t("nav.services")}</FooterLink>
                <FooterLink to="/pricing">{t("nav.pricing")}</FooterLink>
                <FooterLink to="/projects">{t("nav.projects")}</FooterLink>
              </FooterSection>
            </div>
            <div className="col-span-6 md:col-span-4">
              <FooterSection title={t("nav.resources")}>
                <FooterLink to="/blog">{t("nav.blog")}</FooterLink>
                <FooterLink to="/faq">{t("nav.faq")}</FooterLink>
                <FooterLink to="/docs">{t("nav.docs")}</FooterLink>
                <FooterLink href="https://status.funteknoloji.com">{t("footer.status")}</FooterLink>
              </FooterSection>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 md:flex-row" style={{ borderColor: 'var(--fun-stroke-1)' }}>
          <p className="text-[13px] fun-text-muted">© 2026 Fun Teknoloji. {t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-[13px] fun-text-muted hover:fun-text transition-colors">{t("nav.privacy_policy_short")}</Link>
            <Link to="/service-policy" className="text-[13px] fun-text-muted hover:fun-text transition-colors">{t("nav.service_policy_short")}</Link>
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
  const className = "text-[15px] fun-text-muted hover:fun-text transition-colors";
  if (to) return <li><Link to={to} className={className}>{children}</Link></li>;
  return <li><a href={href || "#"} target={href?.startsWith("http") ? "_blank" : undefined} className={className}>{children}</a></li>;
}
