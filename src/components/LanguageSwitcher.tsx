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

  const langs: { code: Lang; label: string; flag: string }[] = [
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const current = langs.find((l) => l.code === lang) || langs[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("lang.label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-all hover:scale-105"
        style={{ borderColor: "var(--fun-stroke-1)", color: "var(--fun-text)" }}
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="uppercase">{current.code}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-[300px] overflow-hidden rounded-2xl border shadow-2xl animate-scale-in origin-top-right p-3"
          style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
        >
          <div className="grid grid-cols-2 gap-2">
            {langs.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors hover:bg-[var(--fun-surface)] ${l.code === lang ? "bg-[var(--fun-surface)] font-semibold" : ""}`}
                style={{ color: "var(--fun-text)" }}
              >
                <span aria-hidden="true" className="text-base">{l.flag}</span>
                <span className="truncate">{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
