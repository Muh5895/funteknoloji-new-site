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
            <p className="text-xl opacity-70">Fun Teknoloji ürünleri için teknik rehber ve kullanım kılavuzları.</p>

            <div className="mt-20 py-20 flex flex-col items-center justify-center text-center space-y-6 rounded-[40px] border-2 border-dashed border-[var(--fun-stroke-1)] bg-[var(--fun-surface)]">
               <div className="h-20 w-20 rounded-full bg-[var(--fun-purple)]/10 flex items-center justify-center text-[var(--fun-purple)]">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
               </div>
               <div>
                 <h2 className="text-3xl font-bold mb-2">Çok Yakında</h2>
                 <p className="fun-text-muted max-w-md mx-auto">Platformumuz ve hizmetlerimiz için detaylı kullanım kılavuzları hazırlanmaktadır. En kısa sürede burada olacağız.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
