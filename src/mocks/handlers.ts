import { rest } from "msw";
import { WEB_API_BASE_URL } from "../constants";

export const handlers = [
  rest.get(`${WEB_API_BASE_URL}/users`, (req, res, ctx) => {
    const email = req.url.searchParams.get("email");

    if (email === "valid@example.com") {
      return res(
        ctx.status(200),
        ctx.json({
          uid: "validuserid",
          username: "valid user",
          role: "editor",
          email: "valid@example.com",
        })
      );
    }

    return res(ctx.status(404));
  }),
];
