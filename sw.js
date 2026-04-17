/**
 * ====================================================================================
 * VALTARA EXECUTIVE THERAPY - SERVICE WORKER SOBERANO V39.0 (PRO EDITION)
 * Arquitectura: Multi-Bóveda, Network-First Híbrido y Bypass de Streaming.
 * Este archivo controla el 100% de las peticiones de red del dispositivo del usuario.
 * ====================================================================================
 */

const VERSION = '39.0';
const CORE_CACHE = `valtara-core-v${VERSION}`;
const IMAGE_CACHE = `valtara-images-v${VERSION}`;
const MAX_IMAGES = 60; // Límite para no saturar el almacenamiento del dispositivo
const DEBUG_MODE = false; // Cambiar a true para ver la Matrix en la consola

// 1. ACTIVOS CRÍTICOS (Pre-carga Inmediata)
// Se han actualizado con las variables de Cache Busting (v=39.0.0)
const CORE_ASSETS = [
  './',
  './index.html',
  './css/main.css?v=39.0.0',
  './css/components.css?v=39.0.0',
  './logo.png',
  './js/constructor_maestro.js?v=39.0.0',
  './js/core.js?v=39.0.0',
  './js/router.js?v=39.0.0',
  './js/user.js?v=39.0.0',
  './js/aura.js?v=39.0.0'
];

/**
 * ------------------------------------------------------------------------------------
 * UTILERÍA: LOGGER CORPORATIVO
 * ------------------------------------------------------------------------------------
 */
const log = (msg, type = 'info') => {
    if (!DEBUG_MODE) return;
    const colors = {
        info: 'color: #00e676',
        warn: 'color: #ffca28',
        err: 'color: #ff5252',
        cache: 'color: #00b0ff'
    };
    console.log(`%c[SW Valtara V${VERSION}] ${msg}`, colors[type]);
};

/**
 * ------------------------------------------------------------------------------------
 * UTILERÍA: RECOLECTOR DE BASURA (GARBAGE COLLECTOR)
 * Evita que la caché de imágenes crezca infinitamente.
 * ------------------------------------------------------------------------------------
 */
const trimCache = async (cacheName, maxItems) => {
    try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        if (keys.length > maxItems) {
            log(`Bóveda ${cacheName} llena (${keys.length}). Purgando archivo más antiguo...`, 'warn');
            await cache.delete(keys[0]);
            trimCache(cacheName, maxItems); // Llamada recursiva hasta estar bajo el límite
        }
    } catch (e) {
        log(`Error en Garbage Collector: ${e}`, 'err');
    }
};

/**
 * ------------------------------------------------------------------------------------
 * FASE 1: INSTALACIÓN (Creación de Bóvedas)
 * ------------------------------------------------------------------------------------
 */
self.addEventListener('install', (event) => {
    log('Fase de Instalación Iniciada. Sellando bóvedas...', 'info');
    event.waitUntil(
        caches.open(CORE_CACHE).then((cache) => {
            log('Pre-cargando activos críticos...', 'cache');
            return cache.addAll(CORE_ASSETS);
        })
    );
    self.skipWaiting(); // Forzar activación inmediata
});

/**
 * ------------------------------------------------------------------------------------
 * FASE 2: ACTIVACIÓN (Aniquilación de versiones anteriores)
 * ------------------------------------------------------------------------------------
 */
self.addEventListener('activate', (event) => {
    log('Fase de Activación. Desplegando tropas de limpieza...', 'info');
    const validCaches = [CORE_CACHE, IMAGE_CACHE];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!validCaches.includes(cacheName)) {
                        log(`Destruyendo bóveda obsoleta: ${cacheName}`, 'err');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Tomar control de todas las pestañas abiertas
});

