"use strict";
exports.__esModule = true;
var constans_1 = require("../constans");
exports.initialState = {
    user: {
        isSignedIn: false,
        uid: '',
        username: '',
        role: ''
    },
    image: {
        filename: '',
        path: constans_1.NO_IMAGE
    },
    album: {
        discription: '',
        imageFile: {
            filename: '',
            path: constans_1.NO_IMAGE
        },
        id: '',
        publish_date: '',
        // songs?:
        title: ''
    }
};
