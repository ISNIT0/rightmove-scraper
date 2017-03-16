const fs = require('fs');
const request = require('request-promise-native');

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

module.exports = function (outcodeData) {
    outcodeData = outcodeData.reduce((acc, val) => {
        acc[val.outcode] = val.code;
        return acc;
    }, {});
    return {
        byOutcode: makeReq(function (outcode) {
            if (typeof outcode !== 'string') throw new Error(`byOutcode was expecting a string, but got ${outcode} (${typeof outcode})`);
            outcode = outcode.toUpperCase().trim();
            const locIdent = outcodeData[outcode];
            if (!locIdent) throw new Error(`byOutcode could not find the outcode specified (${outcode}), either the value is invalid, or your outcodeData.json file is out of date.`);
            return `http://api.rightmove.co.uk/api/sale/find?index=0&sortType=2&numberOfPropertiesRequested=1000&locationIdentifier=OUTCODE%5E${locIdent}&apiApplication=IPAD`;
        }),
        propertyDetail: makeReq(function (propertyId) {
            if (!propertyId) throw new Error(`expecting propertyId, but got ${propertyId}`);
            return `http://api.rightmove.co.uk/api/propertyDetails?propertyId=${propertyId}&apiApplication=IPAD`;
        })
    };
};
