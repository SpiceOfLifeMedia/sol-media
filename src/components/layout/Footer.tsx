import { Link } from 'wouter';

import { openConsentPreferences } from '@/lib/privacyConsent';

const ASSET_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)] border-t border-[rgba(242,238,230,0.12)] pt-16 pb-8 px-5 md:px-12 mt-auto">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-start justify-between gap-12 md:gap-8">
        {/* Left */}
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src={`${ASSET_PATH}/assets/sol-mark-white.svg`} alt="Spice of Life Media" className="h-[20px] w-auto" />
            <span className="caps-label font-semibold text-[11.5px] tracking-[0.24em] mt-[2px]">
              SPICE OF LIFE MEDIA
            </span>
          </Link>
        </div>

        {/* Centre Nav */}
        <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link href="/capabilities" className="text-[14px] font-medium text-[rgba(242,238,230,0.7)] hover:text-white transition-colors">
            Capabilities
          </Link>
          <Link href="/approach" className="text-[14px] font-medium text-[rgba(242,238,230,0.7)] hover:text-white transition-colors">
            Approach
          </Link>
          <Link href="/agency" className="text-[14px] font-medium text-[rgba(242,238,230,0.7)] hover:text-white transition-colors">
            Agency
          </Link>
          <Link href="/privacy" className="text-[14px] font-medium text-[rgba(242,238,230,0.7)] hover:text-white transition-colors">
            Privacy
          </Link>
          <button
            className="w-max text-left text-[14px] font-medium text-[rgba(242,238,230,0.7)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--paper)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
            onClick={openConsentPreferences}
            type="button"
          >
            Privacy choices
          </button>
        </nav>

        {/* Right */}
        <div className="flex flex-col gap-2 md:text-right text-[14px] text-[rgba(242,238,230,0.6)]">
          <a href="mailto:info@spiceoflifemedia.com.au" className="hover:text-white transition-colors">
            info@spiceoflifemedia.com.au
          </a>
          <p>Adelaide, Australia — working internationally</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 md:mt-24 text-[12px] text-[rgba(242,238,230,0.4)]">
        © 2026 Spice of Life Media
      </div>
    </footer>
  );
}
