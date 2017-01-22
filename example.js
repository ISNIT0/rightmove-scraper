const rightmoveApi = require('./index.js');

rightmoveApi
    .byOutcode('SW10')
    .then(data => console.log(data));

rightmoveApi
    .propertyDetail(63605453)
    .then(data => console.log(data));