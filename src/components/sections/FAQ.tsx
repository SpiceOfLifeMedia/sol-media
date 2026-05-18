import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      q: "Are you the cheapest website builder?",
      a: "No. Cheap websites usually create expensive problems later. We focus on premium, affordable websites that make a business look professional without traditional agency pricing.",
    },
    {
      q: "How fast can you build a website?",
      a: "Simple projects can move quickly when content, branding and direction are ready. Larger websites are scoped properly so quality doesn't suffer.",
    },
    {
      q: "Do you only build websites?",
      a: "Websites are the core focus. We also build digital platforms and web applications, and support clients with video, photography, SEO foundations, landing pages and media assets when they strengthen the website.",
    },
    {
      q: "Can you rebuild my current website?",
      a: "Yes. Website rebuilds are one of the main offers, especially for businesses with outdated designs, poor mobile layouts or weak enquiry flows.",
    },
    {
      q: "Do you help with copy?",
      a: "Yes. We provide copy direction and can help shape the messaging so the website sounds professional and clear.",
    },
    {
      q: "Can you help with SEO?",
      a: "Yes. Every build includes basic SEO structure. Ongoing SEO support can be quoted separately.",
    },
    {
      q: "Do you do video as well?",
      a: "Yes. Video and media content are available as supporting services, especially when a business needs stronger visuals for the website or social campaigns.",
    },
  ];

  return (
    <Section id="faq" className="bg-background" spacing="default">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                09 / Questions
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4vw,3.5rem)] mb-6">
                Things people<br />
                <span className="italic text-primary/90">usually ask.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-foreground/10"
                  >
                    <AccordionTrigger className="text-left font-serif font-medium text-lg md:text-xl text-foreground hover:text-primary transition-colors duration-500 py-7">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/65 leading-relaxed text-[15px] pb-7 pr-8">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
