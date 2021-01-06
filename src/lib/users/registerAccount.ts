import { db } from '../../firebase';
import { User } from '../types';

export const registerAccount = async (newAccount: User): Promise<void> => {
  const uid = newAccount.uid;

  db.collection('users').doc(uid).set(newAccount);
};
