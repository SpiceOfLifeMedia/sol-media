import { useRef, useState } from 'react';
import { Link } from 'wouter';

import { useSeo } from '@/hooks/useSeo';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { appendConsentApprovedAttribution } from '@/lib/analyticsAttribution';
import { hasAnalyticsConsent } from '@/lib/privacyConsent';
import { LANDING_PAGE_SPRINT_FAQS } from '@/lib/seo';

const ASSET_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const WEBSITE_SPRINT_TERMS_VERSION = '2026-08-17';

const inclusions = [
  'Custom website build or strategic rebuild—up to five core pages',
  'Focused Brand Starter Kit with essential logo files',
  'Editable branded invoice template',
  'Essential SEO launch setup',
  'Enquiry form connected to your inbox',
  'Analytics and lead-event tracking',
  'Three consolidated change rounds',
];

const projectTypes = [
  'A new website',
  'A website redesign',
  'A website + brand refresh',
  'Choose for me',
];

const projectGoals = [
  'Send me enquiries by email',
  'Get more phone calls',
  'Request a quote',
  'Book an appointment or call',
  'Sell or promote one offer',
  'Choose for me',
];

const contentOptions = [
  'I have final copy and images',
  'I have rough notes and some images',
  'I only have the idea',
  'Choose for me',
];

const visualOptions = [
  'Keep my current look',
  'Clean and trustworthy',
  'Bold and modern',
  'Premium and polished',
  'Friendly and local',
  'Choose for me',
];

