import { WEB_API_BASE_URL } from "../../constants";
import { User } from "../types";
import axios from "axios";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export async function fetchUsers(): Promise<User[]> {
  const res = await axios.get<User[]>(baseUrl("/users"));

  return res.data;
}

export async function findUserByEmail(email: string): Promise<User> {
  const res = await axios.get<User>(baseUrl(`/users?email=${email}`));

  return res.data;
}

export async function fetchUser(uid: string): Promise<User> {
  const res = await axios.get<User>(baseUrl(`/users/${uid}`));

  return res.data;
}

export async function registerUser(user: User): Promise<void> {
  const res = await axios.post<User>(baseUrl(`/users`), {
    ...user,
  });

  if (res.status > 399) {
    throw new Error("ユーザーの作成に失敗しました。");
  }
  return;
}
