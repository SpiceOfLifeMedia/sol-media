import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="flex-1 w-full pt-[76px] px-5 md:px-12 pb-32">
        <div className="max-w-[840px] mx-auto pt-20 md:pt-24">
          <p className="mb-5 text-[11.5px] font-[800] uppercase tracking-[0.14em] text-[rgba(22,21,15,0.55)]">
            Last updated 31 July 2026
          </p>
          <h1 className="text-[40px] md:text-[56px] leading-[1.02] font-[800] tracking-[-0.025em] mb-8" style={{ fontStretch: '125%' }}>
            Privacy Policy<span className="text-[var(--verm)]">.</span>
          </h1>
          <p className="max-w-[720px] text-[18px] leading-[1.65] text-[rgba(22,21,15,0.72)]">
            This policy explains how Spice of Life Media handles personal
            information submitted through spiceoflifemedia.com.au and how our
            website privacy choices work.
          </p>

          <div className="mt-14 flex flex-col gap-12 text-[16px] leading-[1.7] text-[rgba(22,21,15,0.72)]">
            <section aria-labelledby="privacy-who-we-are">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-who-we-are"
              >
                Who we are
              </h2>
              <p>
                Spice of Life Media is based in Adelaide, South Australia. This
                policy applies to this website and the project enquiries sent
                through it.
              </p>
            </section>

            <section aria-labelledby="privacy-information">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-information"
              >
                Information we collect
              </h2>
              <p>
                When you use our “Start a project” form, we collect the
                information you choose to provide: your name, work email,
                business or company, current website address (if supplied),
                services of interest, project budget, desired timing, details
                about the problem you want to solve and how you heard about us
                (if supplied).
              </p>
              <p className="mt-4">
                When you submit a custom CD order, we collect the contact,
                delivery, music-link, artwork, product and shipping information
                required to prepare the order. We also store the SOL reference,
                checkout channel and payment status. Uploaded artwork is stored
                privately for order production.
              </p>
              <p className="mt-4">
                We also save one minimal, versioned choice in essential browser
                storage so the site can remember whether you selected essential
                storage only or allowed analytics. This normally uses local
                storage, with a first-party cookie as a fail-closed fallback.
                That preference does not contain your contact details.
              </p>
              <p className="mt-4">
                If you allow analytics, we may also keep campaign parameters
                from the address you arrived on (such as UTM parameters, GCLID,
                GBRAID or WBRAID) and the landing-page path in this tab’s session
                storage. We use these details to understand which campaign led
                to an enquiry. They do not include the information typed into
                the enquiry form.
              </p>
            </section>

            <section aria-labelledby="privacy-use">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-use"
              >
                How we use information
              </h2>
              <p>
                We use enquiry information to review your request, respond to
                you, discuss possible work and manage any business relationship
                that follows.
              </p>
              <p className="mt-4">
                We use custom CD order information to validate, price, produce,
                deliver and support the order. If you choose website checkout,
                Stripe processes the payment and returns the payment status to
                us. Spice of Life Media does not receive or store your full card
                number.
              </p>
              <p className="mt-4">
                We use Google Analytics 4 through Google Tag Manager on a
                consent basis to understand how people find and use the website
                and to improve it. Neither service loads until you choose “Allow
                analytics”. If allowed, we measure page views and non-personal
                interactions such as starting or successfully submitting the
                project form and selecting project or email links. We do not
                send the name, email, business name, website address or message
                entered into the enquiry form to Google Analytics.
              </p>
              <p className="mt-4">
                Analytics consent is denied by default. Choosing analytics does
                not grant consent for advertising storage, advertising user
                data or advertising personalisation; those settings remain
                denied.
              </p>
              <p className="mt-4">
                If analytics is allowed and you submit the project form, the
                saved campaign parameters and landing-page path are included in
                the enquiry email Spice of Life Media receives. This helps us
                attribute the enquiry without adding your form answers to
                Google Analytics.
              </p>
            </section>

            <section aria-labelledby="privacy-providers">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-providers"
              >
                Service providers and overseas processing
              </h2>
              <p>
                Vercel hosts this website and its form endpoints. Supabase
                stores custom CD order records and private artwork files. Resend
                delivers project enquiries and order messages by email. Stripe
                processes payments made through the custom CD website checkout. The
                site also loads its Archivo typeface from Google Fonts, so your
                browser connects to Google’s font service when rendering the
                site. When you allow analytics, Google processes related usage,
                device and campaign information through Google Tag Manager and
                Google Analytics.
              </p>
              <p className="mt-4">
                These providers may process or store information outside
                Australia, depending on where their services and infrastructure
                operate. We only share information with service providers where
                it is needed to host and render the website, deliver an enquiry
                or order, process a payment, fulfil a custom CD or provide
                analytics you have allowed.
              </p>
              <p className="mt-4 font-[700] text-[var(--ink)]">
                We do not sell personal information.
              </p>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-retention"
              >
                How long we keep information
              </h2>
              <p>
                We keep personal information only for as long as it is
                reasonably needed to respond to your enquiry, manage a possible
                or active working relationship, maintain appropriate business
                records, protect our services and meet applicable obligations.
                When information is no longer reasonably needed, we will delete
                or de-identify it where practical.
              </p>
              <p className="mt-4">
                The site uses this preference until you change it, clear your
                browser storage or a later version asks you to choose again.
                Campaign attribution saved in session storage normally lasts
                only for the current browser-tab session and is also removed if
                you return to essential storage only.
              </p>
            </section>

            <section aria-labelledby="privacy-choices">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-choices"
              >
                Your choices
              </h2>
              <p>
                You can reopen “Privacy choices” in the footer at any time to
                allow analytics or return to essential storage only. Returning
                to essential storage stops future analytics loading and reloads
                the page when needed to stop an already loaded analytics
                session.
              </p>
              <p className="mt-4">
                You can also ask to access, correct or delete personal
                information we hold about you. Some information may need to be
                retained where it remains reasonably necessary for business
                records or applicable obligations.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2
                className="mb-4 text-[25px] font-[800] tracking-[-0.015em] text-[var(--ink)]"
                id="privacy-contact"
              >
                Contact us
              </h2>
              <p>
                For a privacy request or question, email{' '}
                <a
                  className="font-[700] text-[var(--verm)] underline decoration-transparent underline-offset-4 hover:decoration-[var(--verm)]"
                  href="mailto:info@spiceoflifemedia.com.au"
                >
                  info@spiceoflifemedia.com.au
                </a>
                . Please include enough detail for us to understand and respond
                to your request.
              </p>
              <p className="mt-4">
                We may update this policy when our website or information
                practices change. The date at the top shows the latest version.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
