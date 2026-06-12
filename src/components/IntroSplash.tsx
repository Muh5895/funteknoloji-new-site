import { useEffect, useRef, useState } from "react";
import introAsset from "../assets/intro.mp4.asset.json";

const SKIP_KEY = "fun_intro_played";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // play once per session
    if (sessionStorage.getItem(SKIP_KEY)) return;
    sessionStorage.setItem(SKIP_KEY, "1");
    setShow(true);
    // lock scroll while playing
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = () => {
    setFading(true);
    setTimeout(() => setShow(false), 600);
  };

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => finish());
    // safety: max 10s
    const t = setTimeout(finish, 10000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        src={introAsset.url}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noremoteplayback nofullscreen noplaybackrate"
        onEnded={finish}
        onError={finish}
        onContextMenu={(e) => e.preventDefault()}
        className="h-full w-full object-cover pointer-events-none select-none"
      />
      <button
        onClick={finish}
        aria-label="Tanıtım videosunu atla"
        className="absolute bottom-6 right-6 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20"
      >
        Atla →
      </button>
    </div>
  );
}
