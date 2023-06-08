import { User } from "../types";

export async function fetchUser(uid: string): Promise<User> {
  const user: User = {
    uid,
    email: "",
    role: "",
    username: "",
    isDeleted: false,
  };

  return await user;
}
