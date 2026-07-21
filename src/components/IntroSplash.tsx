import { useEffect, useRef, useState } from "react";

const SKIP_KEY = "fun_intro_played";
const INTRO_VIDEO_URL = "/assets/intro.mp4";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const [videoSrc, setVideoSrc] = useState(INTRO_VIDEO_URL);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Background caching & offline Blob URL loading
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAndCacheVideo = async () => {
      if (!("caches" in window)) return;
      try {
        const cache = await caches.open("intro-video-cache");
        const cachedResponse = await cache.match(INTRO_VIDEO_URL);

        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          const localUrl = URL.createObjectURL(blob);
          setVideoSrc(localUrl);
        } else {
          // Fetch and cache in background
          fetch(INTRO_VIDEO_URL).then(async (response) => {
            if (response.ok) {
              await cache.put(INTRO_VIDEO_URL, response.clone());
              const blob = await response.blob();
              const localUrl = URL.createObjectURL(blob);
              setVideoSrc(localUrl);
            }
          }).catch(() => {});
        }
      } catch (err) {
        console.warn("Intro cache helper failed:", err);
      }
    };

    loadAndCacheVideo();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // play once per session
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
    // lock scroll while playing
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
        src={videoSrc}
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
