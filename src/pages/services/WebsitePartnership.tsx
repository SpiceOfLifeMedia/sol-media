import { Link } from 'wouter';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSeo } from '@/hooks/useSeo';

const comparisonRows = [
  ['Upfront cost', 'Agreed project price, paid to milestones', 'No large upfront build fee'],
  ['Ongoing cost', 'Optional care quoted separately', 'One predictable monthly payment'],
  ['Strategy & custom design', 'Included', 'Included'],
  ['Development & launch', 'Included', 'Included'],
  ['Hosting', 'Optional', 'Included'],
  ['Everyday updates', 'Quoted or covered by a care plan', 'Included, one active request at a time'],
  ['Ongoing improvement', 'Scoped separately', 'Scheduled into the partnership'],
  ['Commercial terms', 'Defined project scope and price', 'Tailored monthly proposal'],
  ['Best for', 'A defined build with a clear handover', 'A website that keeps evolving with the business'],
] as const;

const sharedStandard = [
  ['01', 'Positioning & strategy', 'A clear offer, audience and page structure before visual decisions begin.'],
  ['02', 'Custom design', 'A considered interface shaped around the business—not a recycled template.'],
  ['03', 'Responsive build', 'A fast, accessible experience designed to work across screen sizes.'],
  ['04', 'Search foundations', 'Technical structure, metadata and content hierarchy built for discoverability.'],
  ['05', 'Performance & access', 'A technically sound launch with the right tracking, forms and access in place.'],
  ['06', 'Launch quality', 'Testing, polish and direct support from the same studio that designed the work.'],
] as const;

const everydayUpdates = [
  'Text and image changes',
  'Staff and team updates',
  'Opening hours',
  'Testimonials',
  'Services and pricing',
  'Announcements',
  'Contact details and locations',
] as const;

const separatelyScoped = [
  'Larger new pages or sections',
  'Ecommerce and payment systems',
  'Apps, portals or account logins',
  'Complex third-party integrations',
  'Major redesigns or rebrands',
  'Development unrelated to the agreed website',
] as const;

const included = [
  'Positioning and content structure',
  'Custom desktop and mobile design',
  'Development, testing and launch',
  'SEO foundations and analytics setup',
  'Standard enquiry forms',
  'Use of approved existing brand assets',
  'Direct access to Spice of Life Media',
] as const;

const notIncluded = [
  'Advertising budget or campaign management',
  'Paid third-party licences and subscriptions',
  'Photography or video production',
  'Extensive copywriting beyond the agreed scope',
  'Ecommerce, app or portal development',
  'Ongoing SEO or content production unless agreed',
  'Guaranteed traffic, rankings, enquiries or revenue',
] as const;

const faqs = [
  ['Are both options custom designed?', 'Yes. The partnership changes the commercial structure, not the design standard. Both begin with strategy and are designed around your business.'],
  ['Can I still pay for the website as a project?', 'Yes. The custom project path remains available for businesses that prefer an agreed scope, project price and staged milestones.'],
  ['What counts as an everyday update?', 'Routine changes such as text, images, staff, opening hours, testimonials, services, pricing, announcements and contact details. One active request is worked on at a time.'],
  ['What if I need a new page or integration?', 'Larger additions, new functionality and integrations are scoped separately so timing and cost stay clear before work begins.'],
  ['Is hosting included in the partnership?', 'Yes. Managed website hosting is included in the partnership proposal. Project clients can choose an appropriate hosting arrangement as part of their scope.'],
  ['Can you rebuild an existing website?', 'Yes. SOL can rebuild an existing site where the current structure, design or technology no longer supports the business.'],
  ['Can you support a larger organisation?', 'Yes. The scope, workflow and approval process can be tailored for larger teams and more complex requirements.'],
  ['What are the cancellation and ownership terms?', 'Minimum term, cancellation, ownership, buyout and exit arrangements are set out clearly in the written proposal before you commit.'],
] as const;

