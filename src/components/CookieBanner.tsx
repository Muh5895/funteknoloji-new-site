import { useState, useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { submitCookieConsent, submitCookieConsentEvent } from "../lib/engine";
import { Settings, ShieldCheck, X } from "lucide-react";

// Simple helper to generate/retrieve a persistent UUID for session tracking
function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("cookie_session_id");
  if (!id) {
    id = "session_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now().toString(36);
    localStorage.setItem("cookie_session_id", id);
  }
  return id;
}

export default function CookieBanner() {
  const { t, lang } = useLang();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  const sessionIdRef = useRef<string>("");
  const bannerShownLogged = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    sessionIdRef.current = getOrCreateSessionId();

    const win = window as any;

    const checkAndShow = () => {
      const storedConsent = localStorage.getItem("cookie_consent");
      if (!storedConsent) {
        setIsVisible(true);
        // Log BANNER_SHOWN audit event if not logged already
        if (!bannerShownLogged.current) {
          bannerShownLogged.current = true;
          logEvent("BANNER_SHOWN", true, true, true);
        }
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

  const logEvent = async (
    eventType: "BANNER_SHOWN" | "ACCEPT_ALL" | "REJECT_ALL" | "CUSTOM_SAVE" | "BANNER_CLOSED",
    necessaryVal: boolean,
    analyticsVal: boolean,
    marketingVal: boolean
  ) => {
    if (!sessionIdRef.current) return;
    const payload = {
      session_id: sessionIdRef.current,
      event_type: eventType,
      consent_necessary: necessaryVal,
      consent_analytics: analyticsVal,
      consent_marketing: marketingVal,
      user_lang: lang,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      screen_resolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : undefined,
      device_type: getDeviceType(),
    };
    await submitCookieConsentEvent(payload);
  };

  const handleConsent = async (analyticsVal: boolean, marketingVal: boolean, actionType?: "ACCEPT_ALL" | "REJECT_ALL" | "CUSTOM_SAVE") => {
    const consentObj = {
      necessary: true,
      analytics: analyticsVal,
      marketing: marketingVal,
    };

    localStorage.setItem("cookie_consent", JSON.stringify(consentObj));
    setIsVisible(false);

    // Collect anonymous details to store
    const payload = {
      consent_necessary: true,
      consent_analytics: analyticsVal,
      consent_marketing: marketingVal,
      user_lang: lang,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      screen_resolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : undefined,
      device_type: getDeviceType(),
    };

    // Log the event type
    const resolvedAction = actionType || (analyticsVal && marketingVal ? "ACCEPT_ALL" : (!analyticsVal && !marketingVal ? "REJECT_ALL" : "CUSTOM_SAVE"));
    await logEvent(resolvedAction, true, analyticsVal, marketingVal);

    // Save final status to consolidated states
    await submitCookieConsent(payload, sessionIdRef.current);
  };

  const handleClose = async () => {
    // If they just close without selection, we treat as minimal consent (necessary only or false)
    await logEvent("BANNER_CLOSED", true, false, false);
    handleConsent(false, false, "REJECT_ALL");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div
        className="rounded-[28px] border p-6 md:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        style={{
          backgroundColor: "var(--fun-card)",
          borderColor: "var(--fun-stroke-1)",
          color: "var(--fun-text)"
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold tracking-tight">{t("cookies.title")}</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-[var(--fun-stroke-1)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!showSettings ? (
          <div className="mt-4 space-y-5">
            <p className="text-sm fun-text-muted leading-relaxed">
              {t("cookies.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => handleConsent(true, true, "ACCEPT_ALL")}
                className="flex-1 btn-fun btn-fun-dark !py-3 !text-sm font-medium"
              >
                {t("cookies.accept_all")}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 border border-[var(--fun-stroke-1)] hover:bg-[var(--fun-stroke-1)] transition-colors text-sm font-medium"
              >
                <Settings className="h-4 w-4" />
                {t("cookies.customize")}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-5">
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
              {/* Necessary */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)]">
                <input
                  type="checkbox"
                  checked={consent.necessary}
                  disabled
                  className="mt-1 accent-[var(--fun-purple)] h-4 w-4"
                />
                <div>
                  <h4 className="text-sm font-bold">{t("cookies.necessary.title")}</h4>
                  <p className="text-xs fun-text-muted mt-1 leading-normal">{t("cookies.necessary.desc")}</p>
                </div>
              </div>

              {/* Analytics */}
              <div
                className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] cursor-pointer"
                onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
              >
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={() => {}}
                  className="mt-1 accent-[var(--fun-purple)] h-4 w-4"
                />
                <div>
                  <h4 className="text-sm font-bold">{t("cookies.analytics.title")}</h4>
                  <p className="text-xs fun-text-muted mt-1 leading-normal">{t("cookies.analytics.desc")}</p>
                </div>
              </div>

              {/* Marketing */}
              <div
                className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] cursor-pointer"
                onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={() => {}}
                  className="mt-1 accent-[var(--fun-purple)] h-4 w-4"
                />
                <div>
                  <h4 className="text-sm font-bold">{t("cookies.marketing.title")}</h4>
                  <p className="text-xs fun-text-muted mt-1 leading-normal">{t("cookies.marketing.desc")}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 rounded-xl px-4 py-3 border border-[var(--fun-stroke-1)] hover:bg-[var(--fun-stroke-1)] transition-colors text-sm font-medium"
              >
                {t("contact.captcha.cancel")}
              </button>
              <button
                onClick={() => handleConsent(consent.analytics, consent.marketing, "CUSTOM_SAVE")}
                className="flex-1 btn-fun btn-fun-dark !py-3 !text-sm font-medium"
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
