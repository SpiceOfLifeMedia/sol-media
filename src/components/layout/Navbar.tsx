import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sol-media-logo.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
    { name: "Work", href: "work" },
    { name: "Media Support", href: "media-support" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <img src={logo} alt="Spice Of Life Media" className="w-10 h-10 object-contain" />
          <span className="font-serif font-medium text-lg text-foreground hidden sm:block tracking-wide">
            Spice Of Life Media
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200"
          >
            Start Your Website
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 top-[72px] bg-background z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden flex flex-col p-6`}
      >
        <div className="flex flex-col gap-6 mt-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className="text-2xl font-serif text-left text-foreground hover:text-accent transition-colors"
            >
              {item.name}
            </button>
          ))}
          <div className="mt-8 pt-8 border-t border-border">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground w-full py-4 rounded-sm text-lg font-semibold"
            >
              Start Your Website
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
