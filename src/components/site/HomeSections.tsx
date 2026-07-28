import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AdvisoryInterface,
  OutgrownTitle,
  ResponsiveAgencyReel,
  SearchJourney,
  usePosterOnly,
} from "@/components/site/AgencyReel";
import { ProjectEnquiry } from "@/components/site/ProjectEnquiry";
import { goToProject } from "@/components/site/SiteHeader";
import {
  capabilities,
  commitments,
  disciplines,
  process,
} from "@/content/home";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.75, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function RevealListItem({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.li
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.75, 0.2, 1] }}
    >
      {children}
    </motion.li>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function ArtImage({
  name,
  width,
  height,
  alt = "",
  className,
}: {
  name: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}) {
  return (
    <picture className={className}>
      <source srcSet={`/media/${name}.avif`} type="image/avif" />
      <source
        srcSet={`/media/${name}-640.webp 640w, /media/${name}.webp ${width}w`}
        type="image/webp"
      />
      <img
        src={`/media/${name}.webp`}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        alt={alt}
      />
    </picture>
  );
}

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy page-grid">
        <Reveal className="hero__headline">
          <h1>
            <span>Built for the business</span>
            {" "}
            <span>you&apos;ve become.</span>
          </h1>
          <p className="hero__location">
            Adelaide, Australia — Working internationally
          </p>
        </Reveal>
        <Reveal className="hero__intro" delay={0.08}>
          <p>
            Spice of Life Media connects brand, web, content and growth for
            established businesses ready to present their value clearly,
            convert the right opportunities and build measurable demand.
          </p>
          <a className="text-link text-link--paper" href="#services">
            Explore our capabilities <span aria-hidden="true">↓</span>
          </a>
        </Reveal>
      </div>

      <Reveal className="hero__reel" delay={0.14}>
        <div className="hero__reel-labels">
          <span>Brand · Original studio study</span>
          <span>Brand · Web · Content · Growth</span>
        </div>
        <ResponsiveAgencyReel />
      </Reveal>
    </section>
  );
}

