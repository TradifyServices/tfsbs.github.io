self.addEventListener('push', function(event) {
    event.waitUntil(
      self.registration.showNotification('Got Push?', {
        body: 'Push Message received'
     }));
  });
/** An empty service worker! */
self.addEventListener('fetch', function(event) {
  /** An empty fetch handler! */
  if (event.request.url == 'http://localhost/tfsbs.github.io/') {
    console.info('responding to dragon-server fetch with Service Worker! 🤓');
    event.respondWith(fetch(event.request).catch(function(e) {
      let out = {Gold: 1, Size: -1, Actions: []};
      return new Response(JSON.stringify(out));
    }));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('the-magic-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/inner-page.html',
          '/portfolio.html',
          '/manifest.json',
          /*'/background.jpeg',
          '/construction.gif',
          '/dragon.png',
          '/logo.png',
          '/site.js',
          '/dragon.js',
          '/styles.css',*/
        ]);
      })
    );
  });