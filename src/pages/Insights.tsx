import { Link } from 'wouter';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useSeo } from '@/hooks/useSeo';
import { INSIGHTS } from '@/lib/insights';

export default function Insights() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[64px]">
        <section className="px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="caps-label mb-8 text-[var(--verm-text-light)]">INSIGHTS</div>
            <div className="grid gap-10 border-b border-[rgba(22,21,15,0.18)] pb-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:pb-20">
              <h1
                className="max-w-[12ch] text-[48px] font-[800] leading-[0.98] tracking-[-0.03em] md:text-[80px]"
                style={{ fontStretch: '125%' }}
              >
                Clear thinking for businesses ready to grow<span className="text-[var(--verm)]">.</span>
              </h1>
              <p className="max-w-[520px] text-[17px] leading-[1.65] text-[rgba(22,21,15,0.7)] md:justify-self-end md:text-[19px]">
                Practical perspectives on brand, websites, search and content—written for established Australian businesses making consequential digital decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-3">
            {INSIGHTS.map((insight, index) => (
              <article
                key={insight.slug}
                className={`group flex min-h-[460px] flex-col border border-[rgba(22,21,15,0.16)] p-7 transition-colors hover:border-[var(--verm)] md:p-9 ${
                  index === 0 ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-white text-[var(--ink)]'
                }`}
              >
                <div className={`caps-label mb-12 ${index === 0 ? 'text-[var(--verm)]' : 'text-[var(--verm-text-light)]'}`}>
                  {insight.category}
                </div>
                <h2 className="mb-6 text-[30px] font-[800] leading-[1.08] tracking-[-0.02em] md:text-[36px]">
                  {insight.title}
                </h2>
                <p className={`text-[15.5px] leading-[1.65] ${index === 0 ? 'text-[rgba(242,238,230,0.72)]' : 'text-[rgba(22,21,15,0.68)]'}`}>
                  {insight.excerpt}
                </p>
                <div className="mt-auto pt-10">
                  <div className={`mb-5 flex gap-3 text-[12px] ${index === 0 ? 'text-[rgba(242,238,230,0.55)]' : 'text-[rgba(22,21,15,0.55)]'}`}>
                    <span>{insight.displayDate}</span>
                    <span aria-hidden="true">•</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <Link
                    href={`/insights/${insight.slug}`}
                    className={`inline-flex items-center gap-2 text-[14px] font-[750] ${index === 0 ? 'text-[var(--verm)]' : 'text-[var(--verm-text-light)]'}`}
                  >
                    Read insight <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
