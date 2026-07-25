import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [{ title: "Dokümantasyon - Fun Teknoloji" }],
  }),
  component: DocsPage,
});

function DocsPage() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<"intro" | "funid" | "nexy_intro" | "nexy_engine" | "quakesafe_intro" | "quakesafe_card">("intro");

  const articles = {
    intro: {
      title: lang === "tr" ? "Fun Teknoloji'ye Giriş" : "Introduction to Fun Technology",
      content: lang === "tr" ? (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Fun Teknoloji, yapay zeka, güvenlik ve toplumsal fayda odaklı geleceğin akıllı sistemlerini inşa eden bağımsız bir inovasyon ve teknoloji şirketidir.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Bağımsız Teknoloji Vizyonu</h2>
          <p className="leading-relaxed mb-6">
            Klasik yazılım şirketlerinin aksine, biz dışarıya özel yazılım veya başkaları için sipariş üzerine fason projeler geliştirmiyoruz. Tüm Ar-Ge gücümüzü, tescilli algoritmalarımızı ve mühendislik birikimimizi kendi ekosistemimizi mükemmelleştirmeye harcıyoruz.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Ürün ve Hizmet Ağımız</h2>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Nexy:</strong> Gelişmiş yapay zeka asistanı ve akıllı sorgu sistemi.</li>
            <li><strong>QuakeSafe:</strong> IoT destekli afet koordinasyon ve erken uyarı platformu.</li>
            <li><strong>FunID:</strong> Tüm Fun Teknoloji sistemlerini birbirine bağlayan güvenli birleşik kimlik doğrulama portalı.</li>
          </ul>
        </>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Fun Technology is an independent innovation and technology company building future smart systems focused on artificial intelligence, security, and social good.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Independent Technology Vision</h2>
          <p className="leading-relaxed mb-6">
            Unlike traditional software agencies, we do not develop custom projects or contract work for third parties. We dedicate 100% of our R&D, proprietary algorithms, and engineering power to perfecting our own product ecosystem.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Our Product Ecosystem</h2>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Nexy:</strong> Next-generation AI assistant and intelligent database engine.</li>
            <li><strong>QuakeSafe:</strong> IoT-powered disaster early warning and safety platform.</li>
            <li><strong>FunID:</strong> Unified secure identity authentication portal linking all services.</li>
          </ul>
        </>
      )
    },
    funid: {
      title: lang === "tr" ? "FunID Hesap Kurulumu" : "FunID Account Setup",
      content: lang === "tr" ? (
        <>
          <p className="text-lg leading-relaxed mb-6">
            FunID, Fun Teknoloji ekosistemindeki tüm uygulamalara tek bir güvenli hesaptan erişmenizi sağlayan merkezi kimlik doğrulama sistemidir.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Gelişmiş Güvenlik Ayarları</h2>
          <p className="leading-relaxed mb-6">
            Hesabınızın güvenliğini artırmak için iki adımlı doğrulamayı (2FA) aktif edebilir, giriş uyarı bildirimlerini açabilir veya yabancı IP/VPN engelleme kurallarını etkinleştirebilirsiniz.
          </p>
          <h3 className="text-2xl font-semibold mt-8 mb-3 fun-text">Nasıl Yapılır?</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>Sağ üstteki profil ikonuna tıklayarak profil sayfanıza gidin.</li>
            <li>"Güvenlik Ayarları" sekmesine tıklayın.</li>
            <li>İki Adımlı Doğrulama (2FA) butonunu aktif hale getirin ve authenticator uygulamanızla QR kodu taratın.</li>
            <li>Dilerseniz VPN engelleme veya yabancı IP kısıtlamalarını etkinleştirerek tam koruma sağlayın.</li>
          </ol>
        </>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-6">
            FunID is the central identity management and authentication platform allowing access to all Fun Technology products from a single, ultra-secure account.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Advanced Security Settings</h2>
          <p className="leading-relaxed mb-6">
            You can enable two-factor authentication (2FA), turn on login notifications, or toggle VPN and foreign IP blocklists to guarantee top-tier security for your profile.
          </p>
          <h3 className="text-2xl font-semibold mt-8 mb-3 fun-text">How to set up?</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>Click your profile icon on the top right to open your profile.</li>
            <li>Go to the "Security Settings" tab.</li>
            <li>Toggle Two-Factor Authentication (2FA) on, and scan the QR code using your preferred authenticator app.</li>
            <li>Enable VPN blocking or foreign IP restriction rules for absolute shield protection.</li>
          </ol>
        </>
      )
    },
    nexy_intro: {
      title: lang === "tr" ? "Nexy Nedir ve Nasıl Çalışır?" : "What is Nexy & How It Works",
      content: lang === "tr" ? (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Nexy, Fun Teknoloji tarafından geliştirilen, 12'den fazla dilde akıcı iletişim kurabilen ve veritabanı sorguları yapabilen akıllı yapay zeka asistanınızdır.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Veritabanı Entegrasyonu</h2>
          <p className="leading-relaxed mb-6">
            Nexy sadece sohbet etmekle kalmaz; yetkilendirilmiş kullanıcıların hesap dondurma, aktif oturumları inceleme, veya sistem çalışma sürelerini (uptime) sorgulama işlemlerini real-time olarak veritabanı üzerinden doğrular.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Çalışma Prensibi</h2>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Sorgu Algılama:</strong> Gönderdiğiniz mesajda veritabanı erişimi gerektiren bir niyet tespit edilirse, Nexy otomatik bir sorgu tetikler.</li>
            <li><strong>Güvenlik Kontrolü:</strong> Sorgu tetiklendiğinde Supabase RLS (Row-Level Security) güvenlik politikaları devreye girerek yalnızca kendi verilerinizi okumanızı sağlar.</li>
            <li><strong>Analiz ve Cevap:</strong> Veritabanından gelen doğrulanmış veriler Nexy'ye aktarılır ve Nexy size en net, doğru cevabı oluşturur.</li>
          </ul>
        </>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Nexy is your smart artificial intelligence assistant developed by Fun Technology, capable of fluent communication in over 12 languages and real-time database operations.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Database Integration</h2>
          <p className="leading-relaxed mb-6">
            Nexy goes beyond simple chitchat. Under authorized sessions, it can securely fetch and verify your active profile plan, freeze statuses, or query active maintenance windows directly from Supabase.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">How It Works</h2>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Intent Recognition:</strong> If your input relates to account state or settings, Nexy triggers a targeted database token request.</li>
            <li><strong>Security Shield:</strong> Supabase Row-Level Security (RLS) is applied to ensure only you can view your own database records.</li>
            <li><strong>Polished Output:</strong> Real-time verified records are injected into the context, allowing Nexy to summarize and reply.</li>
          </ul>
        </>
      )
    },
    nexy_engine: {
      title: lang === "tr" ? "Akıllı Sorgu Komutları" : "Intelligent Query Commands",
      content: lang === "tr" ? (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Nexy asistanı ve Canlı Destek arayüzü ile sohbet ederken, sistemi tetikleyen akıllı komut kelimeleri ve veritabanı entegrasyonu mevcuttur.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Örnek Sorgu Şablonları</h2>
          <p className="leading-relaxed mb-6">
            Herhangi bir kod yazmadan veya ayar aramadan, doğrudan doğal dil kullanarak şu bilgileri sorgulayabilirsiniz:
          </p>
          <div className="bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] rounded-2xl p-6 font-mono text-sm space-y-3 mb-6 text-foreground">
            <div>- "Hizmetler aktif mi?" veya "Bakım var mı?"</div>
            <div className="text-[var(--fun-purple)]">  - (Sistem durum tablosundan real-time verileri listeler)</div>
            <div className="mt-3">- "Hesabımın durumu nedir?" veya "Aktif oturumlarımı göster"</div>
            <div className="text-[var(--fun-purple)]">  - (Supabase profil ve aktif oturum listesini getirir)</div>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-6">
            While chatting with Nexy or Live Support, you can use natural language to query various secure tables.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Query Templates</h2>
          <p className="leading-relaxed mb-6">
            Simply ask standard friendly questions to fetch real-time database context safely:
          </p>
          <div className="bg-[var(--fun-surface)] border border-[var(--fun-stroke-1)] rounded-2xl p-6 font-mono text-sm space-y-3 mb-6 text-foreground">
            <div>- "Is the platform online?" or "Are services online?"</div>
            <div className="text-[var(--fun-purple)]">  - (Queries public system_status table)</div>
            <div className="mt-3">- "Show my active sessions" or "What is my current plan?"</div>
            <div className="text-[var(--fun-purple)]">  - (Securely queries Supabase with user JWT)</div>
          </div>
        </>
      )
    },
    quakesafe_intro: {
      title: lang === "tr" ? "QuakeSafe Nedir?" : "What is QuakeSafe",
      content: lang === "tr" ? (
        <>
          <p className="text-lg leading-relaxed mb-6">
            QuakeSafe, Fun Teknoloji tarafından geliştirilen, yapay zeka ve IoT sensor ağlarını kullanarak deprem anında erken uyarı veren, afet sonrası ise koordinasyon ve medikal durum yönetimini sağlayan devrim niteliğinde bir platformdur.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Platform Özellikleri</h2>
          <p className="leading-relaxed mb-6">
            QuakeSafe, enkaz altındaki veya afet bölgesindeki bireylerin güvenliğini sağlamak için şu entegre çözümleri sunar:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Erken Uyarı Sensörleri:</strong> Depremin yıkıcı dalgaları ulaşmadan önce saniyeler kazandıran bildirimler.</li>
            <li><strong>Medikal Profil Entegrasyonu:</strong> Afet anında acil ekiplerin bilmesi gereken kan grubu, alerji ve acil durum kişilerinizin bir arada tutulduğu tescilli medikal kart.</li>
            <li><strong>İletişim ve Güvenlik:</strong> GSM hatları koptuğunda dahi koordinasyon sağlayan yedekli ağ protokolleri.</li>
          </ul>
        </>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-6">
            QuakeSafe is a life-saving disaster-preparedness and early-warning platform developed by Fun Technology, leveraging AI and IoT sensor networks to coordinate emergency communications and safety alerts.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Core Platforms Features</h2>
          <p className="leading-relaxed mb-6">
            QuakeSafe provides fully integrated modules to maximize safety and coordination during emergencies:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li><strong>Early Warning Alerts:</strong> Live micro-vibration sensors that trigger early alerts before shockwaves reach.</li>
            <li><strong>Emergency Medical Profile:</strong> Instant access to critical blood types, allergies, and emergency contacts.</li>
            <li><strong>Mesh Safety Net:</strong> Redundant offline communication frameworks if cellular grids fail.</li>
          </ul>
        </>
      )
    },
    quakesafe_card: {
      title: lang === "tr" ? "Medikal Güvenlik Kartı" : "Medical Safety Card",
      content: lang === "tr" ? (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Afet anında ilk müdahale ekiplerinin kan grubunuzu ve acil durum yakınlarınızın numaralarını saniyeler içinde görmesi kritik önem taşır.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Kart Oluşturma ve Görünürlük</h2>
          <p className="leading-relaxed mb-6">
            QuakeSafe medikal güvenlik kartınızı oluşturduktan sonra, görünürlüğünü "Herkese Açık" (Public) veya "Gizli" (Private) yapabilirsiniz. Herkese açık yapıldığında, acil durum ekipleri kartınızı NFC veya özel QR tarama ile hızlıca görebilir.
          </p>
          <h3 className="text-2xl font-semibold mt-8 mb-3 fun-text">Nasıl Kurulur?</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>Profil sayfanıza gidin ve "QuakeSafe Profili" bölümünü açın.</li>
            <li>Kan grubunuzu, alerjilerinizi ve en az bir acil durum yakın kişinin telefon numarasını girin.</li>
            <li>"Kaydet" butonuna basın.</li>
            <li>"Kart Görünürlüğü" seçeneğini dilediğiniz gibi ayarlayın (Public yapılması acil durumlarda ekiplerin işini kolaylaştırır).</li>
          </ol>
        </>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-6">
            In times of disaster, allowing emergency responders to see your blood type and contact numbers in seconds is life-saving.
          </p>
          <h2 className="text-3xl font-bold mt-10 mb-4 fun-text">Card Setup and Visibility</h2>
          <p className="leading-relaxed mb-6">
            Once saved, your medical profile can be toggled to "Public" or "Private". Keeping it public enables responders to scan your safe card via NFC or QR code instantly.
          </p>
          <h3 className="text-2xl font-semibold mt-8 mb-3 fun-text">How to complete?</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>Go to your Profile and locate the "QuakeSafe Profile" card.</li>
            <li>Fill in your blood type, chronic allergies, and emergency parent/relative numbers.</li>
            <li>Click "Save".</li>
            <li>Set "Card Visibility" to your choice (Public is highly recommended for emergency response access).</li>
          </ol>
        </>
      )
    }
  };

  const menu = [
    {
      category: lang === "tr" ? "BAŞLANGIÇ" : "GETTING STARTED",
      items: [
        { id: "intro", label: lang === "tr" ? "Giriş" : "Introduction" },
        { id: "funid", label: lang === "tr" ? "FunID Hesap Kurulumu" : "FunID Account Setup" }
      ]
    },
    {
      category: lang === "tr" ? "NEXY YAPAY ZEKA" : "NEXY AI",
      items: [
        { id: "nexy_intro", label: lang === "tr" ? "Nexy Nedir?" : "What is Nexy?" },
        { id: "nexy_engine", label: lang === "tr" ? "Akıllı Sorgu Motoru" : "Intelligent Query" }
      ]
    },
    {
      category: lang === "tr" ? "QUAKESAFE" : "QUAKESAFE",
      items: [
        { id: "quakesafe_intro", label: lang === "tr" ? "QuakeSafe Nedir?" : "What is QuakeSafe?" },
        { id: "quakesafe_card", label: lang === "tr" ? "Medikal Güvenlik Kartı" : "Medical Safety Card" }
      ]
    }
  ];

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 min-h-[calc(100vh-200px)] flex flex-col bg-background">
      <div className="max-w-[1290px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 flex-1 w-full">
        {/* Left Column - Sidebar Navigation */}
        <ScrollReveal className="lg:col-span-1">
          <aside className="space-y-8 sticky top-36">
            {menu.map((cat, i) => (
              <div key={i}>
                <h3 className="font-bold fun-text mb-4 uppercase tracking-widest text-xs opacity-50">
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
            ))}
          </aside>
        </ScrollReveal>

        {/* Right Column - Dynamic Article Content */}
        <div className="lg:col-span-3">
          <div className="prose dark:prose-invert max-w-none fun-text">
            <ScrollReveal key={activeTab}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {articles[activeTab].title}
              </h1>
              <div className="h-[1px] w-full bg-[var(--fun-stroke-1)] mb-8" />
              <div className="text-muted-foreground text-base leading-relaxed">
                {articles[activeTab].content}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
