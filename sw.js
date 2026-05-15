/**
 * ====================================================================================
 * VALTARA EXECUTIVE THERAPY - SERVICE WORKER SOBERANO V40.1
 * Arquitectura: Multi-Bóveda, Network-First Híbrido y Bypass estricto de Streaming.
 * ====================================================================================
 */

const VERSION = '40.1';
const CORE_CACHE = `valtara-core-v${VERSION}`;
const IMAGE_CACHE = `valtara-images-v${VERSION}`;
const MAX_IMAGES = 60;
const DEBUG_MODE = false;

// ACTIVOS CRÍTICOS
const CORE_ASSETS = [
  './',
  './index.html',
  './css/main.css?v=40.0.0',
  './css/components.css?v=40.0.0',
  './logo.png',
  './manifest.json',
  './js/constructor_maestro.js?v=40.0.0',
  './js/core.js?v=40.0.0',
  './js/router.js?v=40.0.0',
  './js/user.js?v=40.0.0',
  './js/aura.js?v=40.0.0',
  './js/pwa.js?v=40.0.0'
];

const log = (msg, type = 'info') => {
    if (!DEBUG_MODE) return;
    const colors = { info:'color:#00e676', warn:'color:#ffca28', err:'color:#ff5252', cache:'color:#00b0ff' };
    console.log(`%c[SW Valtara V${VERSION}] ${msg}`, colors[type]);
};

const trimCache = async (cacheName, maxItems) => {
    try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        if (keys.length > maxItems) {
            await cache.delete(keys[0]);
            trimCache(cacheName, maxItems);
        }
    } catch (e) { log(`GC Error: ${e}`, 'err'); }
};

self.addEventListener('install', (event) => {
    log('Instalación iniciada. Sellando bóvedas...', 'info');
    event.waitUntil(
        caches.open(CORE_CACHE).then((cache) => {
            return cache.addAll(CORE_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    log('Activación. Limpiando bóvedas obsoletas...', 'info');
    const validCaches = [CORE_CACHE, IMAGE_CACHE];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!validCaches.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    if (req.method !== 'GET') return;
    if (url.protocol.startsWith('chrome-extension')) return;
    if (url.hostname !== location.hostname) return;

    // ============================================================================
    // A) BYPASS ABSOLUTO DE AUDIO (LA SOLUCIÓN AL ERROR DEL CACHÉ FANTASMA)
    // 1. url.pathname ignora el "?v=123" que rompió la regla anterior.
    // 2. req.headers.get('range') evita que guarde audios a la mitad (HTTP 206).
    // ============================================================================
    if (url.pathname.match(/\.(mp3|wav|ogg)$/i) || req.headers.get('range')) {
        log(`Streaming audio bypass estricto: ${url.pathname}`, 'warn');
        return; // Deja que el navegador haga el streaming nativo sin intervenir.
    }

    // B) NETWORK-FIRST para HTML y navegación
    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        event.respondWith(
            fetch(req).then((networkResponse) => {
                const clone = networkResponse.clone();
                caches.open(CORE_CACHE).then((cache) => cache.put(req, clone));
                return networkResponse;
            }).catch(() => {
                return caches.match(req).then(cached => cached || caches.match('./index.html'));
            })
        );
        return;
    }

    // C) CACHE-FIRST para imágenes
    if (req.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        event.respondWith(
            caches.match(req).then((cachedResponse) => {
                const fetchPromise = fetch(req).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const clone = networkResponse.clone();
                        caches.open(IMAGE_CACHE).then((cache) => {
                            cache.put(req, clone);
                            trimCache(IMAGE_CACHE, MAX_IMAGES);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    if (!cachedResponse) {
                        return new Response(
                            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#0a0a0a"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Valtara: Imagen Offline</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    }
                });
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // D) STALE-WHILE-REVALIDATE para scripts y CSS
    event.respondWith(
        caches.match(req).then((cachedResponse) => {
            const networkFetch = fetch(req).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const clone = networkResponse.clone();
                    caches.open(CORE_CACHE).then((cache) => cache.put(req, clone));
                }
                return networkResponse;
            }).catch(() => log(`Servido offline: ${url.pathname}`, 'warn'));
            return cachedResponse || networkFetch;
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FORCE_UPDATE') {
        self.skipWaiting();
    }
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'valtara-sync-expediente') {
        event.waitUntil(Promise.resolve(true));
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes('valtara') && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(event.notification.data?.url || '/');
        })
    );
});
