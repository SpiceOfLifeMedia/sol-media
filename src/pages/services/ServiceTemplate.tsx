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
};

export function ServiceTemplate({ title, tagline, problem, whoFor, inclusions, process, outcome, relatedLinks }: ServiceProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[160px] pb-[96px] px-5 md:px-12 text-[var(--paper)]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
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
