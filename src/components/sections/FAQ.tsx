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
      q: "What kinds of projects do you actually take on?",
      a: "Websites, videos, podcast edits, music production, event media, custom presentations, social-media content and brand design. If it's media-related and lives on screen, web or audio, we can usually help.",
    },
    {
      q: "Do I have to use you for everything, or just one piece?",
      a: "Either. Plenty of clients come in for one thing — a website, a podcast edit, a wedding intro — and that's the whole engagement. Others use us across multiple categories so the work stays consistent.",
    },
    {
      q: "How long does a project take?",
      a: "It depends on the format. A short edit or single-page site can move quickly when the brief is clear. Bigger productions — full websites, multi-shoot video projects, mastering rounds — are scoped properly so quality doesn't suffer.",
    },
    {
      q: "How do you price the work?",
      a: "Every project is scoped after the first conversation. You'll get a clear, honest figure before any work starts. No retainers, no hidden agency markup.",
    },
    {
      q: "Are you Adelaide-based?",
      a: "Yes — produced in Adelaide. Local shoots, events and on-site work are straightforward; everything else (edits, websites, audio, design) we can deliver remotely anywhere.",
    },
    {
      q: "Can you handle the creative direction, or do I need to bring it?",
      a: "Both work. We can lead the direction from a loose brief, or we can execute against a clear vision you already have. Whichever gets the result.",
    },
  ];

  return (
    <Section id="faq" className="bg-background" spacing="tight">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-6">
                06 / Questions
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4vw,3.5rem)] mb-4">
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
                    <AccordionTrigger className="text-left font-serif font-medium text-lg md:text-xl text-foreground hover:text-primary transition-colors duration-500 py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/65 leading-relaxed text-[15px] pb-6 pr-8">
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
