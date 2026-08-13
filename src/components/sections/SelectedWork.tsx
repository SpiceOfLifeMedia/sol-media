import { Link } from 'wouter';

const FULL_CIRCLE_POSTER = 'https://www.fullcirclehairsociety.com/images/hero-reel-poster.jpg';

export function SelectedWork() {
  return (
    <section className="bg-[var(--paper)] px-5 py-20 text-[var(--ink)] md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-5 border-b border-[rgba(22,21,15,0.18)] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="caps-label mb-5 text-[var(--verm-text-light)]">SELECTED WORK</div>
            <h2 className="max-w-[12ch] text-[44px] font-[800] leading-[0.98] tracking-[-0.03em] md:text-[68px]">
              Strategy made visible<span className="text-[var(--verm)]">.</span>
            </h2>
          </div>
          <Link href="/work" className="group inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm-text-light)]">
            View selected work <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <Link href="/work/full-circle-hair-society" className="group grid overflow-hidden bg-[var(--ink)] text-[var(--paper)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
            <img
              src={FULL_CIRCLE_POSTER}
              alt="Full Circle Hair Society salon storefront in Seacliff Park, Adelaide, featured in an SOL Media website rebuild"
              title="Full Circle Hair Society website rebuild and social media strategy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              loading="lazy"
              decoding="async"
              width="1600"
              height="900"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
          </div>
          <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14">
            <div>
              <div className="caps-label mb-8 text-[var(--verm)]">FULL CIRCLE HAIR SOCIETY · ADELAIDE</div>
              <h3 className="mb-7 text-[36px] font-[800] leading-[1.02] tracking-[-0.025em] md:text-[52px]">
                A calmer digital home for a more conscious salon.
              </h3>
              <p className="max-w-[460px] text-[16px] leading-[1.7] text-[rgba(242,238,230,0.72)]">
                Website rebuild and social media strategy connecting local search, service discovery, team storytelling and direct online booking.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-2 text-[11px] font-[800] tracking-[0.12em] text-[rgba(242,238,230,0.62)]">
              <span>WEB STRATEGY</span><span aria-hidden="true">·</span><span>DESIGN & BUILD</span><span aria-hidden="true">·</span><span>SOCIAL STRATEGY</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
