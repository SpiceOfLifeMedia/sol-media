import { useEffect, useRef, useState } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function shouldUsePosterOnly() {
  if (typeof window === "undefined") return false;
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Boolean(connection?.saveData) ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

export function usePosterOnly() {
  const [posterOnly, setPosterOnly] = useState(shouldUsePosterOnly);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const update = () =>
      setPosterOnly(
        reduced.matches ||
          Boolean(connection?.saveData) ||
          connection?.effectiveType === "slow-2g" ||
          connection?.effectiveType === "2g",
      );
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  return posterOnly;
}

export function ResponsiveAgencyReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterOnly = usePosterOnly();
  const [showControls, setShowControls] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 620px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 620px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (posterOnly || pausedByUser) {
      videoRef.current?.pause();
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => setShowControls(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    const target = video.parentElement;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [mobile, pausedByUser, posterOnly]);

  const reel = mobile ? "mobile" : "desktop";

  return (
    <div className="agency-reel">
      <video
        key={reel}
        ref={videoRef}
        className="agency-reel__video"
        poster={`/media/reel-poster-${reel}.webp`}
        muted
        playsInline
        loop
        preload="metadata"
        controls={showControls}
        tabIndex={-1}
        aria-hidden="true"
      >
        {!posterOnly && (
          <>
            <source src={`/media/reel-${reel}.webm`} type="video/webm" />
            <source src={`/media/reel-${reel}.mp4`} type="video/mp4" />
          </>
        )}
      </video>
      {!posterOnly && !showControls && (
        <button
          className="agency-reel__toggle"
          type="button"
          onClick={() => setPausedByUser((paused) => !paused)}
        >
          {pausedByUser ? "Play reel" : "Pause reel"}
        </button>
      )}
    </div>
  );
}

export function OutgrownTitle({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`outgrown-title${compact ? " is-compact" : ""}`}>
      <span>You&apos;ve</span>
      <strong>outgrown</strong>
      <span>it.</span>
    </div>
  );
}

export function AdvisoryInterface({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`advisory-ui${compact ? " is-compact" : ""}`}>
      <div className="advisory-ui__header">
        <b>ADVISORY / STUDY 02</b>
        <div>
          <span>Capabilities</span>
          <span>Sectors</span>
          <span>People</span>
          <span>Insight</span>
          <em>Enquire</em>
        </div>
      </div>
      <div className="advisory-ui__body">
        <div className="advisory-ui__copy">
          <small>Corporate advisory · Adelaide</small>
          <h3>Judgement, when the decision cannot be undone.</h3>
          {!compact && (
            <p>
              Transactions, restructures and succession for boards where the
              reasoning matters more than the pitch.
            </p>
          )}
          <span className="advisory-ui__cta">Request a conversation</span>
        </div>
        <picture className="advisory-ui__portrait">
          <source
            srcSet="/media/ai-01-advisory-hero.avif"
            type="image/avif"
          />
          <img
            src="/media/ai-01-advisory-hero.webp"
            width="1080"
            height="1350"
            alt=""
          />
        </picture>
      </div>
      <div className="advisory-ui__index">
        <span>01 Transactions</span>
        <span>02 Restructure</span>
        <span>03 Succession</span>
        <span>04 Governance</span>
      </div>
    </div>
  );
}

export function SearchJourney() {
  return (
    <div className="reel-search">
      <div className="reel-search__query">corporate advisory adelaide</div>
      <div className="reel-search__result">
        <small>www.spiceoflifemedia.com.au/#studio</small>
        <strong>Corporate advisory website study | Spice of Life Media</strong>
      </div>
      <div className="reel-search__bars">
        {[28, 42, 35, 58, 73, 88].map((height, index) => (
          <span
            key={height}
            style={{ height: `${height}%` }}
            className={index === 5 ? "is-current" : ""}
          />
        ))}
      </div>
    </div>
  );
}

export function ReelStage({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`reel-stage${mobile ? " reel-stage--mobile" : ""}`}>
      <section className="reel-scene reel-scene--one" style={{ "--scene": 0 } as React.CSSProperties}>
        <small>01 · Brand · Original studio study</small>
        <OutgrownTitle />
        <p>The business changed. The brand didn&apos;t. The market is pricing the gap.</p>
      </section>

      <section className="reel-scene reel-scene--two" style={{ "--scene": 1 } as React.CSSProperties}>
        <div className="placement placement--wide">48-sheet</div>
        <div className="placement placement--story"><span>Out<br />grown</span></div>
        <div className="placement placement--square">Outgrown</div>
        <div className="placement placement--feed"><span>Grew<br />faster</span></div>
        <div className="placement placement--banner">You&apos;ve outgrown it.</div>
      </section>

      <section className="reel-scene reel-scene--three" style={{ "--scene": 2 } as React.CSSProperties}>
        <AdvisoryInterface compact={mobile} />
      </section>

      <section className="reel-scene reel-scene--four" style={{ "--scene": 3 } as React.CSSProperties}>
        <div className="device device--desktop">
          <AdvisoryInterface compact />
        </div>
        <div className="device device--tablet">
          <AdvisoryInterface compact />
        </div>
        <div className="device device--phone">
          <AdvisoryInterface compact />
        </div>
      </section>

      <section className="reel-scene reel-scene--five" style={{ "--scene": 4 } as React.CSSProperties}>
        <div className="content-frame content-frame--video">
          <video
            src="/media/v1-campaign-light.mp4"
            muted
            playsInline
            loop
            autoPlay
          />
        </div>
        <div className="content-frame content-frame--portrait">
          <img
            src="/media/ai-02-campaign-portrait.webp"
            width="1080"
            height="1920"
            alt=""
          />
          <strong>Out<br />grown</strong>
        </div>
        <div className="content-frame content-frame--type">Outgrown</div>
        <div className="content-frame content-frame--production">
          <img
            src="/media/ai-03-production-frame.webp"
            width="1080"
            height="1350"
            alt=""
          />
          <strong>Grew<br />faster</strong>
        </div>
        {!mobile && (
          <div className="content-frame content-frame--world">
            <img
              src="/media/ai-04-campaign-in-world.webp"
              width="1920"
              height="1080"
              alt=""
            />
            <strong>Outgrown</strong>
          </div>
        )}
      </section>

      <section className="reel-scene reel-scene--six" style={{ "--scene": 5 } as React.CSSProperties}>
        <div className="reel-final__brand">
          <OutgrownTitle compact />
        </div>
        <div className="reel-final__advisory">
          <AdvisoryInterface compact />
        </div>
        <div className="reel-final__content">
          <div className="mini-frames">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="reel-final__growth">
          <SearchJourney />
        </div>
      </section>
    </div>
  );
}
