import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceTemplate } from './ServiceTemplate';

export default function WebsitesRebuilds() {
  useSeo();

  const props = {
    title: "Websites &\nRebuilds",
    tagline: "Turn the website into your strongest digital asset.",
    problem: "The current website makes it harder for ideal clients to understand the offer and act. It reads below the quality of your actual work, loads slowly, fails on mobile, or provides a frustrating user experience that drives prospects away.",
    whoFor: "Service-based businesses, agencies, and B2B companies whose current site makes enquiries harder because it looks dated, explains the offer poorly, or functions inconsistently.",
    inclusions: [
      "Website strategy & architecture",
      "UX & UI design",
      "Conversion-focused copywriting",
      "Responsive, mobile-first design",
      "Custom development (new builds & rebuilds)",
      "Dedicated landing pages",
      "Clear conversion pathways",
      "Analytics integration & launch"
    ],
    process: [
      { num: '01', title: 'Architecture', desc: 'We map the user journey, ensuring visitors intuitively find the information they need to convert.' },
      { num: '02', title: 'Design & Copy', desc: 'We design the interface and write the copy in tandem, creating a seamless, persuasive narrative.' },
      { num: '03', title: 'Development', desc: 'We build a fast, accessible, and technically sound website engineered for both humans and search engines.' }
    ],
    outcome: "A clear, fast website that explains the offer, supports search visibility and gives visitors an intuitive path to act.",
    relatedLinks: [
      { title: "SEO & Search Growth", href: "/services/seo-search-growth" },
      { title: "Brand Systems", href: "/services/brand-systems" },
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
