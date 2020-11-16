"use strict";
exports.__esModule = true;
// variables
exports.ROUTER_PATHS = {
    LOGIN: '/login',
    RESET: '/reset',
    HOME: '(/)?',
    USERS: '/users',
    SIGN_UP: '/signup',
    ALBUMS: '/albums',
    ALBUM_DETAILS: '/albums/(:id)?',
    ALBUM_EDIT: '/albums/edit/(:id)?',
    SONGS: '/songs',
    SONG_EDIT: '/songs/edit(/:id)?'
};
exports.ROLE = {
    MASTER: 'master',
    EDITOR: 'editor',
    WATCHER: 'watcher'
};
var no_image_jpg_1 = require("./assets/images/no_image.jpg");
exports.NO_IMAGE = no_image_jpg_1["default"];
exports.UFO_SOCIETY_OFFISIAL = 'https://ufo-society-1974.web.app/';
