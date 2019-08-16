const cached = [
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
  'img/4.jpg',
  'img/6.jpg',
  'img/3.jpg',
  'img/5.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service Worker Registered');
    })
    .catch(function() {
      console.log('Service Worker Failed');
    })
}

self.addEventListener('install', ((event) => {
  event.waitUntil(
    caches.open('v1')
      .then((cache) => {
        return cache.addAll(cached);
      })
      .catch((error) => {
        console.log(error);
      })
  )
}));
