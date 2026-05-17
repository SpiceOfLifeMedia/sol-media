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
      label: "Concept rebuild",
      title: "Premium Trade Website",
      desc: "Concept rebuild for a trade business needing a sharper first impression, clearer service structure and a stronger enquiry flow.",
      tags: ["Trust", "Local SEO", "Enquiries"],
      image: tradeImg
    },
    {
      label: "Demo direction",
      title: "Finance Broker Website",
      desc: "Demo direction for a finance broker — clean, authoritative layout built to establish immediate credibility before the first call.",
      tags: ["Authority", "Conversion", "Professional"],
      image: financeImg
    },
    {
      label: "Concept rebuild",
      title: "Boutique Salon Website",
      desc: "Concept rebuild for a salon — elegant visual direction paired with a clear path to bookings.",
      tags: ["Aesthetic", "Bookings", "Mobile-first"],
      image: salonImg
    },
    {
      label: "Example website system",
      title: "Education Media Platform",
      desc: "Example website system for an education-led brand — structured, scalable architecture designed to host content and drive enquiries.",
      tags: ["Architecture", "Content", "Scalable"],
      image: eduImg
    },
    {
      label: "Demo direction",
      title: "Hospitality Venue Website",
      desc: "Demo direction for a hospitality venue — cinematic, atmosphere-led layout that captures the room and makes reservations effortless.",
      tags: ["Cinematic", "Reservations", "Vibe"],
      image: hospImg
    },
    {
      label: "Example website system",
      title: "Local Service Business Website",
      desc: "Example website system for a local service business — practical, fast-loading layout built around clear service pages and a direct path to enquire.",
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
                
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50 mb-3">
                  {project.label}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-semibold uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
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
