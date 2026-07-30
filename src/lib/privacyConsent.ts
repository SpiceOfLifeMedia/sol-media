export type ConsentChoice = 'essential' | 'analytics';

export const CONSENT_STORAGE_KEY = 'sol-consent:v1';
export const OPEN_CONSENT_PREFERENCES_EVENT = 'sol:open-consent-preferences';

type DataLayerEntry = IArguments | unknown[] | Record<string, unknown>;

declare global {
  interface Window {
    __solConsentDefaultSet?: boolean;
    dataLayer?: DataLayerEntry[];
    gtag?: (...args: unknown[]) => void;
  }
}

const deniedConsent = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const;

function getGtag() {
  window.dataLayer = window.dataLayer ?? [];

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
  }

  return window.gtag;
}

function consentState(choice: ConsentChoice) {
  return {
    ...deniedConsent,
    analytics_storage: choice === 'analytics' ? 'granted' : 'denied',
  };
}

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'essential' || value === 'analytics' ? value : null;
  } catch {
    return null;
  }
}

function storeConsentChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // The current choice still applies for this page if storage is unavailable.
  }
}

export function initialiseConsentMode() {
  if (typeof window === 'undefined') return;

  const gtag = getGtag();

  // Always establish the most privacy-protective default before applying a
  // stored choice. Advertising-related consent remains denied in every case.
  if (!window.__solConsentDefaultSet) {
    gtag('consent', 'default', deniedConsent);
    window.__solConsentDefaultSet = true;
  }

  const storedChoice = readConsentChoice();
  if (storedChoice) {
    gtag('consent', 'update', consentState(storedChoice));
  }
}

export function setConsentChoice(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;

  storeConsentChoice(choice);
  getGtag()('consent', 'update', consentState(choice));
}

export function openConsentPreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT));
}
