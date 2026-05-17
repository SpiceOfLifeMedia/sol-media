import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-abstract.png";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background with slight tint */}
      <div className="absolute inset-0 bg-background z-0"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-accent font-medium tracking-wider text-sm uppercase mb-6">
              Built in Adelaide. Designed for Australian businesses.
            </p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-foreground mb-8">
              Premium websites for businesses ready to <span className="italic text-primary">look the part.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.15}>
            <p className="text-foreground font-semibold text-lg md:text-xl mb-6 flex items-baseline gap-3">
              <span className="inline-block w-8 h-px bg-accent mb-1"></span>
              5-page business websites from <span className="text-primary font-serif">$1,950</span>.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-xl">
              Fast, modern, mobile-first websites for Australian businesses that want agency-quality results without bloated agency pricing.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollTo("contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-sm text-base font-semibold transition-all duration-200"
              >
                Book a Website Review
              </button>
              <button 
                onClick={() => scrollTo("packages")}
                className="bg-white hover:bg-gray-50 text-foreground border border-border px-8 py-4 rounded-sm text-base font-semibold transition-all duration-200"
              >
                View Packages
              </button>
            </div>
          </Reveal>
        </div>
        
        <div className="hidden lg:block relative h-[600px] w-full">
          <Reveal delay={0.4} direction="left" className="h-full">
            <div className="absolute inset-0 bg-primary/5 rounded-sm transform translate-x-4 translate-y-4"></div>
            <img 
              src={heroImg} 
              alt="Premium website interface layers" 
              className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-2xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
