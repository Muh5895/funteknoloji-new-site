import { Link } from "@tanstack/react-router";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-full max-w-[1290px] -translate-x-1/2 px-4">
      <div className="mx-auto flex items-center justify-between rounded-full bg-[var(--fun-card)]/90 px-4 py-2.5 shadow-lg backdrop-blur-[25px] border border-[var(--fun-stroke-1)] xl:py-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--fun-text)]">
            <span className="text-lg font-bold" style={{ color: 'var(--color-background)' }}>F</span>
          </div>
          <span className="hidden text-lg font-semibold sm:block fun-text">Fun Teknoloji</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("company")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-3 text-sm fun-text-muted transition-all hover:fun-text">
              Şirket
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "company" && (
              <div className="absolute left-1/2 top-full z-50 mt-1 w-[320px] -translate-x-1/2 rounded-2xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] p-3 shadow-xl">
                <DropdownItem to="/about" title="Hakkımızda" desc="Bizi daha yakından tanıyın." />
                <DropdownItem to="/team" title="Ekibimiz" desc="Dinamik ekibimizi keşfedin." />
                <DropdownItem href="#" title="Kariyer" desc="Ekibimize katılın." />
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("platform")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-3 text-sm fun-text-muted transition-all hover:fun-text">
              Platform
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "platform" && (
              <div className="absolute left-1/2 top-full z-50 mt-1 w-[320px] -translate-x-1/2 rounded-2xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] p-3 shadow-xl">
                <DropdownItem href="#" title="Özellikler" desc="Güçlü özelliklerimizi keşfedin." />
                <DropdownItem href="#" title="Süreç ve İş Akışı" desc="Nasıl çalıştığımızı görün." />
                <DropdownItem href="#" title="Güvenlik" desc="Güvenlik standartlarımız." />
                <DropdownItem href="#" title="Entegrasyonlar" desc="Tüm entegrasyonlar." />
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("resources")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-3 text-sm fun-text-muted transition-all hover:fun-text">
              Kaynaklar
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "resources" && (
              <div className="absolute left-1/2 top-full z-50 mt-1 w-[280px] -translate-x-1/2 rounded-2xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] p-3 shadow-xl">
                <DropdownItem to="/blog" title="Blog" desc="En son yazılarımız." />
                <DropdownItem href="#" title="SSS" desc="Sık sorulan sorular." />
                <DropdownItem href="#" title="Destek" desc="Yardım merkezi." />
                <DropdownItem to="/contact" title="İletişim" desc="Bizimle iletişime geçin." />
              </div>
            )}
          </div>

          <Link to="/pricing" className="rounded-full px-4 py-3 text-sm fun-text-muted transition-all hover:fun-text">
            Fiyatlandırma
          </Link>
          <Link to="/services" className="rounded-full px-4 py-3 text-sm fun-text-muted transition-all hover:fun-text">
            Hizmetler
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <a href="#" className="text-sm font-medium fun-text-muted transition-all hover:fun-text">
            Giriş Yap
          </a>
          <Link to="/contact" className="btn-fun btn-fun-dark !py-2.5 !px-5 !text-sm">
            Başlayın
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="h-6 w-6 fun-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mt-2 rounded-2xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] p-5 shadow-xl xl:hidden">
          <nav className="space-y-1">
            <Link to="/about" className="block rounded-lg px-4 py-3 fun-text-muted hover:fun-surface" onClick={() => setMobileOpen(false)}>Hakkımızda</Link>
            <Link to="/team" className="block rounded-lg px-4 py-3 fun-text-muted hover:fun-surface" onClick={() => setMobileOpen(false)}>Ekibimiz</Link>
            <Link to="/services" className="block rounded-lg px-4 py-3 fun-text-muted hover:fun-surface" onClick={() => setMobileOpen(false)}>Hizmetler</Link>
            <Link to="/pricing" className="block rounded-lg px-4 py-3 fun-text-muted hover:fun-surface" onClick={() => setMobileOpen(false)}>Fiyatlandırma</Link>
            <Link to="/blog" className="block rounded-lg px-4 py-3 fun-text-muted hover:fun-surface" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link to="/contact" className="block rounded-lg px-4 py-3 fun-text-muted hover:fun-surface" onClick={() => setMobileOpen(false)}>İletişim</Link>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a href="#" className="text-center text-sm font-medium fun-text-muted">Giriş Yap</a>
            <Link to="/contact" className="btn-fun btn-fun-dark w-full text-center" onClick={() => setMobileOpen(false)}>Başlayın</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownItem({ to, href, title, desc }: { to?: string; href?: string; title: string; desc: string }) {
  const className = "group relative flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[var(--fun-surface)]";
  const content = (
    <>
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--fun-stroke-1)]">
        <svg className="h-4 w-4 fun-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-normal fun-text">{title}</p>
        <p className="text-xs fun-text-muted">{desc}</p>
      </div>
    </>
  );

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }
  return <a href={href || "#"} className={className}>{content}</a>;
}
