import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useSeo } from '@/hooks/useSeo';
import { Link } from 'wouter';

const FULL_CIRCLE_POSTER = 'https://www.fullcirclehairsociety.com/images/hero-reel-poster.jpg';

const scope = [
  'Website strategy and content architecture',
  'Responsive UX/UI design and development',
  'Local SEO foundations and service-page structure',
  'Phorest booking integration and conversion pathways',
  'Social media positioning and content strategy',
];

const decisions = [
  {
    number: '01',
    title: 'Make the local position unmistakable',
    copy: 'The rebuild leads with Seacliff Park and Adelaide, then carries that relevance through service pages, contact information and search metadata. Visitors—and search engines—can understand where the salon is and what it offers immediately.',
  },
  {
    number: '02',
    title: 'Turn services into clear journeys',
    copy: 'Cuts, colour, blondes, balayage, treatments and styling each have a direct path. Pricing, stylist profiles, FAQs and booking links reduce uncertainty and help potential clients choose their next step.',
  },
  {
    number: '03',
    title: 'Build the social system around the real experience',
    copy: 'The social strategy draws from the salon’s strongest material: its people, results, conscious product choices, practical expertise and atmosphere. That creates repeatable content pillars instead of disconnected posts.',
  },
];

export default function FullCircleCaseStudy() {
  useSeo();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 pt-[64px]">
        <article>
          <header className="bg-[var(--ink)] px-5 py-20 text-[var(--paper)] md:px-12 md:py-28">
            <div className="mx-auto max-w-[1440px]">
              <div className="caps-label mb-10 text-[var(--verm)]">FULL CIRCLE HAIR SOCIETY · ADELAIDE</div>
              <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <h1 className="max-w-[13ch] text-[48px] font-[800] leading-[0.97] tracking-[-0.035em] md:text-[82px]">
                  A website rebuild designed to turn local discovery into bookings.
                </h1>
                <div>
                  <p className="mb-8 text-[18px] leading-[1.65] text-[rgba(242,238,230,0.72)]">
                    Full Circle Hair Society needed a digital presence that felt as considered as the salon itself—and a social strategy the team could sustain.
                  </p>
                  <a
                    href="https://www.fullcirclehairsociety.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm)]"
                  >
                    Visit the live website <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          <figure className="relative min-h-[440px] overflow-hidden bg-[var(--ink)] md:min-h-[760px]">
            <img
              src={FULL_CIRCLE_POSTER}
              alt="Full Circle Hair Society salon storefront in Seacliff Park, Adelaide, after its website rebuild"
              title="Full Circle Hair Society website rebuild and social media strategy"
              className="absolute inset-0 h-full w-full object-cover"
              width="1600"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <section className="px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">THE BRIEF</div>
                <h2 className="text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  Calm, capable and easy to choose.
                </h2>
              </div>
              <div className="space-y-7 text-[18px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                <p>
                  The salon already had the essential ingredients: an experienced team, a warm client experience, a clear local presence and a more conscious approach to products. The rebuild needed to translate those strengths into a useful digital system.
                </p>
                <p>
                  The goal was not simply a new visual layer. It was a clearer path from search or social discovery through to services, trust and online booking—supported by a content direction the business could keep using after launch.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">SCOPE</div>
                <h2 className="max-w-[10ch] text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  One connected digital presence.
                </h2>
              </div>
              <ol className="border-t border-[rgba(22,21,15,0.18)]">
                {scope.map((item, index) => (
                  <li key={item} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[rgba(22,21,15,0.18)] py-6 text-[17px] font-[750]">
                    <span className="text-[var(--verm-text-light)]">0{index + 1}</span>
                    <span>
                      {index === 0 ? <Link href="/services/websites-rebuilds" className="underline decoration-[rgba(22,21,15,0.24)] underline-offset-4 hover:text-[var(--verm-text-light)]">{item}</Link> :
                        index === 2 ? <Link href="/services/seo-search-growth" className="underline decoration-[rgba(22,21,15,0.24)] underline-offset-4 hover:text-[var(--verm-text-light)]">{item}</Link> :
                        index === 4 ? <Link href="/services/social-content-systems" className="underline decoration-[rgba(22,21,15,0.24)] underline-offset-4 hover:text-[var(--verm-text-light)]">{item}</Link> : item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="bg-[var(--ink)] px-5 py-20 text-[var(--paper)] md:px-12 md:py-28">
            <div className="mx-auto max-w-[1200px]">
              <div className="caps-label mb-8 text-[var(--verm)]">KEY DECISIONS</div>
              <h2 className="mb-16 max-w-[13ch] text-[42px] font-[800] leading-[1] tracking-[-0.03em] md:text-[66px]">
                The strategy underneath the screen.
              </h2>
              <div className="grid gap-px bg-[rgba(242,238,230,0.18)] lg:grid-cols-3">
                {decisions.map((decision) => (
                  <section key={decision.number} className="bg-[var(--ink)] p-8 md:p-10">
                    <div className="caps-label mb-10 text-[var(--verm)]">{decision.number}</div>
                    <h3 className="mb-6 text-[28px] font-[800] leading-[1.08]">{decision.title}</h3>
                    <p className="text-[15.5px] leading-[1.7] text-[rgba(242,238,230,0.68)]">{decision.copy}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">THE RESULT</div>
                <h2 className="text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  Ready to learn from real behaviour.
                </h2>
              </div>
              <div>
                <p className="mb-8 text-[18px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                  The rebuilt website is now live with a clearer offer, dedicated service journeys, local search foundations, team and review proof, direct Phorest booking and a social strategy grounded in the salon’s actual strengths.
                </p>
                <p className="border-l-2 border-[var(--verm)] pl-6 text-[16px] leading-[1.7] text-[rgba(22,21,15,0.66)]">
                  Launched August 2026. Search visibility, booking behaviour and content performance will be reported once enough post-launch data exists for a meaningful comparison.
                </p>
              </div>
            </div>
          </section>
        </article>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
