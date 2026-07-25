import { useEffect, useRef, useState } from "react";

const SKIP_KEY = "fun_intro_played";
const INTRO_VIDEO_URL = "/assets/intro.mp4";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Play once per session to prevent annoyances
    if (sessionStorage.getItem(SKIP_KEY)) {
      window.__introPlaying = false;
      return;
    }
    sessionStorage.setItem(SKIP_KEY, "1");
    window.__introPlaying = true;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    // Lock background page scroll while playing for immersive aesthetic focus
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, [show]);

  const finish = () => {
    setFading(true);
    if (typeof window !== "undefined") {
      window.__introPlaying = false;
      window.dispatchEvent(new Event("intro-finished"));
    }
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      document.body.style.height = "";
    }, 600);
  };

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;

    // Set high playback rate (1.5x speed) for faster entry flow
    v.playbackRate = 1.5;

    const playVideo = async () => {
      try {
        v.playbackRate = 1.5;
        await v.play();
      } catch (err) {
        console.error("Video play failed:", err);
        finish();
      }
    };

    playVideo();

    // Safety fallback timeout: max 12 seconds
    const t = setTimeout(finish, 12000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  const lang = typeof window !== "undefined" ? (localStorage.getItem("fun_lang") || "tr") : "tr";
  const skipText = lang === "tr" ? "Atla" : "Skip";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <video
        ref={videoRef}
        src={INTRO_VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noremoteplayback nofullscreen noplaybackrate"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = 1.5;
        }}
        onCanPlay={(e) => {
          e.currentTarget.playbackRate = 1.5;
        }}
        onEnded={finish}
        onError={(e) => {
          console.error("Video playback error occurred:", e);
          finish();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="h-full w-full object-cover pointer-events-none select-none"
      />
      {/* Immersive glassmorphism Skip button placed elegantly at the bottom right */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="absolute bottom-8 right-8 z-[10000] px-6 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20 hover:border-white/40 transition-all active:scale-95 duration-200 cursor-pointer flex items-center gap-1.5 shadow-lg"
      >
        <span>{skipText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
