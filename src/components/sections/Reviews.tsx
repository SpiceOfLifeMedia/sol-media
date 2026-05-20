import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Star } from "lucide-react";

const SNIPPETS: Array<{ quote: string; author: string }> = [
  {
    quote:
      "Honestly couldn't recommend Sam enough. The whole production felt premium from start to finish.",
    author: "Local client · Adelaide",
  },
  {
    quote:
      "Took an idea we had in our heads and turned it into something we were proud to show people.",
    author: "Event client · Adelaide",
  },
];

export function Reviews() {
  return (
    <Section id="reviews" className="bg-background" spacing="tight">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-6">
                03 / Trusted locally
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="flex items-baseline gap-5 mb-4">
                <span className="font-serif text-foreground text-[clamp(3rem,7vw,5rem)] leading-none tracking-tight">
                  5.0
                </span>
                <div
                  className="flex items-center gap-1 text-accent"
                  aria-label="5 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[12px] tracking-[0.18em] uppercase text-foreground/55 mb-5">
                Based on 8 Google Reviews
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg max-w-md">
                Trusted by local businesses, creators and clients across
                Adelaide.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <Reveal delay={0.15}>
              <div className="border-t border-foreground/10">
                {SNIPPETS.map((s, i) => (
                  <figure
                    key={i}
                    className="py-7 border-b border-foreground/10"
                  >
                    <blockquote className="font-serif italic text-foreground text-lg md:text-2xl leading-snug mb-3">
                      “{s.quote}”
                    </blockquote>
                    <figcaption className="text-[10px] tracking-[0.28em] uppercase text-foreground/45">
                      {s.author}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
