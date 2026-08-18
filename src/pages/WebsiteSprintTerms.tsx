import { Link } from 'wouter';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { useSeo } from '@/hooks/useSeo';

const sections = [
  {
    title: '1. Who these terms apply to',
    body: <><p>These terms apply to the Website Sprint offered by Spice of Life Media, ABN 19 624 756 890, based in Adelaide, South Australia. “You” means the customer named in the accepted brief or invoice.</p><p>The rebrand launch offer is limited to the first 20 projects accepted by Spice of Life Media. You confirm that you have authority to engage us for the project and grant the showcase permission described in section 12. Every enquiry is reviewed for suitability before a deposit is requested. The agreement begins when you accept these terms and pay the deposit.</p></>,
  },
  {
    title: '2. Included scope',
    body: <><p>The $879 Website Sprint includes a new service-business website or strategic rebuild of up to five core pages, responsive presentation, standard enquiry pathways, a focused Brand Starter Kit, an editable branded invoice template, essential SEO launch setup, lead measurement foundations, launch support and three consolidated change rounds.</p><p>The Brand Starter Kit is a focused visual identity refresh and may include a logo refresh, practical colour and typography direction and essential logo files. It is not a full strategic rebrand.</p></>,
  },
  {
    title: '3. Build method and platform',
    body: <><p>Website Sprint projects are custom-developed in Spice of Life Media’s managed build and deployment stack. They are not built inside Wix, Squarespace or another drag-and-drop website builder. We select the technical architecture, build method and deployment approach appropriate to the agreed project.</p><p>If your website must be built or retained inside a particular third-party platform, tell us before paying the deposit. That work is outside the Website Sprint and may be quoted separately.</p></>,
  },
  {
    title: '4. What is not included',
    body: <><p>Unless agreed in writing, the offer excludes ecommerce, memberships, customer accounts, portals, custom databases or backends, advanced bookings or payments, complex integrations, large content migrations, extensive copywriting, ongoing SEO, ongoing maintenance and work beyond five core pages.</p><p>Domain registration or renewal, hosting, business email, paid plugins, subscriptions, premium fonts, stock assets and other third-party charges are not included. These are set and billed by their providers. Any additional work requires a separate written quote or scope variation.</p></>,
  },
  {
    title: '5. Project start and 48-hour draft',
    body: <><p>The 48-business-hour period begins only after we receive the $59 deposit, an approved written brief, essential content and assets, and all access reasonably required to begin. Business hours are Monday to Friday in Adelaide, excluding South Australian public holidays.</p><p>The commitment is to provide a first complete working draft—not a public launch, final handover or guaranteed approval—within that period. The clock pauses while we wait for your information, access, decisions or feedback. Provider outages and circumstances reasonably outside our control may extend the delivery time.</p></>,
  },
  {
    title: '6. Your responsibilities',
    body: <><p>You will nominate one decision-maker, provide accurate business information, supply requested materials and access promptly, and give consolidated feedback. You warrant that you have permission to use all names, claims, text, images, logos and other materials you provide.</p><p>You remain responsible for the accuracy and legality of your business claims, prices, professional or industry disclosures, and any customer-facing policies specific to your operations.</p></>,
  },
  {
    title: '7. Revisions and changes',
    body: <><p>The price includes three consolidated change rounds within the approved brief. Each round must be supplied as one clear list by the nominated decision-maker. A new direction, extra pages, new functionality, replacement content or requests outside the approved brief are a scope change and may require a new quote and delivery date.</p></>,
  },
  {
    title: '8. Price and payment',
    body: <><p>The total project price is $879. A $59 deposit starts the project and is credited toward the total. The remaining $820 is due after your written approval and before public launch, domain connection, transfer or handover.</p><p>No public launch or transfer of final deliverables, source files or production credentials is required until cleared payment is received. Third-party charges are paid separately by you.</p></>,
  },
  {
    title: '9. Approval, delays and inactive projects',
    body: <><p>Approval may be given by email or another written channel we agree to use. Please provide feedback within five business days of each request. If we receive no response for 14 days, we may pause the project. After 30 days of inactivity, we may archive it and provide a new delivery window based on current availability when you return.</p></>,
  },
  {
    title: '10. On-brief guarantee and cancellations',
    body: <><p>If the result still misses the approved brief after all three in-scope change rounds, you may end the project and we will refund the $59 deposit. The unused website and brand assets will not be launched, transferred or licensed to you.</p><p>If you change your mind after work begins, the deposit may be retained to cover work already performed, subject to applicable law. This guarantee adds to, and does not limit, any rights or remedies that cannot be excluded under the Australian Consumer Law.</p></>,
  },
  {
    title: '11. Intellectual property',
    body: <><p>After full payment, you receive ownership of the final custom visual deliverables and project content created specifically for you, together with the right to use the completed website. Spice of Life Media retains ownership of its pre-existing code, frameworks, reusable components, templates, systems, tools, methods and know-how. You receive a perpetual licence to use any of those elements embedded in the completed website as required to operate it.</p><p>Third-party software, fonts, assets and services remain subject to their own licence terms. Materials you supply remain yours. The limited portfolio permission applying to this launch offer is set out in section 12.</p></>,
  },
  {
    title: '12. Portfolio showcase permission',
    body: <><p>The $879 rebrand launch price is offered on the condition that Spice of Life Media may showcase the finished public project in its portfolio and marketing. After launch, we may display your business name, public website address, screenshots or recordings of the public website, approved final brand assets and a general description of the work and results.</p><p>This permission is non-exclusive and does not allow us to publish credentials, private analytics, customer data, unreleased commercial information or other material clearly identified as confidential. We will represent the project accurately and will consider reasonable correction or removal requests relating to legal, privacy or factual concerns.</p></>,
  },
  {
    title: '13. Domains, hosting and third parties',
    body: <><p>We can connect the completed website to an existing domain and suitable hosting environment when you provide the required access. You should own and control your domain, hosting and essential service accounts where practical.</p><p>We are not responsible for third-party pricing changes, policies, outages, security incidents, account suspensions or service limitations outside our reasonable control.</p></>,
  },
  {
    title: '14. SEO, performance and business results',
    body: <><p>Essential SEO setup covers agreed launch foundations such as page titles and descriptions, indexability, sitemap readiness and lead measurement. It does not include ongoing SEO. Search rankings, traffic, enquiries, revenue, advertising approval and other third-party or commercial outcomes are not guaranteed.</p><p>Website speed and availability may also be affected by hosting, networks, assets and third-party services outside our control.</p></>,
  },
  {
    title: '15. Post-launch support',
    body: <><p>You have 14 calendar days after launch to report reproducible defects that cause the delivered website to differ from the approved scope. We will correct verified in-scope defects without an additional fee. New content, new features, third-party failures and changes made by someone else are not defects and may be quoted separately.</p></>,
  },
  {
    title: '16. Privacy and confidentiality',
    body: <><p>We handle personal information in line with our <Link href="/privacy" className="font-[700] text-[var(--verm)] underline underline-offset-4">Privacy Policy</Link>. Each party will take reasonable steps to protect confidential project information. Credentials supplied for the project will be used only as reasonably required, and you should rotate sensitive credentials after handover.</p></>,
  },
  {
    title: '17. Liability and consumer rights',
    body: <><p>Nothing in these terms excludes, restricts or modifies a consumer guarantee or other right that cannot lawfully be excluded. To the extent permitted by law, neither party is liable to the other for indirect or consequential loss, and our aggregate liability arising from the Website Sprint is limited to the fees actually paid for it.</p></>,
  },
  {
    title: '18. Suspension, termination and disputes',
    body: <><p>We may pause work for non-payment, missing access, unlawful or infringing material, or conduct that makes the project unsafe or unreasonable to continue. Where appropriate, we will give written notice and a reasonable opportunity to resolve the issue.</p><p>If a dispute arises, either party should give written details and both parties will try in good faith to resolve it within 10 business days. If it remains unresolved, the parties should consider mediation before court proceedings, except where urgent relief is reasonably required.</p></>,
  },
  {
    title: '19. General terms',
    body: <><p>The approved brief, invoice and these terms form the agreement. A project-specific written term takes priority if it expressly conflicts with these standard terms. Changes must be agreed in writing. If one provision is unenforceable, the remaining provisions continue.</p><p>South Australian law governs the agreement. The terms version accepted when you submit the Website Sprint brief and pay the deposit applies to that project.</p></>,
  },
];

