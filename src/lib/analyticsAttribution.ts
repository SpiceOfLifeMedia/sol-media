const ATTRIBUTION_STORAGE_KEY = 'sol-attribution:v1';
const MAX_ATTRIBUTION_VALUE_LENGTH = 200;

const CAMPAIGN_PARAMETER_NAMES = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_term',
  'utm_content',
  'utm_source_platform',
  'utm_creative_format',
  'utm_marketing_tactic',
  'gclid',
  'gbraid',
  'wbraid',
] as const;

type CampaignParameterName = (typeof CAMPAIGN_PARAMETER_NAMES)[number];
type Attribution = Partial<Record<CampaignParameterName, string>> & {
  landing_path?: string;
};

const initialPageLocation =
  typeof window === 'undefined'
    ? null
    : {
        pathname: window.location.pathname,
        search: window.location.search,
      };

function cleanValue(value: string, maxLength = MAX_ATTRIBUTION_VALUE_LENGTH) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function readAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }

    const attribution: Attribution = {};
    for (const name of CAMPAIGN_PARAMETER_NAMES) {
      const value = (parsed as Record<string, unknown>)[name];
      if (typeof value === 'string') {
        const clean = cleanValue(value);
        if (clean) attribution[name] = clean;
      }
    }

    const landingPath = (parsed as Record<string, unknown>).landing_path;
    if (typeof landingPath === 'string') {
      const clean = cleanValue(landingPath, 500);
      if (clean.startsWith('/')) attribution.landing_path = clean;
    }

    return Object.keys(attribution).length > 0 ? attribution : null;
  } catch {
    return null;
  }
}

export function captureConsentApprovedAttribution() {
  if (typeof window === 'undefined') return;

  // Keep one coherent first-touch snapshot for the lifetime of this tab.
  // Filling individual gaps from later URLs could incorrectly combine two
  // different campaigns into a single enquiry attribution.
  if (readAttribution()) return;

  const entry = initialPageLocation ?? {
    pathname: window.location.pathname,
    search: window.location.search,
  };
  const query = new URLSearchParams(entry.search);
  const next: Attribution = {};

  for (const name of CAMPAIGN_PARAMETER_NAMES) {
    const clean = cleanValue(query.get(name) ?? '');
    if (clean) next[name] = clean;
  }

  const landingPath = cleanValue(entry.pathname, 500);
  if (landingPath.startsWith('/')) next.landing_path = landingPath;

  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(next),
    );
  } catch {
    // Analytics can still run if session storage is unavailable.
  }
}

export function clearConsentApprovedAttribution() {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Storage may be disabled.
  }
}

export function appendConsentApprovedAttribution(
  formData: FormData,
  analyticsAllowed: boolean,
) {
  if (!analyticsAllowed) return;

  const attribution = readAttribution();
  if (!attribution) return;

  formData.set('analytics_attribution_consent', 'granted');
  for (const name of CAMPAIGN_PARAMETER_NAMES) {
    const value = attribution[name];
    if (value) formData.set(`attribution_${name}`, value);
  }

  if (attribution.landing_path) {
    formData.set('attribution_landing_path', attribution.landing_path);
  }
}
