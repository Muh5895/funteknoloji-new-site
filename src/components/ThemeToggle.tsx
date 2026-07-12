import { useEffect, useState, useRef } from "react";
import { useLang } from "../lib/i18n";

type ThemeMode = "light" | "dark" | "system";

export default function ThemeToggle() {
  const { lang, t } = useLang();
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTheme = (mode: ThemeMode) => {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.backgroundColor = "black";
      } else if (mode === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor = "white";
      } else {
        // System
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemPrefersDark) {
          document.documentElement.classList.add("dark");
          document.documentElement.style.backgroundColor = "black";
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.style.backgroundColor = "white";
        }
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    // Watch system media query if theme is set to 'system'
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const toggleOptions = [
    {
      value: "light" as ThemeMode,
      label: lang === "tr" ? "Açık" : "Light",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
    },
    {
      value: "dark" as ThemeMode,
      label: lang === "tr" ? "Koyu" : "Dark",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      ),
    },
    {
      value: "system" as ThemeMode,
      label: lang === "tr" ? "Sistem" : "System",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  const currentIcon = toggleOptions.find((o) => o.value === theme)?.icon || toggleOptions[2].icon;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:bg-[var(--fun-surface)] text-[var(--fun-text)] active:scale-95"
        style={{ borderColor: "var(--fun-stroke-1)" }}
        aria-label="Toggle theme"
      >
        {currentIcon}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-[120] mt-2 w-36 rounded-2xl border shadow-2xl animate-scale-in origin-top-right p-1.5 backdrop-blur-xl"
          style={{ backgroundColor: "var(--fun-card)", borderColor: "var(--fun-stroke-1)" }}
        >
          <div className="flex flex-col gap-1">
            {toggleOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all text-left ${theme === opt.value ? "bg-[var(--fun-purple)] text-white shadow-md shadow-purple-500/10" : "hover:bg-[var(--fun-surface)] text-[var(--fun-text)]"}`}
              >
                <span className="shrink-0">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
