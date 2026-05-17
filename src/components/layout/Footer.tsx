import logo from "@/assets/sol-media-logo.png";

export function Footer() {
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

  const navItems = [
    { name: "Websites", href: "websites" },
    { name: "Packages", href: "packages" },
    { name: "Process", href: "process" },
    { name: "Media Support", href: "media-support" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Spice Of Life Media" className="w-10 h-10 object-contain brightness-0 invert opacity-90" />
              <span className="font-serif font-medium text-xl tracking-wide">
                Spice Of Life Media
              </span>
            </div>
            <p className="text-background/70 max-w-sm leading-relaxed mb-6">
              Premium websites for Australian businesses.
            </p>
            <p className="text-accent text-sm font-semibold tracking-wider uppercase">
              Website first. Content when it counts.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-white/10 pb-2 inline-block">Navigation</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => scrollTo(item.href)}
                    className="text-background/70 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-white/10 pb-2 inline-block">Location</h4>
            <p className="text-background/70 text-sm">
              Adelaide, South Australia
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/50">
          <p>&copy; {new Date().getFullYear()} Spice Of Life Media. All rights reserved.</p>
          <p>Built for Australian businesses.</p>
        </div>
      </div>
    </footer>
  );
}
