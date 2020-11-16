"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var operation_1 = require("./lib/users/operation");
var Auth = function (_a) {
    var children = _a.children;
    var dispatch = react_redux_1.useDispatch();
    var isSignedIn = react_redux_1.useSelector(function (state) { return state.user; }).isSignedIn;
    react_1.useEffect(function () {
        if (!isSignedIn) {
            dispatch(operation_1.listenAuthState());
        }
    }, []);
    if (!isSignedIn) {
        return <h2 className="loading">Loading...</h2>;
    }
    else {
        return children;
    }
};
exports["default"] = Auth;
