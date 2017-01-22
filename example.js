const rightmoveApi = require('./index.js')([{ code: 1081, outcode: 'HP13' }]);

rightmoveApi
    .byOutcode('SW10')
    .then(data => console.log(data));

rightmoveApi
    .propertyDetail(63605453)
    .then(data => console.log(data));