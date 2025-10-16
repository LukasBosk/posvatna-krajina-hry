const CACHE_NAME = 'muzeum-boskovicka-cache-v4';

// Seznam souborů, které se mají při instalaci Service Workeru uložit do cache
// DŮLEŽITÉ: Ujistěte se, že zde jsou uvedeny VŠECHNY soubory, které aplikace potřebuje k offline provozu,
// včetně 3D modelů, obrázků a všech JS knihoven!
const urlsToCache = [
  '/', // Cesta k index.html
  'index.html',
  'quiz.html',  
  'puzzle.html',
  'script-puzzle.js',
  'script-quiz.js',
  'style-puzzle.css',
  'style-quiz.css',
  'manifest.json',
  'service-worker.js',
  'logo.png',
  'pozadi.jpg',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  'icons/maskable_icon.png',
  'images/puzzle1.jpg',
  'images/puzzle2.jpg',
  'images/puzzle3.jpg',
  'images/puzzle4.jpg',
  'images/puzzle5.jpg',
  'images/puzzle6.jpg',
  'images/puzzle7.jpg',
  'images/puzzle8.jpg',
  'images/puzzle9.jpg',
  'images/puzzle10.jpg',
  'images/puzzle11.jpg',
  'images/puzzle12.jpg',
  'images/puzzle13.jpg',
  'images/puzzle14.jpg',
  'images/puzzle15.jpg',
  'images/puzzle16.jpg',
  'images/puzzle17.jpg',
  'images/puzzle18.jpg',
  'images/puzzle19.jpg',
  'images/puzzle20.jpg',
  'images/puzzle21.jpg',
  'images/Borotin4R.jpg',
  'images/Borotin4R2.jpg',
  'images/Michov10R.jpg',
  'images/Michov10R2.jpg',
  'images/Vanovice4R.jpg',
  'images/Vanovice4R2.jpg',
  'images/Vanovice6R.jpg',
  'images/Vanovice6R2.jpg',
  'images/VelkeOpatovice1R.jpg',
  'images/VelkeOpatovice1R2.jpg',
  'logo.png', // Logo pro úvodní stránku
  'pozadi.jpg', // Pozadí pro obě stránky
];

// Instalace Service Workeru: Cache statické soubory
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivace Service Workeru: Vyčištění starých cachí
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Zajištění, že Service Worker převezme kontrolu nad klienty okamžitě
  return self.clients.claim();
});

// Fetch událost: Obsluha síťových požadavků
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Pokud je položka v cache, vrátíme ji
        if (response) {
          return response;
        }
        // Jinak provedeme síťový požadavek
        return fetch(event.request).then((networkResponse) => {
          // Zkontrolujeme, zda jsme obdrželi platnou odpověď
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          // Naklonujeme odpověď, protože ji lze použít pouze jednou
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return networkResponse;
        });
      })
      .catch(() => {
        // Zde můžete vrátit fallback stránku pro offline režim, pokud request selže
        // Např. return caches.match('/offline.html');
        console.log('Fetch request failed. No response in cache and no network.');
      })
  );
});
















































