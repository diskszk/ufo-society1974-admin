import { auth } from "../firebase";

export async function resetPassword(email: string): Promise<void> {
  return await auth.sendPasswordResetEmail(email);
}

export async function createAccountInFirebaseAuth(
  email: string,
  password: string
): Promise<firebase.User> {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);

  if (!user) {
    throw new Error("ユーザーの作成に失敗しました。");
  }
  return user;
}

export async function signIn(
  email: string,
  password: string
): Promise<firebase.User | null> {
  const { user } = await auth.signInWithEmailAndPassword(email, password);

  return user;
}

export async function signOut(): Promise<void> {
  return await auth.signOut();
}
