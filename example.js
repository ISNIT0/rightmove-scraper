const outcodeApi = require('./index.js');

outcodeApi
    .byOutcode('SW10')
    .then(data => console.log(data));