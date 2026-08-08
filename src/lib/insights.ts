export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
};

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  published: string;
  displayDate: string;
  readTime: string;
  intro: string;
  sections: InsightSection[];
  relatedService: {
    label: string;
    href: string;
  };
};

export const INSIGHTS: Insight[] = [
  {
    slug: 'when-should-an-established-business-rebrand',
    category: 'Brand strategy',
    title: 'When should an established business rebrand?',
    excerpt:
      'The clearest signs your brand has fallen behind the business—and how to decide whether you need a refresh or a complete repositioning.',
    published: '2026-08-09',
    displayDate: '9 August 2026',
    readTime: '7 min read',
    intro:
      'A rebrand should not begin because someone is tired of the logo. It should begin when the way the business presents itself is making growth, trust or decision-making harder than it needs to be.',
    sections: [
      {
        heading: 'The business has changed, but the brand has not',
        paragraphs: [
          'Established businesses often carry an identity created for an earlier version of the company. The team is stronger, the work is more sophisticated and the clients are larger—but the website, message and visual system still signal a smaller or less capable operation.',
          'That gap matters. Prospective clients cannot see your internal progress. They judge the version of the business that appears in search, on the website and across your proposals and content.',
        ],
        callout:
          'A brand problem exists when the market sees a weaker, less distinctive or less valuable business than the one you actually run.',
      },
      {
        heading: 'Five signs the brand is now costing you',
        paragraphs: [
          'No single symptom automatically means you need a full rebrand. A consistent pattern across several customer touchpoints is the more reliable signal.',
        ],
        bullets: [
          'Your best clients are surprised by the quality of the work after they engage you.',
          'Your team explains the business differently in sales calls, proposals and marketing.',
          'The website attracts enquiries for old, low-value or irrelevant services.',
          'Competitors with weaker offers look more credible or easier to understand.',
          'You avoid sharing the website, proposal or visual identity because it feels behind the business.',
        ],
      },
      {
        heading: 'Refresh, reposition or rebuild?',
        paragraphs: [
          'A refresh improves the expression of an already sound strategy. It may refine typography, colour, imagery, layouts and selected messaging while preserving existing recognition.',
          'A repositioning changes what the business wants to be known for, which customers it prioritises or why it should be chosen. That work must happen before visual design. A full rebuild connects the new position to an identity, website, content system and customer journey.',
          'If the offer is clear and the right clients already understand your value, a refresh may be enough. If the business is attracting the wrong work or struggling to explain why it is different, the problem is probably strategic.',
        ],
      },
      {
        heading: 'What a useful rebrand should produce',
        paragraphs: [
          'A rebrand is successful when it improves decisions—not simply when it creates attractive files. Your team should know which audiences matter, what the business promises, how it differs and how that message appears consistently across every channel.',
        ],
        bullets: [
          'A clear position and audience priority.',
          'A practical messaging hierarchy for sales and marketing.',
          'A recognisable identity that works across digital and physical formats.',
          'Guidelines and templates the team can actually use.',
          'A rollout plan covering the website, search, social content and customer materials.',
        ],
      },
      {
        heading: 'Start with evidence, not taste',
        paragraphs: [
          'Before commissioning a new identity, audit how the current brand performs. Review sales conversations, customer questions, search visibility, website behaviour, competitor positioning and every major touchpoint. The goal is to identify where perception and reality have separated.',
          'That evidence gives the project a commercial brief. It also prevents a costly visual change from disguising an unresolved offer or messaging problem.',
        ],
      },
    ],
    relatedService: {
      label: 'Explore Brand Systems',
      href: '/services/brand-systems',
    },
  },
  {
    slug: 'website-rebuild-cost-australia',
    category: 'Websites',
    title: 'What does a professional website rebuild cost in Australia?',
    excerpt:
      'A practical guide to the decisions, disciplines and hidden work that shape the cost of rebuilding an established business website.',
    published: '2026-08-09',
    displayDate: '9 August 2026',
    readTime: '8 min read',
    intro:
      'The honest answer is that a professional website rebuild does not have one standard price. Cost follows complexity: the clarity of the offer, the amount of content, the required functionality and the level of strategic work needed before design begins.',
    sections: [
      {
        heading: 'Why website quotes vary so widely',
        paragraphs: [
          'Two proposals can both say “website design” while describing completely different products. One may reskin existing pages. Another may include research, positioning, information architecture, conversion copy, custom design, development, analytics and a careful search migration.',
          'Comparing only the number at the bottom of each proposal hides the decisions that determine whether the finished site changes how the business is understood and chosen.',
        ],
      },
      {
        heading: 'The four broad investment levels',
        paragraphs: [
          'These ranges are directional rather than fixed quotations. They help identify the kind of engagement a business is actually considering.',
        ],
        bullets: [
          'Under $5,000: template-led or tightly scoped work, usually with content and strategy supplied by the client.',
          '$5,000–$15,000: a focused small-business site with stronger structure, design and selected content support.',
          '$15,000–$35,000: a strategic custom rebuild covering discovery, copy, UX, responsive design, development, SEO foundations and analytics.',
          '$35,000+: larger content estates, complex integrations, advanced functionality, multiple audiences or substantial brand and content work.',
        ],
        callout:
          'The right budget is not the cheapest route to a new layout. It is the appropriate investment for the business problem the website must solve.',
      },
      {
        heading: 'What changes the price most',
        paragraphs: [
          'Page count matters, but it is rarely the only driver. A compact website with unclear positioning can require more senior thinking than a larger site with a mature content system.',
        ],
        bullets: [
          'Strategy: audience research, competitive positioning and offer architecture.',
          'Content: interviews, website copy, case studies, photography and video.',
          'Design: template adaptation versus a custom visual and interaction system.',
          'Technology: forms, booking, ecommerce, portals, CRM connections and other integrations.',
          'Search migration: URL mapping, redirects, metadata, structured data and measurement continuity.',
          'Governance: approvals, stakeholders, accessibility, legal review and team training.',
        ],
      },
      {
        heading: 'The expensive parts are often invisible',
        paragraphs: [
          'Visitors see pages, but the value of a rebuild often sits underneath them. Information architecture determines whether people find what they need. Redirect planning protects search equity. Analytics confirms whether enquiries work. Quality assurance prevents small failures across devices, browsers and forms.',
          'When these disciplines are excluded, the quote is lower—but the business may pay later through lost rankings, weak conversions, rework or a website the team cannot maintain.',
        ],
      },
      {
        heading: 'How to compare proposals properly',
        paragraphs: [
          'Ask every supplier to describe the outcome, not only the deliverables. Who owns strategy? Who writes the copy? Is the design custom? What happens to existing rankings? How are forms and analytics tested? What support exists after launch?',
          'A strong proposal should make responsibilities, assumptions, exclusions and approval points clear. It should also explain how the project connects to a measurable business objective such as better-qualified enquiries, clearer positioning or reduced friction in the sales process.',
        ],
      },
      {
        heading: 'Know the problem before setting the solution',
        paragraphs: [
          'If the current website feels dated but the cause is unclear, begin with an audit. You may discover that the priority is messaging, search architecture, conversion pathways or performance—not a complete replacement of every component.',
          'That diagnosis creates a more reliable scope and makes the eventual investment easier to defend.',
        ],
      },
    ],
    relatedService: {
      label: 'Explore Websites & Rebuilds',
      href: '/services/websites-rebuilds',
    },
  },
  {
    slug: 'seo-vs-google-ads',
    category: 'Growth',
    title: 'SEO vs Google Ads: where should an Australian business invest first?',
    excerpt:
      'SEO and paid search solve different timing problems. Here is how to decide which channel should lead—and when they should work together.',
    published: '2026-08-09',
    displayDate: '9 August 2026',
    readTime: '7 min read',
    intro:
      'SEO builds an owned source of visibility over time. Google Ads buys immediate access to existing search demand. Most established businesses eventually benefit from both, but the right starting point depends on urgency, economics and whether the website is ready to convert attention.',
    sections: [
      {
        heading: 'What SEO is designed to do',
        paragraphs: [
          'SEO improves the technical structure, relevance and authority of a website so it can earn visibility for useful searches. It includes far more than inserting keywords: search intent, page architecture, content quality, internal linking, performance and reputation all matter.',
          'Its advantage is compounding value. A useful page can keep attracting qualified visitors after the initial work is complete. Its limitation is time. Competitive results are rarely immediate, and sustainable growth requires consistent improvement.',
        ],
      },
      {
        heading: 'What Google Ads is designed to do',
        paragraphs: [
          'Google Ads can place an offer in front of people searching now. It is useful for testing demand, launching a service, entering a market or generating leads while organic visibility develops.',
          'Its advantage is speed and control. Its limitation is that every click has a cost, competition can increase that cost and visibility generally stops when spending stops.',
        ],
      },
      {
        heading: 'Start with SEO when…',
        paragraphs: [
          'SEO should usually lead when the business has a stable offer, meaningful search demand and the patience to build a durable acquisition asset.',
        ],
        bullets: [
          'Customers regularly research the category before contacting a supplier.',
          'The business has expertise that can become genuinely useful content.',
          'Customer value supports a sustained six-to-twelve-month growth program.',
          'The website needs structural improvement regardless of advertising.',
          'Reducing long-term dependence on paid traffic is a priority.',
        ],
      },
      {
        heading: 'Start with Google Ads when…',
        paragraphs: [
          'Paid search should usually lead when speed matters and the business can measure the commercial value of a lead.',
        ],
        bullets: [
          'A new campaign or service needs demand immediately.',
          'Search terms show strong buying intent and are specific enough to target.',
          'The website already explains the offer clearly and converts reliably.',
          'The team can answer leads quickly and track them through to revenue.',
          'The business wants real market data before investing heavily in content.',
        ],
      },
      {
        heading: 'Do not pay to amplify a weak website',
        paragraphs: [
          'Advertising cannot repair unclear positioning, slow pages, weak proof or a broken enquiry experience. It can only send more people into that system. Before increasing spend, confirm that the landing page matches the search, explains the value quickly and makes the next step obvious.',
          'The same foundation helps SEO: technically sound pages, useful content, clear offers and trustworthy evidence. Improving it first makes both channels more efficient.',
        ],
        callout:
          'Traffic is not the objective. The objective is profitable attention that becomes the right kind of enquiry.',
      },
      {
        heading: 'The strongest approach is often staged',
        paragraphs: [
          'A practical plan can use paid search to capture immediate demand and reveal which messages and search terms produce qualified leads. Those insights then strengthen the organic content plan. As SEO visibility grows, advertising can concentrate on the most valuable gaps, offers and remarketing audiences.',
          'Whichever channel starts first, measurement must be in place before money or time scales. Track meaningful enquiries, lead quality and revenue—not only clicks, impressions or rankings.',
        ],
      },
    ],
    relatedService: {
      label: 'Explore SEO & Search Growth',
      href: '/services/seo-search-growth',
    },
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((insight) => insight.slug === slug);
}
