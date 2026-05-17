import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { MonitorSmartphone, Code2, PanelTop, Search } from "lucide-react";

export function MainOffer() {
  const features = [
    {
      title: "Premium Website Design",
      desc: "Clean, modern websites that make your business look credible immediately.",
      icon: <MonitorSmartphone className="w-6 h-6 text-primary" />
    },
    {
      title: "Website Rebuilds",
      desc: "For businesses with outdated sites that need a sharper, faster and more professional presence.",
      icon: <Code2 className="w-6 h-6 text-primary" />
    },
    {
      title: "Landing Pages",
      desc: "Focused pages built for campaigns, services, offers and lead generation.",
      icon: <PanelTop className="w-6 h-6 text-primary" />
    },
    {
      title: "SEO-Ready Structure",
      desc: "Clear page structure, metadata foundations and content hierarchy designed to support future growth.",
      icon: <Search className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <Section id="websites" className="bg-white border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6">
                Websites are the core.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Everything starts with a strong website. Once the foundation is right, content, SEO, video and ads actually have somewhere powerful to send people.
              </p>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Reveal key={i} delay={0.2 + (i * 0.1)}>
                <div className="p-8 bg-background rounded-sm border border-border/50 h-full hover:border-accent/50 transition-colors duration-300">
                  <div className="mb-6 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-sm border border-border/50">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
