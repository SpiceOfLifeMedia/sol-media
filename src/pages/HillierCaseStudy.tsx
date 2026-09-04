import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useSeo } from '@/hooks/useSeo';
import { Link } from 'wouter';

const HILLIER_DESKTOP = '/assets/work/hillier-website-desktop.webp';
const HILLIER_MOBILE = '/assets/work/hillier-website-mobile.webp';

const scope = [
  'Positioning and website strategy',
  'Service architecture across plumbing, drainage, gas and excavation',
  'Responsive UX/UI design and custom development',
  'Local search foundations and dedicated service journeys',
  'Direct-call and structured enquiry pathways',
];

const decisions = [
  {
    number: '01',
    title: 'Put the owner behind the work',
    copy: 'The site opens with Josh, his experience and his way of working. That turns a broad trade offer into a clear promise: straight advice, direct accountability and one experienced person responsible for the job.',
  },
  {
    number: '02',
    title: 'Organise services around real problems',
    copy: 'Plumbing, drainage, gas, hot water and small excavation are separated into direct service journeys, while common-job pathways help homeowners recognise their situation without needing to know the trade terminology.',
  },
  {
    number: '03',
    title: 'Give every enquiry the right next step',
    copy: 'Urgent visitors can call immediately. Everyone else can send a structured brief with the job type, timing, location and optional photos—giving the business useful context before the first conversation.',
  },
];

export default function HillierCaseStudy() {
  useSeo();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 pt-[64px]">
        <article>
          <header className="bg-[var(--ink)] px-5 py-20 text-[var(--paper)] md:px-12 md:py-28">
            <div className="mx-auto max-w-[1440px]">
              <div className="caps-label mb-10 text-[var(--verm)]">HILLIER PLUMBING &amp; EXCAVATION · SOUTH AUSTRALIA</div>
              <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <h1 className="max-w-[13ch] text-[48px] font-[800] leading-[0.97] tracking-[-0.035em] md:text-[82px]">
                  A service website built around trust, clarity and the next call.
                </h1>
                <div>
                  <p className="mb-8 text-[18px] leading-[1.65] text-[rgba(242,238,230,0.72)]">
                    Hillier needed a digital presence that felt as direct and dependable as the work itself—without reducing four connected disciplines to a generic list of services.
                  </p>
                  <a
                    href="https://www.hillierplumbingexcavation.com.au/"
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

          <figure className="relative min-h-[440px] overflow-hidden bg-[#06131b] md:min-h-[760px]">
            <picture>
              <source media="(max-width: 767px)" srcSet={HILLIER_MOBILE} />
              <img
                src={HILLIER_DESKTOP}
                alt="The Hillier Plumbing and Excavation website homepage on desktop and mobile"
                title="Hillier Plumbing and Excavation responsive website"
                className="absolute inset-0 h-full w-full object-cover object-top"
                width="1512"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </figure>

          <section className="px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">THE BRIEF</div>
                <h2 className="text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  Make a capable operator easy to understand—and easy to contact.
                </h2>
              </div>
              <div className="space-y-7 text-[18px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                <p>
                  The business spans everyday plumbing, drainage, gas, hot water and small excavation. The website needed to make that range feel connected, not complicated, while keeping the experience personal and grounded in the person customers would actually meet on site.
                </p>
                <p>
                  The job was to turn practical experience into a useful customer journey: establish trust quickly, help visitors recognise the work they need and give them the right route to call or send a detailed brief.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">SCOPE</div>
                <h2 className="max-w-[10ch] text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  One clear system for a multi-service business.
                </h2>
              </div>
              <ol className="border-t border-[rgba(22,21,15,0.18)]">
                {scope.map((item, index) => (
                  <li key={item} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[rgba(22,21,15,0.18)] py-6 text-[17px] font-[750]">
                    <span className="text-[var(--verm-text-light)]">0{index + 1}</span>
                    <span>
                      {index === 2 ? (
                        <Link href="/services/websites-rebuilds" className="underline decoration-[rgba(22,21,15,0.24)] underline-offset-4 hover:text-[var(--verm-text-light)]">
                          {item}
                        </Link>
                      ) : index === 3 ? (
                        <Link href="/services/seo-search-growth" className="underline decoration-[rgba(22,21,15,0.24)] underline-offset-4 hover:text-[var(--verm-text-light)]">
                          {item}
                        </Link>
                      ) : item}
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
                The business logic behind the design.
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

          <section className="overflow-hidden px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1320px]">
              <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <div className="caps-label mb-7 text-[var(--verm-text-light)]">RESPONSIVE SYSTEM</div>
                  <h2 className="text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                    One direct experience, at every size.
                  </h2>
                </div>
                <p className="max-w-[560px] text-[17px] leading-[1.7] text-[rgba(22,21,15,0.68)] lg:justify-self-end">
                  The desktop experience carries the full service story. The mobile experience keeps the owner, the promise and the fastest contact path in immediate reach.
                </p>
              </div>
              <div className="relative bg-[#06131b] p-3 pb-12 md:p-8 md:pb-16 lg:p-14 lg:pb-20">
                <div className="overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={HILLIER_DESKTOP}
                    alt="Hillier Plumbing and Excavation desktop website design"
                    className="w-full"
                    width="1512"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mx-auto -mt-4 w-[46%] min-w-[170px] max-w-[300px] overflow-hidden rounded-[28px] border-[7px] border-[#0d1114] bg-[#0d1114] shadow-2xl md:absolute md:-bottom-12 md:right-14 md:mt-0 md:w-[24%] lg:right-20">
                  <img
                    src={HILLIER_MOBILE}
                    alt="Hillier Plumbing and Excavation mobile website design"
                    className="w-full rounded-[20px]"
                    width="430"
                    height="932"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">THE RESULT</div>
                <h2 className="text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  A website with a job to do.
                </h2>
              </div>
              <div>
                <p className="mb-8 text-[18px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                  The live website now presents a clear owner-led proposition, dedicated service and common-job journeys, meaningful local context, visible licensing and experience, and an enquiry flow that captures the information needed to respond well.
                </p>
                <p className="border-l-2 border-[var(--verm)] pl-6 text-[16px] leading-[1.7] text-[rgba(22,21,15,0.66)]">
                  Launched September 2026. The service structure and real project stories also create a practical foundation for future search content and a more useful social media calendar.
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
