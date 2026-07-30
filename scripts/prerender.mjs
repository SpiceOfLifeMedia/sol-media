import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = process.cwd();
const publicDirectory = path.join(projectRoot, 'dist/public');
const templatePath = path.join(publicDirectory, 'index.html');
const serverEntryPath = path.join(projectRoot, 'dist/server/entry-server.js');

const template = await readFile(templatePath, 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('The built HTML template is missing the prerender markers.');
}

const server = await import(pathToFileURL(serverEntryPath).href);
const {
  DEFAULT_OG_IMAGE,
  SEO_ROUTES,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
  getSeo,
  render,
  structuredDataForPath,
} = server;

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function headForPath(pathname, includeCanonical = true) {
  const seo = getSeo(pathname);
  const canonical = canonicalUrl(pathname);
  const robots = seo.index ? 'index, follow' : 'noindex, follow';
  const structuredData = structuredDataForPath(pathname);

  const tags = [
    `    <title>${escapeAttribute(seo.title)}</title>`,
    `    <meta name="description" content="${escapeAttribute(seo.description)}" />`,
    `    <meta name="robots" content="${robots}" />`,
  ];

  if (includeCanonical) {
    tags.push(`    <link rel="canonical" href="${escapeAttribute(canonical)}" />`);
  }

  tags.push(
    `    <meta property="og:site_name" content="${SITE_NAME}" />`,
    '    <meta property="og:locale" content="en_AU" />',
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:title" content="${escapeAttribute(seo.title)}" />`,
    `    <meta property="og:description" content="${escapeAttribute(seo.description)}" />`,
    `    <meta property="og:url" content="${escapeAttribute(canonical)}" />`,
    `    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    '    <meta property="og:image:width" content="1200" />',
    '    <meta property="og:image:height" content="630" />',
    '    <meta property="og:image:type" content="image/png" />',
    '    <meta property="og:image:alt" content="Spice of Life Media — brand, web, search and content" />',
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeAttribute(seo.title)}" />`,
    `    <meta name="twitter:description" content="${escapeAttribute(seo.description)}" />`,
    `    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
    '    <meta name="twitter:image:alt" content="Spice of Life Media — brand, web, search and content" />',
  );

  if (structuredData) {
    const json = JSON.stringify(structuredData).replaceAll('<', '\\u003c');
    tags.push(`    <script id="sol-structured-data" type="application/ld+json">${json}</script>`);
  }

  return `<!--app-head-->\n${tags.join('\n')}\n    <!--/app-head-->`;
}

function htmlForPath(pathname, includeCanonical = true) {
  return template
    .replace(
      /<!--app-head-->[\s\S]*?<!--\/app-head-->/,
      headForPath(pathname, includeCanonical),
    )
    .replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`);
}

function outputPathForRoute(route) {
  if (route === '/') return templatePath;
  return path.join(publicDirectory, `${route.slice(1)}.html`);
}

for (const route of Object.keys(SEO_ROUTES)) {
  const outputPath = outputPathForRoute(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, htmlForPath(route), 'utf8');
}

await writeFile(path.join(publicDirectory, '404.html'), htmlForPath('/404', false), 'utf8');

const sitemapUrls = Object.entries(SEO_ROUTES)
  .filter(([, seo]) => seo.index)
  .map(
    ([route, seo]) =>
      `  <url>\n    <loc>${canonicalUrl(route)}</loc>\n    <lastmod>${seo.lastModified}</lastmod>\n  </url>`,
  )
  .join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapUrls,
  '</urlset>',
  '',
].join('\n');

await writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemap, 'utf8');

console.log(
  `Prerendered ${Object.keys(SEO_ROUTES).length} routes, a 404 page, and sitemap.xml for ${SITE_URL}.`,
);
