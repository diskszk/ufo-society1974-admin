import { auth, db, FirebaseTimestamp } from '../../firebase';
import { User } from '../types';

export const createAccount = async (
  username: string,
  email: string,
  password: string,
  role: string
): Promise<void | {}> => {
  const result = await auth.createUserWithEmailAndPassword(email, password);
  const user = result.user;

  if (!user) {
    return {};
  }
  const uid = user.uid;
  const timestamp = FirebaseTimestamp.now();

  const userInitialData: User = {
    createdAt: timestamp,
    email: email,
    role: role,
    uid: uid,
    updatedAt: timestamp,
    username: username,
    isDeleted: false,
    isSignedIn: false,
  };

  db.collection('users').doc(uid).set(userInitialData);
};
