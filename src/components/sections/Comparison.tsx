import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Comparison() {
  const cols = [
    {
      label: "Cheap builders",
      items: [
        "Template look",
        "Weak strategy",
        "Poor mobile experience",
        "Little support",
        "Race-to-the-bottom pricing",
      ],
      tone: "muted",
    },
    {
      label: "Traditional agencies",
      items: [
        "High retainers",
        "Slow timelines",
        "Big overheads",
        "Complicated process",
        "Expensive for small business",
      ],
      tone: "muted",
    },
    {
      label: "Spice Of Life Media",
      items: [
        "Premium design taste",
        "Faster, scoped turnaround",
        "Clear, honest scope",
        "Fair pricing",
        "Website-first growth support",
      ],
      tone: "accent",
    },
  ];

  return (
    <Section id="comparison" className="bg-background" spacing="loose">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-20 md:mb-24">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                08 / Positioning
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
                Not cheap. Not bloated.<br />
                <span className="italic text-primary/90">The better middle.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-foreground/10">
          {cols.map((c, i) => {
            const isAccent = c.tone === "accent";
            return (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <div
                  className={`py-12 md:py-14 md:px-8 ${
                    i > 0 ? "md:border-l border-foreground/10" : ""
                  } ${isAccent ? "border-l-2 border-l-accent md:border-l-2 md:border-l-accent" : ""}`}
                >
                  <p
                    className={`text-[10px] tracking-[0.3em] uppercase mb-8 ${
                      isAccent ? "text-accent" : "text-foreground/40"
                    }`}
                  >
                    {c.label}
                  </p>
                  <ul className="space-y-4">
                    {c.items.map((item, idx) => (
                      <li
                        key={idx}
                        className={`text-[15px] leading-relaxed ${
                          isAccent ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        — {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
