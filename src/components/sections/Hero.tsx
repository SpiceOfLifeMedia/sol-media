import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="flex min-h-[720px] flex-col justify-end border-b border-transparent bg-[var(--ink)] pb-0 pt-[60px] md:min-h-[760px] md:pt-[76px]">
      <div className="px-5 pb-16 pt-[80px] md:px-12 md:pb-24 md:pt-[110px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          {/* Left column */}
          <div className="flex flex-col">
            <h1 className="max-w-[13ch] text-[48px] font-[800] leading-[0.96] tracking-[-0.035em] text-[var(--paper)] md:text-[88px]" style={{ fontStretch: '125%' }}>
              Websites that help you win more work<span className="text-[var(--verm)]">.</span>
            </h1>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start gap-7 md:w-[390px]">
            <p className="text-[17px] leading-[1.6] text-[rgba(242,238,230,0.78)] md:text-[19px]">
              We design and build clear, professional websites for Australian businesses. Branding and SEO are included when you need them.
            </p>
            <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                href="/start-a-project"
                className="inline-block w-full bg-[var(--verm)] px-[30px] py-[17px] text-center text-[15px] font-[800] text-[var(--ink)] transition-colors hover:bg-[var(--paper)] sm:w-auto"
              >
                Get a website quote
              </Link>
              <Link
                href="/work"
                className="inline-block border-b border-[rgba(242,238,230,0.4)] pb-0.5 text-[15px] font-[700] text-[var(--paper)] transition-colors hover:border-[var(--verm)] hover:text-[var(--verm)]"
              >
                See our work →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
