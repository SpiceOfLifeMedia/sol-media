import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-[var(--ink)] px-5 pb-24 pt-[96px] text-center text-[var(--paper)] md:min-h-[760px] md:px-12 md:pb-28 md:pt-[120px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,69,28,0.13),transparent_48%)]" />

        <div className="hero-float-left absolute left-[-12%] top-[24%] hidden w-[40vw] max-w-[590px] -rotate-[8deg] overflow-hidden rounded-[20px] border-[8px] border-black opacity-25 shadow-2xl md:block">
          <img src="/assets/work/full-circle-website-desktop.png" alt="" className="aspect-[4/3] w-full object-contain object-center" width="1200" height="900" />
        </div>

        <div className="hero-float-centre absolute left-1/2 top-[18%] w-[76vw] max-w-[600px] -translate-x-1/2 rotate-[2deg] overflow-hidden rounded-[24px] border-[9px] border-black opacity-35 shadow-2xl sm:w-[58vw] md:w-[38vw]">
          <img src="/assets/work/hillier-tablet-showcase.webp" alt="" className="aspect-[4/3] w-full object-cover" width="1200" height="900" fetchPriority="high" />
        </div>

        <div className="hero-float-right absolute right-[-12%] top-[29%] hidden w-[40vw] max-w-[590px] rotate-[8deg] overflow-hidden rounded-[20px] border-[8px] border-black opacity-25 shadow-2xl md:block">
          <img src="/assets/work/petiola-wilson-desktop.webp" alt="" className="aspect-[4/3] w-full object-contain object-center" width="1200" height="900" />
        </div>
      </div>

      <div className="absolute inset-0 bg-[rgba(11,10,7,0.48)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-col items-center">
        <h1 className="text-[clamp(44px,8vw,132px)] font-[850] uppercase leading-[0.86] tracking-[-0.065em]" style={{ fontStretch: '125%' }}>
          <span className="block">Websites that</span>
          <span className="block md:whitespace-nowrap">
            Win <span className="text-[var(--verm)]">more work.</span>
          </span>
        </h1>

        <p className="mt-8 max-w-[620px] text-[17px] font-[550] leading-[1.55] text-[rgba(242,238,230,0.86)] md:text-[20px]">
          Designed and built in Adelaide for businesses across Australia.
        </p>

        <Link
          href="/start-a-project"
          className="mt-8 inline-block bg-[var(--verm)] px-9 py-[18px] text-[15px] font-[850] uppercase tracking-[0.03em] text-[var(--ink)] transition-colors hover:bg-[var(--paper)]"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
}
