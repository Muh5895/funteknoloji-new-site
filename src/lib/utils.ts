import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// -------------------------------------------------------------------------
// TELEMETRY HELPERS & USER-AGENT PARSER
// -------------------------------------------------------------------------

export interface ParsedUA {
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
}

/**
 * Parses user agent string to extract clean operating system and browser details.
 */
export function parseUserAgent(ua: string, preciseOsVersion?: string): ParsedUA {
  let osName = "Windows"; // Default fallback
  let osVersion = "11"; // Default fallback
  let browserName = "Chrome"; // Default fallback
  let browserVersion = "120.0.0"; // Default fallback

  if (typeof window !== "undefined") {
    if (navigator.platform) {
      if (/Win/i.test(navigator.platform)) osName = "Windows";
      else if (/Mac/i.test(navigator.platform)) osName = "macOS";
      else if (/Linux/i.test(navigator.platform)) osName = "Linux";
      else if (/Android/i.test(navigator.userAgent)) osName = "Android";
      else if (/iP(hone|od|ad)/i.test(navigator.userAgent)) osName = "iOS";
    }
  }

  if (!ua) {
    return { osName, osVersion: preciseOsVersion || osVersion, browserName, browserVersion };
  }

  // Detect OS
  if (/Windows NT/i.test(ua)) {
    osName = "Windows";
    const match = ua.match(/Windows NT ([0-9._]+)/i);
    if (match) {
      const ntVer = match[1];
      if (ntVer === "10.0") {
        osVersion = preciseOsVersion || "11"; // Definite version, fallback to 11 if not supplied
      } else if (ntVer === "6.3") {
        osVersion = "8.1";
      } else if (ntVer === "6.2") {
        osVersion = "8";
      } else if (ntVer === "6.1") {
        osVersion = "7";
      } else if (ntVer === "6.0") {
        osVersion = "Vista";
      } else if (ntVer === "5.1" || ntVer === "5.2") {
        osVersion = "XP";
      } else {
        osVersion = ntVer;
      }
    } else {
      osVersion = "11";
    }
  } else if (/Android/i.test(ua)) {
    osName = "Android";
    const match = ua.match(/Android ([0-9._]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
    else osVersion = "14.0"; // Modern default Android
  } else if (/iP(hone|od|ad)/i.test(ua)) {
    osName = "iOS";
    const match = ua.match(/OS ([0-9._]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
    else osVersion = "17.0"; // Modern default iOS
  } else if (/Mac OS X/i.test(ua)) {
    osName = "macOS";
    const match = ua.match(/Mac OS X ([0-9._]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
    else osVersion = "14.0"; // Modern default macOS Sonoma
  } else if (/Linux/i.test(ua)) {
    osName = "Linux";
    osVersion = "Generic";
  }

  // Specific browser checks (ordered from most specific to least specific)
  if (/SamsungBrowser/i.test(ua)) {
    browserName = "Samsung Internet";
    const match = ua.match(/SamsungBrowser\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "23.0";
  } else if (/YaBrowser/i.test(ua)) {
    browserName = "Yandex Browser";
    const match = ua.match(/YaBrowser\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "24.1";
  } else if (/UCBrowser/i.test(ua)) {
    browserName = "UC Browser";
    const match = ua.match(/UCBrowser\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "13.4";
  } else if (/Vivaldi/i.test(ua)) {
    browserName = "Vivaldi";
    const match = ua.match(/Vivaldi\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "6.5";
  } else if (/Edg/i.test(ua)) {
    browserName = "Edge";
    const match = ua.match(/Edg\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "120.0";
  } else if (/OPR|Opera/i.test(ua)) {
    browserName = "Opera";
    const match = ua.match(/(?:OPR|Version)\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "106.0";
  } else if (/Brave/i.test(ua)) {
    browserName = "Brave";
    const match = ua.match(/Brave\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "1.61";
  } else if (/Firefox/i.test(ua)) {
    browserName = "Firefox";
    const match = ua.match(/Firefox\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "121.0";
  } else if (/Chrome/i.test(ua) && !/Chromium|Safari/i.test(ua)) {
    browserName = "Chrome";
    const match = ua.match(/Chrome\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "120.0";
  } else if (/Safari/i.test(ua) && !/Chrome|Chromium/i.test(ua)) {
    browserName = "Safari";
    const match = ua.match(/Version\/([0-9._]+)/i);
    browserVersion = match ? match[1] : "17.2";
  } else if (/MSIE|Trident/i.test(ua)) {
    browserName = "Internet Explorer";
    const match = ua.match(/(?:MSIE |rv:)([0-9._]+)/i);
    browserVersion = match ? match[1] : "11.0";
  } else {
    // Generic fallback parser to find ANY browser-like token
    const slashTokens = ua
      .split(/\s+/)
      .filter(
        (token) =>
          token.includes("/") && !/Mozilla|AppleWebKit|Gecko|Safari|Chrome|KHTML/i.test(token),
      );
    if (slashTokens.length > 0) {
      const lastToken = slashTokens[slashTokens.length - 1];
      const parts = lastToken.split("/");
      browserName = parts[0];
      browserVersion = parts[1] || "1.0";
    } else {
      browserName = "Chrome"; // Standard fallback
      browserVersion = "120.0";
    }
  }

  return { osName, osVersion: preciseOsVersion || osVersion, browserName, browserVersion };
}

/**
 * High-accuracy screen resolution getter accounting for Device Pixel Ratio & physical boundaries.
 */
export function getResolutionAndScaling(): string {
  if (typeof window === "undefined" || !window.screen) return "Unknown";
  const w = window.screen.width;
  const h = window.screen.height;
  const dpr = window.devicePixelRatio || 1;
  const innerW = window.innerWidth;
  const innerH = window.innerHeight;
  return `${w}x${h} (DPR: ${dpr}, Viewport: ${innerW}x${innerH})`;
}

/**
 * Gathers active network stats from Navigator connection if available.
 */
export function getNetworkStats() {
  if (typeof window === "undefined") return { effectiveType: "unknown", downlink: 0, rtt: 0 };
  const conn =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  if (!conn) {
    return { effectiveType: "unknown", downlink: 0, rtt: 0 };
  }
  return {
    effectiveType: conn.effectiveType || "unknown",
    downlink: conn.downlink || 0,
    rtt: conn.rtt || 0,
  };
}

// -------------------------------------------------------------------------
// GLOBAL CONSOLE ERROR & LOG INTERCEPTOR
// -------------------------------------------------------------------------
const errorLogBuffer: string[] = [];

if (typeof window !== "undefined") {
  // Capture unhandled promise rejections
  window.addEventListener("unhandledrejection", (e) => {
    errorLogBuffer.push(`[Unhandled Rejection]: ${e.reason?.message || e.reason || String(e)}`);
  });

  // Capture standard error events
  window.addEventListener("error", (e) => {
    errorLogBuffer.push(`[Error]: ${e.message} at ${e.filename}:${e.lineno}`);
  });

  // Intercept standard console.error
  const originalConsoleError = console.error;
  console.error = function (...args) {
    originalConsoleError.apply(console, args);
    try {
      const msg = args
        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
        .join(" ");
      errorLogBuffer.push(`[Console Error]: ${msg}`);
    } catch (_) {}
  };
}

export function getCapturedConsoleErrors(): string {
  return errorLogBuffer.slice(-10).join("\n");
}
