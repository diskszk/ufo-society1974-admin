import { rest } from "msw";
import mockUsers from "./resolvers/users";
import { WEB_API_BASE_URL } from "../constants";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export const handlers = [
  rest.get(baseUrl("/users"), mockUsers.get),
  rest.get(baseUrl("/users/:id"), mockUsers.getById),
  rest.post(baseUrl("/users"), mockUsers.create),
];
