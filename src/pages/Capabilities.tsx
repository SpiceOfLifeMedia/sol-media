import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Capabilities as CapabilitiesSection } from '@/components/sections/Capabilities';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Capabilities() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[76px]">
        {/* Capabilities Hero */}
        <section className="pt-24 pb-16 px-5 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-[48px] md:text-[80px] leading-[1.02] font-[800] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
              Disciplines built<br/>
              to connect<span className="text-[var(--verm)]">.</span>
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[rgba(22,21,15,0.7)] max-w-[600px]">
              We don't just deliver isolated projects. We build cohesive systems across five core capabilities, ensuring every touchpoint reinforces the next.
            </p>
          </div>
        </section>

        {/* Re-use the capabilities list component */}
        <CapabilitiesSection />
        
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
