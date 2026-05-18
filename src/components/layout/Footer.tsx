import logo from "@/assets/sol-media-logo.png";

export function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "Work", href: "work" },
    { name: "Services", href: "websites" },
    { name: "Packages", href: "packages" },
    { name: "Process", href: "process" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <img
                src={logo}
                alt="Spice Of Life Media"
                className="w-8 h-8 object-contain brightness-0 invert opacity-90"
              />
              <span className="font-serif font-medium text-base tracking-tight">
                Spice Of Life Media
              </span>
            </div>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)] max-w-2xl">
              A premium digital studio,<br />
              <span className="italic text-accent">based in Adelaide.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-10 grid grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-background/40 mb-5">
                Navigate
              </p>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm text-background/75 hover:text-accent transition-colors duration-500"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-background/40 mb-5">
                Contact
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@spiceoflifemedia.com.au"
                    className="text-sm text-background/75 hover:text-accent transition-colors duration-500 break-all"
                  >
                    info@spiceoflifemedia.com.au
                  </a>
                </li>
                <li className="text-sm text-background/55">
                  Adelaide, South Australia
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] tracking-[0.28em] uppercase text-background/40">
            &copy; {new Date().getFullYear()} Spice Of Life Media
          </p>
          <p className="text-[10px] tracking-[0.28em] uppercase text-background/40">
            Website first. Media when it counts.
          </p>
        </div>
      </div>
    </footer>
  );
}
