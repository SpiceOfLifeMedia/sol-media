import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceTemplate } from './ServiceTemplate';

export default function SEOSearchGrowth() {
  useSeo();

  const props = {
    title: "SEO &\nSearch Growth",
    tagline: "Get found by the people already looking for what you do.",
    problem: "Good work can stay invisible when the site isn't structured for search intent. Relying entirely on referrals or paid ads can create a fragile pipeline. Without organic visibility, potential customers may reach competitors first.",
    whoFor: "Businesses with a clear offer and capacity to take on more work, but limited visibility in the searches their ideal customers make.",
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
      { num: '02', title: 'Intent Mapping', desc: 'We research what your ideal clients search for at different stages of their buying journey.' },
      { num: '03', title: 'Ongoing Growth', desc: 'We use search performance data to improve useful content, internal linking and authority over time.' }
    ],
    outcome: "A stronger search foundation and a practical plan for increasing qualified organic visibility over time.",
    relatedLinks: [
      { title: "Websites & Rebuilds", href: "/services/websites-rebuilds" },
      { title: "Social & Content Systems", href: "/services/social-content-systems" },
      { title: "Digital Presence Audit", href: "/services/digital-presence-audit" }
    ]
  };

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">
        <ServiceTemplate {...props} />
      </main>
      <Footer />
    </div>
  );
}
