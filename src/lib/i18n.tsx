import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en" | "de" | "fr" | "es";

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
  "home.testimonials.title": "Kullanıcı hikayeleri: İnsanların neden Fun Teknoloji'yi sevdiğini keşfedin!",
  "home.testimonials.t1.name": "Darrell Steward",
  "home.testimonials.t1.text": "Küçük bir işletme sahibi olarak, hizmetiniz nakit akışını yönetmede ve finansal stratejileri optimize etmede hayat kurtarıcı oldu. Beklentilerimi gerçekten aştı.",
  "home.testimonials.t2.name": "Sarah Johnson",
  "home.testimonials.t2.text": "Ses kopyalama özelliği kesinlikle inanılmaz! İçeriğim için saatler yerine dakikalar içinde profesyonel seslendirmeler oluşturabildim.",
  "home.testimonials.t3.name": "Michael Chen",
  "home.testimonials.t3.text": "Bu teknoloji podcast üretimimizde devrim yarattı. Kalite o kadar gerçekçi ki, dinleyicilerimiz orijinal kayıtlarımızdan farkı anlayamıyor.",
  "home.testimonials.t4.name": "Emma Rodriguez",
  "home.testimonials.t4.text": "Bir dil öğretmeni olarak bu araç, birden fazla dilde telaffuz örnekleri oluşturmak için paha biçilemez oldu. Öğrencilerim doğal sesli sesleri seviyor!",
  "home.testimonials.t5.name": "David Kim",
  "home.testimonials.t5.text": "Ses üretiminin doğruluğu ve hızı akıllara durgunluk verici. Olağanüstü kalite standartlarını korurken ses üretim süremizi %80 azalttık.",
  "home.testimonials.t6.name": "Lisa Thompson",
  "home.testimonials.t6.text": "Bu platform sesli kitap oluşturma şeklimizi dönüştürdü. Ses sentezi o kadar doğal ve etkileyici ki, dinleyicilerimiz tüm deneyim boyunca tamamen bağlı kalıyor.",
  "home.faq.title": "Sıkça Sorulan Sorular",
  "home.faq.subtitle": "Sorularınız mı var? Yardımcı olmak için buradayız!",
  "home.faq.q1": "Fun Teknoloji nedir?",
  "home.faq.a1": "Fun Teknoloji, yapay zeka ve modern teknolojileri kullanarak işletmelere ve bireylere değer katan yenilikçi çözümler sunan bir teknoloji şirketidir.",
  "home.faq.q2": "Fun Teknoloji'yi kullanmak için ne yapmam gerekiyor?",
  "home.faq.a2": "Platformumuza kayıt olarak hemen kullanmaya başlayabilirsiniz. Detaylı bilgi için iletişim sayfamızdan bize ulaşabilirsiniz.",
  "home.faq.q3": "Fun Teknoloji hangi hizmetleri sunacak?",
  "home.faq.a3": "Yapay zeka çözümleri, web ve mobil uygulama geliştirme, bulut altyapı, veri analitiği, siber güvenlik ve dijital pazarlama hizmetleri sunmaktayız.",
  "home.faq.q4": "Verilerim güvende mi?",
  "home.faq.a4": "Evet, gelişmiş şifreleme ve güvenlik protokolleri ile tüm verileriniz en yüksek güvenlik standartlarında korunmaktadır.",
  "home.faq.q5": "Platform ücretsiz mi?",
  "home.faq.a5": "Temel özellikler ücretsizdir. Gelişmiş özellikler için uygun fiyatlı planlarımızı inceleyebilirsiniz.",
  "home.faq.q6": "Hangi cihazlardan erişebilirim?",
  "home.faq.a6": "Web tarayıcısı olan tüm cihazlardan (bilgisayar, tablet, telefon) platformumuza erişebilirsiniz.",
  "home.faq.q7": "Nasıl iletişime geçebilirim?",
  "home.faq.a7": "İletişim sayfamızdaki formu doldurarak, e-posta veya sosyal medya hesaplarımız üzerinden bize ulaşabilirsiniz.",
  "help.title": "Yardım Merkezi",
  "help.button": "Yardım",
  "help.popup": "Size nasıl yardımcı olabiliriz?",
  "blog.warning": "Bu içerik otomatik olarak çevrilmiştir.",
  "blog.read_more": "Devamını oku",
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
  "home.testimonials.title": "User Stories: Discover Why People Love Fun Teknoloji!",
  "home.testimonials.t1.name": "Darrell Steward",
  "home.testimonials.t1.text": "As a small business owner, your service has been a lifesaver in managing cash flow and optimizing financial strategies. It truly exceeded my expectations.",
  "home.testimonials.t2.name": "Sarah Johnson",
  "home.testimonials.t2.text": "The voice cloning feature is absolutely incredible! I was able to create professional voiceovers in minutes instead of hours for my content.",
  "home.testimonials.t3.name": "Michael Chen",
  "home.testimonials.t3.text": "This technology has revolutionized our podcast production. The quality is so realistic that our listeners cannot tell the difference from our original recordings.",
  "home.testimonials.t4.name": "Emma Rodriguez",
  "home.testimonials.t4.text": "As a language teacher, this tool has been invaluable for creating pronunciation examples in multiple languages. My students love the natural-sounding voices!",
  "home.testimonials.t5.name": "David Kim",
  "home.testimonials.t5.text": "The accuracy and speed of voice production are mind-blowing. We reduced our voice production time by 80% while maintaining exceptional quality standards.",
  "home.testimonials.t6.name": "Lisa Thompson",
  "home.testimonials.t6.text": "This platform has transformed the way we create audiobooks. The voice synthesis is so natural and engaging that our listeners stay fully connected throughout the entire experience.",
  "home.faq.title": "Frequently Asked Questions",
  "home.faq.subtitle": "Have questions? We're here to help!",
  "home.faq.q1": "What is Fun Teknoloji?",
  "home.faq.a1": "Fun Teknoloji is a technology company that offers innovative solutions that add value to businesses and individuals using artificial intelligence and modern technologies.",
  "home.faq.q2": "What do I need to do to use Fun Teknoloji?",
  "home.faq.a2": "You can start using it immediately by registering on our platform. You can contact us via our contact page for detailed information.",
  "home.faq.q3": "What services will Fun Teknoloji offer?",
  "home.faq.a3": "We provide AI solutions, web and mobile application development, cloud infrastructure, data analytics, cybersecurity, and digital marketing services.",
  "home.faq.q4": "Is my data safe?",
  "home.faq.a4": "Yes, all your data is protected at the highest security standards with advanced encryption and security protocols.",
  "home.faq.q5": "Is the platform free?",
  "home.faq.a5": "Basic features are free. You can check our affordable plans for advanced features.",
  "home.faq.q6": "From which devices can I access it?",
  "home.faq.a6": "You can access our platform from all devices with a web browser (computer, tablet, phone).",
  "home.faq.q7": "How can I contact you?",
  "home.faq.a7": "You can reach us by filling out the form on our contact page, via e-mail or our social media accounts.",
  "help.title": "Help Center",
  "help.button": "Help",
  "help.popup": "How can we help you?",
  "blog.warning": "This content has been automatically translated.",
  "blog.read_more": "Read more",
};

