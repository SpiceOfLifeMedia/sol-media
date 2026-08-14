import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND_SYSTEMS_FAQS } from '@/lib/seo';
import { ServiceTemplate } from './ServiceTemplate';

export default function BrandSystems() {
  useSeo();

  const props = {
    title: "Brand Systems",
    tagline: "Brand strategy and identity design for businesses ready to look as established as they are.",
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
    detailSection: {
      eyebrow: "ADELAIDE BRAND STRATEGY",
      title: "More than a new logo. A clearer commercial position.",
      paragraphs: [
        "Strong brand development starts by clarifying what the business should be known for, who it needs to reach and why the right customer should choose it. That strategic foundation guides the language, identity and experience—so every brand decision supports the same position.",
        "For established businesses, rebranding does not always mean discarding everything familiar. We identify what still carries value, what is creating confusion and what needs to change. The result can range from a focused identity refinement to a complete corporate brand strategy and visual system.",
        "Spice of Life Media is based in Adelaide and works with businesses across Australia. Strategy, messaging and identity design are developed together, giving your website, social content, proposals and internal team one practical system to work from."
      ]
    },
    faqs: BRAND_SYSTEMS_FAQS,
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
