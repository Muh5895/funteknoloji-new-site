import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "../lib/i18n";
import {
  Info,
  Users,
  MessageSquareQuote,
  Zap,
  Briefcase,
  Tag,
  PenTool,
  HelpCircle,
  History,
  Palette,
  FileText,
  Mail,
  Map,
  X
} from "lucide-react";

const LOGO_DARK = "https://framerusercontent.com/images/wYtLTUyXkZSH6e5ElqNpfbb4xT4.png?scale-down-to=512&width=1024&height=1024";
const LOGO_LIGHT = "https://framerusercontent.com/images/cOsd9aFSLcyMQvEdo60L3fUo.png?width=1563&height=1563";

export default function Header() {
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

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

  const [logoTimer, setLogoTimer] = useState<number | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    // Increment clicks
    const newCount = logoClicks + 1;

    // Clear existing timer
    if (logoTimer) window.clearTimeout(logoTimer);

    if (newCount >= 10) {
      setShowEasterEgg(true);
      setLogoClicks(0);
      setLogoTimer(null);
    } else {
      setLogoClicks(newCount);
      // Reset count after 2 seconds of inactivity
      const timer = window.setTimeout(() => setLogoClicks(0), 2000);
      setLogoTimer(timer);
    }
  };

  return (
    <header className={`fixed top-3 left-1/2 z-50 w-full max-w-[1400px] -translate-x-1/2 px-4 transition-all duration-500 ${scrolled ? "top-2" : "top-4"}`}>
      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] bg-black">
          <button
            onClick={() => setShowEasterEgg(false)}
            className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <iframe
            src="https://fungame-livid.vercel.app/"
            className="w-full h-full border-none"
            title="Fun Game"
          />
        </div>
      )}
      <div
        className="mx-auto flex items-center justify-between rounded-full px-5 py-3 shadow-2xl backdrop-blur-2xl border xl:px-7 xl:py-4 animate-fade-in"
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--fun-card) 92%, transparent)" : "color-mix(in oklab, var(--fun-card) 80%, transparent)",
          borderColor: "var(--fun-stroke-1)",
        }}
      >
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex cursor-pointer items-center gap-2.5 transition-transform hover:scale-[1.03]"
          aria-label="Fun Teknoloji – Ana sayfa"
        >
          <Link to="/">
            <img
              src={isDark ? "/assets/logos/Fun Teknoloji BGSİZ.png" : "/assets/logos/Fun Teknoloji Logo.png"}
              alt="Fun Teknoloji"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </Link>
          <span className="hidden text-lg font-semibold sm:block fun-text">Fun Teknoloji</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Ana navigasyon">
          <Dropdown id="company" label={t("nav.company")} open={openDropdown === "company"} onOpen={setOpenDropdown}>
            <DropdownItem to="/about" title={t("nav.about")} desc={t("nav.about.desc")} icon={<Info className="h-4 w-4" />} />
            <DropdownItem to="/team" title={t("nav.team")} desc={t("nav.team.desc")} icon={<Users className="h-4 w-4" />} />
            <DropdownItem to="/reviews" title={t("nav.reviews")} desc={t("nav.reviews.desc")} icon={<MessageSquareQuote className="h-4 w-4" />} />
          </Dropdown>

          <Dropdown id="platform" label={t("nav.platform")} open={openDropdown === "platform"} onOpen={setOpenDropdown}>
            <DropdownItem to="/services" title={t("nav.services")} desc={t("nav.services.desc")} icon={<Zap className="h-4 w-4" />} />
            <DropdownItem to="/projects" title={t("nav.projects")} desc={t("nav.projects.desc")} icon={<Briefcase className="h-4 w-4" />} />
            <DropdownItem to="/pricing" title={t("nav.pricing")} desc={t("nav.pricing.desc")} icon={<Tag className="h-4 w-4" />} />
          </Dropdown>

          <Dropdown id="resources" label={t("nav.resources")} open={openDropdown === "resources"} onOpen={setOpenDropdown}>
            <DropdownItem to="/blog" title={t("nav.blog")} desc={t("nav.blog.desc")} icon={<PenTool className="h-4 w-4" />} />
            <DropdownItem to="/faq" title={t("nav.faq")} desc={t("nav.faq.desc")} icon={<HelpCircle className="h-4 w-4" />} />
            <DropdownItem to="/changelog" title={t("nav.changelog")} desc={t("nav.changelog.desc")} icon={<History className="h-4 w-4" />} />
            <DropdownItem to="/brand-kit" title={t("nav.brand_kit")} desc={t("nav.brand_kit.desc")} icon={<Palette className="h-4 w-4" />} />
            <DropdownItem to="/docs" title={t("nav.docs")} desc={t("nav.docs.desc")} icon={<FileText className="h-4 w-4" />} />
            <DropdownItem to="/contact" title={t("nav.contact")} desc={t("nav.contact.desc")} icon={<Mail className="h-4 w-4" />} />
            <DropdownItem to="/sitemap" title={t("nav.sitemap")} desc={t("nav.sitemap.desc")} icon={<Map className="h-4 w-4" />} />
          </Dropdown>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a href="https://waitlist.funteknoloji.com" className="btn-fun btn-fun-dark !py-2.5 !px-5 !text-sm">
            {t("nav.waitlist")}
          </a>
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
          className="mt-2 rounded-3xl border p-5 shadow-2xl xl:hidden animate-scale-in origin-top overflow-y-auto max-h-[80vh]"
          style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
        >
          <nav className="space-y-2" aria-label="Mobil navigasyon">
            <MobileAccordion label={t("nav.company")}>
              <Link to="/about" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.about")}</Link>
              <Link to="/team" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.team")}</Link>
              <Link to="/reviews" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.reviews")}</Link>
            </MobileAccordion>

            <MobileAccordion label={t("nav.platform")}>
              <Link to="/services" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.services")}</Link>
              <Link to="/pricing" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.pricing")}</Link>
            </MobileAccordion>

            <MobileAccordion label={t("nav.resources")}>
              <Link to="/blog" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.blog")}</Link>
              <Link to="/changelog" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.changelog")}</Link>
              <Link to="/brand-kit" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.brand_kit")}</Link>
              <Link to="/contact" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.contact")}</Link>
              <Link to="/sitemap" className="block rounded-xl px-4 py-3 fun-text-muted hover:bg-[var(--fun-surface)]" onClick={() => setMobileOpen(false)}>{t("nav.sitemap")}</Link>
            </MobileAccordion>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a href="https://waitlist.funteknoloji.com" className="btn-fun btn-fun-dark w-full text-center" onClick={() => setMobileOpen(false)}>{t("nav.waitlist")}</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({ id, label, open, onOpen, children }: { id: string; label: string; open: boolean; onOpen: (id: string | null) => void; children: React.ReactNode }) {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    onOpen(id);
  };

  const handleMouseLeave = () => {
    const id = window.setTimeout(() => {
      onOpen(null);
    }, 300);
    setTimeoutId(id);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button type="button" aria-expanded={open} aria-haspopup="menu" className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-sm transition-all ${open ? 'fun-text bg-[var(--fun-surface)]' : 'fun-text-muted hover:fun-text'}`}>
        {label}
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
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

function DropdownItem({ to, href, title, desc, icon }: { to?: string; href?: string; title: string; desc: string; icon?: React.ReactNode }) {
  const className = "group relative flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[var(--fun-surface)]";
  const content = (
    <>
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors group-hover:bg-fun-text group-hover:text-[var(--fun-card)] overflow-hidden" style={{ borderColor: "var(--fun-stroke-1)" }}>
        {icon ? (
          <div className="h-4 w-4 flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        )}
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

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0" style={{ borderColor: 'var(--fun-stroke-1)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 px-4 text-sm font-semibold fun-text"
      >
        {label}
        <svg className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1000px] pb-4" : "max-h-0"}`}>
        <div className="pl-4 space-y-1">{children}</div>
      </div>
    </div>
  );
}
