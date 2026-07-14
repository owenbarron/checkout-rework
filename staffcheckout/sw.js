const CACHE_NAME = 'usefull-kiosk-staffcheckout-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    '../images/USEFULL-Icon-Registered_Color.svg',
    '../sounds/error.mp3',
    '../sounds/final-success-chime-1.mp3',
    '../sounds/final-success-chime-2.mp3',
    '../sounds/final-success-chime-3.mp3',
    '../sounds/final-success-chime-4.mp3',
    '../sounds/successful-scan.m4a',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Network-first: always try the network so edits show immediately, refresh the
// cache with each successful response, and fall back to cache only when offline.
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
