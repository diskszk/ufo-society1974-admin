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
var constans_1 = require("../constans");
var UPDATE_IMAGE = 'UPDATE_IMAGE', DELETE_IMAGE = 'DELETE_IMAGE';
var imageInitialState = initialState_1.initialState.image;
// action
exports.updateImageAction = function (imageState) {
    return {
        type: UPDATE_IMAGE,
        payload: {
            filename: imageState.filename,
            path: imageState.path
        }
    };
};
exports.deleteImageAction = function () {
    return {
        type: DELETE_IMAGE,
        payload: {
            filename: '',
            path: constans_1.NO_IMAGE
        }
    };
};
// reducer
exports.ImagesReducer = function (state, action) {
    if (state === void 0) { state = imageInitialState; }
    switch (action.type) {
        case UPDATE_IMAGE:
            return __assign(__assign({}, state), action.payload);
        case DELETE_IMAGE:
            return __assign({}, action.payload);
        default:
            return state;
    }
};
