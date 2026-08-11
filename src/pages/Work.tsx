import { Link } from 'wouter';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useSeo } from '@/hooks/useSeo';

const FULL_CIRCLE_POSTER = 'https://www.fullcirclehairsociety.com/images/hero-reel-poster.jpg';

export default function Work() {
  useSeo();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 pt-[64px]">
        <section className="px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="caps-label mb-8 text-[var(--verm-text-light)]">SELECTED WORK</div>
            <div className="grid gap-10 border-b border-[rgba(22,21,15,0.18)] pb-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:pb-20">
              <h1 className="max-w-[12ch] text-[50px] font-[800] leading-[0.97] tracking-[-0.035em] md:text-[86px]">
                Work built to move the business forward<span className="text-[var(--verm)]">.</span>
              </h1>
              <p className="max-w-[520px] text-[17px] leading-[1.65] text-[rgba(22,21,15,0.7)] md:justify-self-end md:text-[19px]">
                Selected website, search and content systems shaped around real business problems—not isolated deliverables.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto max-w-[1440px]">
            <Link href="/work/full-circle-hair-society" className="group grid overflow-hidden border border-[rgba(22,21,15,0.16)] lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative min-h-[420px] overflow-hidden bg-[var(--ink)] lg:min-h-[620px]">
                <img
                  src={FULL_CIRCLE_POSTER}
                  alt="Full Circle Hair Society storefront in Seacliff Park"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  width="1600"
                  height="900"
                />
              </div>
              <div className="flex flex-col justify-between bg-white p-8 md:p-12">
                <div>
                  <div className="caps-label mb-8 text-[var(--verm-text-light)]">01 · FULL CIRCLE HAIR SOCIETY</div>
                  <h2 className="mb-7 text-[38px] font-[800] leading-[1.02] tracking-[-0.025em] md:text-[54px]">
                    Website rebuild and social media strategy.
                  </h2>
                  <p className="text-[16px] leading-[1.7] text-[rgba(22,21,15,0.68)]">
                    A connected digital presence for a boutique Adelaide salon—clearer services, stronger local relevance and a direct route from discovery to booking.
                  </p>
                </div>
                <div className="mt-12 inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm-text-light)]">
                  Read the case study <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
