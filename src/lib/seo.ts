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
    question: 'What is included for $879?',
    answer: 'The $879 project price includes a custom responsive service-business website build or strategic rebuild of up to five core pages, a focused Brand Starter Kit, editable branded invoice template, essential SEO launch setup, enquiry pathways, analytics and lead tracking, launch support and three consolidated change rounds.',
  },
  {
    question: 'Why is the Website Sprint available for $879?',
    answer: 'Spice of Life Media has completed a major rebrand and is opening the launch offer to the first 20 accepted Website Sprint projects. In return for the reduced launch price, clients agree that we may showcase the finished public website, business name and approved project story in our portfolio and marketing. We never publish private business information, credentials or confidential project material.',
  },
  {
    question: 'When does the 48-hour turnaround begin?',
    answer: 'The first complete working draft is delivered within 48 business hours after the $59 deposit, approved written brief, essential content and required access are received. The clock excludes client response time, weekends and public holidays.',
  },
  {
    question: 'How does payment work?',
    answer: 'Pay a $59 deposit to begin. It is credited toward the $879 total. After receiving the first complete working draft, you can request up to three consolidated change rounds. The $820 balance is due only after approval and before the website is launched, connected to a domain, transferred or handed over.',
  },
  {
    question: 'What do I need to provide?',
    answer: 'Share whatever you already have—even if that is only the business idea and the result you want. The guided brief includes a “Choose for me” option wherever you would prefer us to recommend the strategy, content direction or visual approach.',
  },
  {
    question: 'Is the Brand Starter Kit included?',
    answer: 'Yes. The Website Launch Sprint includes a focused logo refresh, practical colour and typography direction, essential logo files and an editable branded invoice template. It is a focused visual identity refresh rather than a full strategic rebrand.',
  },
  {
    question: 'Which projects are eligible for the Website Sprint?',
    answer: 'The Website Sprint is designed for straightforward service-business websites that can be delivered through our streamlined custom-development workflow. It includes up to five core pages, standard enquiry pathways and supplied or approved content. Spice of Life Media selects the technical architecture, build method and managed deployment stack best suited to the project. Every project is reviewed for suitability before payment is accepted.',
  },
  {
    question: 'Do you build the website in Wix or Squarespace?',
    answer: 'No. Website Sprint projects are custom-developed in Spice of Life Media’s managed build and deployment stack rather than assembled in Wix, Squarespace or another drag-and-drop website builder. This keeps the build fast, focused and technically consistent. If an existing project must remain inside a specific third-party builder, it is outside this offer and can be quoted separately.',
  },
  {
    question: 'What is not included?',
    answer: 'Ecommerce, complex integrations, extensive copywriting, paid third-party services, ongoing SEO and work beyond the agreed five-page scope are quoted separately. Domain registration or renewal and web-hosting fees are not included because these charges are set and billed by third-party providers. We can connect the completed website to an existing domain and suitable hosting environment when the required access is supplied. The 48-hour clock begins only after the approved brief, essential content, access and payment are received.',
  },
  {
    question: 'How does the money-back guarantee work?',
    answer: 'You receive three consolidated sets of changes. If you are still unhappy after all three rounds, we will refund the $59 deposit. The unused website and brand assets will not launch and remain the property of Spice of Life Media. Feedback must come from one nominated decision-maker and remain within the agreed five-page scope.',
  },
];

export const SEO_ROUTES: Record<string, SeoConfig> = {
  '/': {
    title: 'Brand, Web & SEO Agency Adelaide | Spice of Life Media',
    description:
      'Adelaide brand, website and SEO agency helping established Australian businesses sharpen their identity, rebuild better websites and grow through search.',
    index: true,
    pageType: 'WebPage',
    lastModified: '2026-08-22',
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
    lastModified: '2026-08-22',
  },
  '/website-launch-special': {
    title: '48-Hour Website Design Adelaide | $879 Launch Special',
    description:
      'Get a custom website build or strategic rebuild, Brand Starter Kit, invoice template and essential SEO setup for $879. First draft in 48 business hours.',
    index: true,
    pageType: 'WebPage',
    serviceName: '48-Hour Website Launch Sprint',
    faq: LANDING_PAGE_SPRINT_FAQS,
    lastModified: '2026-08-22',
  },
  '/website-sprint-terms': {
    title: 'Website Sprint Terms | Spice of Life Media',
    description:
      'Terms applying to the Spice of Life Media Website Sprint offer, including scope, timing, revisions, payment and customer rights.',
    index: false,
    pageType: 'WebPage',
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
    title: 'Branding Agency Adelaide | Strategy & Identity',
    description:
      'Brand strategy and identity design for Adelaide businesses, including positioning, messaging, rebrands and practical brand systems built for growth.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Brand Systems',
    faq: BRAND_SYSTEMS_FAQS,
    lastModified: '2026-08-22',
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
  '/website-partnership': {
    title: 'Website Partnership Australia | Spice of Life Media',
    description:
      'Choose a custom website project or an ongoing SOL website partnership with custom design, development, managed hosting, everyday updates and improvement.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'Website Partnership',
    lastModified: '2026-08-24',
  },
  '/services/app-design': {
    title: 'App & Product Design Australia | Spice of Life Media',
    description:
      'Strategic app and digital product design for Australian businesses, including product discovery, UX/UI, prototypes, design systems and developer-ready handoff.',
    index: true,
    pageType: 'WebPage',
    serviceName: 'App & Product Design',
    lastModified: '2026-08-23',
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
    title: 'Website & Digital Strategy Work | Spice of Life Media',
    description:
      'Explore selected website rebuild, digital strategy, SEO and content work delivered by Spice of Life Media for Australian businesses.',
    index: true,
    pageType: 'CollectionPage',
    lastModified: '2026-08-22',
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
