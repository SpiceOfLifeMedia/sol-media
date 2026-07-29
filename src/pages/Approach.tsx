import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Process } from '@/components/sections/Process';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Approach() {
  useSeo('Approach', 'Five disciplines. One clear path. Identify the gaps, clarify the message, build the foundation, implement with precision, and measure the growth.');

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--ink)] text-[var(--paper)]">
      <Header />
      <main className="flex-1 w-full pt-[76px]">
        <section className="pt-24 pb-16 px-5 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-[48px] md:text-[80px] leading-[1.02] font-[800] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
              Our Approach<span className="text-[var(--verm)]">.</span>
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[rgba(242,238,230,0.7)] max-w-[600px]">
              A proven framework for transforming disconnected digital presence into a coherent, high-performing system.
            </p>
          </div>
        </section>

        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
