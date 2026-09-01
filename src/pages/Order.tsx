import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import {
  addressFromPlace,
  DeliveryAddress,
  GooglePlacePrediction,
  loadPlacesLibrary,
  PlaceAutocompleteElementInstance,
} from '../lib/googlePlaces';
import './Order.css';

const ETSY_ORDER_URL = 'https://www.etsy.com/au/listing/4382552922/personalised-burned-mixtape-cd-custom';
const MASTER_TEMPLATE_URL = 'https://www.canva.com/design/DAHCUOooVnA/pb6oNxBkkWEllsadLbruyg/view?utm_content=DAHCUOooVnA&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview';
const CANVA_FALLBACK_ACTIVE = true;
const AUSTRALIAN_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
const MAX_ARTWORK_BYTES = 20 * 1024 * 1024;

type MusicSource = '' | 'spotify' | 'google_drive' | 'dropbox';
type ArtworkOption = '' | 'blank_sleeve' | 'blank_jewel' | 'full';
type ArtworkSlot = 'front' | 'back' | 'disc';
type ArtworkFiles = Record<ArtworkSlot, File | null>;
type FieldErrors = Record<string, string>;

const ARTWORK_SPECS: Array<{
  slot: ArtworkSlot;
  title: string;
  dimensions: string;
  minWidth: number;
  minHeight: number;
}> = [
  { slot: 'front', title: 'Front cover', dimensions: '120 × 120 mm · minimum 1417 × 1417 px at 300 DPI', minWidth: 1417, minHeight: 1417 },
  { slot: 'back', title: 'Back cover', dimensions: '150 × 118 mm · minimum 1772 × 1394 px at 300 DPI', minWidth: 1772, minHeight: 1394 },
  { slot: 'disc', title: 'Disc print', dimensions: '120 × 120 mm · minimum 1417 × 1417 px at 300 DPI', minWidth: 1417, minHeight: 1417 },
];

function fileMegabytes(size: number): string {
  return `${(size / 1024 / 1024).toFixed(size >= 1024 * 1024 ? 1 : 2)} MB`;
}

async function validateArtworkFile(
  file: File,
  spec: (typeof ARTWORK_SPECS)[number],
): Promise<string> {
  if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
    return 'Choose a PNG, JPG or PDF file.';
  }
  if (file.size <= 0 || file.size > MAX_ARTWORK_BYTES) {
    return 'The file must be no larger than 20 MB.';
  }
  if (file.type === 'application/pdf') return '';

  const objectUrl = URL.createObjectURL(file);
  try {
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = reject;
      image.src = objectUrl;
    });
    const expectedRatio = spec.minWidth / spec.minHeight;
    const actualRatio = dimensions.width / dimensions.height;
    if (dimensions.width < spec.minWidth || dimensions.height < spec.minHeight) {
      return `${spec.title} is ${dimensions.width} × ${dimensions.height} px. It must be at least ${spec.minWidth} × ${spec.minHeight} px.`;
    }
    if (Math.abs(actualRatio - expectedRatio) / expectedRatio > 0.035) {
      return `${spec.title} has the wrong shape. Please use ${spec.dimensions.split(' · ')[0]}.`;
    }
    return '';
  } catch {
    return 'We could not read that image. Try exporting it again as PNG, JPG or PDF.';
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function ArtworkUploadCard({
  spec,
  file,
  error,
  onFile,
}: {
  spec: (typeof ARTWORK_SPECS)[number];
  file: File | null;
  error?: string;
  onFile: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!file || file.type === 'application/pdf') {
      setPreview('');
      return;
    }
    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [file]);

  return (
    <div className={`order-artwork-upload ${error ? 'order-artwork-upload--error' : ''}`}>
      <div className="order-artwork-preview">
        {preview ? <img src={preview} alt={`${spec.title} preview`} /> : <span>{file?.type === 'application/pdf' ? 'PDF' : spec.slot.toUpperCase()}</span>}
      </div>
      <div className="order-artwork-upload__copy">
        <strong>{spec.title}</strong>
        <p>{spec.dimensions}</p>
        {file && <small>{file.name} · {fileMegabytes(file.size)}</small>}
        <label className="order-file-button" htmlFor={`artwork-${spec.slot}`}>{file ? 'REPLACE FILE' : 'CHOOSE FILE'}</label>
        <input
          id={`artwork-${spec.slot}`}
          className="order-file-input"
          type="file"
          accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"
          required
          onChange={(event) => onFile(event.target.files?.[0] ?? null)}
        />
        {error && <span className="order-error">{error}</span>}
      </div>
    </div>
  );
}

