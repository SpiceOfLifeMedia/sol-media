import { renderToString } from 'react-dom/server';

import App from './App';

export {
  BRAND_AVATAR,
  BRAND_IMAGE_ALT,
  DEFAULT_OG_IMAGE,
  SEO_ROUTES,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
  getSeo,
  structuredDataForPath,
} from './lib/seo';

export function render(pathname: string) {
  return renderToString(<App ssrPath={pathname} />);
}
