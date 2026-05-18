import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Process() {
  const steps = [
    {
      num: "01",
      title: "Strategy",
      desc: "We clarify your offer, audience, services and what the website needs to achieve.",
    },
    {
      num: "02",
      title: "Direction",
      desc: "We map the pages, messaging, visual style and conversion flow before building.",
    },
    {
      num: "03",
      title: "Build",
      desc: "We create a modern, responsive website using a performance-first web stack.",
    },
    {
      num: "04",
      title: "Launch",
      desc: "We connect forms, basic SEO, analytics and deployment so the site is ready to use.",
    },
    {
      num: "05",
      title: "Grow",
      desc: "Once the site is live, we can support with SEO, content, video and campaigns.",
    },
  ];

  return (
    <Section
      id="process"
      className="bg-foreground text-background"
      spacing="loose"
      divider={false}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-28">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-accent/90 mb-8">
                04 / Process
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
                A cleaner way<br />
                <span className="italic text-accent">to build.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <Reveal delay={0.1}>
              <p className="text-background/65 text-base md:text-lg leading-relaxed">
                Five tight phases. No mystery, no bloat. Each one designed to
                move the project forward without dragging it out.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-5 border-t border-white/10">
          {steps.map((step, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <div
                className={`py-12 md:py-14 ${
                  i > 0 ? "md:border-l border-white/10 md:pl-8" : "md:pr-8"
                }`}
              >
                <p className="font-serif text-5xl md:text-6xl text-accent/90 mb-8 leading-none tracking-tight">
                  {step.num}
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-background mb-3">
                  {step.title}
                </h3>
                <p className="text-background/55 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
