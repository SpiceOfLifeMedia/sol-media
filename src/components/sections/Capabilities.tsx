import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'wouter';

const auditSymptoms = [
  { label: 'Unclear offer' },
  { label: 'Confusing pages' },
  { label: 'Not found on Google', google: true },
] as const;
const auditActions = ['Clarify the message', 'Rebuild the page flow', 'Make pages Google-ready'] as const;

function AuditMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
    ) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full px-5 sm:px-8 py-8"
      data-audit-animation={isRevealed ? 'complete' : 'waiting'}
    >
      <div className="audit-story-title">FROM SYMPTOMS TO A CLEAR PLAN</div>

      <div className="audit-story" aria-label="The audit identifies visible problems, connects their causes and turns them into a prioritised action plan">
        <div className="audit-stage audit-stage--symptoms">
          <div className="audit-stage-label">WHAT YOU NOTICE</div>
          <div className="audit-list">
            {auditSymptoms.map((symptom, index) => (
              <div key={symptom.label} className={`audit-symptom audit-item--${index + 1}`}>
                {'google' in symptom ? <Search className="audit-search-mark" aria-hidden="true" /> : <span aria-hidden="true" />}
                {symptom.label}
              </div>
            ))}
          </div>
        </div>

        <div className="audit-flow" aria-hidden="true">
          <span className="audit-flow-line" />
          <span className="audit-flow-arrow">→</span>
        </div>

        <div className="audit-core">
          <span className="audit-core-pulse" aria-hidden="true" />
          <span className="audit-core-kicker">SOL</span>
          <strong>AUDIT</strong>
          <small>finds the cause</small>
        </div>

        <div className="audit-flow audit-flow--out" aria-hidden="true">
          <span className="audit-flow-line" />
          <span className="audit-flow-arrow">→</span>
        </div>

        <div className="audit-stage audit-stage--actions">
          <div className="audit-stage-label">WHAT HAPPENS NEXT</div>
          <div className="audit-list">
            {auditActions.map((action, index) => (
              <div key={action} className={`audit-action audit-item--${index + 1}`}>
                <span>0{index + 1}</span>
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="audit-story-outcome">
        <span>WHY SEO MATTERS</span>
        If Google cannot understand the site, the right customers will not find it.
      </div>
    </div>
  );
}

function BrandMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="brand-study relative flex h-full w-full flex-col items-center justify-center gap-6"
      data-brand-animation={isVisible ? 'playing' : 'paused'}
      aria-label="A brand identity system assembling from a logo mark, typography and colour palette"
    >
      <span className="brand-study-line" aria-hidden="true" />
      <div className="flex items-center gap-6">
        <div className="brand-study-mark flex h-[120px] w-[120px] items-center justify-center bg-[var(--paper)] text-[54px] font-bold text-[var(--ink)] shadow-xl">N</div>
        <div className="brand-study-type flex flex-col gap-2">
          <div className="text-[28px] font-serif font-bold text-[var(--paper)]">Aa</div>
          <div className="text-[12px] tracking-widest text-[rgba(242,238,230,0.5)]">CONCEPT STUDY</div>
        </div>
      </div>
      <div className="brand-study-swatches flex gap-2" aria-label="Brand colour palette">
        <div className="brand-study-swatch h-8 w-12 bg-[var(--paper)]" />
        <div className="brand-study-swatch h-8 w-12 bg-[var(--verm)]" />
        <div className="brand-study-swatch h-8 w-12 bg-[#2A2A2A]" />
        <div className="brand-study-swatch h-8 w-12 bg-[#444]" />
      </div>
    </div>
  );
}

function SeoMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="seo-study relative flex h-full w-full flex-col items-center justify-center gap-6 px-6 sm:px-10"
      data-seo-animation={isVisible ? 'playing' : 'paused'}
      aria-label="A search for brand agency Australia revealing a relevant search result"
    >
      <div className="relative z-10 flex h-[44px] w-full items-center rounded-full bg-[var(--paper)] px-5 shadow-lg">
        <div className="h-4 w-4 flex-none rounded-full border-[2px] border-[var(--ink)]" />
        <span className="seo-typed-text ml-3 text-[14px] font-medium text-[var(--ink)]">brand agency australia</span>
      </div>
      <div className="seo-search-result flex w-full flex-col gap-2">
        <div className="text-[10px] tracking-wider text-[rgba(242,238,230,0.5)]">HOME &gt; SERVICES &gt; WEB DESIGN</div>
        <div className="cursor-pointer text-[20px] font-bold text-[#8AB4F8] hover:underline">Australian Brand Agency | Concept Study</div>
        <div className="mt-1 line-clamp-2 text-[13px] text-[rgba(242,238,230,0.7)]">We audit, sharpen and rebuild the way your business shows up. Clear websites structured for people and search.</div>
      </div>
    </div>
  );
}

const contentCalendarFrames = [
  [4, 9, 12, 18, 22, 25],
  [3, 8, 13, 16, 21, 27],
  [0, 6, 10, 15, 19, 24],
  [2, 5, 11, 14, 20, 26],
] as const;

function ContentMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % contentCalendarFrames.length);
    }, 1450);

    return () => window.clearInterval(timer);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-5 sm:p-8"
      data-content-animation={isVisible ? 'playing' : 'paused'}
      aria-label="A structured content calendar moving planned posts through a repeating publishing rhythm"
    >
      <div className="flex w-full items-center justify-between border-b border-[rgba(242,238,230,0.1)] pb-2 text-[var(--paper)]">
        <span className="text-[12px] font-bold tracking-widest">CONTENT CALENDAR</span>
        <span className="text-[12px] font-bold tracking-widest opacity-50">MAY</span>
      </div>
      <div className="content-calendar-grid">
        {Array.from({ length: 28 }).map((_, index) => (
          <div key={index} className="content-calendar-cell" aria-hidden="true" />
        ))}
        <div className="content-calendar-active-layer" aria-hidden="true">
          {contentCalendarFrames[frame].map((position, index) => (
            <span
              key={index}
              className="content-calendar-tile"
              style={{
                '--calendar-col': position % 7,
                '--calendar-row': Math.floor(position / 7),
                '--calendar-delay': `${index * 45}ms`,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Capabilities() {
  const caps = [
    {
      num: '01',
      title: 'DIGITAL PRESENCE\nAUDIT',
      sub: "Find what's holding the brand back — before anything gets rebuilt.",
      prob: 'Symptoms are easy to see. The audit finds the system underneath them.',
      out: '→ A clear roadmap: what should change, why it matters, and what happens first.',
      inc: 'Website audit · SEO audit · Brand & messaging review · Competitor review · Content review · Customer journey · Conversion review · Prioritised recommendations',
      link: '/services/digital-presence-audit',
      cta: 'Explore the audit',
      label: 'BE UNDERSTOOD · BE FOUND · BE CHOSEN',
      mediaType: 'audit'
    },
    {
      num: '02',
      title: 'BRAND SYSTEMS',
      sub: 'Build a brand people recognise, understand and trust.',
      prob: 'The business has moved forward, but its identity still signals an earlier stage.',
      out: '→ A coherent identity and message that operates consistently across every platform.',
      inc: 'Positioning · Audience · Messaging · Logo direction · Brand kits · Colour & typography · Digital guidelines · Social templates · Campaign direction',
      link: '/services/brand-systems',
      cta: 'Explore brand systems',
      label: 'ONE IDENTITY — EVERY PLATFORM',
      mediaType: 'brand'
    },
    {
      num: '03',
      title: 'WEBSITES &\nREBUILDS',
      sub: 'Turn the website into your strongest digital asset.',
      prob: 'The current website makes it harder for ideal clients to understand the offer and act.',
      out: '→ A premium website that communicates authority, gets found and turns attention into action.',
      inc: 'Website strategy · Information architecture · UX & UI · Website copy · Responsive design · New builds · Complete rebuilds · Landing pages · Conversion pathways · Analytics · Technical launch',
      link: '/services/websites-rebuilds',
      cta: 'Explore website design',
      specialistLink: {
        label: 'Planning an app or digital product? Explore app design',
        href: '/services/app-design'
      },
      label: 'ONE DESIGN — EVERY DEVICE',
      mediaType: 'web'
    },
    {
      num: '04',
      title: 'SEO &\nSEARCH GROWTH',
      sub: 'Get found by the people already looking for what you do.',
      prob: "Good work stays invisible when the site isn't structured for search intent.",
      out: '→ Sustained organic visibility that compounds over time and converts at the right stage.',
      inc: 'Technical SEO · On-page optimisation · Keyword strategy · Content architecture · Local SEO · Link building · Core Web Vitals · Search analytics · Long-term growth planning',
      link: '/services/seo-search-growth',
      cta: 'Explore SEO services',
      label: 'VISIBLE WHERE INTENT IS HIGHEST',
      mediaType: 'seo'
    },
    {
      num: '05',
      title: 'SOCIAL &\nCONTENT SYSTEMS',
      sub: 'Build a content system that runs — not a content calendar that collapses.',
      prob: 'Posting happens, but content is reactive, inconsistent and disconnected from the brand.',
      out: '→ A structured content system that reinforces the brand, builds authority and compounds over time.',
      inc: 'Content strategy · Platform selection · Content calendar · Template design · Campaign frameworks · Short-form video · Captions & copy · Scheduling systems · Performance review',
      link: '/services/social-content-systems',
      cta: 'Explore content systems',
      label: 'CONTENT WITH DIRECTION — NOT JUST POSTS',
      mediaType: 'content'
    }
  ];

  return (
    <section className="bg-[var(--paper)] px-5 md:px-12 pb-[96px]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Capabilities header bar */}
        <div className="flex items-center justify-between py-10 mb-8 border-b border-[rgba(22,21,15,0.18)]">
          <div className="caps-label text-[var(--ink)]">CAPABILITIES</div>
          <div className="caps-label text-[rgba(22,21,15,0.65)]">01–05 · CONNECTED DISCIPLINES</div>
        </div>

        {/* Capability Rows */}
        <div className="flex flex-col gap-20 md:gap-[120px]">
          {caps.map((cap, i) => {
            const isEven = i % 2 !== 0; // 0-indexed, so 1 (02) is even
            const TextBlock = (
              <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
                <div className="text-[13px] font-[800] tracking-[0.12em] text-[var(--verm-text-light)]">{cap.num}</div>
                <h2 className="text-[40px] md:text-[56px] leading-[1] font-[800] tracking-[-0.02em] text-[var(--ink)] whitespace-pre-line" style={{ fontStretch: '125%' }}>
                  {cap.title}
                </h2>
                <div className="text-[20px] md:text-[24px] leading-[1.3] font-[650] text-[var(--ink)] max-w-[26ch] mt-2">
                  {cap.sub}
                </div>
                <p className="text-[15.5px] leading-[1.55] text-[rgba(22,21,15,0.68)] max-w-[46ch]">
                  {cap.prob}
                </p>
                <p className="text-[15.5px] font-[650] text-[var(--ink)] max-w-[46ch]">
                  {cap.out}
                </p>
                <div className="text-[12px] tracking-[0.06em] uppercase leading-[1.9] text-[rgba(22,21,15,0.65)] mt-4">
                  {cap.inc}
                </div>
                <Link href={cap.link} className="group mt-4 text-[13.5px] font-[750] text-[var(--verm-text-light)] flex items-center gap-2 w-max">
                  {cap.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                {'specialistLink' in cap && cap.specialistLink && (
                  <Link
                    href={cap.specialistLink.href}
                    className="group -mt-3 w-fit text-[13px] font-[750] text-[var(--verm-text-light)] transition-colors hover:text-[var(--ink)]"
                  >
                    {cap.specialistLink.label}{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                )}
              </div>
            );

            const MediaBlock = (
              <div className="w-full md:w-[560px] h-[360px] md:h-[440px] bg-[var(--ink-stage)] rounded-sm overflow-hidden relative group hover:-translate-y-2 transition-transform duration-300 flex-shrink-0 flex items-center justify-center">
                {/* Media internals based on type */}
                {cap.mediaType === 'audit' && (
                  <AuditMedia />
                )}
                
                {cap.mediaType === 'brand' && (
                  <BrandMedia />
                )}

                {cap.mediaType === 'web' && (
                  <div className="relative h-full w-full overflow-hidden px-5 py-7 sm:px-8 sm:py-9">
                    <div className="mb-5 flex items-center justify-between text-[8px] font-[800] tracking-[0.14em]">
                      <span className="text-[var(--verm)]">LIVE CLIENT BUILD</span>
                      <span className="text-[rgba(242,238,230,0.48)]">FULL CIRCLE HAIR SOCIETY</span>
                    </div>

                    <div className="relative mx-auto h-[255px] w-full max-w-[450px] sm:h-[315px]">
                      <div className="absolute left-0 top-0 w-[88%] overflow-hidden rounded-[5px] border border-[rgba(242,238,230,0.2)] bg-[#f1dfd5] shadow-2xl">
                        <div className="flex h-5 items-center gap-1.5 border-b border-black/10 bg-[var(--paper)] px-2.5" aria-hidden="true">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--verm)]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                          <span className="ml-2 text-[6px] font-[700] tracking-[0.08em] text-black/45">fullcirclehairsociety.com</span>
                        </div>
                        <img
                          src="/assets/work/full-circle-home-desktop.png"
                          alt="Full Circle Hair Society website designed and built by Spice of Life Media, shown on desktop"
                          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.018]"
                          loading="lazy"
                          decoding="async"
                          width="1440"
                          height="900"
                        />
                      </div>

                      <div className="absolute bottom-0 right-0 w-[27%] overflow-hidden rounded-[12px] border-[3px] border-[var(--paper)] bg-[#f1dfd5] shadow-2xl">
                        <div className="mx-auto mt-1 h-1 w-7 rounded-full bg-black/35" aria-hidden="true" />
                        <img
                          src="/assets/work/full-circle-home-mobile.png"
                          alt="Full Circle Hair Society website designed and built by Spice of Life Media, shown on mobile"
                          className="mt-1 aspect-[390/760] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                          loading="lazy"
                          decoding="async"
                          width="390"
                          height="844"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {cap.mediaType === 'seo' && (
                  <SeoMedia />
                )}

                {cap.mediaType === 'content' && (
                  <ContentMedia />
                )}

                {/* Bottom label */}
                <div className="absolute bottom-5 right-5 text-[9px] font-[800] tracking-[0.15em] text-[rgba(242,238,230,0.6)] z-20 bg-[var(--ink-stage)] px-2">
                  {cap.label}
                </div>
              </div>
            );

            return (
              <div key={cap.num} className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-[80px] pt-12 border-t border-[rgba(22,21,15,0.14)]`}>
                {TextBlock}
                {MediaBlock}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
