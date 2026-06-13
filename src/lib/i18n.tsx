import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en" | "az";

type Dict = Record<string, string>;

const tr: Dict = {
  "nav.company": "Şirket",
  "nav.platform": "Platform",
  "nav.resources": "Kaynaklar",
  "nav.pricing": "Fiyatlandırma",
  "nav.services": "Hizmetler",
  "nav.sitemap": "Site Haritası",
  "nav.login": "Giriş Yap",
  "nav.cta": "Başlayın",
  "nav.about": "Hakkımızda",
  "nav.team": "Ekibimiz",
  "nav.career": "Kariyer",
  "nav.blog": "Blog",
  "nav.faq": "SSS",
  "nav.support": "Destek",
  "nav.contact": "İletişim",
  "nav.docs": "Dokümantasyon",
  "theme.light": "Açık temaya geç",
  "theme.dark": "Koyu temaya geç",
  "lang.label": "Dil seç",
  "intro.skip": "Atla",
};

const en: Dict = {
  "nav.company": "Company",
  "nav.platform": "Platform",
  "nav.resources": "Resources",
  "nav.pricing": "Pricing",
  "nav.services": "Services",
  "nav.sitemap": "Sitemap",
  "nav.login": "Sign in",
  "nav.cta": "Get started",
  "nav.about": "About",
  "nav.team": "Team",
  "nav.career": "Careers",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.support": "Support",
  "nav.contact": "Contact",
  "nav.docs": "Documentation",
  "theme.light": "Switch to light",
  "theme.dark": "Switch to dark",
  "lang.label": "Choose language",
  "intro.skip": "Skip",
};

const az: Dict = {
  "nav.company": "Şirkət",
  "nav.platform": "Platforma",
  "nav.resources": "Resurslar",
  "nav.pricing": "Qiymətləndirmə",
  "nav.services": "Xidmətlər",
  "nav.sitemap": "Sayt xəritəsi",
  "nav.login": "Daxil ol",
  "nav.cta": "Başlayın",
  "nav.about": "Haqqımızda",
  "nav.team": "Komandamız",
  "nav.career": "Karyera",
  "nav.blog": "Bloq",
  "nav.faq": "SSS",
  "nav.support": "Dəstək",
  "nav.contact": "Əlaqə",
  "nav.docs": "Sənədlər",
  "theme.light": "Açıq mövzu",
  "theme.dark": "Tünd mövzu",
  "lang.label": "Dil seçin",
  "intro.skip": "Keç",
};

const dicts: Record<Lang, Dict> = { tr, en, az };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangCtx = createContext<Ctx>({ lang: "tr", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "tr" || stored === "en" || stored === "az") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.tr[key] ?? key;

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
