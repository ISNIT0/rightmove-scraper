const fs = require('fs');
const request = require('request-promise-native');
let outcodeData;

const loadOutcodeData = () => {
    try {
        if (!outcodeData) {
            outcodeData = require('./outcodeData.json')
                .reduce((acc, val) => {
                    acc[val.outcode] = val.code;
                    return acc;
                }, {});
        }
    } catch (e) {
        console.error(e);
        throw new Error(`\n\nThe file outcodeData.json is required. \nPlease see the following for information on how to get this:\n\nhttps://github.com/ISNIT0/rightmove-outcode-scraper/blob/master/README.md\n\n`);
    }
}

const makeReq = function makeReq(reqGenerator) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            let req;
            try {
                req = reqGenerator(...args);
            } catch (e) {
                reject(e);
            }

            request(req)
                .then(function (res) {
                    try {
                        resolve(JSON.parse(res))
                    } catch (e) {
                        reject(e);
                    }
                })
                .catch(reject);
        });
    };
}

module.exports = {
    byOutcode: makeReq(function (outcode) {
        loadOutcodeData();
        if (typeof outcode !== 'string') throw new Error(`byOutcode was expecting a string, but got ${outcode} (${typeof outcode})`);
        outcode = outcode.toUpperCase().trim();
        const locIdent = outcodeData[outcode];
        if (!locIdent) throw new Error(`byOutcode could not find the outcode specified (${outcode}), either the value is invalid, or your outcodeData.json file is out of date.`);
        return `http://api.rightmove.co.uk/api/sale/find?index=0&sortType=2&numberOfPropertiesRequested=9999&locationIdentifier=OUTCODE%5E${locIdent}&apiApplication=IPAD`;
    }),
    propertyDetail: makeReq(function (propertyId) {
        if(!propertyId) throw new Error(`expecting propertyId, but got ${propertyId}`);
        return `http://api.rightmove.co.uk/api/propertyDetails?propertyId=${propertyId}&apiApplication=IPAD`;
    })
};