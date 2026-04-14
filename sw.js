/**
 * ====================================================================================
 * VALTARA EXECUTIVE THERAPY - SERVICE WORKER SOBERANO V38.1
 * Motor de Soberanía Digital: Estrategia "Stale-While-Revalidate"
 * Carga a 0ms, caché dinámico total y actualizaciones fantasma en segundo plano.
 * ====================================================================================
 */

const CACHE_NAME = 'valtara-sovereign-v38.1'; 
const CORE_ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './css/components.css',
  './logo.png',
  './js/constructor_maestro.js',
  './js/core.js',
  './js/router.js',
  './js/user.js',
  './js/aura.js'
];

// 1. INSTALACIÓN (Fase de Blindaje Inicial)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('🛡️ Bóveda Valtara V38.1 sellada. Iniciando pre-carga de núcleo.');
      return cache.addAll(CORE_ASSETS);
    })
  );
  // Fuerza al Service Worker a activarse inmediatamente, sin esperar a que el usuario cierre la pestaña
  self.skipWaiting(); 
});

// 2. ACTIVACIÓN (Destrucción de versiones antiguas para liberar memoria)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`🧹 Purgando bóveda antigua: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Toma el control de todas las pestañas abiertas inmediatamente
  self.clients.claim(); 
});

// 3. INTERCEPTOR OMNISCIENTE (Stale-While-Revalidate + Dynamic Caching)
self.addEventListener('fetch', (event) => {
    // Ignoramos peticiones que no sean GET (ej. envíos de formularios o consultas de Aura AI a Vercel)
    if (event.request.method !== 'GET') return;
    // Ignoramos extensiones de Chrome para evitar errores de consola
    if (event.request.url.startsWith('chrome-extension')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            
            // LA ACTUALIZACIÓN FANTASMA EN SEGUNDO PLANO
            // Siempre intentamos ir a la red a buscar la versión más fresca
            const networkFetch = fetch(event.request).then((networkResponse) => {
                // Verificamos que la respuesta sea válida antes de guardarla
                if(networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    // Clonamos la respuesta porque una respuesta es un "stream" que solo puede leerse una vez
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache); // Guardamos la versión nueva
                    });
                }
                return networkResponse;
            }).catch((err) => {
                // Modo "Bunker": Si no hay internet, fallamos silenciosamente, el caché salvará al usuario
                console.log("Modo Offline activado para: ", event.request.url);
            });

            // EL TRUCO DE MAGIA (Carga a 0ms):
            // Si tenemos el archivo en la memoria del celular, lo entregamos INSTANTÁNEAMENTE.
            // Si no lo tenemos, entonces esperamos a que la petición de red (networkFetch) termine.
            return cachedResponse || networkFetch;
        })
    );
});

// 4. ESCUCHADOR DE NOTIFICACIONES PUSH NATIVAS
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); 
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Si el paciente ya tiene la app/página abierta, solo la enfocamos
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes('valtara') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Si la app está cerrada, la abrimos en la URL especificada por la notificación
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