function FieldError({ name, errors }: { name: string; errors: FieldErrors }) {
  if (!errors[name]) return null;
  return <span className="order-error" id={`${name}-error`}>{errors[name]}</span>;
}

function RequiredMark() {
  return <span className="order-required" aria-hidden="true">*</span>;
}

function musicLinkError(source: MusicSource, value: string): string {
  if (!source || !value) return '';
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    if (url.protocol !== 'https:') return 'Enter a complete https:// link.';
    if (source === 'spotify' && (host !== 'open.spotify.com' || !url.pathname.startsWith('/playlist/'))) {
      return 'Paste a public Spotify playlist link from open.spotify.com.';
    }
    if (source === 'google_drive' && (host !== 'drive.google.com' || !url.pathname.includes('/folders/'))) {
      return 'Paste a shared Google Drive folder link.';
    }
    if (source === 'dropbox' && host !== 'dropbox.com') {
      return 'Paste a shared Dropbox folder link.';
    }
    return '';
  } catch {
    return 'Enter a complete https:// link.';
  }
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
  const [playlistMinutes, setPlaylistMinutes] = useState('');
  const [artworkOption, setArtworkOption] = useState<ArtworkOption>('');
  const [artworkFiles, setArtworkFiles] = useState<ArtworkFiles>({ front: null, back: null, disc: null });
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    streetAddress: '', city: '', region: '', postcode: '', country: 'Australia',
  });
  const [placesReady, setPlacesReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState<{ reference: string; emailDelivered: boolean } | null>(null);
  const idempotencyKey = useRef('');
  const autocompleteHost = useRef<HTMLDivElement>(null);
  const autocompleteElement = useRef<PlaceAutocompleteElementInstance | null>(null);
  const addressRef = useRef(deliveryAddress);
  addressRef.current = deliveryAddress;
  const isAustralia = deliveryAddress.country.trim().toLowerCase() === 'australia';
  const parsedPlaylistMinutes = Number(playlistMinutes);
  const playlistTooLong = playlistMinutes !== '' && Number.isFinite(parsedPlaylistMinutes) && parsedPlaylistMinutes >= 79;

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

  async function chooseArtworkFile(slot: ArtworkSlot, file: File | null) {
    const spec = ARTWORK_SPECS.find((item) => item.slot === slot)!;
    if (!file) {
      setArtworkFiles((current) => ({ ...current, [slot]: null }));
      return;
    }
    const fileError = await validateArtworkFile(file, spec);
    if (fileError) {
      setArtworkFiles((current) => ({ ...current, [slot]: null }));
      setErrors((current) => ({ ...current, [`artwork-${slot}`]: fileError }));
      return;
    }
    setArtworkFiles((current) => ({ ...current, [slot]: file }));
    setErrors((current) => ({ ...current, [`artwork-${slot}`]: '' }));
  }

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

    const formData = new FormData(form);
    const selectedSource = String(formData.get('musicSource') ?? '') as MusicSource;
    const linkError = musicLinkError(selectedSource, String(formData.get('musicLink') ?? '').trim());
    if (linkError) {
      setErrors((current) => ({ ...current, musicLink: linkError }));
      (form.elements.namedItem('musicLink') as HTMLInputElement | null)?.focus();
      return;
    }
    const durationMinutes = Number(formData.get('playlistDurationMinutes'));
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      setErrors((current) => ({ ...current, playlistDurationMinutes: 'Enter the total running time shown for your playlist or song folder.' }));
      (form.elements.namedItem('playlistDurationMinutes') as HTMLInputElement | null)?.focus();
      return;
    }
    if (durationMinutes >= 79) {
      setErrors((current) => ({ ...current, playlistDurationMinutes: `This music runs for ${durationMinutes} minutes. Shorten it to less than 79 minutes before ordering.` }));
      (form.elements.namedItem('playlistDurationMinutes') as HTMLInputElement | null)?.focus();
      return;
    }

    const selectedArtwork = String(formData.get('artworkOption') ?? '') as ArtworkOption;
    if (selectedArtwork === 'full' && !CANVA_FALLBACK_ACTIVE) {
      const artworkErrors: FieldErrors = {};
      for (const spec of ARTWORK_SPECS) {
        if (!artworkFiles[spec.slot]) artworkErrors[`artwork-${spec.slot}`] = `Upload the ${spec.title.toLowerCase()} file.`;
      }
      if (Object.keys(artworkErrors).length) {
        setErrors((current) => ({ ...current, ...artworkErrors }));
        document.getElementById('artwork-front')?.focus();
        return;
      }
    }

    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
    setSubmitting(true);
    setSubmitStage(selectedArtwork === 'full' && CANVA_FALLBACK_ACTIVE
      ? 'SAVING YOUR CANVA DESIGN…'
      : selectedArtwork === 'full'
        ? 'PREPARING PRIVATE ARTWORK UPLOAD…'
        : 'SAVING YOUR DETAILS…');
    setErrors({});
    setServerError('');
    const payload: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value;
    }
    payload.streetAddress = streetAddress;
    for (const checkbox of ['spotifyPublic', 'spotifyOrderConfirmed', 'driveFilesNumbered', 'under79Minutes', 'rightsConfirmed', 'artworkPrintConfirmed', 'plainCdConfirmed', 'shippingConfirmed', 'marketingConsent']) {
      payload[checkbox] = formData.has(checkbox);
    }
    payload.idempotencyKey = idempotencyKey.current;

    try {
      if (selectedArtwork === 'full' && !CANVA_FALLBACK_ACTIVE) {
        const files = ARTWORK_SPECS.map((spec) => ({
          slot: spec.slot,
          name: artworkFiles[spec.slot]!.name,
          type: artworkFiles[spec.slot]!.type,
          size: artworkFiles[spec.slot]!.size,
        }));
        const prepareResponse = await fetch('/api/artwork-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idempotencyKey: idempotencyKey.current, files }),
        });
        const prepared = await prepareResponse.json() as {
          error?: string;
          uploads?: Array<{ slot: ArtworkSlot; path: string; signedUrl: string }>;
        };
        if (!prepareResponse.ok || prepared.uploads?.length !== 3) {
          setServerError(prepared.error ?? 'We could not prepare your artwork uploads. Please try again.');
          return;
        }

        setSubmitStage('UPLOADING FRONT, BACK AND DISC…');
        await Promise.all(prepared.uploads.map(async (upload) => {
          const file = artworkFiles[upload.slot]!;
          const uploadBody = new FormData();
          uploadBody.append('cacheControl', '3600');
          uploadBody.append('', file);
          const response = await fetch(upload.signedUrl, { method: 'PUT', headers: { 'x-upsert': 'true' }, body: uploadBody });
          if (!response.ok) throw new Error(`upload_${upload.slot}`);
        }));

        payload.artworkFiles = Object.fromEntries(prepared.uploads.map((upload) => {
          const file = artworkFiles[upload.slot]!;
          return [upload.slot, { path: upload.path, name: file.name, type: file.type, size: file.size }];
        }));
        setSubmitStage('SAVING YOUR DETAILS…');
      } else {
        payload.artworkFiles = {};
      }

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
      setServerError(selectedArtwork === 'full' && !CANVA_FALLBACK_ACTIVE
        ? 'One of the artwork files could not be uploaded. Check your connection and try again.'
        : 'We could not reach the order service. Check your connection and try again.');
    } finally {
      setSubmitting(false);
      setSubmitStage('');
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
                <div className="order-choice-grid order-choice-grid--three">
                  <Choice name="musicSource" value="spotify" required errors={errors}><span className="order-choice__caps">SPOTIFY PLAYLIST</span></Choice>
                  <Choice name="musicSource" value="google_drive" required errors={errors}><span className="order-choice__caps">GOOGLE DRIVE FOLDER</span></Choice>
                  <Choice name="musicSource" value="dropbox" required errors={errors}><span className="order-choice__caps">DROPBOX FOLDER</span></Choice>
                </div>
              </fieldset>
              <label htmlFor="musicLink">{musicSource === 'spotify' ? 'SPOTIFY PLAYLIST LINK' : musicSource === 'google_drive' ? 'SHARED GOOGLE DRIVE FOLDER LINK' : musicSource === 'dropbox' ? 'SHARED DROPBOX FOLDER LINK' : 'PLAYLIST OR FOLDER LINK'} <RequiredMark /></label>
              <input id="musicLink" name="musicLink" type="url" placeholder="Paste a Spotify, Google Drive or Dropbox link" required aria-invalid={Boolean(errors.musicLink)} aria-describedby={errors.musicLink ? 'musicLink-error' : undefined} />
              <FieldError name="musicLink" errors={errors} />
              <div className={`order-duration-check ${playlistTooLong ? 'order-duration-check--blocked' : ''}`}>
                <label htmlFor="playlistDurationMinutes">TOTAL RUNNING TIME IN MINUTES <RequiredMark /></label>
                <p>Enter the total length shown in your playlist or music folder. Example: 1 hour 24 minutes = <strong>84</strong>.</p>
                <input
                  id="playlistDurationMinutes"
                  name="playlistDurationMinutes"
                  type="number"
                  min="1"
                  step="0.01"
                  inputMode="decimal"
                  value={playlistMinutes}
                  onChange={(event) => {
                    setPlaylistMinutes(event.target.value);
                    setErrors((current) => ({ ...current, playlistDurationMinutes: '' }));
                  }}
                  required
                  aria-invalid={playlistTooLong || Boolean(errors.playlistDurationMinutes)}
                />
                {playlistTooLong && <div className="order-duration-blocked" role="alert"><strong>ORDER BLOCKED — PLAYLIST TOO LONG</strong><span>Your music is {playlistMinutes} minutes. Shorten it to less than 79 minutes before submitting this form.</span></div>}
                <FieldError name="playlistDurationMinutes" errors={errors} />
              </div>
              <div className="order-callout"><strong>ONLY THESE MUSIC SOURCES ARE ACCEPTED</strong>Send a public Spotify playlist, a shared Google Drive folder, or a shared Dropbox folder. Apple Music, YouTube Music and other streaming services cannot be processed.</div>

              {musicSource === 'spotify' && <>
                <Choice type="checkbox" name="spotifyPublic" required errors={errors}>Is your Spotify playlist public? It must be public so we can access it. <RequiredMark /></Choice>
                <FieldError name="spotifyPublic" errors={errors} />
                <Choice type="checkbox" name="spotifyOrderConfirmed" required errors={errors}>Please understand that the music will be burned onto the disc in the exact order it appears in your Spotify playlist. <RequiredMark /></Choice>
                <FieldError name="spotifyOrderConfirmed" errors={errors} />
              </>}
              {(musicSource === 'google_drive' || musicSource === 'dropbox') && <>
                <Choice type="checkbox" name="driveFilesNumbered" required errors={errors}>I have numbered every filename 01, 02, 03 and so on in the exact order the songs must appear on the CD. <RequiredMark /></Choice>
                <FieldError name="driveFilesNumbered" errors={errors} />
              </>}
              <div className="order-limit-warning" role="note" aria-label="79-minute hard limit">
                <strong>79-MINUTE HARD LIMIT</strong>
                <h3>Over 79 minutes means the order is automatically rejected.</h3>
                <p>Your Spotify playlist or uploaded song files must total less than 79 minutes. Audio over this limit cannot fit on the CD, and the Etsy order will be cancelled and refunded.</p>
              </div>
              <Choice type="checkbox" name="under79Minutes" required errors={errors}>I have checked the total running time and confirm that my music is under 79 minutes. I understand that an order over 79 minutes will be automatically rejected and refunded. <RequiredMark /></Choice>
              <FieldError name="under79Minutes" errors={errors} />
              <Choice type="checkbox" name="rightsConfirmed" required errors={errors}>I confirm that any audio and artwork I supply is original, licensed, public domain, or otherwise authorised for reproduction. <RequiredMark /></Choice>
              <FieldError name="rightsConfirmed" errors={errors} />
            </div>
          </section>

          <section className="order-section" aria-labelledby="extras-title">
            <div className="order-section__heading"><span>03</span><h2 id="extras-title">Artwork</h2></div>
            <div className="order-fields">
              <fieldset onChange={(event) => {
                if (event.target instanceof HTMLInputElement) setArtworkOption(event.target.value as ArtworkOption);
              }}>
                <legend>CHOOSE EXACTLY WHAT YOU ARE ORDERING <RequiredMark /></legend>
                <div className="order-product-choice-grid">
                  <label className={`order-product-choice ${errors.artworkOption ? 'order-product-choice--error' : ''}`}>
                    <input type="radio" name="artworkOption" value="blank_sleeve" required />
                    <span className="order-product-choice__icon" aria-hidden="true">○</span>
                    <span><strong>BLANK CD + SLEEVE</strong><small>AU$10.95 · Plain CD in a protective cardboard sleeve. No printed artwork.</small></span>
                  </label>
                  <label className={`order-product-choice ${errors.artworkOption ? 'order-product-choice--error' : ''}`}>
                    <input type="radio" name="artworkOption" value="blank_jewel" required />
                    <span className="order-product-choice__icon" aria-hidden="true">▣</span>
                    <span><strong>BLANK CD + JEWEL CASE</strong><small>AU$14.95 · Plain CD in a clear jewel case. No printed artwork.</small></span>
                  </label>
                  <label className={`order-product-choice ${errors.artworkOption ? 'order-product-choice--error' : ''}`}>
                    <input type="radio" name="artworkOption" value="full" required />
                    <span className="order-product-choice__icon" aria-hidden="true">●</span>
                    <span><strong>FULL ARTWORK PACKAGE</strong><small>AU$25.95 · Jewel case, printed front and back covers, and full-colour disc.</small></span>
                  </label>
                </div>
                <FieldError name="artworkOption" errors={errors} />
              </fieldset>

              {(artworkOption === 'blank_sleeve' || artworkOption === 'blank_jewel') && (
                <div className="order-artwork-confirmation">
                  <strong>{artworkOption === 'blank_sleeve' ? 'BLANK CD + CARDBOARD SLEEVE' : 'BLANK CD + JEWEL CASE'}</strong>
                  <p>This option does not include a printed disc, front cover or back cover.</p>
                  <Choice type="checkbox" name="plainCdConfirmed" required errors={errors}>I understand this is a blank CD with no printed artwork, supplied in a {artworkOption === 'blank_sleeve' ? 'cardboard sleeve' : 'jewel case'}. <RequiredMark /></Choice>
                  <FieldError name="plainCdConfirmed" errors={errors} />
                </div>
              )}

              {artworkOption === 'full' && (
                <div className="order-artwork-package">
                  {CANVA_FALLBACK_ACTIVE ? (
                    <div className="order-canva-workflow">
                      <div className="order-callout order-callout--canva"><strong>USE OUR CANVA TEMPLATE</strong>Artwork file uploads are temporarily unavailable. Create the front, back and disc artwork in our correctly sized Canva template, then paste your finished design link below.</div>
                      <a className="order-canva-button" href={MASTER_TEMPLATE_URL} target="_blank" rel="noreferrer">OPEN OUR CANVA TEMPLATE <span aria-hidden="true">↗</span></a>
                      <ol className="order-canva-steps">
                        <li>Open the template and choose <strong>Use template for new design</strong>.</li>
                        <li>Complete the front cover, back cover and disc pages.</li>
                        <li>In Canva, choose <strong>Share</strong>, allow anyone with the link to view, then copy the design link.</li>
                      </ol>
                      <label htmlFor="artworkLink">FINISHED CANVA DESIGN LINK <RequiredMark /></label>
                      <input id="artworkLink" name="artworkLink" type="url" placeholder="https://www.canva.com/design/…" required aria-invalid={Boolean(errors.artworkLink)} />
                      <FieldError name="artworkLink" errors={errors} />
                    </div>
                  ) : (
                    <>
                      <div className="order-callout"><strong>UPLOAD ALL THREE PRINT-READY FILES</strong>PNG, JPG or PDF only. Maximum 20 MB each. Images are checked for the correct shape and minimum 300 DPI pixel size before upload.</div>
                      <div className="order-artwork-uploads">
                        {ARTWORK_SPECS.map((spec) => (
                          <ArtworkUploadCard
                            key={spec.slot}
                            spec={spec}
                            file={artworkFiles[spec.slot]}
                            error={errors[`artwork-${spec.slot}`]}
                            onFile={(file) => void chooseArtworkFile(spec.slot, file)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="order-artwork-confirmation order-artwork-confirmation--print">
                    <strong>FINAL PRINT APPROVAL</strong>
                    <p>We print the Canva design exactly as supplied. Check spelling, cropping, positioning, colour and image quality before approving.</p>
                    <Choice type="checkbox" name="artworkPrintConfirmed" required errors={errors}>I confirm the front, back and disc pages in my Canva link are final and approved for printing exactly as supplied. <RequiredMark /></Choice>
                    <FieldError name="artworkPrintConfirmed" errors={errors} />
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="order-section order-section--last" aria-labelledby="shipping-title">
            <div className="order-section__heading"><span>04</span><h2 id="shipping-title">Shipping</h2></div>
            <div className="order-fields">
              <div className="order-shipping"><strong>CHOOSE THE RIGHT SPEED AT ETSY CHECKOUT</strong><p>Economy shipping is the default method designed to save you money. It can take up to 14 business days, so please do not choose Economy if you need the item quickly.</p><p>We strongly recommend Tracked Standard or Express Shipping. If your Economy parcel has not arrived after 14 business days, we will replace it at no charge.</p></div>
              <Choice type="checkbox" name="shippingConfirmed" required errors={errors}>I have read and understand the shipping information. Express Post is available at checkout for urgent gifts. <RequiredMark /></Choice>
              <FieldError name="shippingConfirmed" errors={errors} />
              <Choice type="checkbox" name="marketingConsent" errors={errors}>Yes, email me one follow-up offer from Spice of Life Media after I submit this form. I can unsubscribe at any time.</Choice>
              <p className="order-privacy">Optional. Your choice does not affect this order.</p>
              {serverError && <div className="order-server-error" role="alert">{serverError}</div>}
              <button className="order-submit" type="submit" disabled={submitting}>{submitting ? submitStage : 'SAVE DETAILS AND GET REFERENCE'}</button>
              {/* TODO(order-launch): add a privacy-policy link only after the owner confirms its public URL. */}
              <p className="order-privacy">Your order details are used to prepare and deliver your CD. We only send the optional follow-up offer if you tick the box above.</p>
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
