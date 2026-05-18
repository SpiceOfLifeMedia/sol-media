import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function MainOffer() {
  const services = [
    {
      num: "01",
      title: "Premium Website Design",
      desc: "Clean, modern, conversion-focused websites that make a business look credible immediately.",
    },
    {
      num: "02",
      title: "Website Rebuilds",
      desc: "For businesses with outdated sites that need a sharper, faster and more professional presence.",
    },
    {
      num: "03",
      title: "Digital Platforms & Web Apps",
      desc: "Custom digital experiences — booking systems, member portals, internal tools, web applications.",
    },
    {
      num: "04",
      title: "Landing Pages & SEO Structure",
      desc: "Campaign-ready pages and search-friendly architecture designed to compound over time.",
    },
  ];

  return (
    <Section id="websites" className="bg-background" spacing="compact">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                02 / What we build
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)] mb-8">
                Websites are the<br />
                <span className="italic text-primary/90">core.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-lg max-w-md">
                Everything starts with a strong website. Once the foundation is
                right, content, SEO, video and ads actually have somewhere
                powerful to send people.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-foreground/10">
              {services.map((s, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <div className="group grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline py-10 md:py-12 border-b border-foreground/10 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/30">
                    <span className="font-serif text-foreground/30 text-2xl md:text-3xl transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-foreground/65 leading-relaxed text-[15px] md:text-base max-w-xl">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
