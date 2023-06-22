import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";
import { User } from "../../lib/types";

const dummyUsers: User[] = [
  {
    uid: "DwWHLLDL3KbYtGLP6RrTfUDOYdU2",
    username: "Editor User",
    email: "editor@example.com",
    role: "editor",
  },
  {
    uid: "yB1yjkskeybtbuQMmiazb92ZexY2",
    username: "Master User",
    email: "master@example.com",
    role: "master",
  },
  {
    uid: "Fzva1r7WLXSGJ1V9jZawFRdWe2f2",
    username: "Watcher User",
    email: "watcher@example.com",
    role: "watcher",
  },
];
const get: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const query = req.url.searchParams.get("email") || "";

  if (!query) {
    return res(ctx.status(200), ctx.json<User[]>(dummyUsers));
  }

  const foundUser = dummyUsers.find((user) => user.email === query);

  if (!foundUser) {
    return res(ctx.status(404));
  }
  return res(ctx.status(200), ctx.json<User>(foundUser));
};

const getById: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const { id } = req.params;

  const user = dummyUsers.find((user) => user.uid === id);

  if (!user) {
    return res(ctx.status(404));
  }
  return res(ctx.status(200), ctx.json<User>(user));
};

const create: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(203));
};

const mockUsers = {
  get,
  getById,
  create,
};

export default mockUsers;
