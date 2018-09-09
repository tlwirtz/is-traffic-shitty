let cacheVersion = Math.floor(Math.random() * 10000)
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion).then(cache => {
      return cache.addAll(['index.html', '/static/js/bundle.js']);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('fetching', event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(resp => {
        return (
          resp ||
          fetch(event.request).then(response => {
            let respClone = response.clone();
            caches.open(cacheVersion).then(cache => cache.put(event.request, respClone));
            return response;
          })
        );
      })
      .catch(() => {
        console.log('Could not cache');
        return caches.match('index.html');
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [cacheVersion];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});