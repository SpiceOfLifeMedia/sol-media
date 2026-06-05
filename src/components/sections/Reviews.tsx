import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Star } from "lucide-react";

const REVIEWS: Array<{ quote: string; author: string }> = [
  {
    quote:
      "We found Sam with only about 1 week left before our wedding. He attended to our needs for an epic nba entrance recording right away. Sam was enthusiastic and professional, he delivered work that was of the highest quality and in a very prompt manner. We had so much fun working through the script and he patiently made the adjustments and requests we had. The result at our wedding was phenomenal, our guests absolutely loved the entrance! We highly recommend Sam and Spice of Life Media to any wedding couple / nba fans out there. Sam's rendition is hands down the best and most affordable out there, you really don't need to look any further!",
    author: "Sherry Ku",
  },
  {
    quote:
      "Super impressed with the videography Sam provided for our clinic. Such attention to detail and really captured what we wanted. He was very accommodating and made sure he went above and beyond to deliver us the best quality videos. Thanks Sam we will definitely be using your services again in the future.",
    author: "Amy Minervini",
  },
  {
    quote:
      "Always an incredible experience. Sammy is super friendly, professional and extremely efficient. This is the second time I've worked with Spice of Life Media, and it certainly won't be the last.",
    author: "Iulita Staica",
  },
  {
    quote:
      "I have been nothing but absolutely thrilled with the service I've recieved..... nothing is ever too hard for Sam & he has really helped my creative concepts come to life. So patient with anything I ask and always comes up with great ideas himself. Always know he can get the job done. Thank you Sam 👏👏",
    author: "Carmel Margaritis",
  },
  {
    quote:
      "Sam from Spice of Life was an absolute joy to work with in the creation of our bridal entrance theme! His professionalism, sense of urgency, openness to feedback, sense of humor, & creativeness was the perfect combination to an ultimate…",
    author: "Stacey Plessinger",
  },
  {
    quote:
      "Sammy was so wonderful to work with. From the first email of enquiry to the final product he had great communication, so much passion for his work, very accommodating with time and ended up creating a simply beautiful video for our school. We would highly recommend Sammy to anyone wanting any work done. Thank you Sammy from Modbury School P-6",
    author: "Bianca Martyn",
  },
];

const MAX_CHARS = 200;

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

function ReviewCard({
  quote,
  author,
  delay,
}: {
  quote: string;
  author: string;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.length > MAX_CHARS;
  const displayText =
    isLong && !expanded ? quote.slice(0, MAX_CHARS).trimEnd() + "…" : quote;

  return (
    <motion.figure
      className="bg-background px-6 md:px-7 py-8 md:py-10 flex flex-col"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
    >
      <GoldStars />
      <blockquote className="mt-5 font-serif italic text-foreground text-[17px] md:text-lg leading-[1.55] flex-1">
        "{displayText}"
      </blockquote>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 self-start text-[10px] tracking-[0.22em] uppercase text-accent hover:text-foreground transition-colors duration-200"
        >
          {expanded ? "Read less ↑" : "Read more ↓"}
        </button>
      )}
      <figcaption className="mt-6 pt-5 border-t border-foreground/10 text-[10px] tracking-[0.28em] uppercase text-foreground/45">
        {author}
      </figcaption>
    </motion.figure>
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

        {/* Cards — even 3×2 grid, motion.figure fills each cell directly */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {REVIEWS.map((r, i) => (
            <ReviewCard
              key={i}
              quote={r.quote}
              author={r.author}
              delay={0.08 + (i % 3) * 0.05}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
