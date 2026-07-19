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
export function parseUserAgent(ua: string): ParsedUA {
  let osName = "Unknown OS";
  let osVersion = "Unknown Version";
  let browserName = "Unknown Browser";
  let browserVersion = "Unknown Version";

  if (!ua) return { osName, osVersion, browserName, browserVersion };

  // Detect OS
  if (/Windows NT/i.test(ua)) {
    osName = "Windows";
    const match = ua.match(/Windows NT ([0-9._]+)/i);
    if (match) {
      const ntVer = match[1];
      if (ntVer === "10.0") osVersion = "10 or 11";
      else if (ntVer === "6.3") osVersion = "8.1";
      else if (ntVer === "6.2") osVersion = "8";
      else if (ntVer === "6.1") osVersion = "7";
      else osVersion = ntVer;
    }
  } else if (/Android/i.test(ua)) {
    osName = "Android";
    const match = ua.match(/Android ([0-9._]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/iP(hone|od|ad)/i.test(ua)) {
    osName = "iOS";
    const match = ua.match(/OS ([0-9._]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/Mac OS X/i.test(ua)) {
    osName = "macOS";
    const match = ua.match(/Mac OS X ([0-9._]+)/i);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/Linux/i.test(ua)) {
    osName = "Linux";
  }

  // Detect Browser
  if (/Chrome/i.test(ua) && !/Chromium|Edg|OPR|Safari/i.test(ua)) {
    browserName = "Chrome";
    const match = ua.match(/Chrome\/([0-9._]+)/i);
    if (match) browserVersion = match[1];
  } else if (/Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua)) {
    browserName = "Safari";
    const match = ua.match(/Version\/([0-9._]+)/i);
    if (match) browserVersion = match[1];
  } else if (/Firefox/i.test(ua)) {
    browserName = "Firefox";
    const match = ua.match(/Firefox\/([0-9._]+)/i);
    if (match) browserVersion = match[1];
  } else if (/Edg/i.test(ua)) {
    browserName = "Edge";
    const match = ua.match(/Edg\/([0-9._]+)/i);
    if (match) browserVersion = match[1];
  } else if (/OPR|Opera/i.test(ua)) {
    browserName = "Opera";
    const match = ua.match(/(?:OPR|Version)\/([0-9._]+)/i);
    if (match) browserVersion = match[1];
  }

  return { osName, osVersion, browserName, browserVersion };
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
  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!conn) {
    return { effectiveType: "unknown", downlink: 0, rtt: 0 };
  }
  return {
    effectiveType: conn.effectiveType || "unknown",
    downlink: conn.downlink || 0,
    rtt: conn.rtt || 0
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
      const msg = args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : String(arg)).join(" ");
      errorLogBuffer.push(`[Console Error]: ${msg}`);
    } catch (_) {}
  };
}

export function getCapturedConsoleErrors(): string {
  return errorLogBuffer.slice(-10).join("\n");
}
