import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Problem() {
  const problems = [
    {
      num: "01",
      title: "Outdated first impression",
      desc: "Customers judge a business in seconds. A dated site signals a dated operation, long before the first conversation.",
    },
    {
      num: "02",
      title: "Weak enquiry flow",
      desc: "A good website should guide people clearly towards calling, booking or enquiring — not bury the action three scrolls down.",
    },
    {
      num: "03",
      title: "Template fatigue",
      desc: "Your business shouldn't look like every other business using the same drag-and-drop layout.",
    },
  ];

  return (
    <Section id="problem" className="bg-background" spacing="loose" divider={false}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24 md:mb-32">
          <div className="lg:col-span-1 hidden lg:block">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 pt-4">
                01 / Problem
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-11">
            <Reveal>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.02] text-[clamp(2.25rem,5.5vw,5rem)] mb-10 max-w-5xl">
                Your website shouldn't make your business look{" "}
                <span className="italic text-primary/90">smaller</span> than it
                is.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-foreground/65 leading-relaxed max-w-2xl">
                Most business websites are slow, outdated, confusing or clearly
                built from a template. That costs trust before a customer ever
                makes contact.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-foreground/10">
          {problems.map((problem, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div
                className={`py-12 md:py-14 md:pr-10 ${
                  i > 0 ? "md:border-l border-foreground/10 md:pl-10" : ""
                }`}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-6">
                  {problem.num}
                </p>
                <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-4 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed text-[15px]">
                  {problem.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
