import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceTemplate } from './ServiceTemplate';

export default function BrandSystems() {
  useSeo();

  const props = {
    title: "Brand Systems",
    tagline: "Build a brand people recognise, understand and trust.",
    problem: "The business has moved forward, but its identity still signals an earlier stage. An inconsistent visual identity and unclear messaging can confuse prospects and make the value of the offer harder to understand.",
    whoFor: "Growing companies that have outgrown their original branding, or businesses that look completely different depending on which platform a customer finds them.",
    inclusions: [
      "Market positioning strategy",
      "Audience definition",
      "Core messaging framework",
      "Logo direction & refinement",
      "Comprehensive brand kits",
      "Colour & typography systems",
      "Digital guidelines",
      "Social media templates"
    ],
    process: [
      { num: '01', title: 'Positioning', desc: 'We define who you are, who you serve, and the distinct angle that sets you apart.' },
      { num: '02', title: 'Identity Design', desc: 'We build a cohesive visual system—typography, colour, and mark—that communicates your true value.' },
      { num: '03', title: 'System Handover', desc: 'We deliver practical guidelines and templates so your team can apply the brand consistently.' }
    ],
    outcome: "A coherent identity and message your team can apply consistently across every platform.",
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
