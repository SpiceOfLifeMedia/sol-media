import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function MediaSupport() {
  const services = [
    {
      title: "Video Content",
      desc: "Brand videos, service explainers, social clips and website hero content.",
    },
    {
      title: "Photography",
      desc: "Professional images that make a website feel real, local and trustworthy.",
    },
    {
      title: "SEO Support",
      desc: "Service pages, content structure and search-friendly improvements after launch.",
    },
    {
      title: "Google Ads Landing Pages",
      desc: "Campaign-ready pages designed to turn paid traffic into enquiries.",
    },
    {
      title: "Social Media Content",
      desc: "Short-form content that supports the website and keeps the business visible.",
    },
  ];

  return (
    <Section id="media-support" className="bg-background" spacing="default">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                05 / Beyond the build
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] mb-8">
                Content that makes the website{" "}
                <span className="italic text-primary/90">stronger.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg max-w-md">
                A great website needs strong words, visuals and trust signals.
                Spice Of Life Media can also support with video, photography,
                content and digital campaigns when it makes sense.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 text-[10px] tracking-[0.28em] uppercase text-accent">
                Website first. Media when it counts.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-foreground/10">
              {services.map((s, i) => (
                <Reveal key={i} delay={0.05 + i * 0.04}>
                  <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 py-7 md:py-8 border-b border-foreground/10 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/30">
                    <h3 className="text-lg md:text-xl font-serif font-medium text-foreground md:w-[40%] shrink-0 transition-colors duration-500 group-hover:text-primary">
                      {s.title}
                    </h3>
                    <p className="text-foreground/65 text-sm md:text-[15px] leading-relaxed">
                      {s.desc}
                    </p>
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
