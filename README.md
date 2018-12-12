# Rightmove Scraper
![Safe NPM](https://safenpm.herokuapp.com/status/rightmove-scraper.png)

## Usage:
```bash
npm i --save rightmove-scraper
```
```javascript
const outcodeData = require('./outcodeData.json'); //See https://github.com/ISNIT0/rightmove-outcode-scraper
const rightmoveApi = require('rightmove-scraper')(outcodeData);

rightmoveApi
    .byOutcode('SW10')
    .then(data => console.log(data));

rightmoveApi
    .propertyDetail(63605453)
    .then(data => console.log(data));
```

## Requirements:
You will need outcodeData.json from https://github.com/ISNIT0/rightmove-outcode-scraper.

## Motivation:
