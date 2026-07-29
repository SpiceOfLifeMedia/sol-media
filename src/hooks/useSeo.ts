import { useEffect } from 'react';

export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | Spice of Life Media` : 'Spice of Life Media';

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://spiceoflifemedia.com.au${window.location.pathname}`;

    // OG tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const fullTitle = title ? `${title} | Spice of Life Media` : 'Spice of Life Media';
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:url', `https://spiceoflifemedia.com.au${window.location.pathname}`);
    setMeta('og:type', 'website');
  }, [title, description]);
}
