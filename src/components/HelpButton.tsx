import { useLang } from "../lib/i18n";
import { Link } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

export default function HelpButton() {
  const { t } = useLang();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showPopup && (
        <div
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-2xl animate-pop-in max-w-[200px]"
        >
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {t("help.popup")}
          </p>
        </div>
      )}
      <Link
        to="/help"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        className="h-14 w-14 rounded-full bg-[#864FFE] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all group"
        aria-label={t("help.button")}
      >
        <HelpCircle className="h-7 w-7" />
        <span className="absolute right-full mr-3 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {t("help.button")}
        </span>
      </Link>
    </div>
  );
}
