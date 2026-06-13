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
    { code: "en", label: "English", flagUrl: "https://flagcdn.com/gb.svg" },
    { code: "az", label: "Azerice", flagUrl: "https://flagcdn.com/az.svg" },
    { code: "de", label: "Deutsch", flagUrl: "https://flagcdn.com/de.svg" },
    { code: "fr", label: "Français", flagUrl: "https://flagcdn.com/fr.svg" },
    { code: "es", label: "Español", flagUrl: "https://flagcdn.com/es.svg" },
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
        className="flex h-10 items-center gap-2 rounded-full border px-2.5 text-sm font-medium transition-all hover:bg-[var(--fun-surface)]"
        style={{ borderColor: "var(--fun-stroke-1)", color: "var(--fun-text)" }}
      >
        <div className="w-5 h-5 rounded-full overflow-hidden border border-[var(--fun-stroke-1)] flex items-center justify-center bg-muted">
          <img src={current.flagUrl} alt="" className="h-full w-full object-cover shrink-0" />
        </div>
        <span className="uppercase font-bold tracking-tight">{current.code}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-2xl border shadow-xl animate-scale-in origin-top-right"
          style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
        >
          {langs.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-[var(--fun-surface)] ${l.code === lang ? "font-bold bg-[var(--fun-surface)]" : ""}`}
                style={{ color: "var(--fun-text)" }}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden border border-[var(--fun-stroke-1)] flex items-center justify-center bg-muted">
                  <img src={l.flagUrl} alt="" className="h-full w-full object-cover shrink-0" />
                </div>
                <span className="flex-1 text-left">{l.label}</span>
                {l.code === lang && <div className="h-1.5 w-1.5 rounded-full bg-[var(--fun-purple)]" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
