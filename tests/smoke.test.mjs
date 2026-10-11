// Dependency-free smoke test for the inline drawing script in index.html.
// Runs the page's inline <script> in a minimal DOM stub and checks the
// counter behaviour, in particular the prefers-reduced-motion path.
//
//   node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

const match = html.match(/<script>\r?\n([\s\S]*?)\r?\n<\/script>/);
assert.ok(match, 'inline <script> block not found in index.html');
const inlineScript = match[1];

function makeStat(target) {
  return { dataset: { target: String(target) }, textContent: '0' };
}

// Load the inline script in a stub context. Pass reduce=true to emulate
// `prefers-reduced-motion: reduce`.
function loadPage({ reduce, stats }) {
  const context = {
    window: {
      addEventListener() {},
      innerHeight: 0,
      matchMedia: (query) => ({ matches: reduce, media: query }),
    },
    document: {
      querySelectorAll: (sel) => (sel.includes('.stat-number') ? stats : []),
      getElementById: () => ({ getContext: () => ({}), style: {} }),
      querySelector: () => ({ querySelector: () => ({ getContext: () => ({}) }) }),
      createElement: () => ({ setAttribute() {}, appendChild() {}, style: {} }),
    },
    IntersectionObserver: class {
      constructor(cb) {
        this.cb = cb;
      }
      observe(el) {
        this.cb([{ isIntersecting: true, target: el }]);
      }
      unobserve() {}
    },
    rough: { canvas: () => ({}), svg: () => ({}) },
    setInterval: () => 1,
    clearInterval: () => {},
    setTimeout: () => 1,
    clearTimeout: () => {},
    Math,
    parseInt,
  };
  vm.createContext(context);
  vm.runInContext(inlineScript, context);
  return context;
}

test('reduced motion: counters show final values immediately (no count-up)', () => {
  const stats = [makeStat(12847), makeStat(342190), makeStat(99)];
  const ctx = loadPage({ reduce: true, stats });
  ctx.animateCounters();
  assert.equal(stats[0].textContent, (12847).toLocaleString('tr-TR'));
  assert.equal(stats[1].textContent, (342190).toLocaleString('tr-TR'));
  assert.equal(stats[2].textContent, (99).toLocaleString('tr-TR'));
});

test('normal motion: counters start at 0 and animate (not finalized synchronously)', () => {
  const stats = [makeStat(12847)];
  const ctx = loadPage({ reduce: false, stats });
  ctx.animateCounters();
  assert.equal(stats[0].textContent, '0');
});
