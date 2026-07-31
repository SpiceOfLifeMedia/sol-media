import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceTemplate } from './ServiceTemplate';

export default function SocialContentSystems() {
  useSeo();

  const props = {
    title: "Social &\nContent Systems",
    tagline: "Build a content system that runs — not a content calendar that collapses.",
    problem: "Posting happens, but it's reactive, inconsistent, and disconnected from the brand's core message. Without a structured system, content creation can drain internal resources while producing uneven results.",
    whoFor: "Businesses that know they need to be visible online but are stuck in a cycle of sporadic posting, or teams that need a reliable framework to scale their output.",
    inclusions: [
      "Platform selection & content strategy",
      "Predictable content calendar design",
      "Reusable template design",
      "Campaign frameworks",
      "Short-form video direction",
      "Captions, copy & messaging rules",
      "Scheduling system setup",
      "Performance review cycles"
    ],
    process: [
      { num: '01', title: 'Strategy', desc: 'We determine which platforms are most relevant to your audience and which formats suit the message and available resources.' },
      { num: '02', title: 'System Design', desc: 'We build the visual templates, content pillars, and workflow processes required to produce high-quality assets efficiently.' },
      { num: '03', title: 'Implementation', desc: 'We hand over a complete, manageable engine—or run it for you—so that posting becomes predictable and strategic.' }
    ],
    outcome: "A structured content system that reinforces the brand and makes consistent publishing easier to manage.",
    relatedLinks: [
      { title: "Brand Systems", href: "/services/brand-systems" },
      { title: "SEO & Search Growth", href: "/services/seo-search-growth" },
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
