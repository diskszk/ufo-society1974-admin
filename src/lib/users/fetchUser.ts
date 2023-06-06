import { WEB_API_BASE_URL } from "../../constants";
import { User } from "../types";
import axios from "axios";

export async function fetchUser(id: string): Promise<User> {
  const res = await axios.get<User>(`${WEB_API_BASE_URL}/users/${id}`);

  return res.data;
}
