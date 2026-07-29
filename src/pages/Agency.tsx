import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WorkingWith } from '@/components/sections/WorkingWith';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Agency() {
  useSeo('Agency', 'Spice of Life Media is a remote-first agency that assembles and manages the expertise each project requires. High standards. Clear communication.');

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[76px]">
        <section className="pt-24 pb-0 px-5 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-[48px] md:text-[80px] leading-[1.02] font-[800] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
              The Agency<span className="text-[var(--verm)]">.</span>
            </h1>
          </div>
        </section>

        <WorkingWith />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