function ChoiceCard({
  label,
  title,
  text,
  cta,
  engagement,
}: {
  label: string;
  title: string;
  text: string;
  cta: string;
  engagement: 'custom-project' | 'partnership';
}) {
  return (
    <article className="flex min-h-[320px] flex-col justify-between border border-[rgba(242,238,230,0.16)] bg-[rgba(242,238,230,0.035)] p-7 md:p-9">
      <div>
        <div className="caps-label text-[var(--verm)]">{label}</div>
        <h3 className="mt-9 max-w-[12ch] text-[30px] font-[800] leading-[1.02] tracking-[-0.03em] md:text-[38px]">{title}</h3>
        <p className="mt-5 max-w-[500px] text-[15.5px] leading-[1.68] text-[rgba(242,238,230,0.64)]">{text}</p>
      </div>
      <Link
        href={`/start-a-project?engagement=${engagement}`}
        className="mt-9 inline-flex w-fit items-center gap-3 border-b border-[var(--verm)] pb-2 text-[14px] font-[800] text-[var(--paper)] transition-colors hover:text-[var(--verm)]"
      >
        {cta} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="border-t border-[rgba(22,21,15,0.16)] pt-6">
      <h3 className="text-[20px] font-[800]">{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[14.5px] leading-[1.55] text-[rgba(22,21,15,0.68)]">
            <span className="mt-[0.15em] text-[var(--verm-text-light)]" aria-hidden="true">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WebsitePartnership() {
  useSeo();

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main>
        <section className="bg-[var(--ink)] px-5 pb-[80px] pt-[116px] text-[var(--paper)] md:px-12 md:pb-[112px] md:pt-[160px]">
          <div className="mx-auto max-w-[1440px]">
            <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap items-center gap-2 text-[10px] font-[800] uppercase tracking-[0.1em] text-[rgba(242,238,230,0.5)]">
              <Link href="/" className="transition-colors hover:text-[var(--paper)]">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services/websites-rebuilds" className="transition-colors hover:text-[var(--paper)]">Websites & Rebuilds</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[var(--verm)]">Website Partnership</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div>
                <div className="caps-label mb-5 text-[var(--verm)]">TWO WAYS TO WORK WITH SOL</div>
                <h1 className="max-w-[920px] text-[44px] font-[800] leading-[0.96] tracking-[-0.04em] min-[430px]:text-[52px] md:text-[82px] lg:text-[96px]">
                  One SOL standard. Two ways to work together<span className="text-[var(--verm)]">.</span>
                </h1>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-[580px] text-[17px] leading-[1.72] text-[rgba(242,238,230,0.7)] md:text-[19px]">
                  Commission a defined website project, or choose an ongoing website partnership with no large upfront build fee. Same studio, same design and build standard—a different commercial structure.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#compare" className="bg-[var(--verm)] px-7 py-4 text-center text-[14px] font-[800] text-[var(--ink)] transition-colors hover:bg-[var(--verm-pressed)] hover:text-[var(--paper)]">Compare the options</a>
                  <Link href="/work" className="border border-[rgba(242,238,230,0.24)] px-7 py-4 text-center text-[14px] font-[800] transition-colors hover:border-[var(--paper)]">View our work</Link>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-px bg-[rgba(242,238,230,0.16)] lg:grid-cols-2">
              <ChoiceCard label="OPTION 01 · PAID AS A PROJECT" title="Custom Website Project" text="A defined scope, an agreed project price and staged milestones. Built, launched and handed over as set out in your proposal." cta="Discuss a custom project" engagement="custom-project" />
              <ChoiceCard label="OPTION 02 · NO LARGE UPFRONT BUILD FEE" title="SOL Website Partnership" text="Design, build, hosting, care, everyday updates and ongoing improvement—combined in one tailored monthly proposal." cta="Discuss a partnership" engagement="partnership" />
            </div>
          </div>
        </section>

        <section className="border-b border-[rgba(22,21,15,0.14)] bg-[var(--paper)] px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
            <div>
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">REAL WORK · FULL CIRCLE HAIR SOCIETY</div>
              <h2 className="max-w-[12ch] text-[38px] font-[800] leading-[1] tracking-[-0.03em] md:text-[56px]">One connected digital system.</h2>
              <p className="mt-6 max-w-[570px] text-[16px] leading-[1.72] text-[rgba(22,21,15,0.68)]">
                Full Circle Hair Society brought positioning, identity, website structure and search foundations together so the business could be understood, found and booked more easily.
              </p>
              <p className="mt-5 max-w-[570px] text-[14px] leading-[1.68] text-[rgba(22,21,15,0.56)]">
                This website was delivered as a custom project. The same SOL strategy, design and build standard applies to a website partnership.
              </p>
              <Link href="/work/full-circle-hair-society" className="mt-8 inline-flex items-center gap-3 border-b-2 border-[var(--verm)] pb-2 text-[14px] font-[800]">
                View the case study <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="relative min-h-[430px] overflow-hidden bg-[var(--ink)] p-5 md:min-h-[560px] md:p-9">
              <div className="absolute right-5 top-5 text-[9px] font-[800] uppercase tracking-[0.14em] text-[rgba(242,238,230,0.45)] md:right-9 md:top-8">Designed by SOL</div>
              <div className="absolute bottom-[11%] left-[6%] w-[76%] overflow-hidden border border-[rgba(242,238,230,0.14)] shadow-2xl">
                <img src="/assets/work/full-circle-home-desktop.png" alt="Full Circle Hair Society website designed and built by Spice of Life Media, shown on desktop" className="block h-auto w-full" loading="lazy" />
              </div>
              <div className="absolute bottom-[7%] right-[7%] w-[26%] overflow-hidden border border-[rgba(242,238,230,0.22)] bg-[var(--paper)] shadow-2xl">
                <img src="/assets/work/full-circle-home-mobile.png" alt="Full Circle Hair Society website designed and built by Spice of Life Media, shown on mobile" className="block h-auto w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-24 bg-white px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <div className="caps-label mb-5 text-[var(--verm-text-light)]">COMPARE THE OPTIONS</div>
                <h2 className="text-[40px] font-[800] leading-[0.98] tracking-[-0.035em] md:text-[62px]">Two paths. One standard.</h2>
              </div>
              <p className="max-w-[600px] text-[16px] leading-[1.68] text-[rgba(22,21,15,0.64)] lg:justify-self-end">Choose the commercial structure that fits the way your business wants to invest and operate.</p>
            </div>

            <div className="overflow-x-auto border border-[rgba(22,21,15,0.14)]">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[0.78fr_1fr_1fr] bg-[var(--ink)] text-[var(--paper)]">
                  <div className="p-5 text-[11px] font-[800] uppercase tracking-[0.12em] text-[rgba(242,238,230,0.5)]">Comparison</div>
                  <div className="border-l border-[rgba(242,238,230,0.14)] p-5 text-[16px] font-[800]">Custom Website Project</div>
                  <div className="border-l border-[rgba(242,238,230,0.14)] p-5 text-[16px] font-[800] text-[var(--verm)]">SOL Website Partnership</div>
                </div>
                {comparisonRows.map(([label, project, partnership]) => (
                  <div key={label} className="grid grid-cols-[0.78fr_1fr_1fr] border-t border-[rgba(22,21,15,0.14)] text-[14px] leading-[1.5]">
                    <div className="bg-[rgba(22,21,15,0.025)] p-5 font-[800]">{label}</div>
                    <div className="border-l border-[rgba(22,21,15,0.14)] p-5 text-[rgba(22,21,15,0.67)]">{project}</div>
                    <div className="border-l border-[rgba(22,21,15,0.14)] p-5 font-[650]">{partnership}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[12px] leading-[1.6] text-[rgba(22,21,15,0.5)]">Exact scope, pricing, ownership, term and exit arrangements are confirmed in a written proposal before work begins.</p>
          </div>
        </section>

        <section className="bg-[var(--paper)] px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 max-w-[850px]">
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">THE SOL STANDARD</div>
              <h2 className="text-[38px] font-[800] leading-[1] tracking-[-0.03em] md:text-[58px]">The same standard, whichever path you take.</h2>
            </div>
            <div className="grid border-l border-t border-[rgba(22,21,15,0.14)] md:grid-cols-2 lg:grid-cols-3">
              {sharedStandard.map(([num, title, text]) => (
                <article key={num} className="min-h-[220px] border-b border-r border-[rgba(22,21,15,0.14)] p-7">
                  <div className="text-[11px] font-[800] tracking-[0.12em] text-[var(--verm-text-light)]">{num}</div>
                  <h3 className="mt-9 text-[21px] font-[800]">{title}</h3>
                  <p className="mt-4 text-[14.5px] leading-[1.62] text-[rgba(22,21,15,0.65)]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] px-5 py-[80px] text-[var(--paper)] md:px-12 md:py-[112px]">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-20">
            <div>
              <div className="caps-label mb-5 text-[var(--verm)]">THE PARTNERSHIP DIFFERENCE</div>
              <h2 className="max-w-[11ch] text-[40px] font-[800] leading-[0.98] tracking-[-0.035em] md:text-[62px]">Your website should keep getting better.</h2>
              <p className="mt-6 max-w-[520px] text-[16px] leading-[1.72] text-[rgba(242,238,230,0.65)]">A website is most useful when it can respond to new proof, services, customer questions and opportunities—not sit untouched after launch.</p>
            </div>
            <div>
              <div className="partnership-loop" aria-label="Launch, learn, improve, grow and repeat">
                {['Launch', 'Learn', 'Improve', 'Grow', 'Repeat'].map((item, index) => (
                  <div key={item} className="partnership-loop-step">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
                <span className="partnership-loop-marker" aria-hidden="true" />
              </div>
              <p className="mt-8 border-l-2 border-[var(--verm)] pl-5 text-[18px] font-[700] leading-[1.5] md:text-[21px]">You are not subscribing to server space. You are choosing an ongoing digital partner.</p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
              <div>
                <div className="caps-label mb-5 text-[var(--verm-text-light)]">CLEAR BOUNDARIES</div>
                <h2 className="max-w-[11ch] text-[40px] font-[800] leading-[0.98] tracking-[-0.035em] md:text-[58px]">Everyday updates included.</h2>
                <p className="mt-6 max-w-[490px] text-[15.5px] leading-[1.7] text-[rgba(22,21,15,0.65)]">The partnership is designed to remove friction from routine website upkeep. It does not promise unlimited changes or conceal larger work inside a vague monthly fee.</p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2">
                <ListBlock title="Included as everyday updates" items={everydayUpdates} />
                <ListBlock title="Scoped separately" items={separatelyScoped} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(22,21,15,0.14)] bg-[var(--paper)] px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 max-w-[820px]">
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">HOW EACH PATH WORKS</div>
              <h2 className="text-[40px] font-[800] leading-[0.98] tracking-[-0.035em] md:text-[60px]">Both begin with a conversation and a written proposal.</h2>
            </div>
            <div className="grid gap-px bg-[rgba(22,21,15,0.14)] lg:grid-cols-2">
              <article className="bg-white p-7 md:p-10">
                <div className="caps-label text-[var(--verm-text-light)]">CUSTOM PROJECT</div>
                <ol className="mt-8 space-y-7">
                  {['Agree the project scope, price and milestones.', 'Complete strategy, design and development.', 'Test, launch and complete the agreed handover.', 'Add optional care or future work when needed.'].map((item, index) => (
                    <li key={item} className="grid grid-cols-[34px_1fr] gap-4 text-[15px] leading-[1.55]"><span className="font-[800] text-[var(--verm-text-light)]">{index + 1}</span><span>{item}</span></li>
                  ))}
                </ol>
              </article>
              <article className="bg-[var(--ink)] p-7 text-[var(--paper)] md:p-10">
                <div className="caps-label text-[var(--verm)]">WEBSITE PARTNERSHIP</div>
                <ol className="mt-8 space-y-7">
                  {['Agree the monthly proposal and commercial terms.', 'Complete the same strategy, design and build process.', 'Launch with managed hosting and care in place.', 'Continue with everyday updates and scheduled improvement.'].map((item, index) => (
                    <li key={item} className="grid grid-cols-[34px_1fr] gap-4 text-[15px] leading-[1.55]"><span className="font-[800] text-[var(--verm)]">{index + 1}</span><span className="text-[rgba(242,238,230,0.76)]">{item}</span></li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 max-w-[760px]">
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">SCOPE CLARITY</div>
              <h2 className="text-[40px] font-[800] leading-[0.98] tracking-[-0.035em] md:text-[60px]">Know what the proposal covers.</h2>
            </div>
            <div className="grid gap-12 md:grid-cols-2 md:gap-20">
              <ListBlock title="Typically included" items={included} />
              <ListBlock title="Not included unless agreed" items={notIncluded} />
            </div>
          </div>
        </section>

        <section className="bg-[var(--paper)] px-5 py-[80px] md:px-12 md:py-[112px]">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-20">
            <div>
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">COMMON QUESTIONS</div>
              <h2 className="text-[40px] font-[800] leading-[0.98] tracking-[-0.035em] md:text-[58px]">Clear before you commit.</h2>
            </div>
            <div className="divide-y divide-[rgba(22,21,15,0.16)] border-y border-[rgba(22,21,15,0.16)]">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] font-[800] leading-[1.35] marker:content-none">
                    {question}
                    <span aria-hidden="true" className="mt-0.5 text-[var(--verm-text-light)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[720px] pt-4 text-[15.5px] leading-[1.72] text-[rgba(22,21,15,0.68)]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--verm)] px-5 py-[80px] text-[var(--ink)] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <div className="caps-label mb-5">CHOOSE YOUR PATH</div>
                <h2 className="max-w-[11ch] text-[44px] font-[800] leading-[0.96] tracking-[-0.04em] md:text-[68px]">Which way suits your business?</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/start-a-project?engagement=custom-project" className="group border border-[var(--ink)] bg-[var(--ink)] p-6 text-[var(--paper)] transition-transform hover:-translate-y-1">
                  <span className="text-[10px] font-[800] uppercase tracking-[0.13em] text-[var(--verm)]">OPTION 01</span>
                  <strong className="mt-10 block text-[24px]">Custom project</strong>
                  <span className="mt-3 flex items-center justify-between text-[13px] text-[rgba(242,238,230,0.65)]">Defined scope and milestones <b aria-hidden="true">→</b></span>
                </Link>
                <Link href="/start-a-project?engagement=partnership" className="group border border-[var(--ink)] bg-transparent p-6 transition-transform hover:-translate-y-1">
                  <span className="text-[10px] font-[800] uppercase tracking-[0.13em]">OPTION 02</span>
                  <strong className="mt-10 block text-[24px]">Website partnership</strong>
                  <span className="mt-3 flex items-center justify-between text-[13px] text-[rgba(22,21,15,0.65)]">Ongoing monthly relationship <b aria-hidden="true">→</b></span>
                </Link>
              </div>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-[rgba(22,21,15,0.35)] pt-6 text-[11px] font-[800] uppercase tracking-[0.12em]">
              <span>Founder direct</span><span>Adelaide based</span><span>Australia-wide</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