const de: Dict = {
  ...en,
  "nav.company": "Unternehmen",
  "nav.platform": "Plattform",
  "nav.resources": "Ressourcen",
  "nav.pricing": "Preise",
  "nav.services": "Dienstleistungen",
  "nav.sitemap": "Sitemap",
  "nav.cta": "Loslegen",
  "nav.about": "Über uns",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.contact": "Kontakt",
  "help.title": "Hilfezentrum",
  "help.button": "Hilfe",
  "help.popup": "Wie können wir Ihnen helfen?",
  "blog.warning": "Dieser Inhalt wurde automatisch übersetzt.",
  "blog.read_more": "Weiterlesen",
};

const fr: Dict = {
  ...en,
  "nav.company": "Entreprise",
  "nav.platform": "Plateforme",
  "nav.resources": "Ressources",
  "nav.pricing": "Tarification",
  "nav.services": "Services",
  "nav.sitemap": "Plan du site",
  "nav.cta": "Commencer",
  "nav.about": "À propos",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "help.title": "Centre d'aide",
  "help.button": "Aide",
  "help.popup": "Comment pouvons-nous vous aider?",
  "blog.warning": "Ce contenu a été traduit automatiquement.",
  "blog.read_more": "Lire la suite",
};

const es: Dict = {
  ...en,
  "nav.company": "Empresa",
  "nav.platform": "Plataforma",
  "nav.resources": "Recursos",
  "nav.pricing": "Precios",
  "nav.services": "Servicios",
  "nav.sitemap": "Mapa del sitio",
  "nav.cta": "Empezar",
  "nav.about": "Sobre nosotros",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.contact": "Contacto",
  "help.title": "Centro de ayuda",
  "help.button": "Ayuda",
  "help.popup": "¿Cómo podemos ayudarte?",
  "blog.warning": "Este contenido ha sido traducido automáticamente.",
  "blog.read_more": "Leer más",
};

const dicts: Record<Lang, Dict> = { tr, en, de, fr, es };

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
    if (dicts[stored as Lang]) setLangState(stored as Lang);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.en[key] ?? dicts.tr[key] ?? key;

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
