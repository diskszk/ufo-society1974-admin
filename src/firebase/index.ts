import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const FirebaseTimestamp = firebase.firestore.Timestamp;

// constans
export const userRef = db.collection('users');
// export const publishedSongRef = db.collection("published").ref("songs").collection("");
// export const unPublishedSongRef = db.collection("users");
export const imagesRef = storage.ref('images');
