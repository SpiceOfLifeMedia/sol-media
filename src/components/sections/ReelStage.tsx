import { useRef, useEffect, useState } from 'react';

const ASSET_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function ReelStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Keep the video out of the initial page load, and respect reduced motion
  // and data-saving preferences. Visitors can still start it manually.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    if (reducedMotion || connection?.saveData) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { rootMargin: '120px 0px', threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    video.load();
    video.play().catch(() => setIsPlaying(false));
  }, [shouldLoadVideo]);

  const handleReplay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (!shouldLoadVideo) {
      setShouldLoadVideo(true);
      return;
    }

    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-[var(--ink-stage)] relative overflow-hidden" style={{ height: 'clamp(240px, 28.75vw, 414px)' }}>

      {/* Real video — autoplay, muted, no controls */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        poster={`${ASSET_PATH}/media/sol-transformation-poster.jpg`}
        preload="none"
        muted
        playsInline
        loop={false}
        onPlay={() => {
          setIsPlaying(true);
          setHasPlayed(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleVideoEnd}
        aria-label="Transformation reel: brand, website, search and content system coming together"
      >
        {shouldLoadVideo && (
          <>
            <source src={`${ASSET_PATH}/media/sol-transformation-hero.webm`} type="video/webm" />
            <source src={`${ASSET_PATH}/media/sol-transformation-hero.mp4`} type="video/mp4" />
          </>
        )}
      </video>

      {/* Stage overlays — sit above video */}

      {/* Top-left: ONE CONNECTED SYSTEM */}
      <div className="absolute top-5 left-5 md:left-12 flex items-center gap-3 z-10 pointer-events-none">
        <div className="w-4 h-[2px] bg-[var(--verm)]"></div>
        <span className="caps-label text-[rgba(242,238,230,0.65)]">ONE CONNECTED SYSTEM</span>
      </div>

      {/* Top-right: SOL mark */}
      <div className="absolute top-5 right-5 md:right-12 z-10 pointer-events-none">
        <img
          src={`${ASSET_PATH}/assets/sol-mark-white.svg`}
          alt=""
          aria-hidden="true"
          className="h-[14px] opacity-90"
        />
      </div>

      {/* Bottom-right: Watch / Replay button */}
      <button
        onClick={handleReplay}
        className="absolute bottom-6 right-5 md:right-12 flex items-center gap-3 text-[rgba(242,238,230,0.75)] hover:text-[var(--paper)] transition-colors z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)] focus-visible:outline-offset-2"
        aria-label={isPlaying ? 'Replay transformation reel' : hasPlayed ? 'Replay transformation reel' : 'Play transformation reel'}
      >
        <span className="caps-label text-[10px] tracking-[.22em]">
          {isPlaying ? 'WATCH THE TRANSFORMATION' : hasPlayed ? 'REPLAY' : 'PLAY THE TRANSFORMATION'}
        </span>
        {/* Play triangle */}
        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[11px] border-l-current border-b-[7px] border-b-transparent" aria-hidden="true"></div>
      </button>

      {/* Bottom progress bar — static decorative */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[rgba(242,238,230,0.14)] z-10 pointer-events-none">
        <div className="h-full bg-[var(--verm)] w-[62%]"></div>
      </div>

    </div>
  );
}
