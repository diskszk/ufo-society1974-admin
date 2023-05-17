import { auth, db } from "../../firebase";

export const resetPassword = async (email: string): Promise<void> => {
  const res = await db.collection("users").where("email", "==", email).get();

  if (res.empty) {
    throw new Error("入力されたメールアドレスが登録されていません。");
  }

  await auth.sendPasswordResetEmail(email).catch(() => {
    throw new Error(
      `パスワードリセットに失敗しました。\n通信環境をご確認の上再度お試しください。`
    );
  });
};
