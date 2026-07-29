import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceTemplate } from './ServiceTemplate';

export default function DigitalPresenceAudit() {
  useSeo('Digital Presence Audit', 'Find what\'s holding the brand back — before anything gets rebuilt.');

  const props = {
    title: "Digital Presence\nAudit",
    tagline: "Find what's holding the brand back — before anything gets rebuilt.",
    problem: "Symptoms are easy to see: low traffic, poor conversion, or a brand that feels outdated. But treating symptoms doesn't fix the underlying system. The audit finds the structural, strategic, and messaging gaps that are quietly costing trust and revenue.",
    whoFor: "Established businesses whose digital presence no longer matches the quality of their work, or companies preparing for a major rebuild who need a clear strategic foundation first.",
    inclusions: [
      "Website UX & UI audit",
      "Technical & On-page SEO review",
      "Brand identity & messaging review",
      "Competitor positioning review",
      "Content & social strategy review",
      "Customer journey & conversion analysis",
      "Prioritised roadmap of recommendations"
    ],
    process: [
      { num: '01', title: 'Discovery', desc: 'We uncover your business goals, target audience, and what you feel isn\'t currently working.' },
      { num: '02', title: 'Deep Analysis', desc: 'We review your entire digital footprint across search, website, brand, and content.' },
      { num: '03', title: 'Roadmap Delivery', desc: 'We present a clear, prioritised action plan detailing exactly what should change and why.' }
    ],
    outcome: "A clear, actionable roadmap detailing what needs to change, why it matters commercially, and what steps to take first to stop losing ground.",
    relatedLinks: [
      { title: "Brand Systems", href: "/services/brand-systems" },
      { title: "Websites & Rebuilds", href: "/services/websites-rebuilds" },
      { title: "SEO & Search Growth", href: "/services/seo-search-growth" }
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
