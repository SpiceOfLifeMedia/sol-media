import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

import { trackAnalyticsEvent } from '@/lib/analytics';
import { ANALYTICS_ENABLED_EVENT } from '@/lib/privacyConsent';

export function AnalyticsTracker() {
  const [location] = useLocation();
  const lastTrackedPath = useRef<string | null>(null);
  const trackCurrentPage = useCallback(() => {
    const pagePath = window.location.pathname;
    if (lastTrackedPath.current === pagePath) return;

    const tracked = trackAnalyticsEvent('page_view', {
      page_path: pagePath,
      page_title: document.title,
    });
    if (tracked) lastTrackedPath.current = pagePath;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(trackCurrentPage, 0);
    return () => window.clearTimeout(timer);
  }, [location, trackCurrentPage]);

  useEffect(() => {
    const handleAnalyticsEnabled = () => trackCurrentPage();
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      const sourcePath = window.location.pathname;

      if (href.toLowerCase().startsWith('mailto:')) {
        trackAnalyticsEvent('mailto_click', { source_path: sourcePath });
        return;
      }

      try {
        const destination = new URL(link.href, window.location.href);
        if (
          destination.origin === window.location.origin &&
          destination.pathname === '/start-a-project'
        ) {
          trackAnalyticsEvent('start_project_click', {
            source_path: sourcePath,
          });
        }
      } catch {
        // Invalid or non-web links are ignored.
      }
    };

    window.addEventListener(ANALYTICS_ENABLED_EVENT, handleAnalyticsEnabled);
    document.addEventListener('click', handleLinkClick, true);

    return () => {
      window.removeEventListener(
        ANALYTICS_ENABLED_EVENT,
        handleAnalyticsEnabled,
      );
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [trackCurrentPage]);

  return null;
}
