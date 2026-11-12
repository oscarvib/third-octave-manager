// Third-Octave Manager · service worker: online it always uses the latest version; offline, the saved one.
const CACHE = 'third-octave-1.0';   // change with each version
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable.png'];
const LIB = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';   // Excel reader: versioned, so cache-first
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).then(() => c.add(new Request(LIB, { mode: 'no-cors' })).catch(() => {})))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url === LIB){
    e.respondWith(caches.match(LIB).then(r => r || fetch(e.request).then(x => { const cp = x.clone(); caches.open(CACHE).then(c => c.put(LIB, cp)); return x; })));
    return;
  }
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
