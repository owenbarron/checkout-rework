const CACHE_NAME = 'usefull-kiosk-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/USEFULL-Icon-Registered_Color.svg',
    '/USEFULL-Logo-Registered_KnockOut.svg',
    '/Pioneer State University.png',
    '/app-download.png',
    '/manifest.json',
];

// Cache assets on install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Clean old caches on activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Network-first for CDN resources, cache-first for local assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Let CDN requests (React, Tailwind, Fonts) go to network first
    if (url.origin !== location.origin) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Cache-first for local assets
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
