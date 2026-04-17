const CACHE_NAME = 'usefull-kiosk-fullheight-v2';
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

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

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

    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
