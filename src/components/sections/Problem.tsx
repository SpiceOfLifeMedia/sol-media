import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Problem() {
  const problems = [
    {
      title: "Outdated first impression",
      desc: "Customers judge your business in seconds. If your site looks old, they assume the business is behind too."
    },
    {
      title: "Weak enquiry flow",
      desc: "A good website should guide people clearly towards calling, booking or enquiring."
    },
    {
      title: "Template fatigue",
      desc: "Your business should not look like every other business using the same drag-and-drop layout."
    }
  ];

  return (
    <Section id="problem" className="bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-6">
              Your website should not make your business look smaller than it is.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Most business websites are slow, outdated, confusing or clearly built from a template. That costs trust before a customer even makes contact. We help businesses create a sharper online presence that feels professional, loads fast and turns attention into enquiries.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <Reveal key={i} delay={0.2 + (i * 0.1)}>
              <div className="bg-white border border-border p-8 rounded-sm h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{problem.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {problem.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
