export function Process() {
  const steps = [
    { num: '01', title: 'AUDIT', desc: 'Identify the gaps, inefficiencies and missed opportunities across your digital presence.' },
    { num: '02', title: 'POSITION', desc: 'Clarify the message, audience and competitive angle that everything builds from.' },
    { num: '03', title: 'DESIGN', desc: 'Build the identity, website and content architecture on a clear strategic foundation.' },
    { num: '04', title: 'BUILD', desc: 'Implement with precision — the website, SEO structure and content system, live and working.' },
    { num: '05', title: 'GROW', desc: 'Measure, optimise and expand what\'s working across search, content and conversion.' }
  ];

  return (
    <section className="bg-[var(--ink)] py-[96px] px-5 md:px-12 text-[var(--paper)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="caps-label text-[rgba(242,238,230,0.55)] mb-8">ONE CONNECTED PROCESS</div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-[800] tracking-[-0.025em]" style={{ fontStretch: '125%' }}>
            Five disciplines.<br/>
            One clear path.
          </h2>
          <p className="text-[16px] leading-[1.6] max-w-[340px] text-[rgba(242,238,230,0.8)] pb-2">
            Most agencies hand you a deliverable. We hand you a system.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex-1 flex flex-col relative md:pr-8 pb-10 md:pb-0">
              {/* Connector line (desktop only) */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-[5px] left-[60px] right-8 h-[1px] bg-[rgba(242,238,230,0.15)]"></div>
              )}
              {/* Connector line (mobile only) */}
              {i !== steps.length - 1 && (
                <div className="md:hidden absolute top-[24px] left-[5px] bottom-0 w-[1px] bg-[rgba(242,238,230,0.15)] -z-10"></div>
              )}

              <div className="flex items-center md:items-start gap-4 md:gap-0 md:flex-col mb-4 bg-[var(--ink)] relative z-10 w-max md:w-auto pr-4 md:pr-0">
                <span className="caps-label text-[var(--verm)]">{step.num}</span>
                <span className="text-[18px] font-[800] tracking-tight md:mt-2 mt-0">{step.title}</span>
              </div>
              <p className="text-[14px] leading-[1.6] text-[rgba(242,238,230,0.6)] ml-9 md:ml-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-[13px] text-[rgba(242,238,230,0.4)] border-t border-[rgba(242,238,230,0.1)] pt-6 inline-block">
          Clients can engage one discipline or the full transformation — the process scales to the need.
        </div>
      </div>
    </section>
  );
}
