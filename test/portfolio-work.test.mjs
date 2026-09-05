import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const app = read('src/App.tsx');
const seo = read('src/lib/seo.ts');
const selectedWork = read('src/components/sections/SelectedWork.tsx');
const workPage = read('src/pages/Work.tsx');
const caseStudy = read('src/pages/HillierCaseStudy.tsx');
const petiolaCaseStudy = read('src/pages/PetiolaWilsonCaseStudy.tsx');

test('Hillier has an indexable, prerendered case-study route', () => {
  assert.match(app, /<Route path="\/work\/hillier-plumbing-excavation" component=\{HillierCaseStudy\} \/>/);
  const config = seo.match(/'\/work\/hillier-plumbing-excavation': \{([\s\S]*?)\n  \},/u)?.[1] ?? '';
  assert.match(config, /index: true/);
  assert.match(config, /hillier-website-desktop\.webp/);
});

test('Hillier is visible on both selected-work surfaces', () => {
  assert.match(selectedWork, /HILLIER PLUMBING &amp; EXCAVATION/);
  assert.match(selectedWork, /href="\/work\/hillier-plumbing-excavation"/);
  assert.match(workPage, /02 · HILLIER PLUMBING &amp; EXCAVATION/);
  assert.match(workPage, /href="\/work\/hillier-plumbing-excavation"/);
});

test('case study uses real desktop and mobile captures without claiming performance results', () => {
  assert.match(caseStudy, /hillier-website-desktop\.webp/);
  assert.match(caseStudy, /hillier-website-mobile\.webp/);
  assert.match(caseStudy, /Visit the live website/);
  assert.match(caseStudy, /future search content and a more useful social media calendar/);
  assert.doesNotMatch(caseStudy, /increased leads|improved rankings|conversion rate/i);
});

test('Petiola Wilson has an indexable, prerendered case-study route', () => {
  assert.match(app, /<Route path="\/work\/petiola-wilson" component=\{PetiolaWilsonCaseStudy\} \/>/);
  const config = seo.match(/'\/work\/petiola-wilson': \{([\s\S]*?)\n  \},/u)?.[1] ?? '';
  assert.match(config, /index: true/);
  assert.match(config, /petiola-wilson-desktop\.webp/);
});

test('Petiola Wilson is visible on both selected-work surfaces', () => {
  assert.match(selectedWork, /PETIOLA WILSON · CULTURAL SPEAKER &amp; EDUCATOR/);
  assert.match(selectedWork, /href="\/work\/petiola-wilson"/);
  assert.match(workPage, /03 · PETIOLA WILSON/);
  assert.match(workPage, /href="\/work\/petiola-wilson"/);
});

test('Petiola Wilson case study stays factual and links to the live website', () => {
  assert.match(petiolaCaseStudy, /petiola-wilson-desktop\.webp/);
  assert.match(petiolaCaseStudy, /petiola-wilson-mobile\.webp/);
  assert.match(petiolaCaseStudy, /https:\/\/www\.petiolawilson\.com\.au\//);
  assert.match(petiolaCaseStudy, /without making unsupported claims/);
  assert.doesNotMatch(petiolaCaseStudy, /increased leads|improved rankings|conversion rate/i);
});
