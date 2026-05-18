import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

import offloadrImg from "@/assets/work-offloadr.png";
import eduImg from "@/assets/work-edu-media.png";
import sitecartImg from "@/assets/work-sitecart.png";

export function SelectedWork() {
  const projects = [
    {
      label: "Digital product",
      title: "Offloadr",
      desc: "A premium production-workflow platform — automatic upload, verification and editor handoff for content teams the moment recording ends.",
      image: offloadrImg,
      href: "https://www.useoffloadr.com/",
      span: "lg:col-span-12",
      ratio: "aspect-[16/9]",
    },
    {
      label: "Education platform",
      title: "EDU Media Systems",
      desc: "Student-led media systems for schools — hardware, workflow platform and ongoing support, presented as one cohesive brand.",
      image: eduImg,
      href: "https://edumediasystems.com.au/",
      span: "lg:col-span-7",
      ratio: "aspect-[16/11]",
    },
    {
      label: "Product launch",
      title: "Sitecart",
      desc: "Launch site for a mobile jobsite hub built for Australian trades — cinematic product moments paired with a clear path to enquiry.",
      image: sitecartImg,
      href: "https://www.sitecart.com.au/",
      span: "lg:col-span-5",
      ratio: "aspect-[4/3]",
    },
  ];

  return (
    <Section id="work" className="bg-background" spacing="tight">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-16 md:mb-20">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                07 / Selected work
              </p>
            </Reveal>
            <Reveal delay={0.05} overflow="visible">
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.08] text-[clamp(2.5rem,5.5vw,5rem)] pb-2">
                Built to{" "}
                <span className="italic text-primary/90">look the part.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <Reveal delay={0.15}>
              <p className="text-sm text-foreground/55 leading-relaxed italic">
                Selected work from Spice Of Life Media — premium digital
                products and launch sites currently live.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16">
          {projects.map((p, i) => (
            <Reveal key={i} delay={0.05 * (i % 2)} className={p.span}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className={`relative overflow-hidden rounded-sm mb-5 bg-foreground/[0.04] ${p.ratio}`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
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
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3 leading-snug transition-colors duration-500 group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="text-foreground/65 text-[15px] leading-relaxed max-w-xl">
                  {p.desc}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
