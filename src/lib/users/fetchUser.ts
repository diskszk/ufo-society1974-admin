// import { WEB_API_BASE_URL } from "../../constants";
import { User } from "../types";
import axios from "axios";

const baseUrl = (path: string) => {
  return new URL(
    path,
    "http://127.0.0.1:5001/ufo-society-1974/asia-northeast2/api"
  ).toString();
};

export async function fetchUsers(): Promise<User[]> {
  const res = await axios.get<User[]>(baseUrl("/users"));
  // const res = await axios.get<User[]>(`${WEB_API_BASE_URL}/users`);

  return res.data;
}

export async function findUserByEmail(email: string): Promise<User> {
  const res = await axios.get<User>(baseUrl(`/users?email=${email}`));
  // const res = await axios.get<User>(`${WEB_API_BASE_URL}/users?email=${email}`);

  return res.data;
}

export async function fetchUser(uid: string): Promise<User> {
  const res = await axios.get<User>(baseUrl(`/users/${uid}`));
  // const res = await axios.get<User>(`${WEB_API_BASE_URL}/users/${id}`);

  return res.data;
}
