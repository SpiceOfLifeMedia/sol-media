import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { X, Check } from "lucide-react";

export function Comparison() {
  return (
    <Section id="comparison" className="bg-white border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-4">
              Not cheap. Not bloated. <span className="italic text-primary">The better middle.</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Why our positioning works for Australian businesses.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Column 1 */}
          <Reveal delay={0.1}>
            <div className="p-8 bg-background border border-border/50 rounded-sm h-full opacity-70">
              <h3 className="text-xl font-semibold text-foreground mb-6 pb-4 border-b border-border">
                Cheap Website Builders
              </h3>
              <ul className="space-y-4">
                {[
                  "Template look",
                  "Weak strategy",
                  "Poor mobile experience",
                  "Little support",
                  "Race-to-the-bottom pricing"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column 2 */}
          <Reveal delay={0.2}>
            <div className="p-8 bg-background border border-border/50 rounded-sm h-full opacity-70">
              <h3 className="text-xl font-semibold text-foreground mb-6 pb-4 border-b border-border">
                Traditional Agencies
              </h3>
              <ul className="space-y-4">
                {[
                  "High retainers",
                  "Slow timelines",
                  "Big overheads",
                  "Complicated process",
                  "Expensive for small businesses"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column 3 - Spice Of Life */}
          <Reveal delay={0.3}>
            <div className="p-8 bg-primary text-primary-foreground rounded-sm h-full shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-white/20">
                Spice Of Life Media
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Premium design",
                  "Faster turnaround",
                  "Clear scope",
                  "Fair pricing",
                  "Website-first growth support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
