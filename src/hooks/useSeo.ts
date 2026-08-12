import { useEffect } from 'react';
import { useLocation } from 'wouter';

import {
  BRAND_IMAGE_ALT,
  DEFAULT_OG_IMAGE,
  SEO_ROUTES,
  SITE_NAME,
  canonicalUrl,
  getSeo,
  normalizePath,
  structuredDataForPath,
} from '@/lib/seo';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function useSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const seo = getSeo(location);
    const knownRoute = normalizePath(location) in SEO_ROUTES;
    const canonical = canonicalUrl(location);
    const robots = `${seo.index ? 'index' : 'noindex'}, ${seo.follow === false ? 'nofollow' : 'follow'}`;

    document.documentElement.lang = 'en-AU';
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', robots);

    let canonicalElement = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (knownRoute) {
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.rel = 'canonical';
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.href = canonical;
    } else {
      canonicalElement?.remove();
    }

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_AU');
    upsertMeta('property', 'og:type', seo.article ? 'article' : 'website');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:type', 'image/png');
    upsertMeta(
      'property',
      'og:image:alt',
      BRAND_IMAGE_ALT,
    );

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
    upsertMeta(
      'name',
      'twitter:image:alt',
      BRAND_IMAGE_ALT,
    );

    const scriptId = 'sol-structured-data';
    const structuredData = structuredDataForPath(location);
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (structuredData) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      script?.remove();
    }
  }, [location]);
}
