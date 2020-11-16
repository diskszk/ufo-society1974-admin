"use strict";
exports.__esModule = true;
exports.generateRandomStrings = function () {
    var S = 'abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var N = 16;
    return Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map(function (n) { return S[n % S.length]; })
        .join('');
};
