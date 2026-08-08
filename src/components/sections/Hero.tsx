import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="bg-[var(--ink)] pt-[130px] md:pt-[150px] pb-0 px-5 md:px-12 flex flex-col justify-end min-h-max border-b border-transparent">
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
    </section>
  );
}
