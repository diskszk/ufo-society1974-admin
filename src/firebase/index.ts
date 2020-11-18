import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const fieldValue = firebase.firestore.FieldValue;

export const FirebaseTimestamp = firebase.firestore.Timestamp;

// constans
export const userRef = db.collection('users');
export const imagesRef = storage.ref('images');