export default function WebsiteSprintTerms() {
  useSeo();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 px-5 pb-32 pt-[76px] md:px-12">
        <div className="mx-auto max-w-[860px] pt-20 md:pt-24">
          <p className="mb-5 text-[11.5px] font-[800] uppercase tracking-[0.14em] text-[rgba(22,21,15,0.55)]">Version 2026-08-17 · Last updated 17 August 2026</p>
          <h1 className="mb-8 text-[40px] font-[800] leading-[1.02] tracking-[-0.025em] md:text-[56px]" style={{ fontStretch: '125%' }}>Website Sprint Terms<span className="text-[var(--verm)]">.</span></h1>
          <p className="max-w-[740px] text-[18px] leading-[1.65] text-[rgba(22,21,15,0.72)]">Clear terms for the $879 Website Sprint: what is included, how the 48-hour first draft works, payment stages, revisions and what happens after launch.</p>

          <div className="mt-14 flex flex-col gap-11 text-[16px] leading-[1.72] text-[rgba(22,21,15,0.72)]">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-[rgba(22,21,15,0.16)] pt-8">
                <h2 className="mb-4 text-[24px] font-[800] tracking-[-0.015em] text-[var(--ink)]">{section.title}</h2>
                <div className="flex flex-col gap-4">{section.body}</div>
              </section>
            ))}
          </div>

          <div className="mt-14 border border-[rgba(22,21,15,0.18)] bg-white p-6 md:p-8">
            <h2 className="text-[22px] font-[800]">Questions before you accept?</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-[rgba(22,21,15,0.68)]">Email <a className="font-[800] text-[var(--verm)] underline underline-offset-4" href="mailto:info@spiceoflifemedia.com.au">info@spiceoflifemedia.com.au</a> before paying the deposit. We will confirm the agreed brief and project fit in writing.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
