import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Process() {
  const steps = [
    {
      num: "01",
      title: "Strategy",
      desc: "We clarify your offer, audience, services and what the website needs to achieve."
    },
    {
      num: "02",
      title: "Direction",
      desc: "We map the pages, messaging, visual style and conversion flow before building."
    },
    {
      num: "03",
      title: "Build",
      desc: "We create a modern, responsive website using a performance-first web stack."
    },
    {
      num: "04",
      title: "Launch",
      desc: "We connect forms, basic SEO, analytics and deployment so the site is ready to use."
    },
    {
      num: "05",
      title: "Grow",
      desc: "Once the website is live, we can support with SEO, content, video and campaigns."
    }
  ];

  return (
    <Section id="process" className="bg-foreground text-background">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-16 text-white text-center md:text-left">
            A cleaner way to build your website.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-px bg-white/10 z-0"></div>
          
          {steps.map((step, i) => (
            <Reveal key={i} delay={0.1 * i} className="relative z-10">
              <div className="flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary border-2 border-white/20 flex items-center justify-center text-accent font-serif font-medium text-lg mb-6 shadow-xl">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
