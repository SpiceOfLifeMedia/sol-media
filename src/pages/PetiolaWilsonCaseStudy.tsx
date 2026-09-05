import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useSeo } from '@/hooks/useSeo';
import { Link } from 'wouter';

const PETIOLA_DESKTOP = '/assets/work/petiola-wilson-desktop.webp';
const PETIOLA_MOBILE = '/assets/work/petiola-wilson-mobile.webp';

const scope = [
  'Website strategy and culturally respectful content architecture',
  'Responsive UX/UI design and custom development',
  'Clear service pathways for ceremonies, education and consultancy',
  'Gallery, testimonial and trust-building content systems',
  'A structured enquiry experience for events and organisations',
];

const decisions = [
  {
    number: '01',
    title: 'Keep Petiola at the centre',
    copy: 'The opening experience introduces Petiola, his cultural identity and the nature of his work before asking visitors to choose a service. Strong portraiture and considered typography give the person and the story priority.',
  },
  {
    number: '02',
    title: 'Make a broad practice easy to navigate',
    copy: 'Ceremonies, performance, education, consultancy, commissioned artwork and artefacts are organised as distinct services with direct enquiry pathways, while the surrounding content explains how the work is approached.',
  },
  {
    number: '03',
    title: 'Ask for the context that matters',
    copy: 'The enquiry flow captures the organisation, service, date, location, audience, participant numbers and budget when known. Petiola receives a useful event brief, while visitors can still enquire before every detail is settled.',
  },
];

export default function PetiolaWilsonCaseStudy() {
  useSeo();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 pt-[64px]">
        <article>
          <header className="bg-[var(--ink)] px-5 py-20 text-[var(--paper)] md:px-12 md:py-28">
            <div className="mx-auto max-w-[1440px]">
              <div className="caps-label mb-10 text-[var(--verm)]">PETIOLA WILSON · CULTURAL SPEAKER &amp; EDUCATOR</div>
              <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <h1 className="max-w-[13ch] text-[48px] font-[800] leading-[0.97] tracking-[-0.035em] md:text-[82px]">
                  A digital presence shaped around culture, clarity and connection.
                </h1>
                <div>
                  <p className="mb-8 text-[18px] leading-[1.65] text-[rgba(242,238,230,0.72)]">
                    Petiola needed a website that could introduce the person, honour the cultural context of his work and help schools, organisations and event teams enquire with confidence.
                  </p>
                  <a
                    href="https://www.petiolawilson.com.au/"
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

          <figure className="relative min-h-[440px] overflow-hidden bg-[#140e0a] md:min-h-[760px]">
            <picture>
              <source media="(max-width: 767px)" srcSet={PETIOLA_MOBILE} />
              <img
                src={PETIOLA_DESKTOP}
                alt="Petiola Wilson cultural speaker and educator website on desktop and mobile"
                title="Petiola Wilson responsive website case study"
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
                  Let the story lead—and make the practical next step clear.
                </h2>
              </div>
              <div className="space-y-7 text-[18px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                <p>
                  Petiola’s work spans Welcome to Country, Smoking Ceremony, Yidaki performance, cultural education, consultancy, commissioned artwork and artefacts. The website needed to present that range without flattening the meaning behind it.
                </p>
                <p>
                  The design balances cultural storytelling with a clear organisational journey: understand who Petiola is, explore the right service, see the work in real settings and share enough event detail for a considered response.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              <div>
                <div className="caps-label mb-7 text-[var(--verm-text-light)]">SCOPE</div>
                <h2 className="max-w-[11ch] text-[38px] font-[800] leading-[1.03] tracking-[-0.025em] md:text-[54px]">
                  One respectful system for story, services and enquiries.
                </h2>
              </div>
              <ol className="border-t border-[rgba(22,21,15,0.18)]">
                {scope.map((item, index) => (
                  <li key={item} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[rgba(22,21,15,0.18)] py-6 text-[17px] font-[750]">
                    <span className="text-[var(--verm-text-light)]">0{index + 1}</span>
                    <span>
                      {index === 1 ? (
                        <Link href="/services/websites-rebuilds" className="underline decoration-[rgba(22,21,15,0.24)] underline-offset-4 hover:text-[var(--verm-text-light)]">
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
                The thinking behind the experience.
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
                    The same story, with the right rhythm on every screen.
                  </h2>
                </div>
                <p className="max-w-[560px] text-[17px] leading-[1.7] text-[rgba(22,21,15,0.68)] lg:justify-self-end">
                  Desktop gives imagery and context room to breathe. Mobile keeps the introduction, cultural identity and direct enquiry pathways within a clear, focused reading experience.
                </p>
              </div>
              <div className="relative bg-[#140e0a] p-3 pb-12 md:p-8 md:pb-16 lg:p-14 lg:pb-20">
                <div className="overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={PETIOLA_DESKTOP}
                    alt="Petiola Wilson desktop website design"
                    className="w-full"
                    width="1512"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mx-auto -mt-4 w-[46%] min-w-[170px] max-w-[300px] overflow-hidden rounded-[28px] border-[7px] border-[#0d1114] bg-[#0d1114] shadow-2xl md:absolute md:-bottom-12 md:right-14 md:mt-0 md:w-[24%] lg:right-20">
                  <img
                    src={PETIOLA_MOBILE}
                    alt="Petiola Wilson mobile website design"
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
                  A website that feels personal and works practically.
                </h2>
              </div>
              <div>
                <p className="mb-8 text-[18px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                  The live website now connects Petiola’s story, cultural services, on-Country and event imagery, testimonials and respectful acknowledgement with a structured enquiry pathway built for schools, government, community and corporate audiences.
                </p>
                <p className="border-l-2 border-[var(--verm)] pl-6 text-[16px] leading-[1.7] text-[rgba(22,21,15,0.66)]">
                  Launched in 2026. The portfolio presents the completed public website without making unsupported claims about traffic, rankings or enquiry performance.
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
