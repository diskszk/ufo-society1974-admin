"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var connected_react_router_1 = require("connected-react-router");
// import reducers
var UsersReducer_1 = require("./UsersReducer");
var ImgaeReducer_1 = require("./ImgaeReducer");
var AlbumReducer_1 = require("./AlbumReducer");
exports.createStore = function (history) {
    return redux_1.createStore(redux_1.combineReducers({
        router: connected_react_router_1.connectRouter(history),
        user: UsersReducer_1.UsersReducer,
        image: ImgaeReducer_1.ImagesReducer,
        album: AlbumReducer_1.AlbumReducer
    }), redux_1.applyMiddleware(connected_react_router_1.routerMiddleware(history), redux_thunk_1["default"]));
};
