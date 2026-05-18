import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function WhyUs() {
  const highlights = [
    "Adelaide-based",
    "Fast and practical",
    "Premium design taste",
    "Modern build stack",
    "Clear communication",
    "Media production background",
    "Built for real enquiries",
    "Honest, transparent pricing",
  ];

  return (
    <Section id="why-us" className="bg-background" spacing="loose">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                06 / Why us
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.0] text-[clamp(2.75rem,7vw,6.5rem)] mb-10">
                Design eye.<br />
                Media brain.<br />
                <span className="italic text-primary/90">Modern stack.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg max-w-xl">
                Most web designers can build pages. Most media people can create
                content. Spice Of Life Media brings both together — premium
                visual direction, practical business messaging, modern web
                builds and content support when the business needs it.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-32">
            <Reveal delay={0.2}>
              <div className="border-t border-foreground/10">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-foreground/10 group"
                  >
                    <span className="text-[15px] text-foreground/80 font-medium">
                      {h}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] uppercase text-foreground/30 group-hover:text-accent transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
