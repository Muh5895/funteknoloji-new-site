import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useState, useEffect, useRef, useTransition } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { translateText } from "../lib/translate";
import { Search, Copy, Volume2, VolumeX, Share2, AlertTriangle, BookOpen } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [{ title: "Dokümantasyon - Fun Teknoloji" }],
  }),
  component: DocsPage,
});

// The master documentation articles defined strictly in Turkish as the single source of truth (as requested by user)
const MASTER_ARTICLES = {
  intro: {
    title: "Fun Teknoloji'ye Giriş",
    category: "BAŞLANGIÇ",
    categoryKey: "getting_started",
    content: `Fun Teknoloji, yapay zeka, güvenlik ve toplumsal fayda odaklı geleceğin akıllı sistemlerini inşa eden bağımsız bir inovasyon ve teknoloji şirketidir.

### Bağımsız Teknoloji Vizyonu
Klasik yazılım şirketlerinin veya fason ajansların aksine, biz dışarıya özel yazılım veya başkaları için sipariş üzerine fason projeler geliştirmiyoruz. Tüm Ar-Ge gücümüzü, tescilli algoritmalarımızı ve mühendislik birikimimizi yalnızca kendi ekosistemimizi mükemmelleştirmeye harcıyoruz.

### Ürün ve Hizmet Ekosistemimiz
- **Nexy:** Gelişmiş yapay zeka asistanı ve akıllı veritabanı sorgu motoru.
- **QuakeSafe:** IoT destekli afet koordinasyonu ve erken uyarı hayat kurtarma platformu.
- **FunID:** Tüm sistemlerimizi birbirine bağlayan güvenli ve tescilli birleşik kimlik doğrulama portalı.`
  },
  funid: {
    title: "FunID Hesap Kurulumu",
    category: "BAŞLANGIÇ",
    categoryKey: "getting_started",
    content: `FunID, Fun Teknoloji ekosistemindeki tüm uygulamalara tek bir güvenli hesaptan erişmenizi sağlayan tescilli birleşik kimlik doğrulama sistemidir.

### Gelişmiş Güvenlik Ayarları
Hesabınızın güvenliğini en üst düzeye çıkarmak için iki adımlı doğrulamayı (2FA) aktif edebilir, giriş uyarı bildirimlerini açabilir veya yabancı IP ve VPN engelleme kurallarını etkinleştirebilirsiniz.

### Adım Adım Hesap Kurulumu
1. Sağ üstteki profil ikonuna tıklayarak profil sayfanıza gidin.
2. "Güvenlik Ayarları" sekmesini açın.
3. İki Adımlı Doğrulama (2FA) butonunu aktif hale getirin ve kimlik doğrulama uygulamanızla (Authenticator) QR kodu taratın.
4. Dilerseniz VPN engelleme ve yabancı ülke IP kısıtlamalarını etkinleştirerek tam koruma sağlayın.`
  },
  nexy_intro: {
    title: "Nexy Nedir ve Nasıl Çalışır?",
    category: "NEXY YAPAY ZEKA",
    categoryKey: "nexy_ai",
    content: `Nexy, Fun Teknoloji tarafından sıfırdan geliştirilen, 12'den fazla dilde akıcı iletişim kurabilen ve veritabanı sorguları yapabilen akıllı yapay zeka asistanınızdır.

### Doğal Dil Entegrasyonu
Nexy sadece sohbet etmekle kalmaz; yetkilendirilmiş kullanıcıların hesap dondurma veya aktif oturumları inceleme isteklerini saniyeler içinde veritabanı üzerinden doğrular.

### Çalışma Prensibi ve Akış
- **Sorgu Algılama:** Gönderdiğiniz mesajda veritabanı erişimi gerektiren bir durum tespit edilirse, Nexy otomatik bir sorgu tetikler.
- **Güvenli Sorgulama:** Sorgu tetiklendiğinde Supabase altyapısı güvenli kimlik doğrulaması gerçekleştirerek doğrulanmış verileri getirir.
- **Doğrulama ve Cevap:** Veritabanından gelen doğrulanmış veriler Nexy'nin bağlamına aktarılır ve Nexy size en doğru cevabı üretir.`
  },
  nexy_engine: {
    title: "Akıllı Sorgu Komutları",
    category: "NEXY YAPAY ZEKA",
    categoryKey: "nexy_ai",
    content: `Nexy asistanı ve Canlı Destek arayüzü ile sohbet ederken, sistemi tetikleyen akıllı komut kelimeleri ve veritabanı entegrasyonu mevcuttur.

### Örnek Sorgu Şablonları
Herhangi bir kod yazmadan veya ayar aramadan, doğrudan doğal dil kullanarak şu bilgileri sorgulayabilirsiniz:

- *"Hizmetler aktif mi?"* veya *"Hangi hizmet bakımda?"* (Sistem durum tablosundan real-time verileri listeler)
- *"Hesabımın durumu nedir?"* veya *"Aktif oturumlarımı göster"* (Profil ve aktif oturum listesini getirir)
- *"QuakeSafe medikal profilimi göster"* (Acil durum kart bilgilerinizi listeler)`
  },
  quakesafe_intro: {
    title: "QuakeSafe Nedir?",
    category: "QUAKESAFE",
    categoryKey: "quakesafe",
    content: `QuakeSafe, Fun Teknoloji tarafından geliştirilen, yapay zeka ve IoT sensör ağlarını kullanarak deprem anında erken uyarı veren, afet sonrası koordinasyon ve medikal durum yönetimini sağlayan devrim niteliğinde bir platformdur.

### Platform Özellikleri
- **Erken Uyarı Sensörleri:** Depremin yıkıcı dalgaları ulaşmadan önce saniyeler kazandıran mikro-vibrasyon bildirimleri.
- **Medikal Profil Entegrasyonu:** Afet anında acil ekiplerin bilmesi gereken kan grubu, alerji ve acil durum kişilerinizin bir arada tutulduğu tescilli medikal kart.
- **İletişim ve Güvenlik:** GSM hatları koptuğunda dahi koordinasyon sağlayan yedekli ağ protokolleri.`
  },
  quakesafe_card: {
    title: "Medikal Güvenlik Kartı",
    category: "QUAKESAFE",
    categoryKey: "quakesafe",
    content: `Afet anında ilk müdahale ekiplerinin kan grubunuzu ve acil durum yakınlarınızın numaralarını saniyeler içinde görmesi kritik önem taşır.

### Kart Oluşturma ve Görünürlük
QuakeSafe medikal güvenlik kartınızı oluşturduktan sonra, görünürlüğünü "Herkese Açık" (Public) veya "Gizli" (Private) yapabilirsiniz. Herkese açık yapıldığında, acil durum ekipleri kartınızı NFC veya özel QR tarama ile hızlıca görebilir.

### Adım Adım Medikal Profil Kurulumu
1. Profil sayfanıza gidin ve "QuakeSafe Profili" bölümünü açın.
2. Kan grubunuzu, alerjilerinizi ve en az bir acil durum yakın kişinin telefon numarasını girin.
3. "Kaydet" butonuna basın.
4. "Kart Görünürlüğü" seçeneğini dilediğiniz gibi ayarlayın (Public yapılması acil durumlarda ilk müdahale ekiplerinin işini kolaylaştırır).`
  }
};

