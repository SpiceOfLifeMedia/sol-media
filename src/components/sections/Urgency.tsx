import { Reveal } from "@/components/Reveal";

export function Urgency() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    window.scrollTo({
      top: elementRect - bodyRect - offset,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="urgency"
      className="bg-foreground text-background py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="block w-10 h-px bg-accent" />
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent/90">
                  10 / Why now
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05} overflow="visible">
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,4.5vw,3.5rem)] max-w-3xl pb-2">
                Your website is either building trust or{" "}
                <span className="italic text-accent">leaking it.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <p className="text-background/65 leading-relaxed text-base md:text-lg mb-10">
                If your site feels outdated, slow or unclear, people notice
                before they ever contact you. A sharper website changes how
                customers judge the business — before the first call.
              </p>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 text-accent hover:text-accent/80 text-base font-semibold tracking-wide transition-colors"
              >
                Request a Website Review
                <span className="block w-8 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
