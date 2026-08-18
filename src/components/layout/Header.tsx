import { Link, useLocation } from 'wouter';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useState, useEffect } from 'react';

const ASSET_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function Header() {
  const isScrolled = useScrollHeader(600);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const usesLightHeader =
    isScrolled || ['/capabilities', '/agency', '/privacy', '/website-sprint-terms'].includes(location) || location.startsWith('/insights') || location.startsWith('/work');

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Trap focus / lock body scroll logic can go here for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
    return undefined;
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-180 ease-out border-b ${
          usesLightHeader
            ? 'h-[64px] bg-[var(--paper)] border-transparent text-[var(--ink)] shadow-sm'
            : 'h-[76px] bg-transparent border-[rgba(242,238,230,0.12)] text-[var(--paper)]'
        } hidden md:flex items-center px-12`}
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-default-hover-elevate">
            <img
              src={`${ASSET_PATH}/assets/sol-mark-${usesLightHeader ? 'ink' : 'white'}.svg`}
              alt=""
              aria-hidden="true"
              width="320"
              height="108"
              className="h-[20px] w-auto"
            />
            <span className="caps-label font-semibold text-[11.5px] tracking-[0.24em] mt-[2px]">
              SPICE OF LIFE MEDIA
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              href="/capabilities"
              className={`text-[14px] font-medium transition-colors ${
                usesLightHeader ? 'text-[var(--ink)] hover:text-[var(--verm)]' : 'text-[rgba(242,238,230,0.82)] hover:text-white'
              } ${location === '/capabilities' ? 'border-b-2 border-[var(--verm)] pb-1' : ''}`}
            >
              CAPABILITIES
            </Link>
            <Link
              href="/approach"
              className={`text-[14px] font-medium transition-colors ${
                usesLightHeader ? 'text-[var(--ink)] hover:text-[var(--verm)]' : 'text-[rgba(242,238,230,0.82)] hover:text-white'
              } ${location === '/approach' ? 'border-b-2 border-[var(--verm)] pb-1' : ''}`}
            >
              APPROACH
            </Link>
            <Link
              href="/agency"
              className={`text-[14px] font-medium transition-colors ${
                usesLightHeader ? 'text-[var(--ink)] hover:text-[var(--verm)]' : 'text-[rgba(242,238,230,0.82)] hover:text-white'
              } ${location === '/agency' ? 'border-b-2 border-[var(--verm)] pb-1' : ''}`}
            >
              AGENCY
            </Link>
            <Link
              href="/work"
              className={`text-[14px] font-medium transition-colors ${
                usesLightHeader ? 'text-[var(--ink)] hover:text-[var(--verm)]' : 'text-[rgba(242,238,230,0.82)] hover:text-white'
              } ${location.startsWith('/work') ? 'border-b-2 border-[var(--verm)] pb-1' : ''}`}
            >
              WORK
            </Link>
            <Link
              href="/insights"
              className={`text-[14px] font-medium transition-colors ${
                usesLightHeader ? 'text-[var(--ink)] hover:text-[var(--verm)]' : 'text-[rgba(242,238,230,0.82)] hover:text-white'
              } ${location.startsWith('/insights') ? 'border-b-2 border-[var(--verm)] pb-1' : ''}`}
            >
              INSIGHTS
            </Link>
            {usesLightHeader && (
              <Link
                href="/start-a-project"
                className="bg-[var(--verm)] text-[var(--ink)] text-[14px] font-bold px-6 py-2.5 ml-4 hover:bg-[var(--verm-pressed)] transition-colors"
              >
                Start a project
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 w-full z-50 h-[60px] bg-[var(--ink)] border-b border-[rgba(242,238,230,0.12)] md:hidden flex items-center justify-between px-5">
        <Link href="/" className="flex items-center" aria-label="Spice of Life Media">
          <img
            src={`${ASSET_PATH}/assets/sol-mark-white.svg`}
            alt=""
            aria-hidden="true"
            width="320"
            height="108"
            className="h-[17px] w-auto"
          />
        </Link>
        <button
          className="w-[44px] h-[44px] flex flex-col items-end justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--paper)] focus:ring-offset-2 focus:ring-offset-[var(--ink)]"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="w-[22px] h-[1.5px] bg-[var(--paper)] transition-all"></span>
          <span className="w-[14px] h-[1.5px] bg-[var(--paper)] transition-all"></span>
        </button>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--ink)] flex flex-col md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="h-[60px] flex items-center justify-between px-5 border-b border-[rgba(242,238,230,0.12)]">
            <Link href="/" className="flex items-center" aria-label="Spice of Life Media">
              <img
                src={`${ASSET_PATH}/assets/sol-mark-white.svg`}
                alt=""
                aria-hidden="true"
                width="320"
                height="108"
                className="h-[17px] w-auto"
              />
            </Link>
            <button
              className="w-[44px] h-[44px] flex flex-col items-end justify-center focus:outline-none focus:ring-2 focus:ring-[var(--paper)] focus:ring-offset-2 focus:ring-offset-[var(--ink)] relative"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="w-[22px] h-[1.5px] bg-[var(--paper)] rotate-45 absolute"></span>
              <span className="w-[22px] h-[1.5px] bg-[var(--paper)] -rotate-45 absolute"></span>
            </button>
          </div>
          
          <div className="flex-1 flex flex-col pt-8">
            <Link
              href="/start-a-project"
              className="w-full bg-[var(--verm)] text-[var(--ink)] font-bold text-center py-5 text-[15px] hover:bg-[var(--verm-pressed)] transition-colors mb-8"
            >
              Start a project
            </Link>
            
            <nav className="flex flex-col px-5">
              <Link href="/capabilities" className="text-[26px] font-bold text-[var(--paper)] leading-[56px]">
                CAPABILITIES
              </Link>
              <Link href="/approach" className="text-[26px] font-bold text-[var(--paper)] leading-[56px]">
                APPROACH
              </Link>
              <Link href="/agency" className="text-[26px] font-bold text-[var(--paper)] leading-[56px]">
                AGENCY
              </Link>
              <Link href="/work" className="text-[26px] font-bold text-[var(--paper)] leading-[56px]">
                WORK
              </Link>
              <Link href="/insights" className="text-[26px] font-bold text-[var(--paper)] leading-[56px]">
                INSIGHTS
              </Link>
            </nav>
            
            <div className="mt-auto px-5 pb-12 flex flex-col gap-6">
              <div className="text-[11.5px] font-bold tracking-[0.2em] text-[rgba(242,238,230,0.65)] flex items-center gap-2">
                BRAND <span className="text-[var(--verm)]">•</span> WEB <span className="text-[var(--verm)]">•</span> SEARCH <span className="text-[var(--verm)]">•</span> CONTENT
              </div>
              <a href="mailto:info@spiceoflifemedia.com.au" className="text-[14px] text-[rgba(242,238,230,0.8)] border-b border-[rgba(242,238,230,0.2)] pb-1 w-max">
                info@spiceoflifemedia.com.au
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
