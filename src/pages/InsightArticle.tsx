import { Link } from 'wouter';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useSeo } from '@/hooks/useSeo';
import { getInsight } from '@/lib/insights';
import NotFound from '@/pages/not-found';

type InsightArticleProps = {
  slug: string;
};

export default function InsightArticle({ slug }: InsightArticleProps) {
  useSeo();
  const insight = getInsight(slug);

  if (!insight) return <NotFound />;

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[64px]">
        <article>
          <header className="bg-[var(--ink)] px-5 py-20 text-[var(--paper)] md:px-12 md:py-28">
            <div className="mx-auto max-w-[1120px]">
              <Link href="/insights" className="caps-label mb-12 inline-flex items-center gap-2 text-[var(--verm)]">
                ← ALL INSIGHTS
              </Link>
              <div className="mb-8 flex flex-wrap items-center gap-3 text-[12px] text-[rgba(242,238,230,0.58)]">
                <span className="caps-label text-[var(--verm)]">{insight.category}</span>
                <span aria-hidden="true">•</span>
                <time dateTime={insight.published}>{insight.displayDate}</time>
                <span aria-hidden="true">•</span>
                <span>{insight.readTime}</span>
              </div>
              <h1
                className="max-w-[18ch] text-[45px] font-[800] leading-[1.01] tracking-[-0.03em] md:text-[72px]"
                style={{ fontStretch: '125%' }}
              >
                {insight.title}
              </h1>
            </div>
          </header>

          <div className="px-5 py-16 md:px-12 md:py-24">
            <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-20">
              <aside className="h-max border-t border-[rgba(22,21,15,0.18)] pt-5 lg:sticky lg:top-24">
                <div className="caps-label mb-4 text-[rgba(22,21,15,0.5)]">IN THIS ARTICLE</div>
                <ol className="space-y-3 text-[13px] leading-[1.45] text-[rgba(22,21,15,0.7)]">
                  {insight.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a className="transition-colors hover:text-[var(--verm-text-light)]" href={`#section-${index + 1}`}>
                        {String(index + 1).padStart(2, '0')} · {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </aside>

              <div>
                <p className="mb-16 border-b border-[rgba(22,21,15,0.16)] pb-14 text-[22px] font-[650] leading-[1.5] tracking-[-0.01em] md:text-[28px]">
                  {insight.intro}
                </p>

                <div className="space-y-16">
                  {insight.sections.map((section, index) => (
                    <section id={`section-${index + 1}`} key={section.heading} className="scroll-mt-24">
                      <div className="caps-label mb-5 text-[var(--verm-text-light)]">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h2 className="mb-6 text-[30px] font-[800] leading-[1.08] tracking-[-0.02em] md:text-[40px]">
                        {section.heading}
                      </h2>
                      <div className="space-y-5 text-[17px] leading-[1.78] text-[rgba(22,21,15,0.76)]">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.bullets && (
                        <ul className="mt-7 space-y-4 border-l-2 border-[var(--verm)] pl-6 text-[16px] leading-[1.65] text-[rgba(22,21,15,0.76)]">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                      {section.callout && (
                        <blockquote className="mt-8 bg-[var(--ink)] p-7 text-[21px] font-[700] leading-[1.45] text-[var(--paper)] md:p-9 md:text-[25px]">
                          {section.callout}
                        </blockquote>
                      )}
                    </section>
                  ))}
                </div>

                <div className="mt-20 border-y border-[rgba(22,21,15,0.18)] py-8">
                  <div className="caps-label mb-3 text-[rgba(22,21,15,0.5)]">RELATED CAPABILITY</div>
                  <Link href={insight.relatedService.href} className="group inline-flex items-center gap-2 text-[18px] font-[800] text-[var(--verm-text-light)]">
                    {insight.relatedService.label} <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
