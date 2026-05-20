import { Reveal } from "@/components/Reveal";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[82dvh] flex flex-col justify-start bg-background overflow-hidden pt-[100px] md:pt-[108px]"
    >
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-6 md:right-12 top-24 bottom-0 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.18) 50%, transparent 100%)",
          animation: "fadeIn 1.2s ease-out 1.2s both",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 md:px-12 pb-8 md:pb-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-7 md:mb-9">
            <span className="block w-10 h-px bg-accent" />
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/60">
              Adelaide · Premium Digital Media Studio
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} overflow="visible">
          <h1 className="font-serif font-medium text-foreground tracking-[-0.03em] leading-[1.02] text-[clamp(2.25rem,9.5vw,6.25rem)] max-w-[1100px] pb-3 md:pb-4">
            Premium Digital Media{" "}
            <span className="italic text-primary/95">
              &amp; Creative Production.
            </span>
          </h1>
        </Reveal>
      </div>

      <div className="border-t border-foreground/10" />

      <div className="container mx-auto px-6 md:px-12 py-7 md:py-9">
        <Reveal delay={0.15}>
          <div className="flex flex-col md:flex-row md:items-center gap-7 md:gap-12">
            <div className="flex-1 max-w-[560px]">
              <p className="text-foreground/55 text-[15px] md:text-base leading-[1.7]">
                Websites, video, audio, content and brand assets for modern
                businesses, creators and events. One studio, end-to-end —
                produced in Adelaide.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 md:ml-auto">
              <button
                onClick={() => scrollTo("contact")}
                className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-9 py-[18px] text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent hover:text-foreground"
              >
                Start a Project
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="inline-flex items-center justify-center text-foreground/70 hover:text-foreground px-2 py-[18px] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
              >
                View Services
                <span className="ml-2 inline-block">↓</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="hidden md:flex absolute left-6 md:left-12 bottom-8 flex-col items-center gap-3 pointer-events-none"
        style={{ animation: "fadeIn 0.8s ease-out 1.6s both" }}
      >
        <span
          className="block w-px bg-foreground/30"
          style={{ height: "32px", animation: "pulseHeight 2s ease-in-out infinite" }}
        />
        <span className="text-[10px] tracking-[0.18em] uppercase text-foreground/20 [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseHeight {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
