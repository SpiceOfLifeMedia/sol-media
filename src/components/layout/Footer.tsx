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
    { name: "Services", href: "services" },
    { name: "Work", href: "work" },
    { name: "Reviews", href: "reviews" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16 md:py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <img
                src={logo}
                alt="Spice Of Life Media"
                className="w-10 h-10 object-contain opacity-95"
              />
              <span className="font-serif font-medium text-base tracking-tight">
                Spice Of Life Media
              </span>
            </div>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.5rem)] max-w-2xl pb-2">
              A premium digital media studio,<br />
              <span className="italic text-accent">produced in Adelaide.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8 grid grid-cols-2 gap-10">
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

        <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] tracking-[0.28em] uppercase text-background/40">
            &copy; {new Date().getFullYear()} Spice Of Life Media
          </p>
          <p className="text-[10px] tracking-[0.28em] uppercase text-background/40">
            Web · Video · Audio · Events · Brand
          </p>
        </div>
      </div>
    </footer>
  );
}
