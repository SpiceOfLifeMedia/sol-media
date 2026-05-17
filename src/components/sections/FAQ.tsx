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
      a: "No. Cheap websites usually create expensive problems later. We focus on premium, affordable websites that make your business look professional without traditional agency pricing."
    },
    {
      q: "How fast can you build a website?",
      a: "Simple projects can often move quickly when content, branding and direction are ready. Larger websites are scoped properly so quality does not suffer."
    },
    {
      q: "Do you only build websites?",
      a: "Websites are the core focus. We also support clients with video content, photography, SEO foundations, landing pages and media assets when they strengthen the website."
    },
    {
      q: "Can you rebuild my current website?",
      a: "Yes. Website rebuilds are one of the main offers, especially for businesses with outdated designs, poor mobile layouts or weak enquiry flows."
    },
    {
      q: "Do you help with copy?",
      a: "Yes. We provide copy direction and can help shape the messaging so the website sounds professional and clear."
    },
    {
      q: "Can you help with SEO?",
      a: "Yes. Every build includes basic SEO structure. Ongoing SEO support can be quoted separately."
    },
    {
      q: "Do you do video as well?",
      a: "Yes. Video and media content are available as supporting services, especially when a business needs stronger visuals for the website or social campaigns."
    }
  ];

  return (
    <Section id="faq" className="bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-12 text-center">
              Questions & Answers
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
