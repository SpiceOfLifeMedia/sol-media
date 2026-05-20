import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceCategory {
  num: string;
  title: string;
  intro: string;
  includes: string[];
  enquiryLabel: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    num: "01",
    title: "Web & Digital",
    intro:
      "Premium websites and digital platforms built to make a business look credible immediately and convert real enquiries.",
    includes: [
      "Premium custom websites",
      "Landing pages & campaign pages",
      "SEO foundations & site structure",
      "Digital strategy & content planning",
      "Contact and enquiry flows",
    ],
    enquiryLabel: "Web & Digital",
  },
  {
    num: "02",
    title: "Video & Content",
    intro:
      "Videography and editing for businesses, creators and brands — built to perform on web, social and at events.",
    includes: [
      "Videography on location",
      "Video editing & post-production",
      "Promotional and brand videos",
      "Social-media short-form & reels",
      "Event visuals and screen content",
    ],
    enquiryLabel: "Video & Content",
  },
  {
    num: "03",
    title: "Audio & Podcasting",
    intro:
      "Studio-quality audio work for podcasts, music projects, custom CDs and any production that needs to sound clean.",
    includes: [
      "Podcast editing & polish",
      "Audio mastering & mixing",
      "Music production",
      "Voice cleanup & dialogue editing",
      "Custom CDs & physical release prep",
    ],
    enquiryLabel: "Audio & Podcasting",
  },
  {
    num: "04",
    title: "Events & Custom Media",
    intro:
      "Bespoke media for weddings, events and one-off productions — the kind of work that doesn't fit a template.",
    includes: [
      "NBA-style bridal party intros",
      "Wedding & event intro videos",
      "Custom presentation videos",
      "Montage edits & highlight reels",
      "Bespoke client media on request",
    ],
    enquiryLabel: "Events & Custom Media",
  },
  {
    num: "05",
    title: "Brand & Design",
    intro:
      "Graphic design and brand content that ties the website, the videos and the campaigns together.",
    includes: [
      "Graphic design for digital & print",
      "Social-media asset systems",
      "Campaign creative & ad assets",
      "Brand content for ongoing channels",
      "Digital media planning",
    ],
    enquiryLabel: "Brand & Design",
  },
];

function scrollToContact(prefill?: string) {
  const el = document.getElementById("contact");
  if (!el) return;
  const offset = 80;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = el.getBoundingClientRect().top;
  window.scrollTo({
    top: elementRect - bodyRect - offset,
    behavior: "smooth",
  });
  if (prefill) {
    window.setTimeout(() => {
      const field = document.getElementById(
        "contact-project-type",
      ) as HTMLInputElement | null;
      if (field) {
        field.value = prefill;
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.focus();
      }
    }, 600);
  }
}

export function Services() {
  return (
    <Section id="services" className="bg-background" spacing="compact">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-6">
                02 / Services
              </p>
            </Reveal>
            <Reveal delay={0.05} overflow="visible">
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] pb-2">
                If it's media-related,{" "}
                <span className="italic text-primary/90">
                  we can handle it.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg max-w-2xl">
                Five service categories, one studio. Web, video, audio, custom
                event media and brand design — produced end-to-end so the
                pieces actually fit together.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-full border-t border-foreground/10"
          >
            {CATEGORIES.map((cat, i) => (
              <AccordionItem
                key={cat.num}
                value={`item-${i}`}
                className="border-foreground/10"
              >
                <AccordionTrigger className="text-left py-7 hover:no-underline group">
                  <div className="flex items-baseline gap-6 md:gap-10 w-full">
                    <span className="font-serif text-foreground/30 text-lg md:text-xl shrink-0 transition-colors duration-500 group-hover:text-accent">
                      {cat.num}
                    </span>
                    <span className="font-serif font-medium text-xl md:text-3xl text-foreground leading-snug transition-colors duration-500 group-hover:text-primary">
                      {cat.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pl-[3.5rem] md:pl-[5rem] pr-4 md:pr-8">
                  <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                    <p className="md:col-span-5 text-foreground/65 leading-relaxed text-[15px] md:text-base">
                      {cat.intro}
                    </p>
                    <ul className="md:col-span-5 grid grid-cols-1 gap-y-2">
                      {cat.includes.map((item) => (
                        <li
                          key={item}
                          className="text-[15px] text-foreground/75 leading-relaxed"
                        >
                          — {item}
                        </li>
                      ))}
                    </ul>
                    <div className="md:col-span-2 flex md:items-start md:justify-end">
                      <button
                        type="button"
                        onClick={() => scrollToContact(cat.enquiryLabel)}
                        className="text-left text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground hover:text-primary transition-colors duration-500"
                      >
                        Enquire about this
                        <span className="block mt-1 text-foreground/40">→</span>
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
