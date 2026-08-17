export const SITE_NAME = 'Spice of Life Media';
export const SITE_URL = 'https://www.spiceoflifemedia.com.au';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og/spice-of-life-media.png`;
export const BRAND_AVATAR = `${SITE_URL}/assets/sol-avatar-1000-vermilion.png`;
export const BRAND_IMAGE_ALT = 'Spice of Life Media — built for the business you’ve become';

export type SeoConfig = {
  title: string;
  description: string;
  index: boolean;
  follow?: boolean;
  pageType: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  serviceName?: string;
  article?: {
    headline: string;
    datePublished: string;
    dateModified: string;
  };
  socialImage?: {
    url: string;
    alt: string;
    type: 'image/jpeg' | 'image/png' | 'image/webp';
    width?: number;
    height?: number;
  };
  faq?: { question: string; answer: string }[];
  lastModified: string;
};

export const BRAND_SYSTEMS_FAQS = [
  {
    question: 'What does a brand strategy project include?',
    answer: 'A brand strategy project can include positioning, audience definition, competitor context, value proposition, brand messaging, tone of voice and the structure needed to guide identity and marketing decisions. The final scope is shaped around the business problem rather than a fixed bundle of deliverables.',
  },
  {
    question: 'Do you offer rebranding services for established businesses?',
    answer: 'Yes. We help established businesses clarify or reposition the brand when the current identity, message or market perception no longer reflects the company they have become. We preserve useful brand equity where it still serves the business.',
  },
  {
    question: 'Can you refine an existing identity instead of replacing it?',
    answer: 'Yes. A considered refresh may be more appropriate than a complete redesign. We assess the existing logo, typography, colour, messaging and applications before recommending what should stay, evolve or be rebuilt.',
  },
  {
    question: 'Are you an Adelaide brand agency?',
    answer: 'Spice of Life Media is based in Adelaide and works with ambitious businesses throughout South Australia and across Australia. Projects can be delivered collaboratively in person or remotely.',
  },
];

export const LANDING_PAGE_SPRINT_FAQS = [
  {
    question: 'What is included for $800 + GST?',
    answer: 'The $800 project fee plus $80 GST ($880 total) includes one custom responsive landing page, offer structure, conversion-focused copy, an enquiry form, analytics and lead tracking, standard search and social metadata, launch support and three consolidated change rounds. Complex integrations, new brand identities, paid third-party services and full websites are quoted separately.',
  },
  {
    question: 'When does the 48-hour turnaround begin?',
    answer: 'The first complete working version is delivered within 48 business hours after the written brief, essential brand assets, required access and payment are confirmed. The clock excludes client response time, weekends and public holidays.',
  },
  {
    question: 'What do I need to provide?',
    answer: 'Share whatever you already have—even if that is only the business idea and the result you want. The guided brief includes a “Choose for me” option wherever you would prefer us to recommend the strategy, content direction or visual approach.',
  },
  {
    question: 'Is the complimentary Brand Starter Kit included with the $800 landing page?',
    answer: 'No. The complimentary Brand Starter Kit is available with eligible new website and website redesign projects when you choose a focused logo refresh. The $800 + GST WebSprint uses your existing brand unless additional brand work is scoped separately.',
  },
  {
    question: 'How does the money-back guarantee work?',
    answer: 'You receive three consolidated sets of changes. If you are still unhappy after all three rounds, we will refund the project fee. The unused page will not launch and remains the property of Spice of Life Media. Feedback must come from one nominated decision-maker and remain within the agreed one-page scope.',
  },
];

export const SEO_ROUTES: Record<string, SeoConfig> = {
  '/': {
    title: 'Australian Brand, Web & SEO Agency | Spice of Life Media',
    description:
      'Australian brand and digital agency helping established businesses sharpen their identity, rebuild better websites, grow in search and create consistent content systems.',
    index: true,
    pageType: 'WebPage',
    lastModified: '2026-08-09',
  },
  '/capabilities': {
    title: 'Brand, Web, SEO & Content Services | Spice of Life Media',
    description:
      'Explore connected digital services for Australian businesses: presence audits, brand systems, website design and rebuilds, SEO, and social content systems.',
    index: true,
    pageType: 'CollectionPage',
    lastModified: '2026-08-09',
  },
  '/approach': {
    title: 'Our Digital Agency Process | Spice of Life Media',
    description:
      'See how we audit, position, design, build and grow connected brand, website, SEO and content systems for businesses across Australia.',
    index: true,
    pageType: 'WebPage',
    lastModified: '2026-08-09',
  },
  '/agency': {
    title: 'Australian Brand, Web & SEO Agency | Spice of Life Media',
    description:
      'Meet the Adelaide-based agency connecting brand, websites, search and content under one accountable lead for established businesses across Australia.',
    index: true,
    pageType: 'AboutPage',
    lastModified: '2026-08-09',
  },
  '/start-a-project': {
    title: 'Start a Project | Spice of Life Media Australia',
    description:
      'Tell us what feels disconnected, outdated or underperforming across your brand, website, search or content. We’ll recommend the clearest next step.',
    index: true,
    pageType: 'ContactPage',
    lastModified: '2026-08-09',
  },
  '/websprint': {
    title: '48-Hour Conversion Landing Page | $800 + GST',
    description:
      '14-day sale: get one custom, mobile-first conversion landing page with copy, enquiry form and lead tracking, ready within 48 business hours for $800 + $80 GST ($880 total).',
    index: false,
    pageType: 'WebPage',
    serviceName: '48-Hour Conversion Landing Page',
    faq: LANDING_PAGE_SPRINT_FAQS,
    lastModified: '2026-08-17',
  },
  '/privacy': {
    title: 'Privacy Policy | Spice of Life Media',
    description:
      'Contact Spice of Life Media about privacy, personal information or data submitted through this website.',
    index: false,
    pageType: 'WebPage',
    lastModified: '2026-08-09',
  },
  '/custom-cd-order': {
    title: 'Custom CD Order | Spice of Life Media',
    description:
      'Save your custom CD music, artwork, extras and delivery details, then receive an SOL reference to complete payment on Etsy.',
    index: false,
    follow: false,
    pageType: 'WebPage',
    lastModified: '2026-08-12',
  },
  '/services/digital-presence-audit': {
    title: 'Digital Presence Audit Australia | Spice of Life Media',
    description:
      'Find the website, SEO, brand, messaging and content gaps holding your business back, with a clear, prioritised roadmap for improvement.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Digital Presence Audit',
    lastModified: '2026-08-09',
  },
  '/services/brand-systems': {
    title: 'Brand Strategy & Identity Adelaide | Spice of Life Media',
    description:
      'Brand strategy and identity design for Adelaide businesses ready to look as established as they are, including positioning, messaging, rebrands and practical brand systems.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Brand Systems',
    faq: BRAND_SYSTEMS_FAQS,
    lastModified: '2026-08-14',
  },
  '/services/websites-rebuilds': {
    title: 'Website Design & Rebuilds Adelaide | Spice of Life Media',
    description:
      'Adelaide website design and rebuilds for Australian service businesses, combining strategy, conversion copy, UX/UI, custom development and SEO foundations.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Websites & Rebuilds',
    lastModified: '2026-08-14',
  },
  '/services/seo-search-growth': {
    title: 'SEO Agency Adelaide & Australia | Spice of Life Media',
    description:
      'Adelaide SEO services for Australian businesses: technical SEO, search-intent strategy, on-page optimisation, local SEO and useful content architecture.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'SEO & Search Growth',
    lastModified: '2026-08-14',
  },
  '/services/social-content-systems': {
    title: 'Social Media Strategy Adelaide | Spice of Life Media',
    description:
      'Adelaide social media strategy for Australian businesses, with practical content pillars, campaign frameworks, templates, scheduling and performance review.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Social & Content Systems',
    lastModified: '2026-08-14',
  },
  '/insights': {
    title: 'Brand, Website & SEO Insights | Spice of Life Media',
    description:
      'Practical perspectives on brand strategy, website rebuilds, SEO and digital growth for established Australian businesses.',
    index: true,
    pageType: 'CollectionPage',
    lastModified: '2026-08-09',
  },
  '/work': {
    title: 'Selected Website & Digital Strategy Work | Spice of Life Media',
    description:
      'Explore selected website rebuild, digital strategy, SEO and content work delivered by Spice of Life Media for Australian businesses.',
    index: true,
    pageType: 'CollectionPage',
    lastModified: '2026-08-14',
  },
  '/work/full-circle-hair-society': {
    title: 'Full Circle Hair Society Website Rebuild | SOL Media',
    description:
      'See how Spice of Life Media rebuilt the Full Circle Hair Society website and developed a connected social media strategy for the Adelaide salon.',
    index: true,
    pageType: 'WebPage',
    socialImage: {
      url: 'https://www.fullcirclehairsociety.com/images/hero-reel-poster.jpg',
      alt: 'Full Circle Hair Society storefront in Seacliff Park, featured in a Spice of Life Media website rebuild case study',
      type: 'image/jpeg',
      width: 1600,
      height: 900,
    },
    lastModified: '2026-08-14',
  },
  '/insights/when-should-an-established-business-rebrand': {
    title: 'When Should an Established Business Rebrand? | SOL Media',
    description:
      'Learn the signs that your brand has fallen behind your business, and how to decide between a brand refresh, repositioning or complete rebuild.',
    index: true,
    pageType: 'WebPage',
    article: {
      headline: 'When should an established business rebrand?',
      datePublished: '2026-08-09',
      dateModified: '2026-08-09',
    },
    lastModified: '2026-08-09',
  },
};

export const NOT_FOUND_SEO: SeoConfig = {
  title: 'Page Not Found | Spice of Life Media',
  description:
    'The requested page could not be found. Explore Spice of Life Media’s brand, website, SEO and content services or return to the homepage.',
  index: false,
  pageType: 'WebPage',
  lastModified: '2026-08-09',
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

  if (seo.article) {
    webpage.mainEntity = { '@id': `${canonical}#article` };
  }

  if (seo.faq) {
    webpage.subjectOf = { '@id': `${canonical}#faq` };
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

  if (path.startsWith('/insights/')) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Insights',
          item: `${SITE_URL}/insights`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: seo.article?.headline ?? seo.title.split('|')[0].trim(),
          item: canonical,
        },
      ],
    });
    webpage.breadcrumb = { '@id': `${canonical}#breadcrumb` };
  }

  if (path === '/work/full-circle-hair-society') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Selected Work',
          item: `${SITE_URL}/work`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Full Circle Hair Society',
          item: canonical,
        },
      ],
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

  if (path === '/insights') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonical}#articles`,
      name: 'Spice of Life Media insights',
      itemListElement: Object.entries(SEO_ROUTES)
        .filter(([, entry]) => entry.article)
        .map(([articlePath, entry], index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.article?.headline,
          url: canonicalUrl(articlePath),
        })),
    });
    webpage.mainEntity = { '@id': `${canonical}#articles` };
  }

  if (seo.article) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: seo.article.headline,
      description: seo.description,
      datePublished: seo.article.datePublished,
      dateModified: seo.article.dateModified,
      mainEntityOfPage: { '@id': webpageId },
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      image: DEFAULT_OG_IMAGE,
      inLanguage: 'en-AU',
    });
  }

  if (seo.faq) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      url: canonical,
      mainEntity: seo.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
