const cacheV1 = 'v1';

// Install
self.addEventListener('install', event => {
    event.waitUntil(
      caches
        .open('cacheV1')
        .then(cache => {
          // console.log(`SW installed: ${cached}`);
          return cache.addAll([
            '/',
            '/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/index.html',
            '/restaurant.html',
            '/styles/css/main.css',
            '/styles/css/restaurant.css',
            '/js/sw/js',
            '/data/restaurants.json',
            '/img/*.jpg',
            // '/img/2.jpg',
            // '/img/3.jpg',
            // '/img/4.jpg',
            // '/img/5.jpg',
            // '/img/6.jpg',
            // '/img/7.jpg',
            // '/img/8.jpg',
            // '/img/9.jpg',
            // '/img/10.jpg'
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
          ])
})
        .catch(error => {
          console.log(error);
        })
    )
  }
);

// Activate
self.addEventListener('activate', event => {
  console.log('Activating');
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
      if (response !== undefined) {
        console.log('Already cached');
        console.log(event.request);
        return response
      } else {
        console.log('No caching yet, time to cache');
        console.log(event.request);
        return fetch(event.request)
          .then(response => {
            let responseClone = response.clone();
          caches
            .open('cacheV1')
            .then(cache => {
            cache.put(event.request, responseClone);
          });
            return response;
        })
          .catch(error => {
            console.log('/trap.gif');
          })
      }
    })
  )
});
