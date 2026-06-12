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
        className="flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-all hover:scale-105"
        style={{ borderColor: "var(--fun-stroke-1)", color: "var(--fun-text)" }}
      >
        <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-[var(--fun-stroke-1)] text-xs leading-none">
          {current.flag}
        </span>
        <span className="uppercase">{current.code}</span>
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
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--fun-surface)] ${l.code === lang ? "font-semibold" : ""}`}
                style={{ color: "var(--fun-text)" }}
              >
                <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-[var(--fun-stroke-1)] text-xs leading-none">
                  {l.flag}
                </span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
