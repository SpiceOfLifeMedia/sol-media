import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-abstract.png";

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
      className="relative min-h-[100dvh] flex items-end pt-32 pb-16 md:pb-24 overflow-hidden bg-background"
    >
      {/* Subtle radial wash */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[60vw] h-[60vw] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[40vw] h-[40vw] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      {/* Floating, off-grid image — desktop only, sits behind type */}
      <div className="hidden lg:block absolute top-[18vh] right-[-6vw] w-[58vw] h-[68vh] z-0 pointer-events-none">
        <Reveal direction="left" className="h-full">
          <div className="relative h-full w-full">
            <div className="absolute inset-y-8 inset-x-12 bg-primary/[0.06] rounded-sm" />
            <img
              src={heroImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-left rounded-sm shadow-[0_40px_120px_-30px_rgba(31,36,51,0.35)]"
            />
            <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-background/85 via-background/10 to-transparent" />
          </div>
        </Reveal>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 xl:col-span-7">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="block w-10 h-px bg-accent" />
              <p className="text-[10px] md:text-xs font-medium tracking-[0.28em] uppercase text-foreground/60">
                Adelaide · Premium Digital Studio
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[0.95] text-[clamp(3.25rem,9vw,8rem)] mb-10">
              Websites built<br />
              <span className="italic text-primary/95">to look the part.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-xl">
              <p className="text-foreground/90 font-medium text-base md:text-lg mb-5">
                5-page business websites from{" "}
                <span className="font-serif text-primary">$1,950</span>.
              </p>
              <p className="text-foreground/65 text-base md:text-lg leading-relaxed">
                A premium digital product and website studio for Australian
                businesses that want agency-quality results without the bloated
                agency price tag.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row gap-3 mt-12">
              <button
                onClick={() => scrollTo("contact")}
                className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-4 rounded-sm text-sm font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/90 hover:translate-y-[-1px] hover:shadow-[0_12px_30px_-12px_rgba(31,36,51,0.45)]"
              >
                Book a Website Review
                <span className="ml-3 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                onClick={() => scrollTo("packages")}
                className="inline-flex items-center justify-center text-foreground/80 hover:text-foreground px-2 py-4 text-sm font-semibold tracking-wide transition-colors"
              >
                View Packages
                <span className="ml-2 inline-block">↓</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right rail: meta strip */}
        <div className="lg:col-span-4 xl:col-span-5 hidden lg:flex flex-col items-end">
          <Reveal delay={0.3} direction="left">
            <div className="text-right max-w-[220px]">
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-3">
                Currently building
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Premium websites, digital platforms and web applications for
                businesses across Australia.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
