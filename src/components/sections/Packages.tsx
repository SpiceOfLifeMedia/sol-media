import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Packages() {
  const packages = [
    {
      name: "Website Refresh",
      price: "$995",
      bestFor:
        "A single landing page, homepage rebuild or quick digital upgrade.",
      includes: [
        "1 page",
        "Premium responsive design",
        "Contact section",
        "Basic SEO setup",
        "Fast turnaround",
      ],
      button: "Enquire about a Refresh",
    },
    {
      name: "Business Website",
      price: "$1,950",
      bestFor:
        "Local businesses that need a clean, professional 3–5 page website.",
      includes: [
        "Up to 5 pages",
        "Mobile-first design",
        "Contact form",
        "Basic SEO setup",
        "Vercel-ready deployment",
        "2 revision rounds",
        "7–10 day target turnaround",
      ],
      button: "Start a Business Website",
      featured: true,
    },
    {
      name: "Premium Website",
      price: "$3,500",
      bestFor:
        "Established businesses that want a stronger, more premium online presence.",
      includes: [
        "5–8 pages",
        "Premium custom design",
        "Copy direction",
        "SEO page structure",
        "Conversion-focused layout",
        "Analytics setup",
        "Launch support",
      ],
      button: "Build a Premium Site",
    },
    {
      name: "Growth Website",
      price: "$6,500+",
      bestFor:
        "Businesses that want a complete digital platform with stronger growth foundations.",
      includes: [
        "8–12+ pages",
        "Advanced layouts",
        "Service landing pages",
        "Blog / news structure",
        "SEO foundations",
        "Conversion strategy",
        "Ongoing support options",
      ],
      button: "Discuss a Growth Website",
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    window.scrollTo({
      top: elementRect - bodyRect - offset,
      behavior: "smooth",
    });
  };

  return (
    <Section id="packages" className="bg-background" spacing="compact">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                03 / Pricing
              </p>
            </Reveal>
            <Reveal delay={0.05} overflow="visible">
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.08] text-[clamp(2.5rem,5.5vw,5rem)] pb-2">
                Premium websites,<br />
                <span className="italic text-primary/90">honest pricing.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg">
                Clear starting points. No vague agency mystery. Final pricing
                depends on scope, content, integrations and turnaround.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-foreground/10">
          {packages.map((pkg, i) => (
            <Reveal key={i} delay={0.05 + i * 0.04}>
              <div
                className={`group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 py-8 border-b border-foreground/10 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  pkg.featured ? "md:pl-6 border-l-2 border-l-accent" : ""
                } hover:border-b-foreground/30`}
              >
                {/* Name */}
                <div className="md:col-span-3">
                  {pkg.featured && (
                    <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-2">
                      Most Common
                    </p>
                  )}
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mt-3 max-w-[260px]">
                    {pkg.bestFor}
                  </p>
                </div>

                {/* Price */}
                <div className="md:col-span-2 md:border-l border-foreground/10 md:pl-8">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-2">
                    From
                  </p>
                  <p className="font-serif text-3xl md:text-4xl text-primary tracking-tight">
                    {pkg.price}
                  </p>
                </div>

                {/* Includes */}
                <div className="md:col-span-5 md:border-l border-foreground/10 md:pl-8">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-3">
                    Includes
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {pkg.includes.map((f, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-foreground/75 leading-relaxed"
                      >
                        — {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="md:col-span-2 md:border-l border-foreground/10 md:pl-8 flex md:items-center">
                  <button
                    onClick={scrollToContact}
                    className="group/btn text-left text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors duration-500"
                  >
                    {pkg.button}
                    <span className="block mt-1 text-foreground/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:text-primary group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="text-sm text-foreground/50 leading-relaxed italic mt-12 max-w-2xl">
            Prices are starting points. Every project is scoped properly before
            work begins. No unlimited revisions. No hidden agency fluff.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
