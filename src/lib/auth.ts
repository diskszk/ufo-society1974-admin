import { ERROR_MESSAGE } from "../constants";
import { auth } from "../firebase";

export async function resetPassword(email: string): Promise<void> {
  try {
    return await auth.sendPasswordResetEmail(email);
  } catch {
    throw new Error(ERROR_MESSAGE.serverError);
  }
}

export async function createUserInFirebase(
  email: string,
  password: string
): Promise<firebase.User> {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    if (!user) {
      throw new Error(
        "ユーザーの作成に失敗しました。\n通信環境をご確認お上再度お試しください。"
      );
    }
    return user;
  } catch {
    throw new Error(ERROR_MESSAGE.serverError);
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<firebase.User | null> {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);

    if (!user) {
      throw new Error(ERROR_MESSAGE.notFound("ユーザー"));
    }

    return user;
  } catch {
    throw new Error(ERROR_MESSAGE.serverError);
  }
}

export async function signOut(): Promise<void> {
  try {
    return await auth.signOut();
  } catch {
    throw new Error(ERROR_MESSAGE.serverError);
  }
}
