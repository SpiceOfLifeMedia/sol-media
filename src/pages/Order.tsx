import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import {
  addressFromPlace,
  DeliveryAddress,
  GooglePlacePrediction,
  loadPlacesLibrary,
  PlaceAutocompleteElementInstance,
} from '../lib/googlePlaces';
import './Order.css';

const MASTER_TEMPLATE_URL = 'https://bit.ly/EtsyCustomCd';
const RHINESTONE_URL = 'https://www.etsy.com/au/listing/4452870715/rhinestone-cd-decorating-kit-add-on';
const ETSY_ORDER_URL = 'https://www.etsy.com/au/listing/4382552922/personalised-burned-mixtape-cd-custom';
const AUSTRALIAN_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];

type MusicSource = '' | 'spotify' | 'drive';
type YesNo = '' | 'yes' | 'no';
type FieldErrors = Record<string, string>;

function FieldError({ name, errors }: { name: string; errors: FieldErrors }) {
  if (!errors[name]) return null;
  return <span className="order-error" id={`${name}-error`}>{errors[name]}</span>;
}

function RequiredMark() {
  return <span className="order-required" aria-hidden="true">*</span>;
}

function Choice({
  type = 'radio', name, value, required, children, errors,
}: {
  type?: 'radio' | 'checkbox';
  name: string;
  value?: string;
  required?: boolean;
  children: ReactNode;
  errors: FieldErrors;
}) {
  return (
    <label className={`order-choice ${errors[name] ? 'order-choice--error' : ''}`}>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      <span>{children}</span>
    </label>
  );
}

function OrderTopbar() {
  return (
    <div className="order-topbar">
      <a className="order-brand" href="/" aria-label="Spice of Life Media home">
        <img src="/assets/sol-mark-white.svg" alt="" />
        <span>SPICE OF LIFE MEDIA</span>
      </a>
      <span className="order-context">CUSTOM CD ORDER · WORLDWIDE</span>
    </div>
  );
}

