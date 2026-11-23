// Third-Octave Manager · service worker.
// Everything the app needs (page, Excel library, fonts, icons) is in this repository and is cached at install:
// online it always takes the latest version; offline it opens the saved one.
const CACHE = 'third-octave-2.13';   // change with each version
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable.png',
  './lib/xlsx.full.min.js', './fonts/fonts.css',
  './fonts/IBMPlexSans-Regular.woff2', './fonts/IBMPlexSans-Medium.woff2', './fonts/IBMPlexSans-SemiBold.woff2',
  './fonts/IBMPlexSansCondensed-Medium.woff2', './fonts/IBMPlexSansCondensed-SemiBold.woff2',
  './fonts/IBMPlexMono-Regular.woff2', './fonts/IBMPlexMono-Medium.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('third-octave-') && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { if (r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
