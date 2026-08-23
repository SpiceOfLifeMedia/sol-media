import { Link } from 'wouter';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSeo } from '@/hooks/useSeo';

const productTypes = [
  {
    num: '01',
    title: 'Customer-facing apps',
    text: 'Booking, ordering, account and service experiences where the interface is part of the product.',
  },
  {
    num: '02',
    title: 'Internal tools',
    text: 'Clearer replacements for spreadsheets, paper forms and outdated systems staff have learned to work around.',
  },
  {
    num: '03',
    title: 'SaaS platforms and portals',
    text: 'Products where onboarding, navigation and everyday workflow determine whether people keep using them.',
  },
  {
    num: '04',
    title: 'Workflow products',
    text: 'Approvals, scheduling, dispatch, compliance and reporting brought into one understandable system.',
  },
] as const;

const valueAreas = [
  ['Strategy & discovery', 'Clarify the product, its users, the commercial constraints and what should not be built yet.'],
  ['UX & interface design', 'Map the structure and design responsive interfaces that make the next action obvious.'],
  ['Prototype & validation', 'Test a realistic clickable product before expensive development decisions are locked in.'],
  ['Design system & handoff', 'Give developers reusable components, states, behaviour notes and specifications they can build from.'],
] as const;

const process = [
  ['01', 'Discover', 'Goals, users and real workflows.'],
  ['02', 'Structure', 'Architecture and user flows.'],
  ['03', 'Prototype', 'Wireframes and clickable journeys.'],
  ['04', 'Design', 'Responsive UX and UI.'],
  ['05', 'Validate', 'Usability and accessibility review.'],
  ['06', 'Handoff', 'Components, specifications and build support.'],
] as const;

const deliverables = [
  'Product strategy and requirements',
  'Information architecture and user flows',
  'Wireframes and interactive prototype',
  'Mobile, tablet and responsive interfaces',
  'Reusable design system and component library',
  'Developer-ready specifications and handoff',
] as const;

const faqs = [
  {
    question: 'Is a prototype the same as a finished app?',
    answer: 'No. A prototype is a realistic, interactive model used to validate the workflow and interface before production development begins. It reduces ambiguity and gives developers a clearer system to build.',
  },
  {
    question: 'Can SOL work with our existing developer or technical team?',
    answer: 'Yes. The design process can run alongside your internal team or development partner, with specifications, component states and direct handoff support included in the agreed scope.',
  },
  {
    question: 'Can you redesign an app we already have?',
    answer: 'Yes. We identify where users hesitate, abandon tasks or contact support, then improve the structure and interface around those points rather than simply restyling the surface.',
  },
  {
    question: 'How long does app design take?',
    answer: 'Timing depends on product complexity, user roles and the level of validation required. You receive a staged scope and schedule before the engagement begins.',
  },
] as const;

