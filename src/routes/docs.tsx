import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  const { t } = useLang();
  return (
    <main className="pt-32 pb-20 px-4 lg:px-5">
      <div className="max-w-[1290px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
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
            <div className="p-8 rounded-3xl bg-[var(--fun-surface)] border-2 border-dashed border-[var(--fun-stroke-1)] mt-12 text-center">
              <p className="fun-text-muted">Bu bölüm yapım aşamasındadır.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
