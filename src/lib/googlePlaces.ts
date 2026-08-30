export type GoogleAddressComponent = {
  longText: string;
  shortText: string;
  types: string[];
};

export type GooglePlace = {
  addressComponents?: GoogleAddressComponent[];
  formattedAddress?: string;
  fetchFields(options: { fields: string[] }): Promise<void>;
};

export type GooglePlacePrediction = {
  toPlace(): GooglePlace;
};

export type PlaceAutocompleteElementInstance = HTMLElement & {
  placeholder: string;
  value: string;
};

type PlacesLibrary = {
  PlaceAutocompleteElement: new (options?: Record<string, never>) => PlaceAutocompleteElementInstance;
};

type GoogleMapsWindow = Window & {
  google?: {
    maps?: {
      importLibrary(library: 'places'): Promise<PlacesLibrary>;
    };
  };
};

export type DeliveryAddress = {
  streetAddress: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

let placesLibraryPromise: Promise<PlacesLibrary> | null = null;

export function loadPlacesLibrary(apiKey: string): Promise<PlacesLibrary> {
  if (placesLibraryPromise) return placesLibraryPromise;

  placesLibraryPromise = new Promise((resolve, reject) => {
    const mapsWindow = window as GoogleMapsWindow;

    const importPlaces = async () => {
      try {
        if (!mapsWindow.google?.maps?.importLibrary) {
          throw new Error('Google Maps did not initialise.');
        }
        resolve(await mapsWindow.google.maps.importLibrary('places'));
      } catch (error) {
        placesLibraryPromise = null;
        reject(error);
      }
    };

    if (mapsWindow.google?.maps?.importLibrary) {
      void importPlaces();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-sol-google-maps]');
    if (existingScript) {
      existingScript.addEventListener('load', () => void importPlaces(), { once: true });
      existingScript.addEventListener('error', () => {
        placesLibraryPromise = null;
        reject(new Error('Google Maps failed to load.'));
      }, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.dataset.solGoogleMaps = 'true';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&v=weekly`;
    script.async = true;
    script.onload = () => void importPlaces();
    script.onerror = () => {
      placesLibraryPromise = null;
      reject(new Error('Google Maps failed to load.'));
    };
    document.head.append(script);
  });

  return placesLibraryPromise;
}

function componentValue(components: GoogleAddressComponent[], type: string, useShortText = false) {
  const component = components.find((candidate) => candidate.types.includes(type));
  if (!component) return '';
  return useShortText ? component.shortText : component.longText;
}

export function addressFromPlace(place: GooglePlace): DeliveryAddress {
  const components = place.addressComponents ?? [];
  const country = componentValue(components, 'country');
  const countryCode = componentValue(components, 'country', true).toUpperCase();
  const streetNumber = componentValue(components, 'street_number');
  const route = componentValue(components, 'route');
  const premise = componentValue(components, 'premise');
  const streetAddress = [streetNumber, route].filter(Boolean).join(' ')
    || premise
    || place.formattedAddress?.split(',')[0]?.trim()
    || '';
  const city = componentValue(components, 'locality')
    || componentValue(components, 'postal_town')
    || componentValue(components, 'sublocality_level_1')
    || componentValue(components, 'administrative_area_level_2');
  const useShortRegion = ['AU', 'CA', 'US'].includes(countryCode);

  return {
    streetAddress,
    city,
    region: componentValue(components, 'administrative_area_level_1', useShortRegion),
    postcode: componentValue(components, 'postal_code'),
    country,
  };
}
