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
/* Serve cached content when offline */
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

self.addEventListener('sync', (event)=>{
    if(event.tag == 'send-message') {
        event.waitUntil(sendToServer());
    }

})

const sendToServer = async () => {
    try {
        const outbox = await loadData("outbox");
        console.log(outbox);
        const sentMessage = await Promise.all(
            outbox.map(async (message) => await saveGreeting(message))
        );
        console.log(sentMessage);
        clearData("outbox");
    } catch (error) {
        console.log(error);
    }
};