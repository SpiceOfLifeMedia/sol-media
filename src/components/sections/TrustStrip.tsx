import { Reveal } from "@/components/Reveal";

export function TrustStrip() {
  const points = [
    "Fast builds",
    "Mobile-first",
    "SEO-ready",
    "Vercel-ready",
    "Premium design",
    "Clear pricing"
  ];

  return (
    <div className="w-full bg-foreground text-background py-8 border-y border-border/10">
      <div className="container mx-auto px-6">
        <Reveal direction="none">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-4">
            {points.map((point, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span className="text-sm font-medium tracking-wider uppercase text-background/80">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
