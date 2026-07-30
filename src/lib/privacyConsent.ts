import {
  captureConsentApprovedAttribution,
  clearConsentApprovedAttribution,
} from '@/lib/analyticsAttribution';

export type ConsentChoice = 'essential' | 'analytics';

export const CONSENT_STORAGE_KEY = 'sol-consent:v1';
export const OPEN_CONSENT_PREFERENCES_EVENT = 'sol:open-consent-preferences';
export const ANALYTICS_ENABLED_EVENT = 'sol:analytics-enabled';
export const GOOGLE_TAG_MANAGER_ID = 'GTM-WDDGNG7R';
export const GOOGLE_ANALYTICS_ID = 'G-ZL35TT856B';

const GOOGLE_TAG_MANAGER_SCRIPT_ID = 'sol-google-tag-manager';
const CONSENT_COOKIE_NAME = 'sol_consent_v1';
const CONSENT_DENIAL_SESSION_KEY = 'sol-consent-denied:v1';

type DataLayerEntry = IArguments | unknown[] | Record<string, unknown>;

declare global {
  interface Window {
    __solAnalyticsDisabled?: boolean;
    __solConsentChoice?: ConsentChoice | null;
    __solConsentDefaultSet?: boolean;
    __solConsentSyncSet?: boolean;
    __solGtmLoading?: boolean;
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

function readPersistedConsentChoice(): ConsentChoice | null {
  let localChoice: ConsentChoice | null = null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    localChoice =
      value === 'essential' || value === 'analytics' ? value : null;
  } catch {
    // A first-party cookie provides a fail-closed fallback.
  }

  const cookieChoice =
    document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE_NAME}=`))
      ?.split('=', 2)[1] ?? null;
  const validCookieChoice =
    cookieChoice === 'essential' || cookieChoice === 'analytics'
      ? cookieChoice
      : null;

  // When the two stores disagree, prefer the more privacy-protective choice.
  if (localChoice === 'essential' || validCookieChoice === 'essential') {
    return 'essential';
  }

  return localChoice ?? validCookieChoice;
}

function hasSessionDenialMarker() {
  try {
    return (
      window.sessionStorage.getItem(CONSENT_DENIAL_SESSION_KEY) === 'essential'
    );
  } catch {
    return false;
  }
}

function setSessionDenialMarker() {
  try {
    window.sessionStorage.setItem(CONSENT_DENIAL_SESSION_KEY, 'essential');
  } catch {
    // Persistent stores are still updated below where available.
  }
}

function clearSessionDenialMarker() {
  try {
    window.sessionStorage.removeItem(CONSENT_DENIAL_SESSION_KEY);
  } catch {
    // If removal fails, the privacy-protective denial remains in force.
  }
}

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  if (hasSessionDenialMarker()) return 'essential';
  return readPersistedConsentChoice();
}

function storeConsentChoice(choice: ConsentChoice) {
  if (choice === 'essential') setSessionDenialMarker();

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    if (choice === 'essential') {
      try {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      } catch {
        // The current choice still applies in memory if storage is unavailable.
      }
    }
  }

  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE_NAME}=${choice}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  } catch {
    // The local-storage copy may still have succeeded.
  }

  const persisted = readPersistedConsentChoice() === choice;
  if (choice === 'analytics' && persisted) clearSessionDenialMarker();

  return persisted && readConsentChoice() === choice;
}

function loadGoogleTagManager() {
  if (
    typeof document === 'undefined' ||
    window.__solGtmLoading ||
    document.getElementById(GOOGLE_TAG_MANAGER_SCRIPT_ID)
  ) {
    return;
  }

  window.__solAnalyticsDisabled = false;
  window.__solGtmLoading = true;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
    sol_ga4_measurement_id: GOOGLE_ANALYTICS_ID,
  });

  const script = document.createElement('script');
  script.async = true;
  script.id = GOOGLE_TAG_MANAGER_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
    GOOGLE_TAG_MANAGER_ID,
  )}`;
  script.addEventListener('error', () => {
    window.__solGtmLoading = false;
    script.remove();
  });
  document.head.appendChild(script);
}

function clearGoogleAnalyticsCookies() {
  if (typeof document === 'undefined') return;

  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=', 1)[0]?.trim() ?? '')
    .filter((name) => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));

  const hostname = window.location.hostname;
  const hostnameParts = hostname.split('.');
  const domains = new Set<string>();
  for (let index = 0; index < hostnameParts.length - 1; index += 1) {
    const domain = hostnameParts.slice(index).join('.');
    domains.add(domain);
    domains.add(`.${domain}`);
  }

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    }
  }
}

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  return (window.__solConsentChoice ?? readConsentChoice()) === 'analytics';
}

function initialiseConsentSync() {
  if (window.__solConsentSyncSet) return;
  window.__solConsentSyncSet = true;

  const reloadForExternalChoice = () => {
    const persistedChoice = readConsentChoice();
    if (persistedChoice !== window.__solConsentChoice) {
      window.location.reload();
    }
  };

  window.addEventListener('storage', (event) => {
    if (event.key === CONSENT_STORAGE_KEY) reloadForExternalChoice();
  });
  window.addEventListener('focus', reloadForExternalChoice);
}

export function initialiseConsentMode() {
  if (typeof window === 'undefined') return;

  const gtag = getGtag();
  initialiseConsentSync();

  // Always establish the most privacy-protective default before applying a
  // stored choice. Advertising-related consent remains denied in every case.
  if (!window.__solConsentDefaultSet) {
    gtag('consent', 'default', deniedConsent);
    window.__solConsentDefaultSet = true;
  }

  const storedChoice = readConsentChoice();
  window.__solConsentChoice = storedChoice;
  if (storedChoice) {
    gtag('consent', 'update', consentState(storedChoice));
  }

  if (storedChoice === 'analytics') {
    captureConsentApprovedAttribution();
    loadGoogleTagManager();
  } else {
    window.__solAnalyticsDisabled = true;
    clearConsentApprovedAttribution();
  }
}

export function setConsentChoice(choice: ConsentChoice) {
  if (typeof window === 'undefined') {
    return { choice: 'essential' as const, reloadRequired: false };
  }

  const previousChoice = window.__solConsentChoice ?? readConsentChoice();
  const persisted = storeConsentChoice(choice);
  const appliedChoice =
    choice === 'analytics' && !persisted ? 'essential' : choice;
  window.__solConsentChoice = appliedChoice;
  getGtag()('consent', 'update', consentState(appliedChoice));

  if (appliedChoice === 'analytics') {
    captureConsentApprovedAttribution();
    loadGoogleTagManager();
    if (previousChoice !== 'analytics') {
      window.dispatchEvent(new Event(ANALYTICS_ENABLED_EVENT));
    }
    return { choice: appliedChoice, reloadRequired: false };
  }

  window.__solAnalyticsDisabled = true;
  clearConsentApprovedAttribution();
  clearGoogleAnalyticsCookies();

  const googleTagsWereLoaded =
    previousChoice === 'analytics' ||
    window.__solGtmLoading === true ||
    document.getElementById(GOOGLE_TAG_MANAGER_SCRIPT_ID) !== null;
  const reloadIsFailClosed = readConsentChoice() !== 'analytics';

  return {
    choice: appliedChoice,
    reloadRequired: googleTagsWereLoaded && reloadIsFailClosed,
  };
}

export function openConsentPreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT));
}
