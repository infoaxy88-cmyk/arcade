/* Service worker di Arcade.
   Per rilasciare un aggiornamento: modifica i file, cambia VERSION qui sotto e ricarica tutto sull'hosting.
   Quando aggiungi un gioco, aggiungi i suoi file all'elenco CORE. */
const VERSION = '1.0.0';
const CACHE = 'arcade-' + VERSION;

// Senza questi file l'app non si installa.
const CORE = [
  './',
  'index.html',
  'tetris/',
  'tetris/index.html',
  'manifest.webmanifest',
  'fonts/fonts.css',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];
// Se mancano (font non ancora caricati) l'installazione prosegue lo stesso.
const OPTIONAL = [
  'fonts/PressStart2P-Regular.woff2',
  'fonts/IBMPlexMono-Regular.woff2',
  'fonts/IBMPlexMono-SemiBold.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // cache: 'reload' salta la cache HTTP, così la nuova versione scarica file davvero nuovi.
    await cache.addAll(CORE.map((u) => new Request(u, { cache: 'reload' })));
    await Promise.all(OPTIONAL.map((u) => cache.add(new Request(u, { cache: 'reload' })).catch(() => {})));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n.startsWith('arcade-') && n !== CACHE).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    if (hit) return hit;
    try {
      return await fetch(req);
    } catch (err) {
      if (req.mode === 'navigate') {
        const home = await cache.match('index.html');
        if (home) return home;
      }
      return Response.error();
    }
  })());
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') self.skipWaiting();
  else if (data.type === 'GET_VERSION' && event.source) event.source.postMessage({ type: 'VERSION', version: VERSION });
});
