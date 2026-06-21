import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import ScrollReveal from "../components/ScrollReveal";
import ArrowButton from "../components/ArrowButton";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/changelog/$slug")({
  component: ChangelogDetailPage,
});

function ChangelogDetailPage() {
  const { t } = useLang();
  const { slug } = Route.useParams();

  // Mock data for changelog items based on slug
  const getChangelogDetails = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "funteknoloji":
        return {
          title: "Fun Teknoloji",
          version: "v2.4.0",
          date: "15 Haziran 2026",
          updates: [
            {
              title: "Yeni Yapay Zeka Motoru",
              desc: "Nexy asistanı artık %40 daha hızlı ve daha doğru cevaplar veriyor.",
            },
            {
              title: "Koyu Tema İyileştirmeleri",
              desc: "Tüm sayfalarda kontrast ve okunabilirlik artırıldı.",
            },
            {
              title: "Altyapı Güncellemesi",
              desc: "Sunucu yanıt süreleri küresel olarak optimize edildi.",
            },
          ],
        };
      case "account":
        return {
          title: "Account",
          version: "v1.2.0",
          date: "10 Haziran 2026",
          updates: [
            {
              title: "Profil Özelleştirme",
              desc: "Kullanıcılar artık profil resimlerini ve biyografilerini düzenleyebilir.",
            },
            { title: "İki Faktörlü Doğrulama", desc: "Hesap güvenliği için 2FA desteği eklendi." },
            {
              title: "Oturum Yönetimi",
              desc: "Aktif oturumları görüntüleme ve sonlandırma özelliği getirildi.",
            },
          ],
        };
      case "developer":
        return {
          title: "Developer",
          version: "v3.0.1",
          date: "5 Haziran 2026",
          updates: [
            {
              title: "Yeni API Endpointleri",
              desc: "Veri analitiği için yeni REST API uç noktaları eklendi.",
            },
            {
              title: "Webook Desteği",
              desc: "Sistem olayları için webhook bildirimleri aktif edildi.",
            },
            {
              title: "Dokümantasyon Güncellemesi",
              desc: "Tüm API dokümantasyonu yeni örneklerle güncellendi.",
            },
          ],
        };
      case "quakesafe":
        return {
          title: "QuakeSafe",
          version: "v2.1.0",
          date: "1 Haziran 2026",
          updates: [
            {
              title: "Erken Uyarı Algoritması",
              desc: "Deprem dalgalarını algılama hızı 0.5 saniye iyileştirildi.",
            },
            {
              title: "Çevrimdışı Haritalar",
              desc: "İnternet olmasa bile güvenli bölgeleri gösteren harita desteği.",
            },
            {
              title: "Aile Paylaşımı",
              desc: "Aile üyelerinin durumlarını anlık takip etme paneli yenilendi.",
            },
          ],
        };
      default:
        return {
          title: slug,
          version: "v1.0.0",
          date: "Bilinmiyor",
          updates: [],
        };
    }
  };

  const details = getChangelogDetails(slug);

  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 min-h-screen bg-[var(--fun-surface)]">
      <div className="max-w-[800px] mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <ArrowButton
              to="/changelog"
              variant="ghost"
              className="mb-8 !px-0 hover:translate-x-0 group"
            >
              <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t("blog.post.all_posts").replace(
                /Yazılar|Articles|Artikel|Articles|Artículos|Yazılar|Статьи|المقالات|Articoli|Artigos|記事|文章/,
                t("nav.changelog"),
              )}
            </ArrowButton>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--fun-stroke-1)]">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold fun-text mb-4">{details.title}</h1>
                <p className="fun-text-muted font-medium">
                  {t("changelog.last_update")}: {details.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] px-4 py-1.5 rounded-full text-sm font-bold border border-[var(--fun-purple)]/20">
                  {details.version}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {details.updates.length > 0 ? (
            details.updates.map((update, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-8 rounded-3xl border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] hover:border-[var(--fun-purple)]/50 transition-colors shadow-sm">
                  <h3 className="text-xl font-bold fun-text mb-3 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[var(--fun-purple)]" />
                    {update.title}
                  </h3>
                  <p className="fun-text-muted leading-relaxed">{update.desc}</p>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <p className="text-center fun-text-muted py-20">{t("changelog.details_soon")}</p>
          )}
        </div>
      </div>
    </main>
  );
}
