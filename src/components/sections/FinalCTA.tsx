import { Link } from 'wouter';

export function FinalCTA() {
  return (
    <section className="flex flex-col items-center justify-center bg-[var(--ink)] px-5 py-[88px] text-center text-[var(--paper)] md:px-12 md:py-[120px]">
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        <h2 className="mb-7 text-[42px] font-[800] leading-[1.02] tracking-[-0.025em] md:text-[64px]" style={{ fontStretch: '125%' }}>
          Ready for a better website?
        </h2>
        
        <p className="mb-10 max-w-[500px] text-[17px] leading-[1.6] text-[rgba(242,238,230,0.7)]">
          Tell us what you need and we’ll get back to you with a clear next step.
        </p>
        
        <Link 
          href="/start-a-project" 
          className="bg-[var(--verm)] text-[var(--ink)] text-[16px] font-[750] tracking-[0.02em] px-[40px] py-[20px] w-full md:w-auto hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors text-center inline-block"
        >
          Get a website quote
        </Link>
      </div>
    </section>
  );
}
