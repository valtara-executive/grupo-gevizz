const CACHE_NAME = 'valtara-sovereign-v20';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/components.css'
];

// 1. INSTALACIÓN (El Guardia guarda los archivos base en la bóveda)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Bóveda de caché Valtara V20 sellada y lista.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. INTERCEPTOR (Estrategia: Busca primero en el celular, luego en internet)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// 3. LIMPIEZA (Destruye cachés viejas para obligar a actualizar)
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
