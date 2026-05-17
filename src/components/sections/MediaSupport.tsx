import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Video, Camera, LineChart, Layout, Share2 } from "lucide-react";

export function MediaSupport() {
  const services = [
    {
      title: "Video Content",
      desc: "Brand videos, service explainers, social clips and website hero content.",
      icon: <Video className="w-5 h-5 text-foreground" />
    },
    {
      title: "Photography",
      desc: "Professional images that make your website feel real, local and trustworthy.",
      icon: <Camera className="w-5 h-5 text-foreground" />
    },
    {
      title: "SEO Support",
      desc: "Service pages, content structure and search-friendly improvements after launch.",
      icon: <LineChart className="w-5 h-5 text-foreground" />
    },
    {
      title: "Google Ads Landing Pages",
      desc: "Campaign-ready pages designed to turn traffic into enquiries.",
      icon: <Layout className="w-5 h-5 text-foreground" />
    },
    {
      title: "Social Media Content",
      desc: "Short-form content that supports your website and keeps your business visible.",
      icon: <Share2 className="w-5 h-5 text-foreground" />
    }
  ];

  return (
    <Section id="media-support" className="bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-6">
              Need content to make the website stronger? We can handle that too.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/70 leading-relaxed">
              A great website needs strong words, visuals and trust signals. Spice Of Life Media can also support your business with video, photography, content and digital campaigns when needed.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={i} delay={0.2 + (i * 0.1)}>
              <div className="p-6 border border-border/80 bg-white rounded-sm h-full flex flex-col items-start hover:border-primary/30 transition-colors">
                <div className="mb-4 p-3 bg-background rounded-full border border-border/50">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.6}>
          <div className="mt-12 text-center">
            <span className="inline-block px-6 py-3 border border-border/80 bg-white rounded-sm text-sm font-medium tracking-wide uppercase text-foreground/80 shadow-sm">
              Website first. Media support when it makes sense.
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
