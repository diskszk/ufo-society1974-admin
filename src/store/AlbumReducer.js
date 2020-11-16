"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var initialState_1 = require("./initialState");
var UPDATE_ALBUM = 'UPDATE_ALBUM';
var CLEAR_ALBUM = 'CLEAR_ALBUM';
var albumInitialState = initialState_1.initialState.album;
exports.updateAlbumAction = function (state) {
    return {
        type: UPDATE_ALBUM,
        payload: __assign({}, state)
    };
};
exports.clearAlbumAction = function () {
    return {
        type: CLEAR_ALBUM
    };
};
exports.AlbumReducer = function (state, action) {
    if (state === void 0) { state = albumInitialState; }
    switch (action.type) {
        case UPDATE_ALBUM:
            return __assign(__assign({}, state), action.payload);
        case CLEAR_ALBUM:
            return __assign({}, state);
        default:
            return state;
    }
};
