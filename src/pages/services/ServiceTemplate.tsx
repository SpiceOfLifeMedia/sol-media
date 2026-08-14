import { Link } from 'wouter';
import { FinalCTA } from '@/components/sections/FinalCTA';

type ServiceProps = {
  title: string;
  tagline: string;
  problem: string;
  whoFor: string;
  inclusions: string[];
  process: { num: string; title: string; desc: string }[];
  outcome: string;
  relatedLinks: { title: string; href: string }[];
  featuredWork?: {
    title: string;
    description: string;
    href: string;
  };
  detailSection?: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  faqs?: { question: string; answer: string }[];
};

export function ServiceTemplate({ title, tagline, problem, whoFor, inclusions, process, outcome, relatedLinks, featuredWork, detailSection, faqs }: ServiceProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[104px] md:pt-[160px] pb-[80px] md:pb-[96px] px-5 md:px-12 text-[var(--paper)]">
        <div className="max-w-[1440px] mx-auto">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[11px] font-[700] tracking-[0.08em] uppercase text-[rgba(242,238,230,0.55)]">
            <Link href="/" className="hover:text-[var(--paper)] transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/capabilities" className="hover:text-[var(--paper)] transition-colors">CAPABILITIES</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[rgba(242,238,230,0.8)]">
              {title.replace('\n', ' ')}
            </span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-[800px]">
            <h1 className="text-[48px] md:text-[80px] leading-[1] font-[800] tracking-[-0.025em] mb-6 whitespace-pre-line" style={{ fontStretch: '125%' }}>
              {title}<span className="text-[var(--verm)]">.</span>
            </h1>
            <p className="text-[20px] md:text-[24px] leading-[1.4] font-[650] text-[rgba(242,238,230,0.9)] max-w-[600px]">
              {tagline}
            </p>
          </div>
          <Link 
            href="/start-a-project" 
            className="bg-[var(--verm)] text-[var(--ink)] text-[14.5px] font-[750] tracking-[0.02em] px-[28px] py-[16px] w-full md:w-max hover:bg-[var(--verm-pressed)] transition-colors text-center shrink-0"
          >
            Start a project
          </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[var(--paper)] py-[96px] px-5 md:px-12 text-[var(--ink)]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12">
          
          {/* Main content col */}
          <div className="md:col-span-8 flex flex-col gap-16">
            <div>
              <h2 className="text-[28px] font-[800] tracking-[-0.02em] mb-4">The problem it solves.</h2>
              <p className="text-[16px] leading-[1.6] text-[rgba(22,21,15,0.7)] max-w-[600px]">{problem}</p>
            </div>
            
            <div>
              <h2 className="text-[28px] font-[800] tracking-[-0.02em] mb-4">Who it's right for.</h2>
              <p className="text-[16px] leading-[1.6] text-[rgba(22,21,15,0.7)] max-w-[600px]">{whoFor}</p>
            </div>

            <div>
              <h2 className="text-[28px] font-[800] tracking-[-0.02em] mb-6">How it works.</h2>
              <div className="flex flex-col gap-8">
                {process.map(step => (
                  <div key={step.num} className="flex gap-6">
                    <div className="text-[13px] font-[800] text-[var(--verm)] mt-1 shrink-0">{step.num}</div>
                    <div>
                      <h3 className="text-[18px] font-[800] tracking-tight mb-2">{step.title}</h3>
                      <p className="text-[15.5px] leading-[1.5] text-[rgba(22,21,15,0.7)] max-w-[500px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--ink)] text-[var(--paper)] p-8 md:p-12 rounded-sm border-l-4 border-[var(--verm)]">
              <div className="caps-label text-[rgba(242,238,230,0.5)] mb-4">THE COMMERCIAL OUTCOME</div>
              <p className="text-[20px] md:text-[24px] leading-[1.4] font-[650]">{outcome}</p>
            </div>

            {featuredWork && (
              <div className="border border-[rgba(22,21,15,0.16)] bg-white p-8 md:p-10">
                <div className="caps-label mb-4 text-[var(--verm-text-light)]">SELECTED WORK</div>
                <h2 className="mb-4 text-[26px] font-[800] tracking-[-0.02em]">{featuredWork.title}</h2>
                <p className="mb-6 max-w-[620px] text-[15.5px] leading-[1.65] text-[rgba(22,21,15,0.7)]">{featuredWork.description}</p>
                <Link href={featuredWork.href} className="inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm-text-light)]">
                  Read the case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}

            {detailSection && (
              <section aria-labelledby="service-detail-heading" className="border-t border-[rgba(22,21,15,0.16)] pt-12">
                <div className="caps-label mb-5 text-[var(--verm-text-light)]">{detailSection.eyebrow}</div>
                <h2 id="service-detail-heading" className="mb-6 max-w-[16ch] text-[32px] font-[800] leading-[1.08] tracking-[-0.025em] md:text-[44px]">
                  {detailSection.title}
                </h2>
                <div className="max-w-[680px] space-y-5 text-[16px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
                  {detailSection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            )}

            {faqs && faqs.length > 0 && (
              <section aria-labelledby="service-faq-heading" className="border-t border-[rgba(22,21,15,0.16)] pt-12">
                <div className="caps-label mb-5 text-[var(--verm-text-light)]">COMMON QUESTIONS</div>
                <h2 id="service-faq-heading" className="mb-8 text-[32px] font-[800] tracking-[-0.025em] md:text-[42px]">Brand strategy FAQs.</h2>
                <div className="divide-y divide-[rgba(22,21,15,0.16)] border-y border-[rgba(22,21,15,0.16)]">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="group py-6">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] font-[800] leading-[1.35] marker:content-none">
                        {faq.question}
                        <span aria-hidden="true" className="mt-0.5 text-[var(--verm-text-light)] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="max-w-[650px] pt-4 text-[15.5px] leading-[1.7] text-[rgba(22,21,15,0.72)]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-12">
            <div className="bg-[rgba(22,21,15,0.03)] p-8 rounded-sm">
              <h3 className="caps-label text-[rgba(22,21,15,0.5)] mb-6">WHAT'S INCLUDED</h3>
              <ul className="flex flex-col gap-4">
                {inclusions.map((inc, i) => (
                  <li key={i} className="text-[14px] font-[600] text-[var(--ink)] flex items-start gap-3">
                    <span className="text-[var(--verm)] mt-0.5">•</span>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="caps-label text-[rgba(22,21,15,0.5)] mb-4 border-b border-[rgba(22,21,15,0.1)] pb-4">RELATED SERVICES</h3>
              <div className="flex flex-col gap-3 pt-2">
                {relatedLinks.map((link, i) => (
                  <Link key={i} href={link.href} className="text-[15px] font-[650] text-[var(--ink)] hover:text-[var(--verm)] flex items-center justify-between group py-2">
                    {link.title}
                    <span className="transition-transform group-hover:translate-x-1 text-[var(--verm)]">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <FinalCTA />
    </>
  );
}