type ArticleKey = keyof typeof MASTER_ARTICLES;

// Localized translation warning dictionary for all 11 supported languages
const WARNING_DICT: Record<string, string> = {
  tr: "Bu dokümantasyon yapay zeka ile otomatik olarak çevrilmiştir. Bazı terimler hatalı çevrilmiş olabilir.",
  en: "This documentation has been automatically translated by AI. Some terms may be mistranslated.",
  az: "Bu sənədlər süni intellekt tərəfindən avtomatik tərcümə edilmişdir. Bəzi terminlər səhv tərcümə oluna bilər.",
  de: "Diese Dokumentation wurde automatisch von KI übersetzt. Einige Begriffe sind möglicherweise falsch übersetzt.",
  fr: "Cette documentation a été traduite automatiquement par l'IA. Certains termes peuvent être mal traduits.",
  es: "Esta documentación ha sido traducida automáticamente por IA. Algunos términos pueden estar mal traducidos.",
  ru: "Эта документация была автоматически переведена ИИ. Некоторые термины могут быть переведены неправильно.",
  ar: "تمت ترجمة هذه المستندات تلقائيًا بواسطة الذكاء الاصطناعي. قد يتم ترجمة بعض المصطلحات بشكل غير صحيح.",
  it: "Questa documentazione è stata tradotta automaticamente dall'IA. Alcuni termini potrebbero essere tradotti in modo errato.",
  pt: "Esta documentação foi traduzida automaticamente por IA. Alguns termos podem estar incorretamente traduzidos.",
  ja: "このドキュメントは AI によって自動的に翻訳されています。一部の用語が誤って翻訳されている可能性があります。",
  zh: "本文件由人工智能自动翻译。某些术语可能会被错误翻译。"
};

const parseInlineMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx} className="bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] px-2 py-0.5 rounded font-mono text-xs text-[var(--fun-purple)]">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

const renderMarkdownContent = (text: string) => {
  if (!text) return null;
  const lines = text.split("\n");

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-xl font-bold mt-8 mb-3 text-foreground">
          {parseInlineMarkdown(trimmed.substring(4))}
        </h3>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-2xl font-bold mt-10 mb-4 text-foreground border-b border-[var(--fun-stroke-1)] pb-2">
          {parseInlineMarkdown(trimmed.substring(3))}
        </h2>
      );
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <li key={idx} className="list-disc pl-2 ml-6 mb-2 text-muted-foreground text-sm leading-relaxed">
          {parseInlineMarkdown(trimmed.substring(2))}
        </li>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s/, "");
      return (
        <li key={idx} className="list-decimal pl-2 ml-6 mb-2 text-muted-foreground text-sm leading-relaxed">
          {parseInlineMarkdown(content)}
        </li>
      );
    }

    if (trimmed === "") {
      return <div key={idx} className="h-3" />;
    }

    return (
      <p key={idx} className="mb-4 text-sm text-muted-foreground leading-relaxed">
        {parseInlineMarkdown(line)}
      </p>
    );
  });
};

function DocsPage() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<ArticleKey>("intro");
  const [searchQuery, setSearchQuery] = useState("");

  // Translation state
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const [isPending, startTransition] = useTransition();

  // TTS (Text-to-Speech) state
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Dynamic on-the-fly translation triggered when language or selected tab changes (no hardcoded translations)
  useEffect(() => {
    const translateDoc = async () => {
      const article = MASTER_ARTICLES[activeTab];
      if (lang === "tr") {
        setTranslatedTitle(article.title);
        setTranslatedContent(article.content);
        return;
      }

      startTransition(async () => {
        try {
          const tTitle = await translateText({ text: article.title, targetLang: lang });
          const tContent = await translateText({ text: article.content, targetLang: lang });
          setTranslatedTitle(tTitle);
          setTranslatedContent(tContent);
        } catch (e) {
          console.error("Translation failed, using Turkish fallback:", e);
          setTranslatedTitle(article.title);
          setTranslatedContent(article.content);
        }
      });
    };

    translateDoc();

    // Stop speaking if reading when switching tabs or language
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  }, [activeTab, lang]);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Text-To-Speech (Dinle) function
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const ttsText = `${translatedTitle}. ${translatedContent.replace(/[#*`_-]/g, "")}`;
    const utterance = new SpeechSynthesisUtterance(ttsText);

    const localeMap: Record<string, string> = {
      tr: "tr-TR",
      en: "en-US",
      de: "de-DE",
      fr: "fr-FR",
      es: "es-ES",
      ru: "ru-RU",
      it: "it-IT",
      pt: "pt-PT",
      ja: "ja-JP",
      zh: "zh-CN",
      az: "tr-TR"
    };
    utterance.lang = localeMap[lang] || "en-US";

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    utteranceRef.current = utterance;
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  // Copy article text (Kopyala) function
  const handleCopy = () => {
    const copyText = `${translatedTitle}\n\n${translatedContent}`;
    navigator.clipboard.writeText(copyText).then(() => {
      toast.success(lang === "tr" ? "Metin kopyalandı!" : "Text copied to clipboard!");
    });
  };

  // Share (Paylaş) function
  const handleShare = () => {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/docs?tab=${activeTab}` : "";
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success(lang === "tr" ? "Dokümantasyon linki kopyalandı!" : "Documentation link copied!");
    });
  };

  const menu = [
    {
      category: lang === "tr" ? "BAŞLANGIÇ" : "GETTING STARTED",
      categoryKey: "getting_started",
      items: [
        { id: "intro", label: lang === "tr" ? "Giriş" : "Introduction" },
        { id: "funid", label: lang === "tr" ? "FunID Hesap Kurulumu" : "FunID Account Setup" }
      ]
    },
    {
      category: lang === "tr" ? "NEXY YAPAY ZEKA" : "NEXY AI",
      categoryKey: "nexy_ai",
      items: [
        { id: "nexy_intro", label: lang === "tr" ? "Nexy Nedir?" : "What is Nexy?" },
        { id: "nexy_engine", label: lang === "tr" ? "Akıllı Sorgu Motoru" : "Intelligent Query" }
      ]
    },
    {
      category: lang === "tr" ? "QUAKESAFE" : "QUAKESAFE",
      categoryKey: "quakesafe",
      items: [
        { id: "quakesafe_intro", label: lang === "tr" ? "QuakeSafe Nedir?" : "What is QuakeSafe?" },
        { id: "quakesafe_card", label: lang === "tr" ? "Medikal Güvenlik Kartı" : "Medical Safety Card" }
      ]
    }
  ];

  // Perform search across both Title and Content of ALL master Turkish articles (with fallback-insensitive search matching)
  const filteredMenu = menu.map(cat => {
    const filteredItems = cat.items.filter(item => {
      const masterArt = MASTER_ARTICLES[item.id as ArticleKey];
      const matchSearch = masterArt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          masterArt.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
    return { ...cat, items: filteredItems };
  }).filter(cat => cat.items.length > 0);

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 min-h-[calc(100vh-200px)] flex flex-col bg-background">
      <div className="max-w-[1290px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 flex-1 w-full">
        {/* Left Sidebar Pane with Dynamic Search */}
        <ScrollReveal className="lg:col-span-1">
          <aside className="space-y-6 sticky top-36">
            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                placeholder={lang === "tr" ? "Dokümanlarda ara..." : "Search documentation..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/10 transition-all fun-text animate-none"
              />
              <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Sidebar Navigation Menu */}
            {filteredMenu.length > 0 ? (
              filteredMenu.map((cat, i) => (
                <div key={i}>
                  <h3 className="font-bold fun-text mb-4 uppercase tracking-widest text-[10px] opacity-50">
                    {cat.category}
                  </h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id as any)}
                          className={`w-full text-left pl-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                            activeTab === item.id
                              ? "border-l-2 border-[var(--fun-purple)] fun-text bg-[var(--fun-surface)]/50"
                              : "fun-text-muted hover:fun-text hover:bg-[var(--fun-surface)]/20 border-l-2 border-transparent"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-muted-foreground">
                {lang === "tr" ? "Sonuç bulunamadı." : "No documents found."}
              </div>
            )}
          </aside>
        </ScrollReveal>

        {/* Right Pane Content Display */}
        <div className="lg:col-span-3">
          <div className="prose dark:prose-invert max-w-none fun-text bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-[32px] p-6 sm:p-10 relative overflow-hidden shadow-sm">
            {/* Translation warning alert (Turkish is master source of truth, warns for other languages) */}
            {lang !== "tr" && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 animate-in fade-in duration-300">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span className="text-xs font-semibold leading-relaxed">
                  {WARNING_DICT[lang] || WARNING_DICT["en"]}
                </span>
              </div>
            )}

            {/* Actions Bar (Kopyala, Dinle, Paylaş) */}
            <div className="flex items-center justify-between gap-4 border-b border-[var(--fun-stroke-1)] pb-6 mb-8">
              <div className="flex items-center gap-2 text-[var(--fun-purple)] font-semibold text-xs uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                <span>{MASTER_ARTICLES[activeTab].category}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* TTS (Dinle) Button */}
                <button
                  onClick={handleReadAloud}
                  className={`h-9 w-9 rounded-xl border border-[var(--fun-stroke-1)] flex items-center justify-center transition-all cursor-pointer ${isReading ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-[var(--fun-surface)] hover:bg-[var(--fun-stroke-2)] text-foreground"}`}
                  title={lang === "tr" ? "Dinle" : "Listen"}
                >
                  {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="h-9 w-9 rounded-xl border border-[var(--fun-stroke-1)] bg-[var(--fun-surface)] hover:bg-[var(--fun-stroke-2)] text-foreground flex items-center justify-center transition-all cursor-pointer"
                  title={lang === "tr" ? "Kopyala" : "Copy"}
                >
                  <Copy className="h-4 w-4" />
                </button>
                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="h-9 w-9 rounded-xl border border-[var(--fun-stroke-1)] bg-[var(--fun-surface)] hover:bg-[var(--fun-stroke-2)] text-foreground flex items-center justify-center transition-all cursor-pointer"
                  title={lang === "tr" ? "Paylaş" : "Share"}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ScrollReveal key={activeTab + "_" + lang}>
              {/* Pulse Skeleton Loading Effect (Exactly matching blog style content loading state) */}
              {isPending ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="h-10 bg-[var(--fun-surface)] rounded-2xl w-3/4 animate-pulse mb-8" />
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-5 bg-[var(--fun-surface)] rounded-full animate-pulse ${
                        idx % 3 === 0 ? "w-full" : idx % 3 === 1 ? "w-5/6" : "w-2/3"
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
                    {translatedTitle}
                  </h1>
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap selection:bg-[var(--fun-purple)] selection:text-white">
                    {renderMarkdownContent(translatedContent)}
                  </div>
                </>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
