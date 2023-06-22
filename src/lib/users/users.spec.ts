import { findUserById, fetchUsers, findUserByEmail } from "./fetchUser";

test("getUsers => User[]", async () => {
  const users = await fetchUsers();

  expect(users).toHaveLength(3);
});

describe("findUserByEmail", () => {
  test("(valid) => User", async () => {
    const user = await findUserByEmail("editor@example.com");

    expect(user).toEqual({
      uid: "editor1",
      username: "Editor User",
      email: "editor@example.com",
      role: "editor",
    });
  });

  test("(invalid) => 404", async () => {
    expect(async () =>
      findUserByEmail("notfound@example.com")
    ).rejects.toThrow();
  });
});

describe("fetchUser", () => {
  test("(valid) => User", async () => {
    const user = await findUserById("editor1");

    expect(user.username).toBe("Editor User");
  });

  test("(invalid) => 404", async () => {
    expect(async () => findUserById("notfoundid")).rejects.toThrow();
  });
});
