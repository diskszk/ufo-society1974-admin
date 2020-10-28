import { db } from '../../firebase';

export const deleteUser = async (id: string, role: string) => {
  const userRef = db.collection('users').doc(id);

  // role: masterは消せない
  if (role == 'master') {
    alert('このユーザーは削除できません。');
    return false;
  } else {
    const data = {
      isDelete: true
    }
    return userRef.set(data, { merge: true })
      .then(() => {
        alert('ユーザーが削除されました。')
      })
      .catch(() => {
        throw new Error;
      })
  }
}

