import { Reveal } from "@/components/Reveal";

export function TrustStrip() {
  const points = [
    "Premium Websites",
    "Digital Platforms",
    "Web Applications",
    "SEO Foundations",
    "Video & Media",
    "Fast Turnaround",
  ];

  return (
    <div className="w-full bg-foreground text-background border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12 py-6">
        <Reveal direction="none">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-10 gap-y-3">
            {points.map((point, i) => (
              <span
                key={i}
                className="text-[10px] md:text-xs font-medium tracking-[0.28em] uppercase text-background/55"
              >
                {point}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
