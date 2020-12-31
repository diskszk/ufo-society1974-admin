import { userRef } from '../../firebase';

export const deleteUser = async (id: string): Promise<void> => {
  const deleteRef = userRef.doc(id);
  const data = {
    isDelete: true,
  };
  return deleteRef.set(data, { merge: true }).catch(() => {
    throw new Error(
      'ユーザーの削除に失敗しました。\n通信環境をご確認の上再度お試しください。'
    );
  });
};