const brandOptions = [
  'Keep my current logo',
  'Refresh my logo',
  'I need a full rebrand',
  'Choose for me',
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function LandingPageSprint() {
  useSeo();

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formStarted = useRef(false);
  const leadTracked = useRef(false);

  const handleFormStart = (event: React.SyntheticEvent<HTMLFormElement>) => {
    if (
      formStarted.current ||
      !(event.target instanceof HTMLElement) ||
      event.target.matches('[name="website_confirm"]') ||
      !event.target.matches('input:not([type="hidden"]), textarea')
    ) return;

    formStarted.current = trackAnalyticsEvent('form_start', { form_name: 'landing_page_sprint' });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const projectType = String(data.services ?? '');
    const projectValue = 879;

    if (data.website_confirm) {
      setStatus('success');
      return;
    }

    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(data.email as string)) newErrors.email = 'Enter a valid email';
    if (!data.business) newErrors.business = 'Business name is required';
    if (data.terms_acceptance !== 'Accepted') newErrors.terms_acceptance = 'Please accept the Website Sprint Terms';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    formData.set('budget', '$879 total — $59 deposit, $820 balance after approval');
    formData.set('timing', '48-hour Website Launch Sprint');
    formData.set('source', 'Website Launch Sprint sale');
    appendConsentApprovedAttribution(formData, hasAnalyticsConsent());

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: formData });
      if (!response.ok) {
        setStatus('error');
        return;
      }

      if (!leadTracked.current) {
        leadTracked.current = true;
        trackAnalyticsEvent('generate_lead', {
          form_name: 'landing_page_sprint',
          project_type: projectType,
          value: projectValue,
          currency: 'AUD',
        });
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <header className="absolute left-0 top-0 z-20 w-full px-5 py-6 text-[var(--paper)] md:px-12 md:py-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Spice of Life Media home">
            <img src={`${ASSET_PATH}/assets/sol-mark-white.svg`} alt="" aria-hidden="true" width="320" height="108" className="h-[18px] w-auto" />
            <span className="hidden text-[11px] font-[750] tracking-[0.2em] sm:inline">SPICE OF LIFE MEDIA</span>
          </Link>
          <a href="#enquire" className="border border-[rgba(242,238,230,0.4)] px-5 py-3 text-[12px] font-[800] transition-colors hover:border-[var(--verm)] hover:bg-[var(--verm)] hover:text-[var(--ink)]">GET STARTED</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[var(--ink)] px-5 pb-20 pt-[145px] text-[var(--paper)] md:px-12 md:pb-28 md:pt-[190px]">
          <div aria-hidden="true" className="absolute -right-[180px] top-[90px] h-[540px] w-[540px] rounded-full border border-[rgba(232,69,28,0.34)] md:-right-[120px] md:h-[760px] md:w-[760px]" />
          <div aria-hidden="true" className="absolute -right-[70px] top-[195px] h-[330px] w-[330px] rounded-full border border-[rgba(242,238,230,0.12)] md:h-[500px] md:w-[500px]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
            <div>
              <div className="caps-label mb-8 text-[var(--verm)]">WEBSITE LAUNCH SPECIAL · FIRST 20 PROJECTS</div>
              <h1 className="max-w-[11ch] text-[52px] font-[800] leading-[0.93] tracking-[-0.045em] md:text-[92px]">A complete website, ready to win work<span className="text-[var(--verm)]">.</span></h1>
              <p className="mt-8 max-w-[690px] text-[18px] leading-[1.65] text-[rgba(242,238,230,0.74)] md:text-[21px]">A custom new website or strategic rebuild—up to five core pages—with a focused brand kit, invoice template and essential SEO setup. First complete working version within 48 business hours.</p>
            </div>
            <aside className="border-l border-[rgba(242,238,230,0.2)] pl-7 md:pl-10">
              <div className="caps-label mb-4 text-[rgba(242,238,230,0.56)]">LAUNCH PARTNERSHIP PRICE</div>
              <div className="text-[62px] font-[800] leading-none tracking-[-0.045em] md:text-[78px]">$879</div>
              <div className="mt-6 border-y border-[rgba(242,238,230,0.18)] py-5">
                <div className="text-[20px] font-[800]">$59 deposit to begin</div>
                <p className="mt-2 text-[13px] leading-[1.55] text-[rgba(242,238,230,0.62)]">Receive your first complete working draft within 48 business hours, then pay the $820 balance only after approval and before launch or handover.</p>
              </div>
              <p className="mt-6 max-w-[390px] text-[14px] leading-[1.65] text-[rgba(242,238,230,0.66)]">Website, focused brand essentials, invoice template, SEO foundations and lead measurement included. Fixed scope. Available to the first 20 accepted portfolio-partner projects.</p>
              <a href="#enquire" className="mt-8 inline-flex bg-[var(--verm)] px-8 py-4 text-[14px] font-[800] text-[var(--ink)] transition-colors hover:bg-[var(--paper)]">Claim the $879 Website Sprint</a>
            </aside>
          </div>
        </section>

        <section className="bg-[var(--verm)] px-5 py-16 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div className="caps-label text-[rgba(22,21,15,0.64)]">WHY THIS OFFER EXISTS</div>
            <div>
              <h2 className="max-w-[15ch] text-[36px] font-[800] leading-[1] md:text-[52px]">New brand. New portfolio. Proper work in public.</h2>
              <p className="mt-6 max-w-[800px] text-[16px] leading-[1.72] text-[rgba(22,21,15,0.72)]">Spice of Life Media has completed a major rebrand, and we want our public portfolio to demonstrate the standard of work we now deliver. That is why the first 20 accepted Website Sprint projects are available for $879 total.</p>
              <p className="mt-4 max-w-[800px] text-[16px] leading-[1.72] text-[rgba(22,21,15,0.72)]">The launch price is available to businesses happy for us to showcase the finished public website, business name and approved project story on the Spice of Life Media website and in our marketing. Private information, credentials and confidential business material are never included.</p>
            </div>
          </div>
        </section>

        <section className="grid border-b border-[rgba(22,21,15,0.15)] bg-white md:grid-cols-3">
          {[
            ['48 business hours', 'First complete working version'],
            ['$59 deposit', '$820 balance after approval'],
            ['Three change rounds', 'Before final approval and launch'],
          ].map(([title, copy]) => (
            <div key={title} className="border-b border-[rgba(22,21,15,0.12)] px-6 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-10 md:last:border-r-0">
              <div className="text-[21px] font-[800]">{title}</div>
              <div className="mt-2 text-[13.5px] text-[rgba(22,21,15,0.58)]">{copy}</div>
            </div>
          ))}
        </section>

        <section className="bg-[var(--paper)] px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
            <div>
              <div className="caps-label mb-7 text-[var(--verm-text-light)]">WHAT YOU GET</div>
              <h2 className="max-w-[10ch] text-[42px] font-[800] leading-[0.99] md:text-[62px]">Everything your business needs to launch sharper.</h2>
              <p className="mt-7 max-w-[470px] text-[16px] leading-[1.72] text-[rgba(22,21,15,0.65)]">Built for service businesses that need a credible, conversion-ready digital presence without a drawn-out agency process. Supply your essential business information and available content; we shape it into a focused website system.</p>
            </div>
            <ol className="border-t border-[rgba(22,21,15,0.18)]">
              {inclusions.map((item, index) => (
                <li key={item} className="grid grid-cols-[42px_1fr] gap-4 border-b border-[rgba(22,21,15,0.18)] py-6 text-[17px] font-[750]">
                  <span className="text-[var(--verm-text-light)]">0{index + 1}</span><span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[var(--ink)] px-5 py-20 text-[var(--paper)] md:px-12 md:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-24">
            <div className="caps-label text-[var(--verm)]">THE ON-BRIEF GUARANTEE</div>
            <div>
              <h2 className="max-w-[15ch] text-[38px] font-[800] leading-[1] md:text-[56px]">If it misses the brief, your money comes back.</h2>
              <p className="mt-7 max-w-[780px] text-[16px] leading-[1.72] text-[rgba(242,238,230,0.68)]">Pay a $59 deposit to begin. You receive three consolidated sets of changes and pay the $820 balance only after approval and before launch or handover. If you are still unhappy after all three rounds, we will refund the deposit. The unused website and brand assets will not launch and remain the property of Spice of Life Media. One written brief and feedback from one nominated decision-maker keep the promise fair and fast.</p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-24">
            <div>
              <div className="caps-label mb-7 text-[var(--verm-text-light)]">PROOF OF EXECUTION</div>
              <h2 className="max-w-[12ch] text-[40px] font-[800] leading-[1] md:text-[56px]">Clearer journeys create easier decisions.</h2>
            </div>
            <div>
              <p className="mb-8 text-[17px] leading-[1.72] text-[rgba(22,21,15,0.67)]">See how Full Circle Hair Society’s digital experience was rebuilt around clearer services, stronger proof and direct booking pathways.</p>
              <Link href="/work/full-circle-hair-society" className="inline-flex border-b-2 border-[var(--verm)] pb-1 text-[14px] font-[800]">View the Full Circle case study <span className="ml-2" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(22,21,15,0.14)] bg-[var(--paper)] px-5 py-20 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div className="caps-label text-[var(--verm-text-light)]">MORE THAN A WEBSITE</div>
            <div>
              <h2 className="max-w-[14ch] text-[40px] font-[800] leading-[1] md:text-[58px]">A consistent business foundation, included.</h2>
              <p className="mt-7 max-w-[790px] text-[17px] leading-[1.72] text-[rgba(22,21,15,0.68)]">The Website Launch Sprint connects the website, visual essentials and search foundations—so the finished result feels credible everywhere your customer encounters it.</p>
              <div className="mt-10 grid border-l border-t border-[rgba(22,21,15,0.14)] sm:grid-cols-2">
                {[
                  ['Brand Starter Kit', 'A focused logo refresh, practical colour and typography system, plus essential logo files.'],
                  ['Editable invoice template', 'A polished, on-brand invoice layout your business can update and reuse.'],
                  ['Essential SEO launch setup', 'Core page titles and descriptions, indexability, sitemap readiness and lead-measurement foundations.'],
                  ['Conversion foundations', 'Clear enquiry pathways, contact actions and lead-event tracking from launch.'],
                ].map(([title, copy]) => (
                  <div key={title} className="border-b border-r border-[rgba(22,21,15,0.14)] p-6 md:p-7">
                    <h3 className="text-[17px] font-[800]">{title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-[rgba(22,21,15,0.62)]">{copy}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-[790px] text-[13px] leading-[1.65] text-[rgba(22,21,15,0.55)]">Fixed scope: up to five core pages using supplied or approved content. Websites are custom-developed in our managed build and deployment stack; Wix, Squarespace and other drag-and-drop builder projects are not included. The brand component is a focused visual identity refresh—not a full strategic rebrand. Ecommerce, complex integrations, extensive copywriting, paid third-party services and ongoing SEO are quoted separately. Domain registration or renewal and web-hosting fees are not included; these charges are set and billed by third-party providers. We can connect the completed website to an existing domain and suitable hosting environment when the required access is supplied.</p>
              <a href="#enquire" className="mt-8 inline-flex bg-[var(--ink)] px-7 py-4 text-[14px] font-[800] text-[var(--paper)] transition-colors hover:bg-[var(--verm-pressed)]">Claim the $879 launch offer</a>
            </div>
          </div>
        </section>

        <section id="enquire" className="scroll-mt-6 bg-[var(--verm)] px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <div className="caps-label mb-7 text-[rgba(22,21,15,0.66)]">START YOUR 48 HOURS</div>
              <h2 className="max-w-[10ch] text-[44px] font-[800] leading-[0.97] md:text-[66px]">Give us the essentials. We’ll build the website.</h2>
              <p className="mt-7 max-w-[430px] text-[16px] leading-[1.72] text-[rgba(22,21,15,0.7)]">Answer what you know and select “Choose for me” for anything you would rather leave to us. We will recommend the clearest path before any payment is taken.</p>
            </div>

            <div className="bg-[var(--paper)] p-6 shadow-[0_24px_80px_rgba(22,21,15,0.16)] md:p-10">
              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ink)] text-3xl text-[var(--verm)]">✓</div>
                  <h3 className="text-[32px] font-[800]">You’re in.</h3>
                  <p className="mt-4 max-w-[470px] text-[16px] leading-[1.65] text-[rgba(22,21,15,0.65)]">We will review the brief, confirm project fit and send the $59 deposit details needed to start the 48-hour Website Sprint.</p>
                </div>
              ) : (
                <form onFocusCapture={handleFormStart} onInput={handleFormStart} onSubmit={handleSubmit} className="flex flex-col gap-7">
                  {status === 'error' && <div className="bg-[var(--ink)] p-5 text-[14px] leading-[1.6] text-[var(--paper)]">Something went wrong. Email <a className="text-[var(--verm)] underline" href="mailto:info@spiceoflifemedia.com.au">info@spiceoflifemedia.com.au</a>.</div>}
                  <input type="text" name="website_confirm" className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Name" name="name" error={errors.name} />
                    <Field label="Email" name="email" type="email" error={errors.email} />
                    <Field label="Business" name="business" error={errors.business} />
                    <Field label="Phone" name="phone" type="tel" optional />
                  </div>
                  <Field label="Current website" name="url" type="url" placeholder="https://" optional />

                  <ChoiceGroup legend="What are you looking for?" name="services" options={projectTypes} />
                  <ChoiceGroup legend="What is the main result you want?" name="problem" options={projectGoals} />
                  <ChoiceGroup legend="What content do you already have?" name="content_readiness" options={contentOptions} />
                  <ChoiceGroup legend="Which direction feels closest?" name="visual_direction" options={visualOptions} />
                  <ChoiceGroup legend="What should we do with your brand?" name="brand_direction" options={brandOptions} note="The Website Launch Sprint includes a focused Brand Starter Kit, editable branded invoice template and essential SEO launch setup." />

                  <div>
                    <label htmlFor="project_notes" className="mb-2 block text-[12px] font-[800] uppercase tracking-[0.12em] text-[rgba(22,21,15,0.75)]">Anything else we should know? (optional)</label>
                    <textarea id="project_notes" name="project_notes" rows={3} className="w-full resize-none border border-[rgba(22,21,15,0.2)] bg-white p-4 text-[16px] outline-none transition-colors focus:border-[var(--ink)]" placeholder="A rough idea is enough—we can work out the rest." />
                  </div>

                  <input type="hidden" name="timing" value="48-hour Website Launch Sprint" />
                  <input type="hidden" name="budget" value="$879 total — $59 deposit, $820 balance after approval" />
                  <input type="hidden" name="source" value="Website Launch Sprint sale" />
                  <input type="hidden" name="terms_version" value={WEBSITE_SPRINT_TERMS_VERSION} />
                  <label className="flex cursor-pointer items-start gap-3 border border-[rgba(22,21,15,0.2)] bg-white p-4">
                    <input className="mt-1 h-4 w-4 shrink-0 accent-[var(--ink)]" type="checkbox" name="terms_acceptance" value="Accepted" required />
                    <span className="text-[13px] leading-[1.6] text-[rgba(22,21,15,0.72)]">
                      I have read and agree to the{' '}
                      <a href="/website-sprint-terms" target="_blank" rel="noreferrer" className="font-[800] underline underline-offset-4">Website Sprint Terms</a>, including the fixed scope, payment stages, three change rounds and permission to showcase the finished public project.
                    </span>
                  </label>
                  {errors.terms_acceptance && <p className="-mt-5 text-[12px] font-[700] text-[var(--verm-text-light)]">{errors.terms_acceptance}</p>}
                  <button type="submit" disabled={status === 'submitting'} className="bg-[var(--ink)] px-8 py-5 text-[15px] font-[800] text-[var(--paper)] transition-colors hover:bg-[var(--verm-pressed)] disabled:cursor-not-allowed disabled:opacity-60">{status === 'submitting' ? 'Sending…' : 'Claim the $879 Website Sprint'}</button>
                  <p className="-mt-3 text-center text-[12px] leading-[1.5] text-[rgba(22,21,15,0.58)]">No payment is taken here. The $59 deposit is requested only after we confirm project suitability. Read our <Link href="/privacy" className="font-[700] underline underline-offset-4">Privacy Policy</Link>.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[var(--paper)] px-5 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-[950px]">
            <div className="caps-label mb-7 text-[var(--verm-text-light)]">THE DETAILS</div>
            <h2 className="mb-12 text-[40px] font-[800] md:text-[56px]">Before you book.</h2>
            <div className="border-t border-[rgba(22,21,15,0.18)]">
              {LANDING_PAGE_SPRINT_FAQS.map((item) => (
                <details key={item.question} className="group border-b border-[rgba(22,21,15,0.18)] py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-[800] marker:content-none md:text-[21px]">{item.question}<span className="text-[26px] font-[400] text-[var(--verm-text-light)] transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
                  <p className="max-w-[820px] pt-5 text-[16px] leading-[1.72] text-[rgba(22,21,15,0.67)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--ink)] px-5 py-10 text-[var(--paper)] md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 text-[13px] text-[rgba(242,238,230,0.62)] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-[800] tracking-[0.16em] text-[var(--paper)]">SPICE OF LIFE MEDIA</Link>
          <div className="flex flex-wrap gap-6"><a href="mailto:info@spiceoflifemedia.com.au">info@spiceoflifemedia.com.au</a><Link href="/website-sprint-terms">Sprint Terms</Link><Link href="/privacy">Privacy</Link></div>
        </div>
      </footer>
    </div>
  );
}

type FieldProps = { label: string; name: string; type?: 'text' | 'email' | 'url' | 'tel'; placeholder?: string; optional?: boolean; error?: string };

function Field({ label, name, type = 'text', placeholder, optional, error }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[12px] font-[800] uppercase tracking-[0.12em] text-[rgba(22,21,15,0.75)]">{label}{optional ? ' (optional)' : ' *'}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} className={`w-full border bg-white px-4 py-3.5 text-[16px] outline-none transition-colors ${error ? 'border-[var(--verm)]' : 'border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)]'}`} />
      {error && <p className="mt-2 text-[12px] font-[700] text-[var(--verm-text-light)]">{error}</p>}
    </div>
  );
}

type ChoiceGroupProps = { legend: string; name: string; options: string[]; note?: string };

function ChoiceGroup({ legend, name, options, note }: ChoiceGroupProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-[12px] font-[800] uppercase tracking-[0.12em] text-[rgba(22,21,15,0.75)]">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => (
          <label key={option} className="cursor-pointer">
            <input className="peer sr-only" type="radio" name={name} value={option} defaultChecked={index === 0} />
            <span className="flex min-h-[58px] items-center border border-[rgba(22,21,15,0.2)] bg-white px-4 text-[14px] font-[750] transition-colors peer-checked:border-[var(--ink)] peer-checked:bg-[var(--ink)] peer-checked:text-[var(--paper)]">{option}</span>
          </label>
        ))}
      </div>
      {note && <p className="mt-3 text-[12px] leading-[1.55] text-[rgba(22,21,15,0.58)]">{note}</p>}
    </fieldset>
  );
}
