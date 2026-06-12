import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en";

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
  "theme.light": "Açık temaya geç",
  "theme.dark": "Koyu temaya geç",
  "lang.label": "Dil seç",
  "intro.skip": "Atla",
  "home.hero.badge": "Türkiye'nin Yenilikçi Teknoloji Şirketi",
  "home.hero.title": "Geleceğin Teknolojileri Bugün Bizimle",
  "home.hero.desc": "Yapay zeka, yazılım geliştirme ve akıllı sistemler alanında öncü çözümlerle işinizi dijital dönüşümün merkezine taşıyoruz.",
  "home.hero.explore": "Keşfet",
  "home.hero.start": "Başlayın",
  "home.whatwedo.text": "İşletmelerin etkileşimi artırmak, dönüşümleri yükseltmek ve büyümede yeni zirvelere ulaşmak için yapay zeka destekli çözümlerden yararlanmalarına yardımcı oluyoruz.",
  "home.features.badge": "Özellikler",
  "home.features.title": "Güçlü Özelliklerle Daha Akıllıca Çalışın",
  "home.features.desc": "Fun Teknoloji ile işlerinizi daha hızlı, güvenli ve verimli yönetin. Modern çözümlerimiz her platformda sorunsuz çalışır.",
  "home.features.card1.title": "Geleceğe Hazır Çözümler",
  "home.features.card1.desc": "İşlerinizi hızlandıran ve verimliliği artıran yapay zeka ve otomasyon teknolojileri.",
  "home.features.card2.title": "Web'den Mobil'e Sorunsuz Deneyim",
  "home.features.card2.desc": "Modern web ve mobil uygulamalarla her cihazda kusursuz performans.",
  "home.features.card3.title": "Verileriniz Bizimle Güvende",
  "home.features.card3.desc": "Gelişmiş güvenlik önlemleriyle tüm iş süreçlerinizi güvenle yönetin.",
  "home.howitworks.badge": "Nasıl Çalışır",
  "home.howitworks.title": "Fun Teknoloji ile Dijital Dönüşüm",
  "home.howitworks.desc": "Güçlü teknolojik altyapımız ile işinizi geleceğe hazırlıyoruz.",
  "home.howitworks.step1.title": "Stratejik Analiz",
  "home.howitworks.step1.desc": "İhtiyaçlarınızı analiz ediyor ve en uygun teknolojik çözümleri belirliyoruz.",
  "home.howitworks.step2.title": "Gelişmiş Geliştirme",
  "home.howitworks.step2.desc": "Modern teknolojiler kullanarak yüksek performanslı ve ölçeklenebilir sistemler inşa ediyoruz.",
  "home.howitworks.step3.title": "Hızlı Entegrasyon",
  "home.howitworks.step3.desc": "Çözümlerimizi iş süreçlerinize sorunsuz ve hızlı bir şekilde entegre ediyoruz.",
  "home.services.badge": "Hizmetlerimiz",
  "home.services.title": "Dünya genelindeki lider şirketler Fun Teknoloji'ye güveniyor.",
  "home.services.desc": "İşinizi büyütmek ve dijital dünyada öne çıkmak için sunduğumuz profesyonel çözümleri keşfedin.",
  "home.cta.title": "Bugün kullanmaya başlayın.",
  "home.cta.desc": "Herhangi bir sorunuz veya yardıma ihtiyacınız olursa destek ekibimizle iletişime geçin.",
  "home.cta.button": "İletişime Geçin",
  "home.cta.more": "Daha Fazla Bilgi",
  "team.badge": "Ekibimiz",
  "team.title": "Arkamızdaki güç",
  "team.desc": "Tutkulu ve yetenekli ekibimizle geleceğin teknolojilerini bugünden inşa ediyoruz.",
  "team.join.title": "Ekibimize katılın",
  "team.join.desc": "Yetenekli profesyonelleri arıyoruz. Kariyer fırsatları için bize ulaşın.",
  "blog.badge": "Blog",
  "blog.title": "Teknoloji Dünyasından",
  "blog.desc": "En son teknoloji haberleri, içgörüler ve rehberler.",
  "blog.empty": "Yakında yeni içeriklerle buradayız.",
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
  "theme.light": "Switch to light",
  "theme.dark": "Switch to dark",
  "lang.label": "Choose language",
  "intro.skip": "Skip",
  "home.hero.badge": "Turkey's Innovative Technology Company",
  "home.hero.title": "Future Technologies With Us Today",
  "home.hero.desc": "We move your business to the center of digital transformation with pioneering solutions in AI, software development, and smart systems.",
  "home.hero.explore": "Explore",
  "home.hero.start": "Get Started",
  "home.whatwedo.text": "We help businesses leverage AI-powered solutions to increase engagement, boost conversions, and reach new heights in growth.",
  "home.features.badge": "Features",
  "home.features.title": "Work Smarter with Powerful Features",
  "home.features.desc": "Manage your business faster, safer, and more efficiently with Fun Teknoloji. Our modern solutions work seamlessly on every platform.",
  "home.features.card1.title": "Future-Ready Solutions",
  "home.features.card1.desc": "AI and automation technologies that speed up your business and increase efficiency.",
  "home.features.card2.title": "Seamless Experience from Web to Mobile",
  "home.features.card2.desc": "Perfect performance on every device with modern web and mobile applications.",
  "home.features.card3.title": "Your Data is Safe with Us",
  "home.features.card3.desc": "Manage all your business processes securely with advanced security measures.",
  "home.howitworks.badge": "How It Works",
  "home.howitworks.title": "Digital Transformation with Fun Teknoloji",
  "home.howitworks.desc": "We prepare your business for the future with our strong technological infrastructure.",
  "home.howitworks.step1.title": "Strategic Analysis",
  "home.howitworks.step1.desc": "We analyze your needs and determine the most appropriate technological solutions.",
  "home.howitworks.step2.title": "Advanced Development",
  "home.howitworks.step2.desc": "We build high-performance and scalable systems using modern technologies.",
  "home.howitworks.step3.title": "Fast Integration",
  "home.howitworks.step3.desc": "We integrate our solutions into your business processes seamlessly and quickly.",
  "home.services.badge": "Our Services",
  "home.services.title": "Leading companies worldwide trust Fun Teknoloji.",
  "home.services.desc": "Explore our professional solutions to grow your business and stand out in the digital world.",
  "home.cta.title": "Start using today.",
  "home.cta.desc": "Contact our support team if you have any questions or need help.",
  "home.cta.button": "Contact Us",
  "home.cta.more": "Learn More",
  "team.badge": "Our Team",
  "team.title": "The power behind us",
  "team.desc": "Building future technologies today with our passionate and talented team.",
  "team.join.title": "Join our team",
  "team.join.desc": "We are looking for talented professionals. Contact us for career opportunities.",
  "blog.badge": "Blog",
  "blog.title": "From the Tech World",
  "blog.desc": "Latest technology news, insights, and guides.",
  "blog.empty": "Coming soon with new content.",
};

const dicts: Record<Lang, Dict> = { tr, en };

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
    if (stored === "tr" || stored === "en") setLangState(stored);
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
