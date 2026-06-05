import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import videoImg from "@/assets/work-video.png";
import audioImg from "@/assets/work-audio.png";
import brandImg from "@/assets/work-brand.png";
import webImg from "@/assets/work-web.png";

const CAPABILITIES = [
  {
    number: "01",
    category: "Web Design",
    statement: "Websites built to convert on the first impression.",
    tags: ["Trade & Construction", "Finance", "Healthcare", "Hospitality", "Education", "Creatives"],
    image: webImg,
  },
  {
    number: "02",
    category: "Video Production",
    statement: "Corporate to cinematic — every frame intentional.",
    tags: ["Weddings & Events", "Corporate Promos", "Sports Entrances", "Schools", "Social Content"],
    image: videoImg,
  },
  {
    number: "03",
    category: "Audio Production",
    statement: "Sound that gives every project presence.",
    tags: ["Podcast", "Voiceover", "Event Audio", "Custom Audio Branding"],
    image: audioImg,
  },
  {
    number: "04",
    category: "Brand & Content",
    statement: "Visual identity and content built from the ground up.",
    tags: ["Logo & Identity", "Social Templates", "Photography", "Content Strategy"],
    image: brandImg,
  },
];

const STATS = [
  { value: "5.0", label: "Google rating" },
  { value: "8+", label: "Client reviews" },
  { value: "ADL", label: "Based in Adelaide" },
  { value: "∞", label: "Working nationally" },
];

export function SelectedWork() {
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = 80;
      const top =
        el.getBoundingClientRect().top +
        document.body.getBoundingClientRect().top;
      window.scrollTo({ top: top - offset, behavior: "smooth" });
    }
  };

  return (
    <Section id="work" className="bg-background" spacing="tight">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-6">
                04 / What we create
              </p>
            </Reveal>
            <Reveal delay={0.05} overflow="visible">
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.5rem)] pb-2">
                One studio.{" "}
                <span className="italic text-primary/90">Every medium.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:flex lg:items-end lg:pb-3">
            <Reveal delay={0.15}>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Web, video, audio and brand — produced end&#8209;to&#8209;end
                from Adelaide. Samples available on request.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Capability rows */}
        <div className="border-t border-foreground/[0.12]">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={i} delay={0.07 * i}>
              <div
                className="relative group border-b border-foreground/[0.12] cursor-default
                  transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:bg-foreground/[0.025]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Animated left accent rule */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent origin-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: hovered === i ? "scaleY(1)" : "scaleY(0)" }}
                />

                <div className="pl-4 md:pl-8 grid md:grid-cols-12 items-stretch">
                  {/* Number + category — 4 cols */}
                  <div className="md:col-span-4 py-8 md:py-10 pr-4 md:pr-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.28em] uppercase text-foreground/30 font-medium tabular-nums">
                        {cap.number}
                      </span>
                      <span className="flex-shrink-0 w-5 h-px bg-foreground/15" />
                    </div>
                    <h3
                      className="font-serif font-medium text-foreground
                        text-[clamp(1.5rem,2.5vw,2.25rem)] tracking-[-0.02em]
                        leading-[1.1] transition-colors duration-300"
                      style={{ color: hovered === i ? "var(--color-primary)" : undefined }}
                    >
                      {cap.category}
                    </h3>
                  </div>

                  {/* Statement + tags — 5 cols */}
                  <div className="md:col-span-5 py-8 md:py-10 md:pt-[calc(2rem+0.6rem)] pr-6">
                    <p className="text-foreground/55 text-[14px] md:text-[15px] leading-[1.75] mb-4">
                      {cap.statement}
                    </p>
                    <div className="flex flex-wrap gap-[6px]">
                      {cap.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-[9px] tracking-[0.18em] uppercase text-foreground/35
                            border border-foreground/[0.12] px-[7px] py-[5px]
                            transition-colors duration-300 group-hover:border-foreground/25
                            group-hover:text-foreground/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image — 3 cols, full row height */}
                  <div className="hidden md:block md:col-span-3 relative overflow-hidden">
                    <img
                      src={cap.image}
                      alt={cap.category}
                      className="absolute inset-0 w-full h-full object-cover
                        opacity-40 group-hover:opacity-65
                        scale-100 group-hover:scale-[1.03]
                        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    {/* Left-edge blend */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats bar + CTA */}
        <Reveal delay={0.35}>
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-serif text-foreground text-xl leading-none tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[9px] tracking-[0.22em] uppercase text-foreground/40">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 text-[11px] font-semibold
                tracking-[0.18em] uppercase text-foreground hover:text-accent
                transition-colors duration-300 self-start md:self-auto flex-shrink-0"
            >
              Start a conversation
              <span
                className="h-px bg-current transition-all duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)] w-6 group-hover:w-12"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
