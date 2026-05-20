import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Process() {
  const steps = [
    {
      num: "01",
      title: "Brief",
      desc: "We clarify the project — what it's for, who it's for and what success looks like.",
    },
    {
      num: "02",
      title: "Direction",
      desc: "We shape the creative approach, the references, the structure and the deliverables.",
    },
    {
      num: "03",
      title: "Produce",
      desc: "We shoot, edit, build or design — using the right tools for the format.",
    },
    {
      num: "04",
      title: "Polish",
      desc: "We review, tighten, master and prepare for delivery on every channel it needs to live on.",
    },
    {
      num: "05",
      title: "Deliver",
      desc: "We hand over clean assets, launch the website, send the cut, ship the CD — whatever the brief asks for.",
    },
  ];

  return (
    <Section
      id="process"
      className="bg-foreground text-background"
      spacing="compact"
      divider={false}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-accent/90 mb-6">
                05 / Process
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.02] text-[clamp(2.25rem,5vw,4.5rem)]">
                A cleaner way<br />
                <span className="italic text-accent">to produce.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <Reveal delay={0.1}>
              <p className="text-background/65 text-base md:text-lg leading-relaxed">
                Five tight phases. No mystery, no bloat. Each one designed to
                move a media project forward without dragging it out.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-5 border-t border-white/10">
          {steps.map((step, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <div
                className={`py-10 md:py-12 ${
                  i > 0 ? "md:border-l border-white/10 md:pl-8" : "md:pr-8"
                }`}
              >
                <p className="font-serif text-4xl md:text-5xl text-accent/90 mb-6 leading-none tracking-tight">
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
