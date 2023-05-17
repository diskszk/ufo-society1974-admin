import { userRef } from "../../firebase";
import { User } from "../types";

const fetchUsers = async (): Promise<firebase.firestore.DocumentData[]> => {
  const res = await userRef.where("isDeleted", "!=", true).get();

  if (res.empty) {
    return [];
  }
  const userList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    userList.push(doc.data());
  });

  return userList;
};

export const getUsers = async (): Promise<User[]> => {
  const userList = await fetchUsers();

  if (userList.length === 0) {
    throw new Error(
      "ユーザー情報の取得に失敗しました。\n通信環境をご確認の上再度お試しください。"
    );
  }

  return userList.map((user) => {
    return {
      isSignedIn: user.isSignedIn,
      uid: user.uid,
      username: user.username,
      role: user.role,
    };
  });
};
