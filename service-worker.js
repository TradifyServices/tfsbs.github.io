console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies} = workbox;

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.png')) {
    // Using the previously-initialized strategies will work as expected.
    const cacheFirst = new strategies.CacheFirst();
    event.respondWith(cacheFirst.handle({request: event.request}));
  }
});
workbox.setConfig({
    debug: <true>
  });