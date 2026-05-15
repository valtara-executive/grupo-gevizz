/**
 * ====================================================================================
 * VALTARA EXECUTIVE THERAPY - SERVICE WORKER SOBERANO V40.1
 * ====================================================================================
 *
 * CORRECCIÓN V40.1 — BUG CRÍTICO DE AUDIO:
 *
 * El bug anterior:
 *   La regla de bypass de audio usaba la regex /\.(mp3|wav|ogg)$/
 *   El símbolo $ significa "fin de cadena".
 *   sonoterapia_audio.js asignaba:  audio.src = `${track.src}?v=${Date.now()}`
 *   La URL resultante era:           audio/1.mp3?v=1747234567890
 *   Esa URL NO termina en .mp3 — termina en números → la regex NO hacía match.
 *   En la primera visita el SW está instalándose pero aún no controla la página,
 *   por eso el audio funcionaba. A partir del segundo load el SW ya controla y
 *   captaba todos los requests de audio, los metía en stale-while-revalidate
 *   (sección D), lo cual rompe el soporte de Range/206 que necesita el streaming.
 *   Resultado: audio muerto en cualquier recarga hasta borrar datos del sitio.
 *
 * La corrección:
 *   Se cambió /\.(mp3|wav|ogg)$/ por /\.(mp3|wav|ogg)(\?|$)/i
 *   Esto hace match tanto con "audio/1.mp3" como con "audio/1.mp3?v=timestamp".
 *   También se agregó el flag /i (case-insensitive) por robustez (.MP3, .Ogg, etc.)
 *   Adicionalmente se amplió el bypass a otros formatos de audio/video comunes.
 *   Y se añade bypass explícito para la carpeta /audio/ completa, como segunda
 *   línea de defensa ante cualquier formato o query string imprevisto.
 * ====================================================================================
 */

const VERSION    = '40.1';
const CORE_CACHE  = `valtara-core-v${VERSION}`;
const IMAGE_CACHE = `valtara-images-v${VERSION}`;
const MAX_IMAGES  = 60;
const DEBUG_MODE  = false;

// ACTIVOS CRÍTICOS — versión sincronizada con index.html (?v=40.0.0)
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
        const keys  = await cache.keys();
        if (keys.length > maxItems) {
            await cache.delete(keys[0]);
            trimCache(cacheName, maxItems);
        }
    } catch (e) { log(`GC Error: ${e}`, 'err'); }
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: ¿es esta URL un recurso de audio/video que requiere streaming?
// ─────────────────────────────────────────────────────────────────────────────
const isStreamingMedia = (url) => {
    // CORRECCIÓN: usar (\?|$) en lugar de $ para que haga match aunque haya
    // query string como ?v=1747234567890 (cache-busting de sonoterapia_audio.js)
    if (/\.(mp3|wav|ogg|flac|aac|m4a|opus|mp4|webm|ogv)(\?|$)/i.test(url)) return true;
    // Segunda línea de defensa: cualquier URL que venga de la carpeta /audio/
    if (/\/audio\//i.test(url)) return true;
    return false;
};

// FASE 1: INSTALACIÓN
self.addEventListener('install', (event) => {
    log('Instalación iniciada. Sellando bóvedas...', 'info');
    event.waitUntil(
        caches.open(CORE_CACHE).then((cache) => {
            log('Pre-cargando activos críticos...', 'cache');
            return cache.addAll(CORE_ASSETS);
        })
    );
    self.skipWaiting();
});

// FASE 2: ACTIVACIÓN — elimina bóvedas de versiones anteriores
self.addEventListener('activate', (event) => {
    log('Activación. Limpiando bóvedas obsoletas...', 'info');
    const validCaches = [CORE_CACHE, IMAGE_CACHE];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!validCaches.includes(cacheName)) {
                        log(`Destruyendo bóveda obsoleta: ${cacheName}`, 'err');
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// FASE 3: INTERCEPTOR DE RED
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    if (req.method !== 'GET') return;
    if (url.protocol.startsWith('chrome-extension')) return;

    // Recursos externos (fonts, CDN, APIs): dejar que el navegador decida
    if (url.hostname !== location.hostname) return;

    // ─────────────────────────────────────────────────────────────────────
    // A) BYPASS TOTAL DE AUDIO Y VIDEO — streaming nativo del navegador
    //
    // CORRECCIÓN CRÍTICA: la versión anterior usaba /\.(mp3|wav|ogg)$/
    // El $ rompía el bypass cuando sonoterapia_audio.js añadía ?v=timestamp.
    // Ahora se usa isStreamingMedia() que cubre query strings y la carpeta /audio/.
    //
    // No llamar event.respondWith() aquí es intencional y correcto:
    // el navegador maneja el request nativo con soporte completo de Range/206,
    // seek, buffering parcial y todas las características de streaming de audio.
    // ─────────────────────────────────────────────────────────────────────
    if (isStreamingMedia(req.url)) {
        log(`Streaming bypass: ${url.pathname}${url.search}`, 'warn');
        return; // NO interceptar — el navegador lo resuelve directamente
    }

    // B) NETWORK-FIRST para HTML y navegación
    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        event.respondWith(
            fetch(req).then((networkResponse) => {
                const clone = networkResponse.clone();
                caches.open(CORE_CACHE).then((cache) => cache.put(req, clone));
                return networkResponse;
            }).catch(() => {
                log('Sin red. Entregando HTML desde bóveda (Modo Bunker)', 'warn');
                return caches.match(req).then(cached => cached || caches.match('./index.html'));
            })
        );
        return;
    }

    // C) CACHE-FIRST para imágenes
    if (req.destination === 'image' || /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(req.url)) {
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

// FASE 4: COMUNICACIÓN BIDIRECCIONAL
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FORCE_UPDATE') {
        log('Actualización forzosa recibida.', 'err');
        self.skipWaiting();
    }
});

// FASE 5: SINCRONIZACIÓN EN SEGUNDO PLANO
self.addEventListener('sync', (event) => {
    if (event.tag === 'valtara-sync-expediente') {
        event.waitUntil(Promise.resolve(true));
    }
});

// FASE 6: NOTIFICACIONES PUSH
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
