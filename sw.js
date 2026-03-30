const CACHE_NAME = 'valtara-sovereign-v25-4'; // Subimos la versión para forzar la limpieza
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/main.css',
  './css/components.css'
];

// 1. INSTALACIÓN
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Bóveda de caché Valtara V25.4 sellada y lista.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. INTERCEPTOR
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// 3. LIMPIEZA (Destruye la caché vieja)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Destruyendo caché antigua de Valtara...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 4. ESCUCHADOR DE NOTIFICACIONES PUSH NATIVAS
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
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
