import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="bg-[var(--ink)] pt-[60px] md:pt-[76px] pb-0 flex flex-col justify-end min-h-max border-b border-transparent">
      <Link
        href="/website-launch-special"
        className="group block bg-[var(--verm)] px-5 py-4 text-[var(--ink)] transition-colors hover:bg-[var(--verm-pressed)] md:px-12"
        aria-label="View the $879 Website Launch Special"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-[11px] font-[800] uppercase tracking-[0.16em]">Website Launch Special</span>
            <span className="hidden h-4 w-px bg-[rgba(22,21,15,0.28)] sm:block" aria-hidden="true" />
            <span className="text-[14px] font-[650] leading-[1.45] md:text-[15px]">
              A focused website, Brand Starter Kit and essential SEO — $879. Limited to 20 accepted projects.
            </span>
          </div>
          <span className="shrink-0 text-[12px] font-[800] uppercase tracking-[0.12em] underline decoration-[1.5px] underline-offset-4 transition-transform group-hover:translate-x-1">
            View the special →
          </span>
        </div>
      </Link>

      <div className="px-5 pt-[54px] md:px-12 md:pt-[74px]">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row md:justify-between md:items-end gap-10 md:gap-0 pb-12">
          {/* Left column */}
          <div className="flex flex-col">
            <h1 className="text-[40px] md:text-[74px] leading-[1.02] font-[800] tracking-[-0.025em] text-[var(--paper)] max-w-[16ch]" style={{ fontStretch: '125%' }}>
              Your brand just got<br />
              harder to ignore<span className="text-[var(--verm)]">.</span>
            </h1>
            <div className="mt-6 caps-label text-[rgba(242,238,230,0.65)] flex items-center justify-center md:justify-start gap-2">
              BRAND <span className="text-[var(--verm)]">•</span> WEB <span className="text-[var(--verm)]">•</span> SEARCH <span className="text-[var(--verm)]">•</span> CONTENT
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col md:w-[340px] gap-6 text-center md:text-left items-center md:items-start">
            <p className="text-[14px] md:text-[16px] leading-[1.58] text-[rgba(242,238,230,0.78)]">
              We audit, sharpen and rebuild the way your business shows up — from brand identity and premium websites to SEO and social content systems. Based in Adelaide, working with ambitious businesses across Australia.
            </p>
            <div className="flex flex-col w-full gap-4 items-center md:items-start mt-2">
              <Link
                href="/start-a-project"
                className="bg-[var(--verm)] text-[var(--ink)] text-[14.5px] font-[750] tracking-[0.02em] px-[28px] py-[16px] w-full md:w-max hover:bg-[var(--verm-pressed)] hover:text-[var(--ink)] transition-colors inline-block"
              >
                Start a project
              </Link>
              <Link
                href="/capabilities"
                className="text-[var(--paper)] text-[14px] font-[600] border-b border-[rgba(242,238,230,0.4)] pb-0.5 hover:text-[var(--verm)] hover:border-[var(--verm)] transition-colors inline-block"
              >
                Explore our capabilities →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
