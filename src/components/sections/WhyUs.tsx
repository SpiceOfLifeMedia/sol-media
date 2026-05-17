import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Check } from "lucide-react";

export function WhyUs() {
  const highlights = [
    "Adelaide-based",
    "Fast and practical",
    "Premium design taste",
    "Modern web builds",
    "Clear communication",
    "Media production background",
    "Built for real enquiries",
    "Affordable compared to traditional agencies"
  ];

  return (
    <Section id="why-us" className="bg-white border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6 leading-tight">
              Design eye.<br />
              Media brain.<br />
              <span className="italic text-primary">Modern build stack.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              Most web designers can build pages. Most media people can create content. Spice Of Life Media brings both together — premium visual direction, practical business messaging, modern website builds and content support when your business needs it.
            </p>
          </Reveal>
        </div>
        
        <div>
          <Reveal delay={0.2} direction="left">
            <div className="bg-background border border-border p-8 rounded-sm">
              <h3 className="text-xl font-semibold mb-6 text-foreground border-b border-border/50 pb-4">
                The Spice Of Life Standard
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80 font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
