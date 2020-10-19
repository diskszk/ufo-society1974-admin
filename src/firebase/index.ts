import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/fireStore';
import 'firebase/functions';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
