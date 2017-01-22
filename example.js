const rightmoveApi = require('rightmove-scraper');

rightmoveApi
    .byOutcode('SW10')
    .then(data => console.log(data));

rightmoveApi
    .propertyDetail(63605453)
    .then(data => console.log(data));