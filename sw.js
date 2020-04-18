'use strict';
self.importScripts('./js/fetchGQL.js');
self.importScripts('./js/idb.js');
const cacheName = 'Emtutor-pwa';
const filesToCache = [
  './',
  './index.html',
  './favicon.ico',
  './css/style.css',
  './js/main.js',
  './js/idb.js',
  "./images/landing_background.png",
  "./fonts/",
  "./webfonts/"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
      (async () => {
          try {
              const cache = await caches.open(cacheName);
              cache.addAll(fileCache);
          } catch (error) {
              console.log(error);
          }
      })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
      (async () => {
          try {
              const response = await caches.match(event.request);
              return response || fetch(event.request);
          } catch (error) {
              console.log(error);
          }
      })()
  );
});