import { auth, FirebaseTimestamp } from '../../firebase';
import { User } from '../types';

export const createAccount = async (
  username: string,
  email: string,
  password: string,
  role: string
): Promise<User | null> => {
  const result = await auth.createUserWithEmailAndPassword(email, password);
  const user = result.user;

  if (!user) {
    return null;
  }
  const uid = user.uid;
  const timestamp = FirebaseTimestamp.now();

  const newAccount: User = {
    createdAt: timestamp,
    email: email,
    role: role,
    uid: uid,
    updatedAt: timestamp,
    username: username,
    isDeleted: false,
    isSignedIn: false,
  };

  return newAccount;
};
