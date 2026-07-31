export const SITE_NAME = 'Spice of Life Media';
export const SITE_URL = 'https://www.spiceoflifemedia.com.au';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og/spice-of-life-media.png`;
export const BRAND_AVATAR = `${SITE_URL}/assets/sol-avatar-1000-vermilion.png`;
export const BRAND_IMAGE_ALT = 'Spice of Life Media — built for the business you’ve become';

export type SeoConfig = {
  title: string;
  description: string;
  index: boolean;
  pageType: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  serviceName?: string;
  lastModified: string;
};

export const SEO_ROUTES: Record<string, SeoConfig> = {
  '/': {
    title: 'Brand, Web & SEO Agency Adelaide | Spice of Life Media',
    description:
      'Adelaide brand and digital agency helping businesses sharpen their identity, rebuild better websites, grow in search and create consistent content systems.',
    index: true,
    pageType: 'WebPage',
    lastModified: '2026-07-31',
  },
  '/capabilities': {
    title: 'Brand, Web, SEO & Content Services | Spice of Life Media',
    description:
      'Explore connected digital services for Adelaide businesses: presence audits, brand systems, website design and rebuilds, SEO, and social content systems.',
    index: true,
    pageType: 'CollectionPage',
    lastModified: '2026-07-31',
  },
  '/approach': {
    title: 'Our Digital Agency Process | Spice of Life Media',
    description:
      'See how our Adelaide agency audits, positions, designs, builds and grows connected brand, website, SEO and content systems around clear business goals.',
    index: true,
    pageType: 'WebPage',
    lastModified: '2026-07-31',
  },
  '/agency': {
    title: 'Australian Brand, Web & SEO Agency | Spice of Life Media',
    description:
      'Meet the Adelaide-based agency connecting brand, websites, search and content under one accountable lead for established businesses across Australia.',
    index: true,
    pageType: 'AboutPage',
    lastModified: '2026-07-31',
  },
  '/start-a-project': {
    title: 'Start a Project | Spice of Life Media Adelaide',
    description:
      'Tell us what feels disconnected, outdated or underperforming across your brand, website, search or content. We’ll recommend the clearest next step.',
    index: true,
    pageType: 'ContactPage',
    lastModified: '2026-07-31',
  },
  '/privacy': {
    title: 'Privacy Policy | Spice of Life Media',
    description:
      'Contact Spice of Life Media about privacy, personal information or data submitted through this website.',
    index: false,
    pageType: 'WebPage',
    lastModified: '2026-07-31',
  },
  '/services/digital-presence-audit': {
    title: 'Digital Presence Audit Adelaide | Spice of Life Media',
    description:
      'Find the website, SEO, brand, messaging and content gaps holding your business back, with a clear, prioritised roadmap for improvement.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Digital Presence Audit',
    lastModified: '2026-07-31',
  },
  '/services/brand-systems': {
    title: 'Brand Strategy & Identity Adelaide | Spice of Life Media',
    description:
      'Build a consistent brand system with positioning, messaging, identity, typography, colour, digital guidelines and social templates for your business.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Brand Systems',
    lastModified: '2026-07-31',
  },
  '/services/websites-rebuilds': {
    title: 'Website Design & Rebuilds Adelaide | Spice of Life Media',
    description:
      'Strategy, conversion-focused copy, UX/UI design and custom website development for service businesses ready for a clearer, faster website.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Websites & Rebuilds',
    lastModified: '2026-07-31',
  },
  '/services/seo-search-growth': {
    title: 'SEO Services Adelaide | Spice of Life Media',
    description:
      'Grow organic visibility with technical SEO, keyword and intent strategy, on-page optimisation, local SEO, content architecture and long-term planning.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'SEO & Search Growth',
    lastModified: '2026-07-31',
  },
  '/services/social-content-systems': {
    title: 'Social Media Strategy Adelaide | Spice of Life Media',
    description:
      'Build a practical content system with platform strategy, campaign frameworks, reusable templates, short-form video direction, scheduling and review.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Social & Content Systems',
    lastModified: '2026-07-31',
  },
};

export const NOT_FOUND_SEO: SeoConfig = {
  title: 'Page Not Found | Spice of Life Media',
  description:
    'The requested page could not be found. Explore Spice of Life Media’s brand, website, SEO and content services or return to the homepage.',
  index: false,
  pageType: 'WebPage',
  lastModified: '2026-07-31',
};

export function normalizePath(pathname: string) {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || '/';
  if (pathOnly === '/') return '/';
  return pathOnly.replace(/\/+$/, '');
}

export function getSeo(pathname: string) {
  return SEO_ROUTES[normalizePath(pathname)] ?? NOT_FOUND_SEO;
}

export function canonicalUrl(pathname: string) {
  const path = normalizePath(pathname);
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function structuredDataForPath(pathname: string) {
  const path = normalizePath(pathname);
  const seo = getSeo(path);
  if (!SEO_ROUTES[path]) return null;

  const canonical = canonicalUrl(path);
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonical}#webpage`;

  const webpage: Record<string, unknown> = {
    '@type': seo.pageType,
    '@id': webpageId,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    inLanguage: 'en-AU',
  };

  if (seo.serviceName) {
    webpage.mainEntity = { '@id': `${canonical}#service` };
  }

  if (path === '/capabilities') {
    webpage.mainEntity = { '@id': `${canonical}#services` };
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      alternateName: 'SOL Media',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: BRAND_AVATAR,
        width: 1000,
        height: 1000,
      },
      email: 'info@spiceoflifemedia.com.au',
      areaServed: [
        {
          '@type': 'City',
          name: 'Adelaide',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'South Australia',
        },
        {
          '@type': 'Country',
          name: 'Australia',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': organizationId },
      inLanguage: 'en-AU',
    },
    webpage,
  ];

  if (path.startsWith('/services/')) {
    const itemListElement: Record<string, unknown>[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
    ];

    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Capabilities',
      item: `${SITE_URL}/capabilities`,
    });

    itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: seo.serviceName ?? seo.title.split('|')[0].trim(),
      item: canonical,
    });

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement,
    });
    webpage.breadcrumb = { '@id': `${canonical}#breadcrumb` };
  }

  if (seo.serviceName) {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: seo.serviceName,
      description: seo.description,
      url: canonical,
      provider: { '@id': organizationId },
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
    });
  }

  if (path === '/capabilities') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonical}#services`,
      name: 'Spice of Life Media capabilities',
      itemListElement: Object.entries(SEO_ROUTES)
        .filter(([, entry]) => entry.serviceName)
        .map(([servicePath, entry], index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.serviceName,
          url: canonicalUrl(servicePath),
        })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
