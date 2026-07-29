import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceTemplate } from './ServiceTemplate';

export default function SEOSearchGrowth() {
  useSeo('SEO & Search Growth', 'Get found by the people already looking for what you do.');

  const props = {
    title: "SEO &\nSearch Growth",
    tagline: "Get found by the people already looking for what you do.",
    problem: "Good work stays invisible when the site isn't structured for search intent. Relying entirely on referrals or paid ads creates a fragile pipeline. If you aren't capturing organic search traffic, you are handing warm leads directly to competitors.",
    whoFor: "Businesses that have a proven offer and capacity to take on more work, but lack the organic visibility to generate consistent inbound leads.",
    inclusions: [
      "Technical SEO auditing & fixes",
      "Comprehensive on-page optimisation",
      "High-intent keyword strategy",
      "Search-driven content architecture",
      "Local SEO & Google Business Profile",
      "Strategic link building",
      "Core Web Vitals optimisation",
      "Long-term growth planning"
    ],
    process: [
      { num: '01', title: 'Technical Foundation', desc: 'We fix the underlying structural issues preventing search engines from crawling and indexing your site effectively.' },
      { num: '02', title: 'Intent Mapping', desc: 'We identify exactly what your ideal clients are searching for at every stage of their buying journey.' },
      { num: '03', title: 'Ongoing Growth', desc: 'We execute a sustained strategy of content expansion and authority building to capture and hold top rankings.' }
    ],
    outcome: "Sustained, compounding organic visibility that places your business directly in front of prospects exactly when their intent is highest.",
    relatedLinks: [
      { title: "Websites & Rebuilds", href: "/services/websites-rebuilds" },
      { title: "Social & Content Systems", href: "/services/social-content-systems" },
      { title: "Digital Presence Audit", href: "/services/digital-presence-audit" }
    ]
  };

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full pt-[76px] md:pt-0">
        <ServiceTemplate {...props} />
      </main>
      <Footer />
    </div>
  );
}