/**
 * ------------------------------------------------------------------------------------
 * FASE 3: INTERCEPTOR OMNISCIENTE DE RED (FETCH)
 * El cerebro que decide de dónde sale la información según su tipo.
 * ------------------------------------------------------------------------------------
 */
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Ignorar peticiones no-GET y extensiones de navegador
    if (req.method !== 'GET') return;
    if (url.protocol.startsWith('chrome-extension')) return;

    // Ignorar APIs externas, YouTube y Google Fonts (dejar que el navegador decida)
    if (url.hostname !== location.hostname) {
        // Excepción: Solo cacheadas las tipografías si lo deseas, por ahora bypass
        return;
    }

    // A) BYPASS DE AUDIO (Sonoterapia) - Evita el error 206 de rango parcial
    if (req.url.match(/\.(mp3|wav|ogg)$/)) {
        log(`Streaming de Audio Detectado. Bypass a red directa: ${url.pathname}`, 'warn');
        return; // El navegador maneja el streaming nativo
    }

    // B) ESTRATEGIA NETWORK-FIRST (Para HTML principal y Navegación)
    // Garantiza que siempre veas la última versión de la estructura si tienes internet.
    if (req.mode === 'navigate' || req.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(req).then((networkResponse) => {
                const responseToCache = networkResponse.clone();
                caches.open(CORE_CACHE).then((cache) => cache.put(req, responseToCache));
                return networkResponse;
            }).catch(() => {
                log('Sin red. Entregando HTML de la bóveda (Modo Bunker)', 'warn');
                return caches.match(req).then(cached => cached || caches.match('./index.html'));
            })
        );
        return;
    }

    // C) ESTRATEGIA CACHE-FIRST CON ACTUALIZACIÓN EN SEGUNDO PLANO (Para Imágenes)
    if (req.destination === 'image' || req.url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) {
        event.respondWith(
            caches.match(req).then((cachedResponse) => {
                const fetchPromise = fetch(req).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(IMAGE_CACHE).then((cache) => {
                            cache.put(req, responseToCache);
                            trimCache(IMAGE_CACHE, MAX_IMAGES); // Ejecuta limpieza
                        });
                    }
                    return networkResponse;
                }).catch((err) => {
                    log(`Fallo de red al buscar imagen: ${url.pathname}`, 'err');
                    // Fallback Offline Dinámico: Un SVG generado en código para que no se vea feo
                    if (!cachedResponse) {
                        return new Response(
                            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#0a0a0a"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Valtara: Imagen Offline</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    }
                });
                
                log(cachedResponse ? `Imagen servida desde bóveda a 0ms: ${url.pathname}` : `Buscando imagen en red: ${url.pathname}`, 'cache');
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // D) ESTRATEGIA STALE-WHILE-REVALIDATE (Para Scripts y CSS)
    event.respondWith(
        caches.match(req).then((cachedResponse) => {
            const networkFetch = fetch(req).then((networkResponse) => {
                if(networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CORE_CACHE).then((cache) => cache.put(req, responseToCache));
                }
                return networkResponse;
            }).catch(() => log(`Servido CSS/JS offline: ${url.pathname}`, 'warn'));

            return cachedResponse || networkFetch;
        })
    );
});

/**
 * ------------------------------------------------------------------------------------
 * FASE 4: COMUNICACIÓN BIDIRECCIONAL (Message API)
 * Permite que el index.html le dé órdenes directas al Service Worker.
 * ------------------------------------------------------------------------------------
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FORCE_UPDATE') {
        log('Orden de actualización forzosa recibida desde la interfaz.', 'err');
        self.skipWaiting();
    }
});

/**
 * ------------------------------------------------------------------------------------
 * FASE 5: SINCRONIZACIÓN EN SEGUNDO PLANO (Preparación para Formularios Offline)
 * ------------------------------------------------------------------------------------
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'valtara-sync-expediente') {
        log('Recuperación de señal. Iniciando sincronización de expediente en segundo plano...', 'info');
        // Aquí iría la lógica para enviar a la base de datos si existiera un backend.
        event.waitUntil(Promise.resolve(true));
    }
});

/**
 * ------------------------------------------------------------------------------------
 * FASE 6: NOTIFICACIONES PUSH NATIVAS (Interacción)
 * ------------------------------------------------------------------------------------
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); 
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes('valtara') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url || '/');
            }
        })
    );
});
