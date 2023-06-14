import { rest } from "msw";
import mockUsers from "./resolvers/users";

const baseUrl = (path: string) => {
  return new URL(
    path,
    "http://127.0.0.1:5001/ufo-society-1974/asia-northeast2/api"
  ).toString();
};

export const handlers = [
  rest.get(baseUrl("/users"), mockUsers.get),
  rest.get(baseUrl("/users/:id"), mockUsers.getById),
];
