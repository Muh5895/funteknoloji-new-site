import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "../lib/i18n";
const LOGO_DARK = "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024";
const LOGO_LIGHT = "https://framerusercontent.com/images/cOsd9aFSLcyMQvEdo60L3fUo.png?width=1563&height=1563";

export default function Header() {
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20);
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("scroll", update); obs.disconnect(); };
  }, []);

  return (
    <header className={`fixed top-3 left-1/2 z-50 w-full max-w-[1400px] -translate-x-1/2 px-4 transition-all duration-500 ${scrolled ? "top-2" : "top-4"}`}>
      <div
        className="mx-auto flex items-center justify-between rounded-full px-5 py-3 shadow-2xl backdrop-blur-2xl border xl:px-7 xl:py-4 animate-fade-in"
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--fun-card) 92%, transparent)" : "color-mix(in oklab, var(--fun-card) 80%, transparent)",
          borderColor: "var(--fun-stroke-1)",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.03]" aria-label="Fun Teknoloji – Ana sayfa">
          <img
            src={isDark ? LOGO_LIGHT : LOGO_DARK}
            alt="Fun Teknoloji"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <span className="hidden text-lg font-semibold sm:block fun-text">Fun Teknoloji</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Ana navigasyon">
          <Dropdown id="company" label={t("nav.company")} open={openDropdown === "company"} onOpen={setOpenDropdown}>
            <DropdownItem to="/about" title={t("nav.about")} desc="Bizi daha yakından tanıyın." />
            <DropdownItem to="/team" title={t("nav.team")} desc="Dinamik ekibimizi keşfedin." />
            <DropdownItem href="#" title={t("nav.career")} desc="Ekibimize katılın." />
          </Dropdown>

          <Dropdown id="platform" label={t("nav.platform")} open={openDropdown === "platform"} onOpen={setOpenDropdown}>
            <DropdownItem to="/services" title={t("nav.services")} desc="Tüm hizmetlerimiz." />
            <DropdownItem to="/pricing" title={t("nav.pricing")} desc="Fiyat planlarımız." />
            <DropdownItem href="#" title="Güvenlik" desc="Güvenlik standartlarımız." />
          </Dropdown>

          <Dropdown id="resources" label={t("nav.resources")} open={openDropdown === "resources"} onOpen={setOpenDropdown}>
            <DropdownItem to="/blog" title={t("nav.blog")} desc="En son yazılarımız." />
            <DropdownItem href="#" title={t("nav.faq")} desc="Sık sorulan sorular." />
            <DropdownItem to="/contact" title={t("nav.contact")} desc="Bizimle iletişime geçin." />
          </Dropdown>

          <Link to="/pricing" className="rounded-full px-4 py-2.5 text-sm fun-text-muted transition-all hover:fun-text hover:scale-105">
            {t("nav.pricing")}
          </Link>
          <Link to="/sitemap" className="rounded-full px-4 py-2.5 text-sm fun-text-muted transition-all hover:fun-text hover:scale-105">
            {t("nav.sitemap")}
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/contact" className="btn-fun btn-fun-dark !py-2.5 !px-5 !text-sm">
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--fun-stroke-1)" }}
          >
            <svg className="h-5 w-5 fun-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        <div
          className="mt-2 rounded-3xl border p-5 shadow-2xl xl:hidden animate-scale-in origin-top"
          style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
        >
          <nav className="space-y-1" aria-label="Mobil navigasyon">
            <Link to="/about" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.about")}</Link>
            <Link to="/team" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.team")}</Link>
            <Link to="/services" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.services")}</Link>
            <Link to="/pricing" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.pricing")}</Link>
            <Link to="/blog" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.blog")}</Link>
            <Link to="/contact" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.contact")}</Link>
            <Link to="/sitemap" className="block rounded-xl px-4 py-3 fun-text-muted transition-colors hover:bg-[var(--fun-surface)] hover:fun-text" onClick={() => setMobileOpen(false)}>{t("nav.sitemap")}</Link>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/contact" className="btn-fun btn-fun-dark w-full text-center" onClick={() => setMobileOpen(false)}>{t("nav.cta")}</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({ id, label, open, onOpen, children }: { id: string; label: string; open: boolean; onOpen: (id: string | null) => void; children: React.ReactNode }) {
  return (
    <div className="relative" onMouseEnter={() => onOpen(id)} onMouseLeave={() => onOpen(null)}>
      <button type="button" aria-expanded={open} aria-haspopup="menu" className="flex items-center gap-1 rounded-full px-4 py-2.5 text-sm fun-text-muted transition-all hover:fun-text">
        {label}
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
          <div
            role="menu"
            className="w-[320px] rounded-2xl border p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200 origin-top"
            style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ to, href, title, desc }: { to?: string; href?: string; title: string; desc: string }) {
  const className = "group relative flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[var(--fun-surface)]";
  const content = (
    <>
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors group-hover:bg-[var(--fun-text)] group-hover:text-[var(--color-background)]" style={{ borderColor: "var(--fun-stroke-1)" }}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium fun-text">{title}</p>
        <p className="text-xs fun-text-muted">{desc}</p>
      </div>
    </>
  );
  if (to) return <Link to={to} className={className}>{content}</Link>;
  return <a href={href || "#"} className={className}>{content}</a>;
}
