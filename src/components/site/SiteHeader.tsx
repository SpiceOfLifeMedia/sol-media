import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const navItems = [
  ["Services", "services"],
  ["Approach", "approach"],
  ["Studio", "studio"],
] as const;

function goToProject() {
  const target = document.getElementById("start-project");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(
    () => window.dispatchEvent(new CustomEvent("sol:open-project")),
    420,
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <a className="wordmark-link" href="#top" aria-label="Spice of Life Media, home">
          <img
            className="wordmark wordmark--header"
            src="/brand/wordmark-horizontal-white-transparent-1200w.png"
            width="1200"
            height="143"
            alt="Spice of Life Media"
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => navigate(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="button button--paper header-project"
            type="button"
            onClick={goToProject}
          >
            Start a project
          </button>
          <Dialog.Trigger asChild>
            <button className="menu-trigger" type="button" aria-label="Open menu">
              <span />
              <span />
            </button>
          </Dialog.Trigger>
        </div>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content className="mobile-menu" aria-describedby={undefined}>
          <div className="mobile-menu__top">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Dialog.Close asChild>
              <button className="menu-close" type="button" aria-label="Close menu">
                <span />
                <span />
              </button>
            </Dialog.Close>
          </div>

          <button
            className="button button--paper mobile-menu__project"
            type="button"
            onClick={() => {
              setOpen(false);
              window.setTimeout(goToProject, 120);
            }}
          >
            Start a project
          </button>

          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <button key={id} type="button" onClick={() => navigate(id)}>
                <span>{label}</span>
                <span aria-hidden="true">↘</span>
              </button>
            ))}
          </nav>

          <div className="mobile-menu__meta">
            <a href="mailto:info@spiceoflifemedia.com.au">
              info@spiceoflifemedia.com.au
            </a>
            <span>Adelaide — working internationally</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { goToProject };
