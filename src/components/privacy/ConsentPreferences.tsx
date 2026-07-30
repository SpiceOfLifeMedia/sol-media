import { useEffect, useState } from 'react';
import { Link } from 'wouter';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  OPEN_CONSENT_PREFERENCES_EVENT,
  readConsentChoice,
  setConsentChoice,
  type ConsentChoice,
} from '@/lib/privacyConsent';

const choiceLabels: Record<ConsentChoice, string> = {
  essential: 'Essential only',
  analytics: 'Analytics allowed',
};

export function ConsentPreferences() {
  const [isReady, setIsReady] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setChoice(readConsentChoice());
    setIsReady(true);

    const handleOpenPreferences = () => setPreferencesOpen(true);
    window.addEventListener(
      OPEN_CONSENT_PREFERENCES_EVENT,
      handleOpenPreferences,
    );

    return () => {
      window.removeEventListener(
        OPEN_CONSENT_PREFERENCES_EVENT,
        handleOpenPreferences,
      );
    };
  }, []);

  const applyChoice = (nextChoice: ConsentChoice) => {
    const result = setConsentChoice(nextChoice);
    setChoice(result.choice);
    setPreferencesOpen(false);
    if (result.reloadRequired) window.location.reload();
  };

  const showFirstVisitBanner = isReady && choice === null && !preferencesOpen;

  return (
    <>
      {showFirstVisitBanner ? (
        <section
          aria-labelledby="privacy-choices-title"
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-[760px] border border-[rgba(242,238,230,0.18)] bg-[var(--ink)] p-5 text-[var(--paper)] shadow-2xl md:bottom-6 md:flex md:items-center md:gap-8 md:p-6"
          role="region"
        >
          <div className="flex-1">
            <h2
              className="text-[18px] font-[800] tracking-[-0.01em]"
              id="privacy-choices-title"
            >
              Your privacy choices
            </h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-[rgba(242,238,230,0.72)]">
              We use essential browser storage to remember this choice. Google
              Analytics is optional, stays off by default and only loads after
              you allow it. Advertising consent stays denied either way.{' '}
              <Link
                className="text-[var(--paper)] underline decoration-[rgba(242,238,230,0.45)] underline-offset-4 hover:decoration-[var(--paper)]"
                href="/privacy"
              >
                Read our privacy policy
              </Link>
              .
            </p>
          </div>
          <div className="mt-5 grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2 md:mt-0 md:flex">
            <button
              className="min-h-11 border border-[rgba(242,238,230,0.45)] px-5 py-3 text-[13px] font-[750] transition-colors hover:border-[var(--paper)] hover:bg-[rgba(242,238,230,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--paper)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
              onClick={() => applyChoice('essential')}
              type="button"
            >
              Essential only
            </button>
            <button
              className="min-h-11 bg-[var(--verm)] px-5 py-3 text-[13px] font-[750] text-[var(--ink)] transition-colors hover:bg-[var(--verm-pressed)] hover:text-[var(--paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--paper)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
              onClick={() => applyChoice('analytics')}
              type="button"
            >
              Allow analytics
            </button>
          </div>
        </section>
      ) : null}

      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[560px] border border-[rgba(22,21,15,0.18)] bg-[var(--paper)] p-6 text-[var(--ink)] sm:p-8">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="text-[28px] font-[800] tracking-[-0.02em]">
              Privacy choices<span className="text-[var(--verm)]">.</span>
            </DialogTitle>
            <DialogDescription className="pt-2 text-[14px] leading-[1.6] text-[rgba(22,21,15,0.7)]">
              Essential storage remembers your selection. Google Analytics,
              delivered through Google Tag Manager, only loads when you allow
              analytics. Advertising consent remains denied for both choices.
            </DialogDescription>
          </DialogHeader>

          <p
            aria-live="polite"
            className="text-[12px] font-[750] uppercase tracking-[0.08em] text-[rgba(22,21,15,0.58)]"
          >
            Current setting: {choice ? choiceLabels[choice] : 'No choice saved'}
          </p>

          <div className="grid gap-3">
            <button
              aria-describedby="essential-consent-description"
              aria-label="Essential only"
              aria-pressed={choice === 'essential'}
              className="border border-[rgba(22,21,15,0.22)] bg-white p-5 text-left transition-colors hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--verm)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] aria-pressed:border-[var(--verm)]"
              onClick={() => applyChoice('essential')}
              type="button"
            >
              <span className="block text-[15px] font-[800]">Essential only</span>
              <span
                className="mt-1 block text-[13px] leading-[1.5] text-[rgba(22,21,15,0.68)]"
                id="essential-consent-description"
              >
                Remember this preference; keep analytics and advertising consent
                denied.
              </span>
            </button>

            <button
              aria-describedby="analytics-consent-description"
              aria-label="Allow analytics"
              aria-pressed={choice === 'analytics'}
              className="border border-[rgba(22,21,15,0.22)] bg-white p-5 text-left transition-colors hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--verm)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] aria-pressed:border-[var(--verm)]"
              onClick={() => applyChoice('analytics')}
              type="button"
            >
              <span className="block text-[15px] font-[800]">
                Allow analytics
              </span>
              <span
                className="mt-1 block text-[13px] leading-[1.5] text-[rgba(22,21,15,0.68)]"
                id="analytics-consent-description"
              >
                Load consent-based Google Analytics to measure site usage; keep
                all advertising consent denied.
              </span>
            </button>
          </div>

          <p className="text-[12px] leading-[1.5] text-[rgba(22,21,15,0.58)]">
            You can change this setting at any time from the footer. See the{' '}
            <Link
              className="font-[700] text-[var(--ink)] underline underline-offset-4"
              href="/privacy"
              onClick={() => setPreferencesOpen(false)}
            >
              privacy policy
            </Link>{' '}
            for more information.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
