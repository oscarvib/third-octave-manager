// Third-Octave Manager · service worker: online it always uses the latest version; offline, the saved one.
const CACHE = 'third-octave-1.1b';   // change with each version
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable.png'];
const LIB = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';   // Excel reader: versioned, so cache-first
const isFont = u => u.startsWith('https://fonts.googleapis.com/') || u.startsWith('https://fonts.gstatic.com/');
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).then(() =>
    // cross-origin script loads as an opaque response: put() accepts it (add() would not)
    fetch(LIB, { mode: 'no-cors' }).then(r => c.put(LIB, r)).catch(() => {}))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
const cacheFirst = req => caches.match(req).then(r => r || fetch(req).then(x => { const cp = x.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return x; }));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = e.request.url;
  if (u === LIB || isFont(u)){ e.respondWith(cacheFirst(e.request)); return; }
  if (new URL(u).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
