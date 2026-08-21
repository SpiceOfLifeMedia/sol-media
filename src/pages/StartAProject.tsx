import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { appendConsentApprovedAttribution } from '@/lib/analyticsAttribution';
import { hasAnalyticsConsent } from '@/lib/privacyConsent';

export default function StartAProject() {
  useSeo();

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formStarted = useRef(false);
  const leadTracked = useRef(false);

  const handleFormStart = (event: React.SyntheticEvent<HTMLFormElement>) => {
    if (
      formStarted.current ||
      !(event.target instanceof HTMLElement) ||
      event.target.matches('[name="website_confirm"]') ||
      !event.target.matches('input:not([type="hidden"]), select, textarea')
    ) {
      return;
    }

    formStarted.current = trackAnalyticsEvent('form_start', {
      form_name: 'start_a_project',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Honeypot check
    if (data.website_confirm) {
      setStatus('success'); // Silently succeed for bots
      return;
    }

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Work email is required';
    else if (!/^\S+@\S+\.\S+$/.test(data.email as string)) newErrors.email = 'Please enter a valid email';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    if (!data.business) newErrors.business = 'Business / company is required';
    if (!data.problem) newErrors.problem = 'Please tell us what currently feels disconnected';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    appendConsentApprovedAttribution(formData, hasAnalyticsConsent());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        if (!leadTracked.current) {
          leadTracked.current = true;
          trackAnalyticsEvent('generate_lead', {
            form_name: 'start_a_project',
          });
        }
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const services = [
    "Complimentary Brand Starter Kit",
    "Digital Presence Audit",
    "Brand Systems",
    "Websites & Rebuilds",
    "SEO & Search Growth",
    "Social & Content Systems"
  ];

  const budgets = [
    "Under $3k",
    "$3k–$8k",
    "$8k–$20k",
    "$20k–$50k",
    "$50k+",
    "Not sure"
  ];

  const timings = [
    "As soon as possible",
    "1–3 months",
    "3–6 months",
    "Just exploring"
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden">
      <Header />
      
      <main className="flex-1 w-full bg-[var(--paper)]">
        {/* Header section (Deep Ink) */}
        <section className="bg-[var(--ink)] pt-[150px] pb-[80px] px-5 md:px-12 text-[var(--paper)]">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-[48px] md:text-[72px] leading-[1.02] font-[800] tracking-[-0.025em] mb-6" style={{ fontStretch: '125%' }}>
              Start a brand conversation<span className="text-[var(--verm)]">.</span>
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[rgba(242,238,230,0.7)] max-w-[600px] mx-auto">
              Tell us about your business and receive a complimentary Brand Starter Kit. Sam Leverenz, founder of SOL Media, will contact you personally for a short brand conversation before preparing it.
            </p>
            <p className="mt-5 text-[13px] font-[750] tracking-[0.08em] uppercase text-[var(--verm)]">
              No files or logo upload needed now
            </p>
          </div>
        </section>

        {/* Form section (Warm Paper) */}
        <section className="py-[96px] px-5 md:px-12 text-[var(--ink)]">
          <div className="max-w-[800px] mx-auto">
            
            {status === 'success' ? (
              <div className="bg-white p-12 border border-[rgba(22,21,15,0.1)] text-center flex flex-col items-center gap-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[var(--paper)] flex items-center justify-center text-[var(--verm)] text-3xl">✓</div>
                <h2 className="text-[28px] font-[800] tracking-[-0.02em]">Enquiry received.</h2>
                <p className="text-[16px] text-[rgba(22,21,15,0.7)]">Sam will contact you personally using your preferred method and time to arrange a short brand conversation.</p>
              </div>
            ) : (
              <form
                onFocusCapture={handleFormStart}
                onInput={handleFormStart}
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
              >
                {status === 'error' && (
                  <div className="bg-[var(--ink)] text-[var(--paper)] p-6 flex flex-col gap-3">
                    <div className="font-[800] tracking-tight text-[var(--verm)]">Submission Failed</div>
                    <p className="text-[14px]">Something went wrong with our system. Please email us directly at <a href="mailto:info@spiceoflifemedia.com.au" className="text-[var(--verm)] hover:underline">info@spiceoflifemedia.com.au</a></p>
                  </div>
                )}

                {/* Hidden Honeypot */}
                <input type="text" name="website_confirm" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Name *</label>
                    <input type="text" id="name" name="name" className={`border-b ${errors.name ? 'border-[var(--verm)]' : 'border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)]'} bg-transparent py-3 outline-none text-[16px] transition-colors`} aria-invalid={!!errors.name} />
                    {errors.name && <span className="text-[var(--verm)] text-[12px]">{errors.name}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Work Email *</label>
                    <input type="email" id="email" name="email" className={`border-b ${errors.email ? 'border-[var(--verm)]' : 'border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)]'} bg-transparent py-3 outline-none text-[16px] transition-colors`} aria-invalid={!!errors.email} />
                    {errors.email && <span className="text-[var(--verm)] text-[12px]">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Phone / Mobile *</label>
                    <input type="tel" id="phone" name="phone" autoComplete="tel" className={`border-b ${errors.phone ? 'border-[var(--verm)]' : 'border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)]'} bg-transparent py-3 outline-none text-[16px] transition-colors`} aria-invalid={!!errors.phone} />
                    {errors.phone && <span className="text-[var(--verm)] text-[12px]">{errors.phone}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="business" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Business / Company *</label>
                    <input type="text" id="business" name="business" className={`border-b ${errors.business ? 'border-[var(--verm)]' : 'border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)]'} bg-transparent py-3 outline-none text-[16px] transition-colors`} aria-invalid={!!errors.business} />
                    {errors.business && <span className="text-[var(--verm)] text-[12px]">{errors.business}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="url" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Website or Social Page (Optional)</label>
                    <input type="url" id="url" name="url" className="border-b border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)] bg-transparent py-3 outline-none text-[16px] transition-colors" placeholder="https://" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="preferredContact" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Preferred Contact Method *</label>
                    <div className="relative">
                      <select id="preferredContact" name="preferredContact" defaultValue="" className="w-full border-b border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)] bg-transparent py-3 outline-none text-[16px] transition-colors appearance-none rounded-none cursor-pointer" required>
                        <option value="" disabled>Select an option</option>
                        <option value="Phone / mobile">Phone / mobile</option>
                        <option value="Email">Email</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="preferredTime" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Preferred Contact Time *</label>
                    <div className="relative">
                      <select id="preferredTime" name="preferredTime" defaultValue="" className="w-full border-b border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)] bg-transparent py-3 outline-none text-[16px] transition-colors appearance-none rounded-none cursor-pointer" required>
                        <option value="" disabled>Select a time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Any time">Any time</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)] mb-2">What do you need help with?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map(service => (
                      <label key={service} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" name="services" value={service} className="peer appearance-none w-5 h-5 border-[1.5px] border-[rgba(22,21,15,0.3)] checked:border-[var(--verm)] checked:bg-[var(--verm)] transition-colors rounded-sm cursor-pointer" />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-[15px] group-hover:text-[var(--verm)] transition-colors">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Approximate Project Budget (Optional)</label>
                    <div className="relative">
                      <select id="budget" name="budget" defaultValue="" className="w-full border-b border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)] bg-transparent py-3 outline-none text-[16px] transition-colors appearance-none rounded-none cursor-pointer">
                        <option value="">Not sure / not applicable</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="timing" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">Desired Timing *</label>
                    <div className="relative">
                      <select id="timing" name="timing" defaultValue="" className="w-full border-b border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)] bg-transparent py-3 outline-none text-[16px] transition-colors appearance-none rounded-none cursor-pointer" required>
                        <option value="" disabled>Select an option</option>
                        {timings.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="problem" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">What currently feels disconnected, outdated or underperforming? *</label>
                  <textarea id="problem" name="problem" rows={4} className={`border-b ${errors.problem ? 'border-[var(--verm)]' : 'border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)]'} bg-transparent py-3 outline-none text-[16px] transition-colors resize-none`} aria-invalid={!!errors.problem}></textarea>
                  {errors.problem && <span className="text-[var(--verm)] text-[12px]">{errors.problem}</span>}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="source" className="text-[13px] font-[800] tracking-[0.05em] uppercase text-[rgba(22,21,15,0.8)]">How did you hear about us? (Optional)</label>
                  <input type="text" id="source" name="source" className="border-b border-[rgba(22,21,15,0.2)] focus:border-[var(--ink)] bg-transparent py-3 outline-none text-[16px] transition-colors" />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="bg-[var(--verm)] text-[var(--ink)] text-[16px] font-[750] tracking-[0.02em] px-[40px] py-[20px] w-full hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Request my complimentary Brand Starter Kit'}
                </button>
                <p className="-mt-5 text-center text-[13px] font-[650] leading-[1.6] text-[rgba(22,21,15,0.72)]">
                  No payment. No obligation. Your Brand Starter Kit is yours to keep, whether or not you proceed with SOL Media. Additional revisions, custom logo development and website work are quoted separately.
                </p>
                <p className="-mt-6 text-center text-[12px] leading-[1.5] text-[rgba(22,21,15,0.58)]">
                  You do not need to upload a logo or any files now. After you submit, simply reply to our confirmation email with any existing assets when convenient.
                </p>
                <p className="text-center text-[12px] leading-[1.5] text-[rgba(22,21,15,0.58)]">
                  We’ll use your details to respond to your enquiry. Read our{' '}
                  <Link
                    className="font-[700] text-[var(--ink)] underline decoration-[rgba(22,21,15,0.35)] underline-offset-4 hover:decoration-[var(--ink)]"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
