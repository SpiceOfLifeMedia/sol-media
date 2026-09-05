import { Link } from 'wouter';

export function BrandKitOffer() {
  return (
    <section className="overflow-hidden bg-[var(--ink)] px-5 py-16 text-[var(--paper)] md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
        <div className="max-w-[610px]">
          <p className="mb-5 text-[13px] font-[850] uppercase tracking-[0.16em] text-[var(--verm)]">
            Free with every website build
          </p>
          <h2 className="text-[42px] font-[850] leading-[0.98] tracking-[-0.04em] md:text-[64px]">
            A brand kit that keeps everything consistent<span className="text-[var(--verm)]">.</span>
          </h2>
          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.55] text-[rgba(242,238,230,0.72)] md:text-[19px]">
            Your website project includes the essentials: logo direction, colour palette and typography.
          </p>
          <Link
            href="/start-a-project"
            className="mt-9 inline-flex w-full items-center justify-between gap-8 bg-[var(--verm)] px-7 py-5 text-[15px] font-[850] text-[var(--ink)] transition-colors hover:bg-[var(--paper)] sm:w-auto"
          >
            Contact us for your free brand kit <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div
          className="brand-kit-board relative mx-auto aspect-[4/3] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[rgba(242,238,230,0.18)] bg-[var(--ink-stage)] p-5 shadow-[0_36px_90px_rgba(0,0,0,0.38)] sm:p-7 md:p-9"
          role="img"
          aria-label="Example brand starter kit showing a logo, colour palette and typography"
        >
          <div className="flex items-center justify-between border-b border-[rgba(242,238,230,0.14)] pb-4" aria-hidden="true">
            <img src="/assets/sol-mark-white.svg" alt="" className="h-[18px] w-auto sm:h-[21px]" width="320" height="108" />
            <span className="text-[12px] font-[800] uppercase tracking-[0.14em] text-[rgba(242,238,230,0.72)] sm:text-[13px]">
              Brand starter kit
            </span>
          </div>

          <div className="grid h-[calc(100%-35px)] grid-cols-[1.08fr_0.92fr] gap-3 pt-4 sm:gap-5 sm:pt-6" aria-hidden="true">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[var(--paper)] p-5 text-[var(--ink)] sm:p-7">
              <div className="relative z-10">
                <span className="text-[12px] font-[850] uppercase tracking-[0.14em] text-[rgba(22,21,15,0.68)] sm:text-[13px]">01 / Logo</span>
                <img src="/assets/sol-mark-ink.svg" alt="" className="mt-7 h-auto w-[62%] sm:mt-10" width="320" height="108" />
              </div>
              <div className="relative z-10 flex items-end justify-between gap-3">
                <span className="text-[30px] font-[850] leading-none tracking-[-0.06em] sm:text-[54px]">SOL</span>
                <span className="hidden text-right text-[12px] font-[850] uppercase leading-[1.45] tracking-[0.1em] text-[var(--ink)] sm:block">
                  Primary mark<br />Secondary mark
                </span>
              </div>
              <span className="absolute -bottom-8 -right-6 z-0 h-24 w-24 rounded-full bg-[var(--verm)] opacity-90 sm:h-36 sm:w-36" />
            </div>

            <div className="grid grid-rows-[1fr_0.9fr] gap-3 sm:gap-5">
              <div className="flex flex-col rounded-[18px] bg-[var(--verm)] p-4 text-[var(--ink)] sm:p-6">
                <span className="block text-center text-[12px] font-[850] uppercase tracking-[0.14em] sm:text-[13px]">02 / Colour</span>
                <div className="mx-auto mt-4 grid min-h-0 w-full flex-1 grid-cols-2 grid-rows-2 gap-2 sm:mt-6 sm:gap-3">
                  <div className="flex items-center justify-center rounded-[10px] bg-[var(--ink)] p-2 text-center text-[11px] font-[800] text-[var(--paper)] sm:p-3 sm:text-[13px]">#16150F</div>
                  <div className="flex items-center justify-center rounded-[10px] bg-[var(--paper)] p-2 text-center text-[11px] font-[800] sm:p-3 sm:text-[13px]">#F2EEE6</div>
                  <div className="col-span-2 flex items-center justify-center rounded-[10px] bg-white p-2 text-center text-[11px] font-[800] sm:p-3 sm:text-[13px]">#FFFFFF</div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[18px] border border-[rgba(242,238,230,0.16)] p-4 sm:p-6">
                <span className="text-[12px] font-[850] uppercase tracking-[0.14em] text-[rgba(242,238,230,0.72)] sm:text-[13px]">03 / Typography</span>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-[42px] font-[850] leading-none tracking-[-0.07em] sm:text-[72px]">Aa</span>
                  <span className="pb-1 text-right text-[11px] font-[750] uppercase leading-[1.55] tracking-[0.08em] text-[rgba(242,238,230,0.68)] sm:text-[12px]">
                    Archivo<br />Bold / Regular
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
