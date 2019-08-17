const cacheV1 = 'v1';

// Install
self.addEventListener('install', event => {
    event.waitUntil(
      caches
        .open('cacheV1')
        .then(cache =>
          // console.log(`SW installed: ${cached}`);
          cache.addAll([
            '/',
            'index.html',
            'restaurant.html',
            'styles/css/main.css',
            'styles/css/restaurant.css',
            'js/dbhelper.js',
            'js/main.js',
            'js/restaurant_info.js',
            'js/sw/js',
            'data/restaurants.json',
            'img/1.jpg',
            'img/2.jpg',
            'img/3.jpg',
            'img/4.jpg',
            'img/5.jpg',
            'img/6.jpg',
            'img/7.jpg',
            'img/8.jpg',
            'img/9.jpg',
            'img/10.jpg'
          ])
        )
        .catch(error => {
          console.log(error);
        })
    )
  }
);

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
      if (response) {
        console.log('Already cached');
        console.log(event.request);
        return response
      } else {
        console.log('No caching yet, time to cache');
        console.log(event.request);
        return fetch(event.request)
          .then(response => {
          caches
            .open('cacheV1')
            .then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
          .catch(error => {
            console.log(error);
          });
      }
    })
  )
});
