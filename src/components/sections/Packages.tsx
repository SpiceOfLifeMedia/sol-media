import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Check } from "lucide-react";

export function Packages() {
  const packages = [
    {
      name: "Website Refresh",
      price: "From $995",
      bestFor: "A single landing page, homepage rebuild or quick digital upgrade.",
      includes: [
        "1 page",
        "Premium responsive design",
        "Contact section",
        "Basic SEO setup",
        "Mobile optimisation",
        "Fast turnaround"
      ],
      button: "Enquire About Refresh",
      accent: false
    },
    {
      name: "Business Website",
      price: "From $1,950",
      bestFor: "Local businesses that need a clean, professional 3–5 page website.",
      includes: [
        "Up to 5 pages",
        "Mobile-first design",
        "Contact form",
        "Basic SEO setup",
        "Fast loading structure",
        "Vercel-ready deployment",
        "2 revision rounds",
        "7–10 day target turnaround"
      ],
      button: "Start Business Website",
      accent: true
    },
    {
      name: "Premium Website",
      price: "From $3,500",
      bestFor: "Established businesses that want a stronger, more premium online presence.",
      includes: [
        "5–8 pages",
        "Premium custom design",
        "Copy direction",
        "SEO page structure",
        "Conversion-focused layout",
        "Analytics setup",
        "Launch support"
      ],
      button: "Build Premium Site",
      accent: false
    },
    {
      name: "Growth Website",
      price: "From $6,500+",
      bestFor: "Businesses that want a complete digital platform with stronger growth foundations.",
      includes: [
        "8–12+ pages",
        "Advanced layouts",
        "Service landing pages",
        "Blog/news structure",
        "SEO foundations",
        "Conversion strategy",
        "Ongoing support options"
      ],
      button: "Discuss Growth Website",
      accent: false
    }
  ];

  const scrollToContact = (pkgName: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      // Optional: Could pre-fill a form field here if we had state management for it
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <Section id="packages" className="bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6">
              Premium websites without ridiculous agency pricing.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Clear starting points. No vague agency mystery. Final pricing depends on scope, content, integrations and turnaround.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={i} delay={0.2 + (i * 0.1)} className="h-full">
              <div className={`flex flex-col h-full rounded-sm border p-8 transition-all duration-300 ${
                pkg.accent 
                  ? "bg-primary text-primary-foreground border-primary shadow-xl relative" 
                  : "bg-white text-foreground border-border hover:border-primary/30"
              }`}>
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold mb-2 ${pkg.accent ? "text-white" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-3xl font-serif font-medium mb-4 ${pkg.accent ? "text-accent" : "text-foreground"}`}>
                    {pkg.price}
                  </div>
                  <p className={`text-sm leading-relaxed ${pkg.accent ? "text-white/80" : "text-foreground/70"}`}>
                    {pkg.bestFor}
                  </p>
                </div>

                <div className="flex-grow">
                  <div className={`text-xs uppercase tracking-wider font-semibold mb-4 ${pkg.accent ? "text-white/60" : "text-foreground/50"}`}>
                    Includes
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.accent ? "text-accent" : "text-primary"}`} />
                        <span className={pkg.accent ? "text-white/90" : "text-foreground/80"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => scrollToContact(pkg.name)}
                  className={`w-full py-3 rounded-sm text-sm font-semibold transition-all duration-200 mt-auto ${
                    pkg.accent 
                      ? "bg-white text-primary hover:bg-gray-100" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {pkg.button}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.6}>
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-sm text-foreground/60 leading-relaxed italic">
              Prices are starting points. Every project is scoped properly before work begins. No unlimited revisions. No hidden agency fluff. Just a clear website build with a professional outcome.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
