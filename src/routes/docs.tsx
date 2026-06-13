import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  const { t } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5 min-h-[calc(100vh-200px)] flex flex-col">
      <div className="max-w-[1290px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 flex-1 w-full">
        <aside className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="font-bold fun-text mb-4 uppercase tracking-widest text-sm opacity-50">Başlangıç</h3>
            <ul className="space-y-3">
              <li><a href="#" className="fun-text font-medium border-l-2 border-[var(--fun-purple)] pl-4">Giriş</a></li>
              <li><a href="#" className="fun-text-muted hover:fun-text pl-4">Hızlı Kurulum</a></li>
              <li><a href="#" className="fun-text-muted hover:fun-text pl-4">Temel Kavramlar</a></li>
            </ul>
          </div>
        </aside>
        <div className="lg:col-span-3">
          <div className="prose dark:prose-invert max-w-none fun-text">
            <h1 className="text-5xl font-bold mb-8">Dokümantasyon</h1>
            <p className="text-xl opacity-70">Fun Teknoloji ürünleri ve API'ları için teknik rehber.</p>

            <div className="mt-12 space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4">Giriş</h2>
                <p>Fun Teknoloji, modern işletmeler için ölçeklenebilir ve yapay zeka destekli altyapılar sunar. Bu dökümantasyon, platformumuzu en verimli şekilde nasıl kullanacağınızı anlatır.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">API Entegrasyonu</h2>
                <p>Uygulamalarınızı Fun Teknoloji ekosistemine bağlamak için REST API'larımızı kullanabilirsiniz.</p>
                <pre className="p-6 rounded-2xl bg-[#12161F] text-white overflow-x-auto">
                  <code>{`curl -X GET "https://api.funteknoloji.com/v1/services" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                </pre>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Güvenlik</h2>
                <p>Tüm istekleriniz SSL üzerinden şifrelenir ve API anahtarınızla doğrulanır.</p>
              </section>

              <div className="p-8 rounded-3xl bg-[var(--fun-surface)] border-2 border-dashed border-[var(--fun-stroke-1)] text-center">
                <p className="fun-text-muted">Daha detaylı dökümantasyon ve SDK'lar için çok yakında güncelleme yapılacaktır.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
