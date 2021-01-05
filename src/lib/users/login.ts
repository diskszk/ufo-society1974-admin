import { auth, db } from '../../firebase';
import { User } from '../types';

// エラーハンドリングがうまくいかない。catch節のerrorが投げられる。
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);

    if (!result.user) {
      throw new Error('ユーザーが見つかりませんでした。');
    }

    const uid = result.user.uid;

    const snapshot = await db.collection('users').doc(uid).get();

    if (!snapshot.exists) {
      throw new Error('ユーザーが見つかりませんでした。');
    }
    const data = snapshot.data();

    if (!data) {
      throw new Error('ユーザーが見つかりませんでした。');
    } else if (data.isDelete) {
      throw new Error('削除されたユーザーです。');
    }

    return {
      isSignedIn: true,
      uid: uid,
      username: data.username,
      role: data.role,
    };
  } catch (e) {
    throw new Error(
      'ユーザーが見つかりませんでした。\n未登録か削除済みの可能性があります。'
    );
  }
};
