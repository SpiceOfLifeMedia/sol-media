import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

import tradeImg from "@/assets/work-trade.png";
import financeImg from "@/assets/work-finance.png";
import salonImg from "@/assets/work-salon.png";
import eduImg from "@/assets/work-education.png";
import hospImg from "@/assets/work-hospitality.png";
import serviceImg from "@/assets/work-service.png";

export function SelectedWork() {
  const projects = [
    {
      label: "Concept rebuild",
      title: "Premium Trade Website",
      desc: "Concept rebuild for a trade business needing a sharper first impression and a stronger enquiry flow.",
      image: tradeImg,
      span: "lg:col-span-7",
      ratio: "aspect-[16/11]",
    },
    {
      label: "Demo direction",
      title: "Finance Broker Website",
      desc: "Demo direction for a finance broker — clean, authoritative layout built to establish credibility before the first call.",
      image: financeImg,
      span: "lg:col-span-5",
      ratio: "aspect-[4/3]",
    },
    {
      label: "Concept rebuild",
      title: "Boutique Salon Website",
      desc: "Concept rebuild for a salon — elegant visual direction paired with a clear path to bookings.",
      image: salonImg,
      span: "lg:col-span-5",
      ratio: "aspect-[4/3]",
    },
    {
      label: "Example system",
      title: "Education Media Platform",
      desc: "Example website system for an education-led brand — structured, scalable architecture for content and enquiries.",
      image: eduImg,
      span: "lg:col-span-7",
      ratio: "aspect-[16/11]",
    },
    {
      label: "Demo direction",
      title: "Hospitality Venue Website",
      desc: "Demo direction for a hospitality venue — cinematic, atmosphere-led layout that captures the room and makes reservations effortless.",
      image: hospImg,
      span: "lg:col-span-7",
      ratio: "aspect-[16/11]",
    },
    {
      label: "Example system",
      title: "Local Service Business",
      desc: "Example website system for a local service business — practical, fast-loading layout built around clear service pages.",
      image: serviceImg,
      span: "lg:col-span-5",
      ratio: "aspect-[4/3]",
    },
  ];

  return (
    <Section id="work" className="bg-background" spacing="loose">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-20 md:mb-28">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                07 / Selected work
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
                Built for businesses that need to{" "}
                <span className="italic text-primary/90">look sharper.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <Reveal delay={0.15}>
              <p className="text-sm text-foreground/55 leading-relaxed italic">
                A mix of concept rebuilds, demo directions and example website
                systems — shown honestly.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16">
          {projects.map((p, i) => {
            const offset = i % 2 === 1 ? "lg:mt-16" : "";
            return (
              <Reveal key={i} delay={0.05 * (i % 2)} className={`${p.span} ${offset}`}>
                <div className="group cursor-default">
                  <div
                    className={`relative overflow-hidden rounded-sm mb-5 bg-foreground/[0.04] ${p.ratio}`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-[10px] tracking-[0.28em] uppercase text-accent">
                      {p.label}
                    </span>
                    <span className="flex-1 h-px bg-foreground/15" />
                    <span className="text-[10px] tracking-[0.28em] uppercase text-foreground/40">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3 leading-snug transition-colors duration-500 group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="text-foreground/65 text-[15px] leading-relaxed max-w-xl">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
