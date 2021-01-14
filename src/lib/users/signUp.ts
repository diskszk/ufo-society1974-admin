import { auth, db, FirebaseTimestamp } from '../../firebase';

export const signUp = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const result = await auth.createUserWithEmailAndPassword(email, password);
  const user = result.user;

  if (!user) {
    throw new Error('ユーザーが存在しません。');
  }
  const uid = user.uid;
  const timestamp = FirebaseTimestamp.now();

  const userInitialData = {
    created_at: timestamp,
    email: email,
    role: role,
    uid: uid,
    updated_at: timestamp,
    username: username,
    isDelete: false,
  };

  db.collection('users').doc(uid).set(userInitialData);
};
