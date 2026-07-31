import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WorkingWith } from '@/components/sections/WorkingWith';
import { FinalCTA } from '@/components/sections/FinalCTA';

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
                Adelaide-based and remote-first, Spice of Life Media assembles and manages the right expertise for each project, working with businesses across Australia and beyond.
              </p>
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
