import { useEffect, useRef, useState } from "react";

const SKIP_KEY = "fun_intro_played";
const INTRO_VIDEO_URL = "https://framerusercontent.com/assets/n1Tyvvk0VdGSZB1OokWWISh7YtU.mp4";

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
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 600);
  };

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;

    // Force 1.5x speed initially if possible
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

    // safety timeout: max 12s
    const t = setTimeout(finish, 12000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

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
          console.error("Video error:", e);
          finish();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="h-full w-full object-cover pointer-events-none select-none"
      />
    </div>
  );
}
