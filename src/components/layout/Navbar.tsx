import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sol-media-logo.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-[84px] flex items-center ${
        isScrolled
          ? "bg-background/75 backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-500"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Spice Of Life Media"
            className="w-9 h-9 object-contain [filter:brightness(0)] opacity-90"
          />
          <span className="font-serif font-medium text-[15px] text-foreground hidden sm:block tracking-tight">
            Spice Of Life Media
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-foreground/45 hover:text-foreground transition-colors duration-500"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-foreground transition-colors"
          >
            <span className="w-4 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8" />
            Start a Project
          </button>
        </nav>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 top-[60px] bg-background z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden flex flex-col p-8`}
      >
        <div className="flex flex-col gap-2 mt-12 border-t border-foreground/10">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className="text-3xl font-serif font-medium text-left text-foreground hover:text-primary transition-colors py-5 border-b border-foreground/10"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-10 bg-primary text-primary-foreground w-full py-4 rounded-sm text-base font-semibold tracking-wide"
          >
            Start a Project →
          </button>
        </div>
      </div>
    </header>
  );
}
