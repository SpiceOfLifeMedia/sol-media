import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[76px] px-5 md:px-12 pb-32">
        <div className="max-w-[800px] mx-auto pt-24">
          <h1 className="text-[40px] md:text-[56px] leading-[1.02] font-[800] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
            Privacy Policy<span className="text-[var(--verm)]">.</span>
          </h1>
          <div className="text-[16px] leading-[1.6] text-[rgba(22,21,15,0.7)] flex flex-col gap-6">
            <p>Privacy policy coming soon.</p>
            <p>
              For any questions regarding your data or privacy, please contact us at{' '}
              <a href="mailto:info@spiceoflifemedia.com.au" className="text-[var(--verm)] hover:underline">
                info@spiceoflifemedia.com.au
              </a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
