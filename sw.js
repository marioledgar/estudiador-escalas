const CACHE_NAME = 'escalas-v1';  // cambia el número cuando actualices la app

const FILES_TO_CACHE = [
    './',
    './index.html',
    './main.js',
    './style.css',
    './manifest.json',
    './fonts/fonts.css',
    './fonts/lato-v25-latin-regular.woff2',
    './fonts/lato-v25-latin-italic.woff2',
    './fonts/lato-v25-latin-700.woff2',
    './fonts/lato-v25-latin-700italic.woff2',
    './icons/icon-192.png',
    './icons/icon-512.png'
];


// EVENTO 1: install — se ejecuta una vez al instalar el SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())  // activa el SW inmediatamente
    );
});

// EVENTO 2: activate — se ejecuta cuando el SW toma el control
// Aquí borramos cachés de versiones anteriores
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names
                    .filter(name => name !== CACHE_NAME)  // todos menos el actual
                    .map(name => caches.delete(name))     // los borra
            );
        }).then(() => self.clients.claim())  // toma el control de páginas abiertas
    );
});

// EVENTO 3: fetch — se ejecuta en cada petición de red
// Estrategia: network-first (intenta red, si falla usa caché)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // Si la red responde, actualiza la caché y devuelve la respuesta
                const copy = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, copy);
                });
                return networkResponse;
            })
            .catch(() => {
                // Si no hay red, usa la caché como fallback
                return caches.match(event.request);
            })
    );
});