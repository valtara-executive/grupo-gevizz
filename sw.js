/**
 * ====================================================================================
 * VALTARA EXECUTIVE THERAPY - SERVICE WORKER SOBERANO V41.0
 * ====================================================================================
 *
 * FIX DEFINITIVO ANDROID/PWA/SPA AUDIO:
 *
 * ✔ Eliminado lifecycle agresivo de skipWaiting()
 * ✔ Eliminada corrupción multimedia tras refresh
 * ✔ Mantiene cache inteligente
 * ✔ Mantiene modo offline
 * ✔ Mantiene PWA
 * ✔ Mantiene SPA
 * ✔ Mantiene streaming nativo de audio
 * ✔ Compatible con Android Chrome
 * ✔ Compatible con instalación PWA
 * ✔ Compatible con playlists largas
 * ====================================================================================
 */

const VERSION     = '41.0';

const CORE_CACHE  = `valtara-core-v${VERSION}`;
const IMAGE_CACHE = `valtara-images-v${VERSION}`;

const MAX_IMAGES  = 60;

const DEBUG_MODE  = false;

/* ─────────────────────────────────────────────────────────────────────────────
   ACTIVOS CRÍTICOS
───────────────────────────────────────────────────────────────────────────── */

const CORE_ASSETS = [
    './',
    './index.html',
    './css/main.css?v=41.0.0',
    './css/components.css?v=41.0.0',
    './logo.png',
    './manifest.json',

    './js/constructor_maestro.js?v=41.0.0',
    './js/core.js?v=41.0.0',
    './js/router.js?v=41.0.0',
    './js/user.js?v=41.0.0',
    './js/aura.js?v=41.0.0',
    './js/pwa.js?v=41.0.0'
];

/* ─────────────────────────────────────────────────────────────────────────────
   LOGGER
───────────────────────────────────────────────────────────────────────────── */