function Intro() {
  return (
    <header className="order-hero">
      <OrderTopbar />
      <div className="order-hero__title">
        <h1>Build your<br />custom CD<span>.</span></h1>
        <p>Save your music, artwork and delivery choices here first. We’ll give you a reference to use when you return to Etsy and pay.</p>
      </div>
      <div className="order-before">
        <div className="order-kicker"><i />BEFORE YOU PAY ON ETSY</div>
        <div className="order-steps">
          {[
            ['01', 'Complete this form.', 'Tell us exactly how your CD should be made.'],
            ['02', 'Copy your SOL reference.', 'It connects these details to your Etsy purchase.'],
            ['03', 'Return to Etsy and pay.', 'Your CD does not enter production until payment is matched.'],
          ].map(([number, title, copy]) => (
            <div className="order-step" key={number}>
              <span>{number}</span><h2>{title}</h2><p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Success({ reference, emailDelivered }: { reference: string; emailDelivered: boolean }) {
  const [copied, setCopied] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  async function copyReference() {
    await navigator.clipboard.writeText(reference);
    setCopied(true);
  }

  return (
    <main className="order-success" aria-labelledby="order-success-title">
      <div className="order-success__inner">
        <span className="order-success__eyebrow">YOUR DETAILS ARE SAVED</span>
        <h1 id="order-success-title" ref={titleRef}>Your SOL reference<span>.</span></h1>
        <div className="order-reference" aria-label={`Order reference ${reference}`}>{reference}</div>
        <button className="order-copy" type="button" onClick={copyReference}>{copied ? 'COPIED' : 'COPY REFERENCE'}</button>
        <p>Place <strong>{reference}</strong> in the Etsy personalisation box or note to seller, then complete payment.</p>
        <p>Your CD does not enter production until we match this reference to a paid Etsy order.</p>
        {!emailDelivered && <p className="order-email-warning">Your details are saved, but the confirmation email may be delayed. Please copy your reference now.</p>}
        <a className="order-etsy" href={ETSY_ORDER_URL}>RETURN TO ETSY AND PAY</a>
      </div>
    </main>
  );
}

export default function Order() {
  const [musicSource, setMusicSource] = useState<MusicSource>('');
  const [giftCard, setGiftCard] = useState<YesNo>('');
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    streetAddress: '', city: '', region: '', postcode: '', country: 'Australia',
  });
  const [placesReady, setPlacesReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState<{ reference: string; emailDelivered: boolean } | null>(null);
  const idempotencyKey = useRef('');
  const autocompleteHost = useRef<HTMLDivElement>(null);
  const autocompleteElement = useRef<PlaceAutocompleteElementInstance | null>(null);
  const addressRef = useRef(deliveryAddress);
  addressRef.current = deliveryAddress;
  const isAustralia = deliveryAddress.country.trim().toLowerCase() === 'australia';

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
    const host = autocompleteHost.current;
    if (!apiKey || !host) return;

    let active = true;
    let element: PlaceAutocompleteElementInstance | null = null;
    let removeListeners = () => {};

    void loadPlacesLibrary(apiKey).then(({ PlaceAutocompleteElement }) => {
      if (!active) return;
      element = new PlaceAutocompleteElement();
      element.id = 'streetAddress';
      element.placeholder = 'House number and street';
      element.value = addressRef.current.streetAddress;
      element.setAttribute('aria-label', 'Street address');
      element.setAttribute('autocomplete', 'street-address');

      const handleInput = () => {
        const streetAddress = element?.value ?? '';
        setDeliveryAddress((current) => ({ ...current, streetAddress }));
      };
      const handleSelection = async (event: Event) => {
        const selectEvent = event as Event & {
          placePrediction?: GooglePlacePrediction;
          detail?: { placePrediction?: GooglePlacePrediction };
        };
        const prediction = selectEvent.placePrediction ?? selectEvent.detail?.placePrediction;
        if (!prediction || !element) return;
        try {
          const place = prediction.toPlace();
          await place.fetchFields({ fields: ['addressComponents', 'formattedAddress'] });
          if (!active) return;
          const selectedAddress = addressFromPlace(place);
          element.value = selectedAddress.streetAddress || element.value;
          setDeliveryAddress(selectedAddress);
          setErrors((current) => ({ ...current, streetAddress: '' }));
        } catch {
          handleInput();
        }
      };

      element.addEventListener('input', handleInput);
      element.addEventListener('gmp-select', handleSelection);
      host.replaceChildren(element);
      autocompleteElement.current = element;
      setPlacesReady(true);
      removeListeners = () => {
        element?.removeEventListener('input', handleInput);
        element?.removeEventListener('gmp-select', handleSelection);
      };
    }).catch(() => {
      if (active) setPlacesReady(false);
    });

    return () => {
      active = false;
      removeListeners();
      autocompleteElement.current = null;
      element?.remove();
    };
  }, []);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const streetAddress = autocompleteElement.current?.value.trim() || deliveryAddress.streetAddress.trim();
    if (!streetAddress) {
      setErrors((current) => ({ ...current, streetAddress: 'Enter a street address.' }));
      autocompleteElement.current?.focus();
      return;
    }

    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
    setSubmitting(true);
    setErrors({});
    setServerError('');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    payload.streetAddress = streetAddress;
    for (const checkbox of ['spotifyPublic', 'spotifyOrderConfirmed', 'driveFilesNumbered', 'under79Minutes', 'rightsConfirmed', 'shippingConfirmed']) {
      payload[checkbox] = formData.has(checkbox);
    }
    payload.idempotencyKey = idempotencyKey.current;

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as {
        error?: string;
        fields?: FieldErrors;
        reference?: string;
        emailDelivered?: boolean;
      };
      if (!response.ok || !result.reference) {
        setErrors(result.fields ?? {});
        setServerError(result.error ?? 'We could not save your order. Please try again.');
        return;
      }
      setSuccess({ reference: result.reference, emailDelivered: result.emailDelivered !== false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setServerError('We could not reach the order service. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) return <div className="order-page"><header className="order-hero"><OrderTopbar /></header><Success {...success} /><OrderFooter /></div>;

  return (
    <div className="order-page">
      <Intro />
      <main className="order-form-wrap">
        <p className="order-required-note"><RequiredMark /> indicates a required answer.</p>
        <form onSubmit={submitOrder} noValidate={false}>
          <div className="order-honeypot" aria-hidden="true">
            <label htmlFor="websiteConfirm">Website</label>
            <input id="websiteConfirm" name="websiteConfirm" tabIndex={-1} autoComplete="off" />
          </div>

          <section className="order-section" aria-labelledby="details-title">
            <div className="order-section__heading"><span>01</span><h2 id="details-title">Your details</h2></div>
            <div className="order-fields">
              <label htmlFor="fullName">FULL NAME <RequiredMark /></label>
              <input id="fullName" name="fullName" type="text" placeholder="Your full name" autoComplete="name" required aria-invalid={Boolean(errors.fullName)} />
              <FieldError name="fullName" errors={errors} />
              <label htmlFor="email">EMAIL <RequiredMark /></label>
              <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required aria-invalid={Boolean(errors.email)} />
              <FieldError name="email" errors={errors} />
              <label htmlFor="phone">PHONE NUMBER <RequiredMark /></label>
              <input id="phone" name="phone" type="tel" placeholder="04XX XXX XXX" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} />
              <FieldError name="phone" errors={errors} />
              <div className="order-callout">Use your browser’s saved-address suggestion, then check every field. Suburb, state and postcode cannot be left out.</div>
              <label htmlFor="streetAddress">STREET ADDRESS <RequiredMark /></label>
              <div ref={autocompleteHost} className={`order-places ${placesReady ? 'order-places--ready' : ''}`} />
              {!placesReady && <input id="streetAddress" name="streetAddress" type="text" placeholder="House number and street" autoComplete="address-line1" value={deliveryAddress.streetAddress} onChange={(event) => setDeliveryAddress((current) => ({ ...current, streetAddress: event.target.value }))} required aria-invalid={Boolean(errors.streetAddress)} />}
              {placesReady && <input name="streetAddress" type="hidden" value={deliveryAddress.streetAddress} />}
              <FieldError name="streetAddress" errors={errors} />
              <label htmlFor="addressExtra">APARTMENT, UNIT OR BUILDING</label>
              <input id="addressExtra" name="addressExtra" type="text" placeholder="Optional" autoComplete="address-line2" />
              <div className="order-grid order-grid--city">
                <div><label htmlFor="city">SUBURB OR CITY <RequiredMark /></label><input id="city" name="city" type="text" autoComplete="address-level2" value={deliveryAddress.city} onChange={(event) => setDeliveryAddress((current) => ({ ...current, city: event.target.value }))} required /></div>
                <div>
                  <label htmlFor="region">{isAustralia ? 'STATE' : 'STATE / PROVINCE / REGION'} <RequiredMark /></label>
                  {isAustralia ? (
                    <select id="region" name="region" autoComplete="address-level1" required value={deliveryAddress.region} onChange={(event) => setDeliveryAddress((current) => ({ ...current, region: event.target.value }))}>
                      <option value="" disabled>Choose</option>{AUSTRALIAN_STATES.map((state) => <option key={state}>{state}</option>)}
                    </select>
                  ) : <input id="region" name="region" type="text" autoComplete="address-level1" value={deliveryAddress.region} onChange={(event) => setDeliveryAddress((current) => ({ ...current, region: event.target.value }))} required />}
                  <FieldError name="region" errors={errors} />
                </div>
              </div>
              <div className="order-grid order-grid--postcode">
                <div><label htmlFor="postcode">POSTCODE <RequiredMark /></label><input id="postcode" name="postcode" type="text" autoComplete="postal-code" value={deliveryAddress.postcode} onChange={(event) => setDeliveryAddress((current) => ({ ...current, postcode: event.target.value }))} required /></div>
                <div><label htmlFor="country">COUNTRY <RequiredMark /></label><input id="country" name="country" type="text" autoComplete="country-name" value={deliveryAddress.country} onChange={(event) => setDeliveryAddress((current) => ({ ...current, country: event.target.value }))} required /></div>
              </div>
            </div>
          </section>

          <section className="order-section" aria-labelledby="music-title">
            <div className="order-section__heading"><span>02</span><h2 id="music-title">Music</h2></div>
            <div className="order-fields">
              <label htmlFor="cdTitle">CD TITLE <RequiredMark /></label>
              <input id="cdTitle" name="cdTitle" type="text" placeholder="Enter your Spotify playlist name" required />
              <p className="order-microcopy">CUSTOM DISC TITLES ARE NOT GUARANTEED TO APPEAR ON EVERY CD PLAYER.</p>
              <fieldset onChange={(event) => {
                if (event.target instanceof HTMLInputElement) setMusicSource(event.target.value as MusicSource);
              }}>
                <legend>HOW ARE YOU SENDING THE MUSIC? <RequiredMark /></legend>
                <div className="order-choice-grid">
                  <Choice name="musicSource" value="spotify" required errors={errors}><span className="order-choice__caps">SPOTIFY PLAYLIST</span></Choice>
                  <Choice name="musicSource" value="drive" required errors={errors}><span className="order-choice__caps">GOOGLE DRIVE FOLDER</span></Choice>
                </div>
              </fieldset>
              <label htmlFor="musicLink">{musicSource === 'spotify' ? 'SPOTIFY PLAYLIST LINK' : musicSource === 'drive' ? 'SHARED GOOGLE DRIVE FOLDER LINK' : 'PLAYLIST OR FOLDER LINK'} <RequiredMark /></label>
              <input id="musicLink" name="musicLink" type="url" placeholder="Paste the Spotify or Google Drive link" required />
              <div className="order-callout"><strong>WANT TO SEND YOUR FILES DIRECTLY?</strong>Choose Google Drive above, share the folder link, and number every filename so the songs appear in the correct order.</div>

              {musicSource === 'spotify' && <>
                <Choice type="checkbox" name="spotifyPublic" required errors={errors}>Is your Spotify playlist public? It must be public so we can access it. <RequiredMark /></Choice>
                <FieldError name="spotifyPublic" errors={errors} />
                <Choice type="checkbox" name="spotifyOrderConfirmed" required errors={errors}>Please understand that the music will be burned onto the disc in the exact order it appears in your Spotify playlist. <RequiredMark /></Choice>
                <FieldError name="spotifyOrderConfirmed" errors={errors} />
              </>}
              {musicSource === 'drive' && <>
                <Choice type="checkbox" name="driveFilesNumbered" required errors={errors}>I have numbered every filename 01, 02, 03 and so on in the exact order the songs must appear on the CD. <RequiredMark /></Choice>
                <FieldError name="driveFilesNumbered" errors={errors} />
              </>}
              <Choice type="checkbox" name="under79Minutes" required errors={errors}>Is your CD under 79 minutes? Audio CDs have a strict time limit. If you proceed with a longer playlist, your Etsy order will be automatically cancelled and refunded. <RequiredMark /></Choice>
              <FieldError name="under79Minutes" errors={errors} />
              <Choice type="checkbox" name="rightsConfirmed" required errors={errors}>I confirm that any audio and artwork I supply is original, licensed, public domain, or otherwise authorised for reproduction. <RequiredMark /></Choice>
              <FieldError name="rightsConfirmed" errors={errors} />
            </div>
          </section>

          <section className="order-section" aria-labelledby="extras-title">
            <div className="order-section__heading"><span>03</span><h2 id="extras-title">Artwork and extras</h2></div>
            <div className="order-fields">
              <label htmlFor="artworkLink">CANVA ARTWORK LINK</label>
              <input id="artworkLink" name="artworkLink" type="url" placeholder="Optional — leave blank for a blank CD" />
              <p className="order-microcopy">ARTWORK MUST USE THE <a href={MASTER_TEMPLATE_URL} target="_blank" rel="noreferrer">MASTER TEMPLATE</a>. NO LINK MEANS THE CD IS SENT BLANK.</p>
              <fieldset>
                <legend>ADD RHINESTONE GEMS TO DECORATE YOUR CD? <RequiredMark /></legend>
                <p className="order-help">Open the <a href={RHINESTONE_URL} target="_blank" rel="noreferrer">AU$5.95 rhinestone add-on</a> and add it at Etsy checkout if you choose Yes.</p>
                <div className="order-choice-grid order-choice-grid--wide">
                  <Choice name="rhinestones" value="yes" required errors={errors}><span className="order-choice__caps">YES — AU$5.95, I’LL ADD IT ON ETSY</span></Choice>
                  <Choice name="rhinestones" value="no" required errors={errors}><span className="order-choice__caps">NO THANKS</span></Choice>
                </div>
              </fieldset>
              <fieldset onChange={(event) => {
                if (event.target instanceof HTMLInputElement) setGiftCard(event.target.value as YesNo);
              }}>
                <legend>WOULD YOU LIKE A PRINTED GIFT CARD FOR AN EXTRA AU$4.95 AT ETSY CHECKOUT? <RequiredMark /></legend>
                <div className="order-choice-grid order-choice-grid--wide">
                  <Choice name="giftCard" value="yes" required errors={errors}><span className="order-choice__caps">YES — AU$4.95, I’LL ENTER THE MESSAGE BELOW</span></Choice>
                  <Choice name="giftCard" value="no" required errors={errors}><span className="order-choice__caps">NO THANKS</span></Choice>
                </div>
              </fieldset>
              {giftCard === 'yes' && <><label htmlFor="giftMessage">GIFT CARD MESSAGE <RequiredMark /></label><textarea id="giftMessage" name="giftMessage" rows={3} placeholder="Enter the printed gift card message" required /></>}
            </div>
          </section>

          <section className="order-section order-section--last" aria-labelledby="shipping-title">
            <div className="order-section__heading"><span>04</span><h2 id="shipping-title">Shipping</h2></div>
            <div className="order-fields">
              <div className="order-shipping"><strong>CHOOSE THE RIGHT SPEED AT ETSY CHECKOUT</strong><p>Economy shipping is the default method designed to save you money. It can take up to 14 business days, so please do not choose Economy if you need the item quickly.</p><p>We strongly recommend Tracked Standard or Express Shipping. If your Economy parcel has not arrived after 14 business days, we will replace it at no charge.</p></div>
              <Choice type="checkbox" name="shippingConfirmed" required errors={errors}>I have read and understand the shipping information. Express Post is available at checkout for urgent gifts. <RequiredMark /></Choice>
              <FieldError name="shippingConfirmed" errors={errors} />
              {serverError && <div className="order-server-error" role="alert">{serverError}</div>}
              <button className="order-submit" type="submit" disabled={submitting}>{submitting ? 'SAVING YOUR DETAILS…' : 'SAVE DETAILS AND GET REFERENCE'}</button>
              {/* TODO(order-launch): add a privacy-policy link only after the owner confirms its public URL. */}
              <p className="order-privacy">Used only to prepare and deliver your order. Never used for marketing.</p>
            </div>
          </section>
        </form>
      </main>
      <OrderFooter />
    </div>
  );
}

function OrderFooter() {
  return <footer className="order-footer"><a className="order-brand" href="/"><img src="/assets/sol-mark-white.svg" alt="" /><span>SPICE OF LIFE MEDIA</span></a><a href="mailto:info@spiceoflifemedia.com.au">INFO@SPICEOFLIFEMEDIA.COM.AU</a></footer>;
}
