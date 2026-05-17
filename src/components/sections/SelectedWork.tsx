import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

import tradeImg from "@/assets/work-trade.png";
import financeImg from "@/assets/work-finance.png";
import salonImg from "@/assets/work-salon.png";
import eduImg from "@/assets/work-education.png";
import hospImg from "@/assets/work-hospitality.png";
import serviceImg from "@/assets/work-service.png";

export function SelectedWork() {
  const projects = [
    {
      title: "Premium Trade Website",
      desc: "Modern rebuild for a trade business needing a stronger first impression and clearer enquiry flow.",
      tags: ["Trust", "Local SEO", "Enquiries"],
      image: tradeImg
    },
    {
      title: "Finance Broker Website",
      desc: "Clean, authoritative digital presence built to convert high-value leads and establish immediate credibility.",
      tags: ["Authority", "Conversion", "Professional"],
      image: financeImg
    },
    {
      title: "Boutique Salon Website",
      desc: "Elegant visual direction paired with seamless booking integration for a high-end service business.",
      tags: ["Aesthetic", "Bookings", "Mobile-first"],
      image: salonImg
    },
    {
      title: "Education Media Platform",
      desc: "Structured, scalable architecture designed to host content and drive institutional engagement.",
      tags: ["Architecture", "Content", "Scalable"],
      image: eduImg
    },
    {
      title: "Hospitality Venue Website",
      desc: "Cinematic, atmosphere-driven site that captures the venue's vibe while making reservations effortless.",
      tags: ["Cinematic", "Reservations", "Vibe"],
      image: hospImg
    },
    {
      title: "Local Service Business Website",
      desc: "Practical, fast-loading site built around clear local service pages and a direct path to call or enquire.",
      tags: ["Speed", "Local", "Direct Response"],
      image: serviceImg
    }
  ];

  return (
    <Section id="work" className="bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground max-w-2xl">
              Built for businesses that need to look sharper.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={i} delay={0.1 * (i % 3)}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6 border border-border/50 bg-white">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-semibold uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
