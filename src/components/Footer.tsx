import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="fun-surface relative overflow-hidden" style={{ backgroundColor: 'var(--fun-surface)' }}>
      <div className="main-container">
        <div className="grid grid-cols-12 gap-x-0 gap-y-12 pt-16 pb-16 lg:gap-x-8 xl:pt-24">
          {/* Logo & description */}
          <div className="col-span-12 lg:col-span-4">
            <div className="max-w-[306px]">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--fun-text)' }}>
                  <span className="text-lg font-bold" style={{ color: 'var(--color-background)' }}>F</span>
                </div>
                <span className="text-lg font-semibold fun-text">Fun Teknoloji</span>
              </div>
              <p className="mt-4 mb-7 fun-text-muted text-sm">
                Yenilikçi çözümlerimizle geleceği bugünden inşa ediyoruz.
              </p>
              <div className="flex items-center gap-3">
                <SocialLink href="https://www.instagram.com/funteknoloji/" label="Instagram">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor" />
                  </svg>
                </SocialLink>
                <div className="h-5 w-px" style={{ backgroundColor: 'var(--fun-stroke-1)' }} />
                <SocialLink href="https://www.youtube.com/@FunTeknoloji" label="YouTube">
                  <svg className="h-4 w-4" viewBox="0 0 22 16" fill="none">
                    <path d="M16.668 15C18.972 15.084 20.91 13.29 21 10.986V5.02C20.91 2.716 18.972 .919 16.668 1.003H5.332C3.028.919 1.09 2.716 1 5.02V10.986C1.09 13.29 3.028 15.087 5.332 15.003H16.668Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10.508 5.177L13.669 7.325C13.874 7.445 14 7.664 14 7.901C14 8.138 13.874 8.358 13.669 8.477L10.508 10.827C9.908 11.234 9 10.887 9 10.251V5.751C9 5.118 9.909 4.77 10.508 5.177Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </SocialLink>
                <div className="h-5 w-px" style={{ backgroundColor: 'var(--fun-stroke-1)' }} />
                <SocialLink href="https://www.linkedin.com/company/funteknoloji" label="LinkedIn">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 13 11" fill="none">
                    <path d="M1.5 4V10M11.5 10V7C11.5 5.067 9.933 3.5 8 3.5C6.067 3.5 4.5 5.067 4.5 7V10M4.5 7V10M1.5 1V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </SocialLink>
                <div className="h-5 w-px" style={{ backgroundColor: 'var(--fun-stroke-1)' }} />
                <SocialLink href="https://x.com/funteknoloji_" label="X">
                  <svg className="h-4 w-4" viewBox="0 0 25 24" fill="none">
                    <path d="M17.844 4.242h2.76l-6.03 6.777 7.094 9.223h-5.554l-4.35-5.594-4.978 5.594h-2.762l6.45-7.25-6.806-8.75h5.696l3.932 5.113 4.548-5.113zm-.969 14.376h1.53L8.532 5.782H6.891l9.984 12.836z" fill="currentColor" />
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
                <FooterLink href="#">Kariyer</FooterLink>
                <FooterLink href="#">Vaka Çalışmaları</FooterLink>
                <FooterLink href="#">Yorumlar</FooterLink>
              </FooterSection>
            </div>
            <div className="col-span-6 md:col-span-4">
              <FooterSection title="Platform">
                <FooterLink to="/services">Hizmetler</FooterLink>
                <FooterLink to="/pricing">Fiyatlandırma</FooterLink>
                <FooterLink href="#">Özellikler</FooterLink>
                <FooterLink href="#">Entegrasyonlar</FooterLink>
                <FooterLink href="#">Güvenlik</FooterLink>
              </FooterSection>
            </div>
            <div className="col-span-6 md:col-span-4">
              <FooterSection title="Kaynaklar">
                <FooterLink to="/blog">Blog</FooterLink>
                <FooterLink href="#">SSS</FooterLink>
                <FooterLink href="#">Destek</FooterLink>
                <FooterLink to="/contact">İletişim</FooterLink>
                <FooterLink to="/docs">Dokümantasyon</FooterLink>
              </FooterSection>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 md:flex-row" style={{ borderColor: 'var(--fun-stroke-1)' }}>
          <p className="text-sm fun-text-muted">© 2025 Fun Teknoloji. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="https://status.funteknoloji.com" target="_blank" rel="noopener noreferrer" className="text-sm fun-text-muted hover:fun-text transition-colors">Sistem Durumu</a>
            <a href="#" className="text-sm fun-text-muted hover:fun-text transition-colors">Gizlilik Politikası</a>
            <a href="#" className="text-sm fun-text-muted hover:fun-text transition-colors">Şartlar ve Koşullar</a>
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
  const className = "text-sm fun-text-muted hover:fun-text transition-colors";
  if (to) return <li><Link to={to} className={className}>{children}</Link></li>;
  return <li><a href={href || "#"} className={className}>{children}</a></li>;
}
