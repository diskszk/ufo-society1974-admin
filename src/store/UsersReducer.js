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
var SIGN_IN = 'SIGN_IN', LOG_OUT = 'LOG_OUT';
var userInitialState = initialState_1.initialState.user;
// action
exports.signinAction = function (userState) {
    return {
        type: SIGN_IN,
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username,
            role: userState.role
        }
    };
};
exports.logOutAction = function () {
    return {
        type: LOG_OUT,
        payload: {
            isSignedIn: false,
            uid: '',
            username: '',
            role: ''
        }
    };
};
// reducer
exports.UsersReducer = function (state, action) {
    if (state === void 0) { state = userInitialState; }
    switch (action.type) {
        case SIGN_IN:
            return __assign(__assign({}, state), action.payload);
        case LOG_OUT:
            return __assign({}, action.payload);
        default:
            return state;
    }
};
