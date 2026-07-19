import { useState, useEffect } from "react";
import { useLang } from "../lib/i18n";
import { submitCookieConsent } from "../lib/engine";
import { parseUserAgent, getResolutionAndScaling, getNetworkStats, getCapturedConsoleErrors } from "../lib/utils";
import { Settings, ShieldCheck } from "lucide-react";

export default function CookieBanner() {
  const { t, lang } = useLang();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [clientIp, setClientIp] = useState<string>("Unknown IP");
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedConsent = localStorage.getItem("cookie_consent");

    // Fetch the client's public IP address securely and anonymously ONLY if they haven't set consent yet
    const fetchClientIp = async () => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        if (res.ok) {
          const data = await res.json();
          if (data && data.ip) {
            setClientIp(data.ip);
          }
        }
      } catch (e) {
        console.warn("Could not retrieve client IP (non-blocking fallback):", e);
      }
    };

    const win = window as any;

    const checkAndShow = () => {
      if (!storedConsent) {
        setIsVisible(true);
        fetchClientIp();
      }
    };

    if (win.__introPlaying) {
      const handleIntroFinished = () => {
        checkAndShow();
        window.removeEventListener("intro-finished", handleIntroFinished);
      };
      window.addEventListener("intro-finished", handleIntroFinished);
      return () => {
        window.removeEventListener("intro-finished", handleIntroFinished);
      };
    } else {
      checkAndShow();
    }
  }, []);

  const getDeviceType = () => {
    if (typeof window === "undefined") return "desktop";
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
      return "mobile";
    }
    return "desktop";
  };

  const handleConsent = async (analyticsVal: boolean, marketingVal: boolean) => {
    const consentObj = {
      necessary: true,
      analytics: analyticsVal,
      marketing: marketingVal,
    };

    localStorage.setItem("cookie_consent", JSON.stringify(consentObj));
    setIsVisible(false);

    // Dynamic, high-accuracy client system metrics
    const rawUa = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const parsedUa = parseUserAgent(rawUa);
    const network = getNetworkStats();
    const consoleErrors = getCapturedConsoleErrors();

    const payload = {
      consent_necessary: true,
      consent_analytics: analyticsVal,
      consent_marketing: marketingVal,
      user_lang: lang,

      // Precise OS / Browser parsing
      os_name: parsedUa.osName,
      os_version: parsedUa.osVersion,
      browser_name: parsedUa.browserName,
      browser_version: parsedUa.browserVersion,
      raw_user_agent: rawUa,

      // True IP and network properties
      ip_address: clientIp,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      screen_resolution: getResolutionAndScaling(),
      device_type: getDeviceType(),

      // Connection characteristics
      network_effective_type: network.effectiveType,
      network_downlink: network.downlink,
      network_rtt: network.rtt,

      // Captured Console error details
      console_errors: consoleErrors || undefined
    };

    await submitCookieConsent(payload);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto w-[calc(100vw-32px)] sm:w-[460px] max-w-[460px] z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div
        className="rounded-[24px] border p-5 md:p-6 shadow-2xl relative overflow-hidden bg-white dark:bg-[#0d0d0d] bg-opacity-100 dark:bg-opacity-100"
        style={{
          backgroundColor: "var(--fun-card)",
          borderColor: "var(--fun-stroke-1)",
          color: "var(--fun-text)"
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold tracking-tight">{t("cookies.title")}</h3>
        </div>

        {!showSettings ? (
          <div className="mt-3.5 space-y-4">
            <p className="text-xs fun-text-muted leading-relaxed">
              {t("cookies.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-0.5">
              <button
                onClick={() => handleConsent(true, true)}
                className="flex-1 btn-fun btn-fun-dark !py-2.5 !text-xs font-semibold"
              >
                {t("cookies.accept_all")}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 border border-[var(--fun-stroke-1)] hover:bg-[var(--fun-stroke-1)] transition-colors text-xs font-semibold"
              >
                <Settings className="h-3.5 w-3.5" />
                {t("cookies.customize")}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3.5 space-y-4">
            <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-0.5 custom-scrollbar">
              {/* Necessary */}
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)]">
                <input
                  type="checkbox"
                  checked={consent.necessary}
                  disabled
                  className="mt-0.5 accent-[var(--fun-purple)] h-3.5 w-3.5"
                />
                <div>
                  <h4 className="text-xs font-bold">{t("cookies.necessary.title")}</h4>
                  <p className="text-[10px] fun-text-muted mt-0.5 leading-normal">{t("cookies.necessary.desc")}</p>
                </div>
              </div>

              {/* Analytics */}
              <div
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] cursor-pointer"
                onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
              >
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={() => {}}
                  className="mt-0.5 accent-[var(--fun-purple)] h-3.5 w-3.5"
                />
                <div>
                  <h4 className="text-xs font-bold">{t("cookies.analytics.title")}</h4>
                  <p className="text-[10px] fun-text-muted mt-0.5 leading-normal">{t("cookies.analytics.desc")}</p>
                </div>
              </div>

              {/* Marketing */}
              <div
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] cursor-pointer"
                onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={() => {}}
                  className="mt-0.5 accent-[var(--fun-purple)] h-3.5 w-3.5"
                />
                <div>
                  <h4 className="text-xs font-bold">{t("cookies.marketing.title")}</h4>
                  <p className="text-[10px] fun-text-muted mt-0.5 leading-normal">{t("cookies.marketing.desc")}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-0.5">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 rounded-xl px-3 py-2.5 border border-[var(--fun-stroke-1)] hover:bg-[var(--fun-stroke-1)] transition-colors text-xs font-semibold"
              >
                {t("cookies.cancel")}
              </button>
              <button
                onClick={() => handleConsent(consent.analytics, consent.marketing)}
                className="flex-1 btn-fun btn-fun-dark !py-2.5 !text-xs font-semibold"
              >
                {t("cookies.save_settings")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
