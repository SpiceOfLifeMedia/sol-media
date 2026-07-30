import { Link } from 'wouter';

export function FinalCTA() {
  return (
    <section className="bg-[var(--ink)] py-[96px] md:py-[140px] px-5 md:px-12 text-[var(--paper)] text-center flex flex-col items-center justify-center">
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        <div className="caps-label text-[var(--verm)] mb-8">NEXT STEPS</div>
        
        <h2 className="text-[40px] md:text-[64px] font-[800] leading-[1.05] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
          Ready to become<br/>harder to ignore?
        </h2>
        
        <p className="text-[16px] md:text-[18px] leading-[1.6] text-[rgba(242,238,230,0.7)] max-w-[500px] mb-12">
          Tell us what feels disconnected, outdated or underperforming. We'll recommend the clearest next step.
        </p>
        
        <Link 
          href="/start-a-project" 
          className="bg-[var(--verm)] text-[var(--ink)] text-[16px] font-[750] tracking-[0.02em] px-[40px] py-[20px] w-full md:w-auto hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors text-center inline-block"
        >
          Start a project
        </Link>
        
        <div className="mt-10 caps-label text-[rgba(242,238,230,0.4)]">
          WE'LL RESPOND AS SOON AS POSSIBLE.
        </div>
      </div>
    </section>
  );
}