function ProductInterfaceStudy() {
  return (
    <div className="relative overflow-hidden border border-[rgba(242,238,230,0.16)] bg-[#0d0d0b] p-5 shadow-2xl md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4 text-[9px] font-[800] uppercase tracking-[0.14em] text-[rgba(242,238,230,0.48)]">
        <span className="text-[var(--verm)]">SOL Product Interface Study</span>
        <span>Conceptual design — not client work</span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <div className="overflow-hidden border border-[rgba(242,238,230,0.14)] bg-[#151512]">
          <div className="flex items-center justify-between border-b border-[rgba(242,238,230,0.1)] px-4 py-3">
            <div>
              <div className="text-[10px] font-[800] tracking-[0.12em] text-[var(--paper)]">OPERATIONS</div>
              <div className="mt-1 text-[9px] text-[rgba(242,238,230,0.45)]">Approvals workspace</div>
            </div>
            <div className="h-7 w-7 rounded-full bg-[var(--verm)] text-center text-[10px] font-[800] leading-7 text-[var(--ink)]">RK</div>
          </div>

          <div className="grid grid-cols-[0.34fr_0.66fr]">
            <div className="border-r border-[rgba(242,238,230,0.08)] p-3 md:p-4">
              {['Overview', 'Projects', 'Tasks', 'Approvals', 'Reporting'].map((item) => (
                <div key={item} className={`mb-2 px-2 py-2 text-[9px] font-[700] ${item === 'Approvals' ? 'bg-[var(--verm)] text-[var(--ink)]' : 'text-[rgba(242,238,230,0.48)]'}`}>
                  {item}
                </div>
              ))}
            </div>
            <div className="p-3 md:p-5">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <div className="text-[9px] font-[800] tracking-[0.12em] text-[rgba(242,238,230,0.45)]">AWAITING REVIEW</div>
                  <div className="mt-1 text-[18px] font-[800] text-[var(--paper)] md:text-[22px]">6 approvals</div>
                </div>
                <div className="bg-[var(--paper)] px-3 py-2 text-[8px] font-[800] text-[var(--ink)]">NEW REQUEST</div>
              </div>
              {[
                ['Purchase order 4471', '$12,400', 'Awaiting'],
                ['Contractor onboarding', '—', 'In review'],
                ['Vehicle service booking', '$1,150', 'Overdue'],
              ].map(([title, value, status]) => (
                <div key={title} className="grid grid-cols-[1fr_auto] gap-3 border-t border-[rgba(242,238,230,0.1)] py-3">
                  <div>
                    <div className="text-[10px] font-[750] text-[var(--paper)] md:text-[12px]">{title}</div>
                    <div className="mt-1 text-[8px] text-[rgba(242,238,230,0.4)]">Operations workflow</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-[800] text-[var(--paper)]">{value}</div>
                    <div className={`mt-1 text-[7px] font-[800] uppercase tracking-[0.1em] ${status === 'Overdue' ? 'text-[var(--verm)]' : 'text-[rgba(242,238,230,0.42)]'}`}>{status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border border-[rgba(242,238,230,0.14)] bg-[var(--paper)] p-4 text-[var(--ink)]">
          <div>
            <div className="mb-5 flex items-center justify-between text-[9px] font-[800] tracking-[0.12em]">
              <span>APPROVALS</span>
              <span className="text-[var(--verm-text-light)]">06</span>
            </div>
            <div className="text-[18px] font-[800] leading-[1.05]">Purchase order 4471</div>
            <div className="mt-2 text-[10px] text-[rgba(22,21,15,0.55)]">Site rollout · raised 2 days ago</div>
            <div className="mt-6 border-y border-[rgba(22,21,15,0.14)] py-4">
              <div className="text-[8px] font-[800] uppercase tracking-[0.1em] text-[rgba(22,21,15,0.45)]">Amount</div>
              <div className="mt-1 text-[22px] font-[800]">$12,400</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2">
            <div className="bg-[var(--verm)] px-2 py-3 text-center text-[9px] font-[800]">APPROVE</div>
            <div className="border border-[rgba(22,21,15,0.18)] px-2 py-3 text-center text-[9px] font-[800]">CHANGES</div>
          </div>
        </div>
      </div>
      <div className="mt-5 text-right text-[9px] font-[800] uppercase tracking-[0.16em] text-[rgba(242,238,230,0.4)]">
        One product system — desktop · tablet · mobile
      </div>
    </div>
  );
}

export default function AppProductDesign() {
  useSeo();

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-[var(--paper)]">
      <Header />
      <main>
        <section className="bg-[var(--ink)] px-5 pb-[72px] pt-[116px] text-[var(--paper)] md:px-12 md:pb-[96px] md:pt-[160px]">
          <div className="mx-auto max-w-[1440px]">
            <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap items-center gap-2 text-[10px] font-[800] uppercase tracking-[0.1em] text-[rgba(242,238,230,0.5)]">
              <Link href="/" className="transition-colors hover:text-[var(--paper)]">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services/websites-rebuilds" className="transition-colors hover:text-[var(--paper)]">Websites & Rebuilds</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[var(--verm)]">App & Product Design</span>
            </nav>

            <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="mb-5 flex items-center gap-3 text-[11px] font-[800] uppercase tracking-[0.12em] text-[var(--verm)]">
                  <span className="h-px w-8 bg-[var(--verm)]" /> Specialist service · Websites & Rebuilds
                </div>
                <h1 className="max-w-[760px] text-[54px] font-[800] leading-[0.95] tracking-[-0.035em] md:text-[86px]" style={{ fontStretch: '125%' }}>
                  App & Product Design<span className="text-[var(--verm)]">.</span>
                </h1>
                <p className="mt-7 max-w-[590px] text-[21px] font-[650] leading-[1.32] md:text-[25px]">
                  Turn complex workflows into digital products people understand and use.
                </p>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-[540px] text-[16px] leading-[1.7] text-[rgba(242,238,230,0.7)] md:text-[17px]">
                  Spice of Life Media shapes app ideas into clear product strategies, intuitive interfaces and developer-ready design systems—before expensive development decisions are locked in.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/start-a-project" className="bg-[var(--verm)] px-7 py-4 text-center text-[14px] font-[800] text-[var(--ink)] transition-colors hover:bg-[var(--verm-pressed)]">
                    Discuss your app
                  </Link>
                  <a href="#process" className="border border-[rgba(242,238,230,0.24)] px-7 py-4 text-center text-[14px] font-[800] transition-colors hover:border-[var(--paper)]">
                    See the design process
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] px-5 pb-[80px] text-[var(--paper)] md:px-12 md:pb-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <ProductInterfaceStudy />
          </div>
        </section>

        <section className="bg-[var(--paper)] px-5 py-[80px] text-[var(--ink)] md:px-12 md:py-[112px]">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">THE REAL PROBLEM</div>
              <h2 className="max-w-[16ch] text-[34px] font-[800] leading-[1.04] tracking-[-0.03em] md:text-[48px]">
                Functional is not the same as usable.
              </h2>
            </div>
            <div className="space-y-6 text-[16px] leading-[1.72] text-[rgba(22,21,15,0.7)] md:text-[17px]">
              <p>An app can work technically and still fail because its workflow is confusing, the interface creates friction or the product was built before the user journey was properly understood.</p>
              <div className="border-l-4 border-[var(--verm)] bg-white p-6 text-[19px] font-[700] leading-[1.45] text-[var(--ink)] md:p-8">
                The outcome: a validated product direction, an interface people can use confidently and a design system developers can build from.
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(22,21,15,0.14)] bg-white px-5 py-[80px] text-[var(--ink)] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
              <div>
                <div className="caps-label mb-5 text-[var(--verm-text-light)]">WHAT WE DESIGN</div>
                <h2 className="text-[38px] font-[800] leading-[1] tracking-[-0.03em] md:text-[54px]">Products built around the work.</h2>
              </div>
              <p className="max-w-[600px] text-[16px] leading-[1.65] text-[rgba(22,21,15,0.65)] md:justify-self-end">
                The scope follows the actual product problem—not a fixed package or a decorative set of screens.
              </p>
            </div>

            <div className="grid border-l border-t border-[rgba(22,21,15,0.14)] md:grid-cols-2 lg:grid-cols-4">
              {productTypes.map((item) => (
                <article key={item.num} className="min-h-[230px] border-b border-r border-[rgba(22,21,15,0.14)] p-7">
                  <div className="mb-10 text-[12px] font-[800] tracking-[0.12em] text-[var(--verm-text-light)]">{item.num}</div>
                  <h3 className="text-[20px] font-[800] leading-[1.1]">{item.title}</h3>
                  <p className="mt-4 text-[14.5px] leading-[1.6] text-[rgba(22,21,15,0.64)]">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
              <div>
                <div className="caps-label mb-5 text-[var(--verm-text-light)]">WHERE SOL ADDS VALUE</div>
                <h2 className="max-w-[10ch] text-[34px] font-[800] leading-[1.02] tracking-[-0.03em] md:text-[46px]">From idea to build-ready system.</h2>
              </div>
              <div className="grid gap-x-8 border-t border-[rgba(22,21,15,0.14)] sm:grid-cols-2">
                {valueAreas.map(([title, text]) => (
                  <div key={title} className="border-b border-[rgba(22,21,15,0.14)] py-7">
                    <h3 className="text-[18px] font-[800]">{title}</h3>
                    <p className="mt-3 text-[14.5px] leading-[1.62] text-[rgba(22,21,15,0.65)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 bg-[var(--ink)] px-5 py-[80px] text-[var(--paper)] md:px-12 md:py-[112px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 max-w-[760px]">
              <div className="caps-label mb-5 text-[var(--verm)]">THE DESIGN PROCESS</div>
              <h2 className="text-[38px] font-[800] leading-[1] tracking-[-0.03em] md:text-[54px]">Six stages, in order.</h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-[rgba(242,238,230,0.62)]">Each stage produces something you can review before the next one begins.</p>
            </div>
            <div className="grid border-l border-t border-[rgba(242,238,230,0.16)] sm:grid-cols-2 lg:grid-cols-3">
              {process.map(([num, title, text]) => (
                <div key={num} className="min-h-[180px] border-b border-r border-[rgba(242,238,230,0.16)] p-7">
                  <div className="text-[12px] font-[800] tracking-[0.12em] text-[var(--verm)]">{num}</div>
                  <h3 className="mt-8 text-[22px] font-[800]">{title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-[rgba(242,238,230,0.58)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--paper)] px-5 py-[80px] text-[var(--ink)] md:px-12 md:py-[112px]">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.58fr_0.42fr] lg:gap-20">
            <div>
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">WHAT YOU RECEIVE</div>
              <h2 className="text-[38px] font-[800] leading-[1] tracking-[-0.03em] md:text-[54px]">Clear decisions. Usable files.</h2>
              <div className="mt-10 grid gap-x-8 border-t border-[rgba(22,21,15,0.14)] sm:grid-cols-2">
                {deliverables.map((item, index) => (
                  <div key={item} className="flex gap-4 border-b border-[rgba(22,21,15,0.14)] py-5 text-[15px] font-[700]">
                    <span className="text-[12px] text-[var(--verm-text-light)]">0{index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <aside className="self-start border-l-4 border-[var(--verm)] bg-white p-7 md:p-9">
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">DEVELOPMENT SCOPE</div>
              <h3 className="text-[24px] font-[800] leading-[1.15]">Design first. The right build path second.</h3>
              <p className="mt-5 text-[15px] leading-[1.7] text-[rgba(22,21,15,0.68)]">
                Full native iOS or Android engineering is not presented as a standard included service. Development and technical implementation are scoped separately around the product, your existing team and the most appropriate delivery approach or partners.
              </p>
            </aside>
          </div>
        </section>

        <section className="border-t border-[rgba(22,21,15,0.14)] bg-white px-5 py-[80px] text-[var(--ink)] md:px-12 md:py-[112px]">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
            <div>
              <div className="caps-label mb-5 text-[var(--verm-text-light)]">COMMON QUESTIONS</div>
              <h2 className="text-[36px] font-[800] leading-[1] tracking-[-0.03em] md:text-[50px]">Before we begin.</h2>
            </div>
            <div className="divide-y divide-[rgba(22,21,15,0.16)] border-y border-[rgba(22,21,15,0.16)]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] font-[800] leading-[1.35] marker:content-none">
                    {faq.question}
                    <span aria-hidden="true" className="mt-0.5 text-[var(--verm-text-light)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[700px] pt-4 text-[15px] leading-[1.72] text-[rgba(22,21,15,0.68)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--verm)] px-5 py-[72px] text-[var(--ink)] md:px-12 md:py-[96px]">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-9 lg:flex-row lg:items-end">
            <div>
              <div className="caps-label mb-5">START HERE</div>
              <h2 className="max-w-[880px] text-[38px] font-[800] leading-[1] tracking-[-0.03em] md:text-[58px]">
                Have an app idea—or a product that is harder to use than it should be?
              </h2>
              <p className="mt-5 max-w-[700px] text-[16px] font-[600] leading-[1.6]">
                Send the workflow, the frustration or the half-formed idea. The first conversation is about whether design is the right next step.
              </p>
            </div>
            <Link href="/start-a-project" className="shrink-0 bg-[var(--ink)] px-8 py-5 text-center text-[15px] font-[800] text-[var(--paper)] transition-transform hover:-translate-y-1">
              Discuss your app →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
