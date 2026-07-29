import { useRef, useEffect, useState } from 'react';

const ASSET_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function ReelStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Respect reduced motion — pause on load if user prefers
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleReplay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setIsPlaying(true);
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
        src={`${ASSET_PATH}/media/sol-transformation-hero.mp4`}
        poster={`${ASSET_PATH}/media/sol-transformation-poster.jpg`}
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={handleVideoEnd}
        aria-label="Transformation reel: brand, website, search and content system coming together"
      >
        <source src={`${ASSET_PATH}/media/sol-transformation-hero.webm`} type="video/webm" />
        <source src={`${ASSET_PATH}/media/sol-transformation-hero.mp4`} type="video/mp4" />
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
        aria-label={isPlaying ? 'Replay transformation reel' : 'Play transformation reel'}
      >
        <span className="caps-label text-[10px] tracking-[.22em]">
          {isPlaying ? 'WATCH THE TRANSFORMATION' : 'REPLAY'}
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
