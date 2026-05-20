import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Star } from "lucide-react";

/**
 * NOTE: Review quotes below are PLACEHOLDERS written in the SOL Media tone
 * pending real verbatim Google review pulls. Replace `REVIEWS[].quote` and
 * `REVIEWS[].author` with the actual Google review text + reviewer first
 * name when ready. The 5.0 / 8-review stat remains accurate.
 */
const REVIEWS: Array<{ quote: string; author: string }> = [
  {
    quote:
      "Sam treated our project like it was his own. The finish was a level above what we expected.",
    author: "Placeholder · Client",
  },
  {
    quote:
      "Calm, clear and quick. We had something we were genuinely proud to put out into the world.",
    author: "Placeholder · Client",
  },
  {
    quote:
      "Took an idea we had in our heads and turned it into a piece of media that just worked.",
    author: "Placeholder · Client",
  },
];

function GoldStars() {
  return (
    <span
      className="inline-flex items-center gap-[3px] text-accent"
      aria-label="5 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="w-[13px] h-[13px] fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <Section id="reviews" className="bg-background" spacing="compact">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-10 md:mb-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-5">
                05 / Reviews
              </p>
            </Reveal>
            <Reveal delay={0.05} overflow="visible">
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] pb-2">
                Trusted by clients from{" "}
                <span className="italic text-primary/90">Adelaide to New York.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 md:items-end md:text-right">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-foreground text-3xl md:text-4xl leading-none tracking-tight">
                    5.0
                  </span>
                  <GoldStars />
                </div>
                <div className="flex flex-col gap-1 text-[11px] tracking-[0.18em] uppercase text-foreground/55">
                  <span>Google rating</span>
                  <span>Based on 8 Google reviews</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={0.08 + i * 0.05}>
              <figure className="bg-background h-full px-6 md:px-7 py-8 md:py-10 flex flex-col">
                <GoldStars />
                <blockquote className="mt-5 font-serif italic text-foreground text-[17px] md:text-lg leading-[1.55] flex-1">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-foreground/10 text-[10px] tracking-[0.28em] uppercase text-foreground/45">
                  {r.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
