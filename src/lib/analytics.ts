import { hasAnalyticsConsent } from '@/lib/privacyConsent';
import { SEO_ROUTES, normalizePath } from '@/lib/seo';

type AnalyticsEventMap = {
  page_view: {
    page_path: string;
    page_title: string;
  };
  generate_lead: {
    form_name: 'start_a_project' | 'landing_page_sprint';
    project_type?: string;
    value?: number;
    currency?: 'AUD';
  };
  form_start: {
    form_name: 'start_a_project' | 'landing_page_sprint';
  };
  start_project_click: {
    source_path: string;
  };
  mailto_click: {
    source_path: string;
  };
};

function safePath(value: string) {
  const path = normalizePath(value);
  return Object.hasOwn(SEO_ROUTES, path) ? path : '/404';
}

function safePageTitle(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

export function trackAnalyticsEvent<EventName extends keyof AnalyticsEventMap>(
  eventName: EventName,
  parameters: AnalyticsEventMap[EventName],
) {
  if (
    typeof window === 'undefined' ||
    !hasAnalyticsConsent() ||
    window.__solAnalyticsDisabled
  ) {
    return false;
  }

  window.dataLayer = window.dataLayer ?? [];

  switch (eventName) {
    case 'page_view': {
      const pageView = parameters as AnalyticsEventMap['page_view'];
      const pagePath = safePath(pageView.page_path);
      window.dataLayer.push({
        event: 'page_view',
        page_location: `${window.location.origin}${pagePath}`,
        page_path: pagePath,
        page_title: safePageTitle(pageView.page_title),
      });
      break;
    }
    case 'generate_lead':
    case 'form_start': {
      const formEvent = parameters as
        | AnalyticsEventMap['generate_lead']
        | AnalyticsEventMap['form_start'];
      window.dataLayer.push({
        event: eventName,
        form_name: formEvent.form_name,
        ...('project_type' in formEvent && formEvent.project_type
          ? { project_type: safePageTitle(formEvent.project_type) }
          : {}),
        ...('value' in formEvent && typeof formEvent.value === 'number'
          ? { value: formEvent.value }
          : {}),
        ...('currency' in formEvent && formEvent.currency
          ? { currency: formEvent.currency }
          : {}),
      });
      break;
    }
    case 'start_project_click':
    case 'mailto_click': {
      const click = parameters as
        | AnalyticsEventMap['start_project_click']
        | AnalyticsEventMap['mailto_click'];
      window.dataLayer.push({
        event: eventName,
        source_path: safePath(click.source_path),
      });
      break;
    }
  }

  return true;
}
