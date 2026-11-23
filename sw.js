/* Expert Physics service worker: makes the site installable and fast on repeat visits.
   Only files from this website are cached. Sign-in, payments, tests and PDFs (script.google.com)
   always go to the server and are never stored here.
   After changing any page or file on GitHub, raise VERSION by one so phones pick up the change. */
const VERSION = 'ep-v1';
const CORE = ['./', './index.html', './portal.html', './offline.html',
  './assets/site.js', './assets/chrome.css', './assets/site.css',
  './assets/img/logo.webp', './assets/img/mark-96.png', './assets/img/app-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;   // backend, fonts, Razorpay: untouched

  if (req.mode === 'navigate') {                 // pages: newest from the network, saved copy when offline
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match('./offline.html'))));
    return;
  }
  // styles, scripts, images: show the saved copy at once, refresh it in the background
  e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  })));
});
