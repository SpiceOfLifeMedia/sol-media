import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WorkingWith } from '@/components/sections/WorkingWith';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Link } from 'wouter';

export default function Agency() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[76px]">
        <section className="pt-24 pb-0 px-5 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-[48px] md:text-[80px] leading-[1.02] font-[800] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
              The Agency<span className="text-[var(--verm)]">.</span>
            </h1>
            <div className="max-w-[760px] pb-16 space-y-5">
              <p className="text-[20px] md:text-[24px] leading-[1.45] font-[650] text-[var(--ink)]">
                We connect brand, website, search and content under one accountable lead — for established Australian businesses whose digital presence no longer matches the quality of their work.
              </p>
              <p className="text-[16px] md:text-[18px] leading-[1.65] text-[rgba(22,21,15,0.7)] max-w-[680px]">
                Australia-wide and remote-first, Spice of Life Media assembles and manages the right expertise for each project, working with businesses nationwide and beyond.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(22,21,15,0.14)] px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[420px_1fr] lg:items-center lg:gap-[72px]">
            <figure className="order-2 lg:order-1">
              <div className="aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-[var(--ink)]">
                <img
                src="/assets/founder-sam-leverenz-sol-v2.png"
                  alt="Sam Leverenz, founder of SOL Media"
                  className="h-full w-full object-cover object-center"
                  width="1122"
                  height="1402"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 border-t border-[rgba(22,21,15,0.14)] pt-4 text-[10px] font-[750] tracking-[0.2em] text-[rgba(22,21,15,0.56)]">
                SAM LEVERENZ · FOUNDER, SOL MEDIA
              </figcaption>
            </figure>

            <div className="order-1 max-w-[650px] lg:order-2">
              <div className="caps-label mb-7 text-[var(--verm-text-light)]">FOUNDER-LED BY DESIGN</div>
              <h2 className="mb-8 max-w-[12ch] text-[42px] font-[800] leading-[1] tracking-[-0.03em] md:text-[62px]">
                One accountable lead, from brief to launch<span className="text-[var(--verm)]">.</span>
              </h2>
              <p className="max-w-[46ch] text-[17px] leading-[1.75] text-[rgba(22,21,15,0.72)] md:text-[18px]">
                Sam Leverenz founded SOL Media to bring studio-quality brand and web work to Australian service businesses, with the service standard those businesses actually need. He works directly with every client — brief, build, launch — so there is never a gap between who you speak to and who does the work. SOL Media works with businesses across Australia.
              </p>
              <Link
                href="/start-a-project"
                className="group mt-9 inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm-text-light)]"
              >
                Start a conversation <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        <WorkingWith />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
