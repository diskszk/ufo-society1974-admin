"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var connected_react_router_1 = require("connected-react-router");
var UsersReducer_1 = require("../../store/UsersReducer");
var firebase_1 = require("../../firebase");
exports.listenAuthState = function () {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, firebase_1.auth.onAuthStateChanged(function (user) {
                    if (!user) {
                        console.log('not sign in !');
                        dispatch(connected_react_router_1.push('/login'));
                        return false;
                    }
                    else {
                        console.log('sign in !');
                        var uid_1 = user.uid;
                        firebase_1.userRef
                            .doc(uid_1)
                            .get()
                            .then(function (snapshot) {
                            var data = snapshot.data();
                            console.log(JSON.stringify(data));
                            if (!data)
                                return false;
                            dispatch(UsersReducer_1.signinAction({
                                isSignedIn: true,
                                uid: uid_1,
                                username: data.username,
                                role: data.role
                            }));
                        });
                    }
                })];
        });
    }); };
};
exports.resetPassword = function (email) {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // valldert
            if (email === '') {
                alert('必須項目が未入力です。');
                return [2 /*return*/, false];
            }
            firebase_1.db.collection('users')
                .where('email', '==', email)
                .get()
                .then(function (snapshot) {
                if (snapshot.empty) {
                    alert('入力されたメールアドレスが登録されていません。.');
                    return false;
                }
                else {
                    firebase_1.auth
                        .sendPasswordResetEmail(email)
                        .then(function () {
                        alert('入力されたアドレスにパスワードリセット用のメールを送信しました。');
                        dispatch(connected_react_router_1.push('/login'));
                    })["catch"](function (e) {
                        alert('パスワードリセットに失敗しました。');
                    });
                }
            });
            return [2 /*return*/];
        });
    }); };
};
exports.login = function (email, password) {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Validation
            if (email === '' || password === '') {
                alert('必須項目が未入力です。');
                return [2 /*return*/, false];
            }
            firebase_1.auth
                .signInWithEmailAndPassword(email, password)
                .then(function (result) {
                var user = result.user;
                if (!user) {
                    alert('ユーザーが見つかりませんでした。');
                    return false;
                }
                var uid = user.uid;
                firebase_1.db.collection('users')
                    .doc(uid)
                    .get()
                    .then(function (snapshot) {
                    if (!snapshot.exists) {
                        return false;
                    }
                    var data = snapshot.data();
                    if (!data)
                        return false;
                    if (data.isDelete) {
                        alert('削除されたユーザーです。');
                        return false;
                    }
                    else {
                        console.log(JSON.stringify(data));
                        dispatch(UsersReducer_1.signinAction({
                            isSignedIn: true,
                            uid: uid,
                            username: data.username,
                            role: data.role
                        }));
                        if (data.role === 'master') {
                            dispatch(connected_react_router_1.push('/signup'));
                        }
                        else {
                            dispatch(connected_react_router_1.push('/'));
                        }
                    }
                });
            })["catch"](function (e) {
                console.error("Error: " + e);
                alert('ユーザーが見つかりませんでした。');
            });
            return [2 /*return*/];
        });
    }); };
};
exports.signUp = function (username, email, password, confirmPassword, role) {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (username === '' ||
                email === '' ||
                password === '' ||
                confirmPassword === '' ||
                role === '') {
                alert('必須項目が未入力です。');
                return [2 /*return*/, false];
            }
            if (password !== confirmPassword) {
                alert('パスワードが一致していません。');
                return [2 /*return*/, false];
            }
            return [2 /*return*/, firebase_1.auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(function (result) {
                    var user = result.user;
                    if (!user) {
                        return false;
                    }
                    var uid = user.uid;
                    var timestamp = firebase_1.FirebaseTimestamp.now();
                    var userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: role,
                        uid: uid,
                        updated_at: timestamp,
                        username: username,
                        isDelete: false
                    };
                    firebase_1.db.collection('users')
                        .doc(uid)
                        .set(userInitialData)
                        .then(function () {
                        dispatch(connected_react_router_1.push('/'));
                    });
                })["catch"](function (e) {
                    alert("Error: " + e);
                    throw new Error(e);
                })];
        });
    }); };
};
exports.deleteUser = function (id) {
    var userRef = firebase_1.db.collection('users').doc(id);
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // role: masterは消せない
            userRef.get().then(function (snapshot) {
                var data = snapshot.data();
                if (!data)
                    return false;
                if (data.role === 'master') {
                    alert('このユーザーは削除できません。');
                    return false;
                }
                else {
                    var userData = {
                        isDelete: true
                    };
                    userRef
                        .set(userData, { merge: true })
                        .then(function () {
                        alert('ユーザーが削除されました。');
                    })["catch"](function (e) {
                        throw new Error(e);
                    });
                }
            });
            return [2 /*return*/];
        });
    }); };
};
exports.logOut = function () {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            firebase_1.auth.signOut().then(function () {
                dispatch(UsersReducer_1.logOutAction());
                alert('ログアウトしました。');
                dispatch(connected_react_router_1.push('/login'));
            });
            return [2 /*return*/];
        });
    }); };
};
