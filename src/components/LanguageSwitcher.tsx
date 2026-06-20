import { useLang, type Lang } from "../lib/i18n";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const langs: { code: Lang; label: string; flagUrl: string }[] = [
    { code: "tr", label: "Türkçe", flagUrl: "https://flagcdn.com/tr.svg" },
    { code: "en", label: "English", flagUrl: "https://flagcdn.com/us.svg" },
    { code: "az", label: "Azerice", flagUrl: "https://flagcdn.com/az.svg" },
    { code: "de", label: "Deutsch", flagUrl: "https://flagcdn.com/de.svg" },
    { code: "fr", label: "Français", flagUrl: "https://flagcdn.com/fr.svg" },
    { code: "es", label: "Español", flagUrl: "https://flagcdn.com/es.svg" },
    { code: "ru", label: "Русский", flagUrl: "https://flagcdn.com/ru.svg" },
    { code: "ar", label: "العربية", flagUrl: "https://flagcdn.com/sa.svg" },
    { code: "it", label: "Italiano", flagUrl: "https://flagcdn.com/it.svg" },
    { code: "pt", label: "Português", flagUrl: "https://flagcdn.com/pt.svg" },
    { code: "ja", label: "日本語", flagUrl: "https://flagcdn.com/jp.svg" },
    { code: "zh", label: "中文", flagUrl: "https://flagcdn.com/cn.svg" },
  ];

  const current = langs.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("lang.label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-all hover:bg-[var(--fun-surface)]"
        style={{ borderColor: "var(--fun-stroke-1)", color: "var(--fun-text)" }}
      >
        <div className="w-5 h-5 rounded-full overflow-hidden border border-[var(--fun-stroke-1)] flex items-center justify-center bg-muted">
          <img src={current.flagUrl} alt="" className="h-full w-full object-cover shrink-0" />
        </div>
        <span className="font-bold tracking-tight">{current.label}</span>
      </button>
      {open && (
        <div
          className="fixed sm:absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 top-24 sm:top-full z-[100] sm:z-50 mt-2 w-[calc(100vw-32px)] sm:w-[500px] max-w-[500px] max-h-[70vh] overflow-y-auto rounded-2xl border shadow-2xl animate-scale-in origin-top sm:origin-top-right p-2 backdrop-blur-xl mx-auto sm:mx-0 custom-scrollbar"
          style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
            {langs.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--fun-surface)] ${l.code === lang ? "bg-[var(--fun-purple)]/5 border border-[var(--fun-purple)]/20" : ""}`}
                style={{ color: "var(--fun-text)" }}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--fun-stroke-1)] flex items-center justify-center bg-muted shadow-sm">
                  <img src={l.flagUrl} alt="" className="h-full w-full object-cover" />
                </div>
                <span className={`text-sm font-medium ${l.code === lang ? "text-[var(--fun-purple)] font-bold" : "opacity-80"}`}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
