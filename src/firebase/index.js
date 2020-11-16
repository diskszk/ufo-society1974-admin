"use strict";
exports.__esModule = true;
var app_1 = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
var config_1 = require("./config");
app_1["default"].initializeApp(config_1.firebaseConfig);
exports.auth = app_1["default"].auth();
exports.db = app_1["default"].firestore();
exports.storage = app_1["default"].storage();
exports.FirebaseTimestamp = app_1["default"].firestore.Timestamp;
// constans
exports.userRef = exports.db.collection('users');
// export const publishedSongRef = db.collection("published").ref("songs").collection("");
// export const unPublishedSongRef = db.collection("users");
exports.imagesRef = exports.storage.ref('images');