const log = (msg, type = 'info') => {

    if (!DEBUG_MODE) return;

    const colors = {
        info:  'color:#00e676',
        warn:  'color:#ffca28',
        err:   'color:#ff5252',
        cache: 'color:#00b0ff'
    };

    console.log(
        `%c[SW Valtara V${VERSION}] ${msg}`,
        colors[type]
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   CACHE GC
───────────────────────────────────────────────────────────────────────────── */

const trimCache = async (cacheName, maxItems) => {

    try {

        const cache = await caches.open(cacheName);

        const keys = await cache.keys();

        if (keys.length > maxItems) {

            await cache.delete(keys[0]);

            trimCache(cacheName, maxItems);
        }

    } catch (e) {

        log(`GC Error: ${e}`, 'err');
    }
};

/* ─────────────────────────────────────────────────────────────────────────────
   STREAMING MEDIA DETECTOR
───────────────────────────────────────────────────────────────────────────── */

const isStreamingMedia = (url) => {

    if (
        /\.(mp3|wav|ogg|flac|aac|m4a|opus|mp4|webm|ogv)(\?|$)/i.test(url)
    ) {
        return true;
    }

    if (/\/audio\//i.test(url)) {
        return true;
    }

    return false;
};

/* ─────────────────────────────────────────────────────────────────────────────
   INSTALL
───────────────────────────────────────────────────────────────────────────── */

self.addEventListener('install', (event) => {

    log('Instalación iniciada. Sellando bóvedas...', 'info');

    event.waitUntil(

        caches.open(CORE_CACHE).then((cache) => {

            log('Pre-cargando activos críticos...', 'cache');

            return cache.addAll(CORE_ASSETS);
        })
    );
});

/* ─────────────────────────────────────────────────────────────────────────────
   ACTIVATE
───────────────────────────────────────────────────────────────────────────── */

self.addEventListener('activate', (event) => {

    log('Activación. Limpiando bóvedas obsoletas...', 'info');

    const validCaches = [
        CORE_CACHE,
        IMAGE_CACHE
    ];

    event.waitUntil(

        Promise.all([

            caches.keys().then((cacheNames) =>

                Promise.all(

                    cacheNames.map((cacheName) => {

                        if (!validCaches.includes(cacheName)) {

                            log(
                                `Destruyendo bóveda obsoleta: ${cacheName}`,
                                'err'
                            );

                            return caches.delete(cacheName);
                        }
                    })
                )
            ),

            self.clients.claim()

        ])
    );
});

/* ─────────────────────────────────────────────────────────────────────────────
   FETCH
───────────────────────────────────────────────────────────────────────────── */

self.addEventListener('fetch', (event) => {

    const req = event.request;

    const url = new URL(req.url);

    /* ───────────────────────── */

    if (req.method !== 'GET') return;

    if (url.protocol.startsWith('chrome-extension')) return;

    if (url.hostname !== location.hostname) return;

    /* ─────────────────────────
       BYPASS TOTAL AUDIO/VIDEO
    ───────────────────────── */

    if (isStreamingMedia(req.url)) {

        log(
            `Streaming bypass: ${url.pathname}${url.search}`,
            'warn'
        );

        return;
    }

    /* ─────────────────────────
       HTML — NETWORK FIRST
    ───────────────────────── */

    if (
        req.mode === 'navigate' ||
        (req.headers.get('accept') || '').includes('text/html')
    ) {

        event.respondWith(

            fetch(req)

                .then((networkResponse) => {

                    const clone = networkResponse.clone();

                    caches.open(CORE_CACHE)
                        .then((cache) => cache.put(req, clone));

                    return networkResponse;
                })

                .catch(() => {

                    log(
                        'Sin red. Entregando HTML desde bóveda.',
                        'warn'
                    );

                    return caches.match(req)
                        .then(cached =>
                            cached || caches.match('./index.html')
                        );
                })
        );

        return;
    }

    /* ─────────────────────────
       IMÁGENES — CACHE FIRST
    ───────────────────────── */

    if (
        req.destination === 'image' ||
        /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(req.url)
    ) {

        event.respondWith(

            caches.match(req).then((cachedResponse) => {

                const fetchPromise = fetch(req)

                    .then((networkResponse) => {

                        if (
                            networkResponse &&
                            networkResponse.status === 200
                        ) {

                            const clone = networkResponse.clone();

                            caches.open(IMAGE_CACHE)
                                .then((cache) => {

                                    cache.put(req, clone);

                                    trimCache(
                                        IMAGE_CACHE,
                                        MAX_IMAGES
                                    );
                                });
                        }

                        return networkResponse;
                    })

                    .catch(() => {

                        if (!cachedResponse) {

                            return new Response(

                                `
                                <svg width="400" height="300"
                                xmlns="http://www.w3.org/2000/svg">

                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="#0a0a0a"
                                    />

                                    <text
                                        x="50%"
                                        y="50%"
                                        font-family="sans-serif"
                                        font-size="20"
                                        fill="#D4AF37"
                                        text-anchor="middle"
                                        dominant-baseline="middle">

                                        Valtara: Imagen Offline

                                    </text>

                                </svg>
                                `,

                                {
                                    headers: {
                                        'Content-Type':'image/svg+xml'
                                    }
                                }
                            );
                        }
                    });

                return cachedResponse || fetchPromise;
            })
        );

        return;
    }

    /* ─────────────────────────
       CSS / JS — STALE WHILE REVALIDATE
    ───────────────────────── */

    event.respondWith(

        caches.match(req).then((cachedResponse) => {

            const networkFetch = fetch(req)

                .then((networkResponse) => {

                    if (
                        networkResponse &&
                        networkResponse.status === 200
                    ) {

                        const clone = networkResponse.clone();

                        caches.open(CORE_CACHE)
                            .then((cache) => {

                                cache.put(req, clone);
                            });
                    }

                    return networkResponse;
                })

                .catch(() => {

                    log(
                        `Servido offline: ${url.pathname}`,
                        'warn'
                    );
                });

            return cachedResponse || networkFetch;
        })
    );
});

/* ─────────────────────────────────────────────────────────────────────────────
   MESSAGE
───────────────────────────────────────────────────────────────────────────── */

self.addEventListener('message', (event) => {

    if (
        event.data &&
        event.data.type === 'FORCE_UPDATE'
    ) {

        log(
            'Solicitud de actualización recibida.',
            'warn'
        );
    }
});

/* ─────────────────────────────────────────────────────────────────────────────
   BACKGROUND SYNC
───────────────────────────────────────────────────────────────────────────── */

self.addEventListener('sync', (event) => {

    if (event.tag === 'valtara-sync-expediente') {

        event.waitUntil(
            Promise.resolve(true)
        );
    }
});

/* ─────────────────────────────────────────────────────────────────────────────
   PUSH NOTIFICATIONS
───────────────────────────────────────────────────────────────────────────── */

self.addEventListener('notificationclick', (event) => {

    event.notification.close();

    event.waitUntil(

        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })

        .then((windowClients) => {

            for (let i = 0; i < windowClients.length; i++) {

                const client = windowClients[i];

                if (
                    client.url.includes('valtara') &&
                    'focus' in client
                ) {
                    return client.focus();
                }
            }

            if (clients.openWindow) {

                return clients.openWindow(
                    event.notification.data?.url || '/'
                );
            }
        })
    );
});
