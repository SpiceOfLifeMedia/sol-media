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
    <section id="urgency" className="bg-foreground text-background py-24 md:py-32 border-y border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="inline-block w-12 h-px bg-accent mb-8"></span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-[1.15] mb-8">
              Your website is either building trust or <span className="italic text-accent">leaking it.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-lg text-background/75 leading-relaxed mb-12 max-w-2xl mx-auto">
              If your website feels outdated, slow or unclear, people notice before they ever contact you. A sharper website changes how customers judge your business — before the first call, before the first quote, before the first email.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <button
              onClick={scrollToContact}
              className="bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-sm text-base font-semibold transition-all duration-200"
            >
              Request Website Review
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