export function PropositionSection() {
  return (
    <section className="paper-section proposition" aria-labelledby="direction-title">
      <div className="page-grid">
        <Reveal className="proposition__title">
          <SectionLabel>One connected direction</SectionLabel>
          <h2 id="direction-title">Four disciplines. One direction.</h2>
        </Reveal>
        <Reveal className="proposition__copy" delay={0.08}>
          <p>
            Your brand earns attention. Your website turns it into belief. Your
            content keeps you visible. Your growth system turns momentum into
            demand.
          </p>
          <p>
            Bought separately they pull against each other—an identity nobody
            implements, a site with nothing settled to say, content driving
            traffic to a page that can&apos;t convert. Run as one direction,
            each stage makes the next cheaper and faster. You don&apos;t need
            all four at once. You need to know which one is currently costing
            you the most.
          </p>
        </Reveal>
      </div>
      <div className="discipline-grid">
        {disciplines.map(([name, description], index) => (
          <Reveal className="discipline" delay={index * 0.05} key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <p>{description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceVisual({ id }: { id: (typeof capabilities)[number]["id"] }) {
  if (id === "brand") {
    return (
      <div className="service-visual service-visual--brand" aria-hidden="true">
        <OutgrownTitle compact />
      </div>
    );
  }
  if (id === "web") {
    return (
      <div className="service-visual service-visual--web" aria-hidden="true">
        <AdvisoryInterface compact />
      </div>
    );
  }
  if (id === "content") {
    return (
      <div className="service-visual service-visual--content" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
  return (
    <div className="service-visual service-visual--growth" aria-hidden="true">
      <SearchJourney />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="paper-section services" id="services" aria-labelledby="services-title">
      <div className="services__heading">
        <Reveal>
          <SectionLabel>Capabilities</SectionLabel>
          <h2 id="services-title">Start where the business needs it.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>Four capabilities—engage one, or connect them as a single programme.</p>
        </Reveal>
      </div>

      <div className="service-list">
        {capabilities.map((service, index) => (
          <Reveal className="service-row" delay={index * 0.04} key={service.id}>
            <ServiceVisual id={service.id} />
            <div className="service-row__body">
              <p className="service-row__eyebrow">
                {service.number} · {service.name}
              </p>
              <h3>{service.problem}</h3>
              <p>
                <strong>What you get:</strong> {service.outcome}
              </p>
            </div>
            <ul className="service-row__inclusions">
              {service.inclusions.map((inclusion) => (
                <li key={inclusion}>{inclusion}</li>
              ))}
            </ul>
            <a
              className="service-row__arrow"
              href="#start-project"
              aria-label={`Start a ${service.name.toLowerCase()} project`}
              onClick={(event) => {
                event.preventDefault();
                goToProject();
              }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M6 18 18 6M9 6h9v9" />
              </svg>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OutgrownCampaignStudy() {
  return (
    <article className="study movement movement--campaign">
      <div className="campaign-study__lead">
        <div className="movement__meta">
          <span>Movement 01 · Brand & campaign</span>
          <span>Original studio study</span>
        </div>
        <OutgrownTitle />
        <p>
          A campaign about the distance between what a business has become and
          what it still looks like. One typographic device carried across every
          placement—the word visibly outgrowing its own container.
        </p>
      </div>
      <div className="campaign-study__placements">
        <div className="campaign-story">
          <strong>Out<br />grown</strong>
          <span>Still selling the last version of the business.</span>
        </div>
        <div className="campaign-statement">
          <strong>Grew<br />faster<br /><em>than it looks.</em></strong>
        </div>
        <p>48-sheet · 1:1 · 4:5 · Banner · Title</p>
      </div>
    </article>
  );
}

function AdvisoryStudy() {
  return (
    <article className="study movement movement--advisory">
      <div className="movement__intro">
        <div>
          <span>Movement 02 · Flagship website</span>
          <h3>Corporate advisory—original studio study</h3>
        </div>
        <p>
          A separate identity, built from scratch: Newsreader for editorial
          authority, Instrument Sans for interface, graphite and cobalt in
          place of ink and vermilion. None of the Spice of Life Media house
          style carries over.
        </p>
      </div>
      <div className="advisory-study__interface">
        <AdvisoryInterface />
      </div>
    </article>
  );
}

function ContentStudy() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterOnly = usePosterOnly();
  const [showControls, setShowControls] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);

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
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [pausedByUser, posterOnly]);

  return (
    <article className="study movement movement--content">
      <div className="movement__intro movement__intro--dark">
        <div>
          <span>Movement 03 · Content & motion</span>
          <h3>One idea, built to move.</h3>
        </div>
        <p>
          One creative idea carried across stills, short-form and feed formats—
          with human-directed AI imagery and video where it lifts the standard.
        </p>
      </div>
      <div className="content-strip" aria-label="Campaign content formats">
        <div className="content-strip__track">
          <figure className="format format--story format--video">
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="metadata"
              poster="/media/v1-campaign-light-poster.webp"
              controls={showControls}
              aria-label="Campaign light moving across a human figure"
            >
              {!posterOnly && (
                <>
                  <source
                    src="/media/v1-campaign-light.webm"
                    type="video/webm"
                  />
                  <source
                    src="/media/v1-campaign-light.mp4"
                    type="video/mp4"
                  />
                </>
              )}
            </video>
            {!posterOnly && !showControls && (
              <button
                className="format__motion-toggle"
                type="button"
                onClick={() => setPausedByUser((paused) => !paused)}
              >
                {pausedByUser ? "Play motion" : "Pause motion"}
              </button>
            )}
            <figcaption>Campaign light · 9:16</figcaption>
          </figure>
          <figure className="format format--story format--portrait">
            <ArtImage
              name="ai-02-campaign-portrait"
              width={1080}
              height={1920}
              alt="A figure moving through a vermilion campaign field"
            />
            <strong>Out<br />grown</strong>
            <figcaption>Campaign portrait · 9:16</figcaption>
          </figure>
          <figure className="format format--square format--type">
            <strong>Outgrown</strong>
            <span>The market is pricing the gap.</span>
            <figcaption>Social · 1:1</figcaption>
          </figure>
          <figure className="format format--feed format--production">
            <ArtImage
              name="ai-03-production-frame"
              width={1080}
              height={1350}
              alt="A creative operator working across a projected campaign surface"
            />
            <strong>Grew<br />faster</strong>
            <figcaption>Production · 4:5</figcaption>
          </figure>
          <figure className="format format--feed format--paper">
            <strong>Outgrown it</strong>
            <span>Your brand is still selling the last version.</span>
            <figcaption>Feed · 4:5</figcaption>
          </figure>
          <figure className="format format--world">
            <ArtImage
              name="ai-04-campaign-in-world"
              width={1920}
              height={1080}
              alt="A campaign surface glowing above a moving city crowd at night"
            />
            <strong>Outgrown</strong>
            <figcaption>Campaign in the world · 16:9</figcaption>
          </figure>
          <figure className="format format--story format--close">
            <strong>You&apos;ve<br /><em>outgrown</em><br />it.</strong>
            <figcaption>Motion title · 9:16</figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}

function GrowthStudy() {
  const bars = [32, 48, 39, 61, 74, 92];
  const reducedMotion = useReducedMotion();
  return (
    <article className="study movement movement--growth">
      <div className="movement__intro">
        <div>
          <span>Movement 04 · Search → enquiry → measurement</span>
          <h3>The same study, followed all the way to a decision.</h3>
        </div>
        <p>
          Discovery through to reported movement. Relative change only—no
          ranking position, no figures, no claimed outcome.
        </p>
      </div>
      <div className="journey">
        <div className="journey-step journey-step--search">
          <small>01 · Discovery</small>
          <div className="search-box">corporate advisory adelaide</div>
          <div className="search-result">
            <span>www.spiceoflifemedia.com.au/#studio</span>
            <strong>Corporate advisory website study | Spice of Life Media</strong>
          </div>
        </div>
        <div className="journey-step journey-step--landing">
          <small>02 · Landing</small>
          <b>ADVISORY / 02</b>
          <h4>Judgement, when the decision cannot be undone.</h4>
          <span className="cobalt-rule" />
        </div>
        <div className="journey-step journey-step--enquiry">
          <small>03 · Enquiry</small>
          <span>Succession planning</span>
          <span>6–9 months</span>
          <b>Send enquiry</b>
        </div>
        <div className="journey-step journey-step--measure">
          <small>04 · Measurement</small>
          <div className="relative-bars" aria-hidden="true">
            {bars.map((height, index) => (
              <motion.span
                key={height}
                initial={reducedMotion ? false : { scaleY: 0 }}
                whileInView={reducedMotion ? undefined : { scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reducedMotion ? 0 : 0.65,
                  delay: reducedMotion ? 0 : index * 0.06,
                  ease: [0.2, 0.75, 0.2, 1],
                }}
                style={{ height: `${height}%` }}
                className={index === bars.length - 1 ? "is-current" : ""}
              />
            ))}
          </div>
          <p>Relative movement only. No figures claimed.</p>
        </div>
      </div>
      <p className="study-provenance">Original studio studies</p>
    </article>
  );
}

export function StudiesSection() {
  return (
    <section className="paper-section studies" id="studio" aria-labelledby="studies-title">
      <div className="studies__heading">
        <Reveal>
          <SectionLabel>Studio studies</SectionLabel>
          <h2 id="studies-title" className="studies-title">
            <span>Connected</span>
            <span>studio</span>
            <span>studies</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            Two original studies showing how brand, web, content and growth
            work across a complete customer journey.
          </p>
        </Reveal>
      </div>
      <Reveal><OutgrownCampaignStudy /></Reveal>
      <Reveal><AdvisoryStudy /></Reveal>
      <Reveal><ContentStudy /></Reveal>
      <Reveal><GrowthStudy /></Reveal>
    </section>
  );
}

export function ApproachSection() {
  return (
    <section className="paper-section approach" id="approach" aria-labelledby="approach-title">
      <div className="approach__heading">
        <Reveal>
          <SectionLabel>Approach</SectionLabel>
          <h2 id="approach-title">How the work runs</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            Four stages, named checkpoints, and a scope you can hold us to. You
            always know which stage you&apos;re in and what the next decision is.
          </p>
        </Reveal>
      </div>

      <div className="process-list">
        {process.map((stage, index) => (
          <Reveal className="process-stage" delay={index * 0.04} key={stage.number}>
            <span>{stage.number}</span>
            <h3>{stage.name}</h3>
            <p>{stage.description}</p>
          </Reveal>
        ))}
      </div>

      <ul className="commitments">
        {commitments.map((commitment, index) => (
          <RevealListItem delay={index * 0.03} key={commitment}>
            <span>0{index + 1}</span>
            {commitment}
          </RevealListItem>
        ))}
      </ul>
    </section>
  );
}

export function AgencyModelSection() {
  return (
    <section className="paper-section agency-model" aria-labelledby="agency-title">
      <div className="agency-model__title">
        <Reveal>
          <SectionLabel>Agency model</SectionLabel>
          <h2 id="agency-title">Specialists around the work. One connected direction.</h2>
        </Reveal>
      </div>
      <Reveal className="agency-model__copy" delay={0.08}>
        <p>
          Spice of Life Media leads each engagement through one connected
          project team, bringing in the right specialist expertise for the
          agreed scope. Whether the brief involves one capability or four,
          strategy, standards and accountability remain with Spice of Life
          Media from first decision to launch.
        </p>
        <div className="discipline-strip" aria-label="Agency disciplines">
          <span>Strategy</span>
          <span>Creative</span>
          <span>Technology</span>
          <span>Content</span>
          <span>Growth</span>
        </div>
        <p className="agency-fit">
          <strong>Where we fit:</strong> established businesses that have
          outgrown their current presentation and want it fixed properly.{" "}
          <strong>Where we don&apos;t:</strong> disconnected one-off tasks with
          no strategy behind them.
        </p>
      </Reveal>
    </section>
  );
}

export function ConversionSection() {
  return (
    <section className="conversion" id="start-project" aria-labelledby="conversion-title">
      <div className="conversion__intro">
        <Reveal>
          <SectionLabel>Start a project</SectionLabel>
          <h2 id="conversion-title">Make the next version impossible to overlook.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            Tell us where the business is now, where it needs to go and what is
            standing in the way.
          </p>
          <ProjectEnquiry />
          <small>
            Two short steps. A considered response from the agency—not an
            automated sales sequence.
          </small>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <img
        className="wordmark wordmark--footer"
        src="/brand/wordmark-horizontal-white-transparent-1200w.png"
        width="1200"
        height="143"
        alt="Spice of Life Media"
      />
      <div className="site-footer__nav">
        <a href="#services">Services</a>
        <a href="#approach">Approach</a>
        <a href="#studio">Studio</a>
      </div>
      <div className="site-footer__contact">
        <a href="mailto:info@spiceoflifemedia.com.au">
          info@spiceoflifemedia.com.au
        </a>
        <span>Adelaide, Australia</span>
        <span>Working internationally</span>
      </div>
      <div className="site-footer__base">
        <span>© {new Date().getFullYear()} Spice of Life Media</span>
        <span>Brand · Web · Content · Growth</span>
      </div>
    </footer>
  );
}
