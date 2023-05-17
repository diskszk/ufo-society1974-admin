import { db } from "../../firebase";

export const deleteUser = async (id: string): Promise<void> => {
  const userRef = db.collection("users").doc(id);

  const snapshot = await userRef.get();
  const data = snapshot.data();

  if (!data) {
    throw new Error("ユーザーが存在しません。");
  }
  userRef.delete();
};
