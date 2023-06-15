import { renderHook, waitFor } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { useCreateAccount } from "./useCreateAccount";
import { CreateAccountInputs } from "../../lib/schemas/createUserSchema";

jest.mock("../../lib/auth", () => ({
  createAccountInFirebaseAuth: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
}));

test("[role=master]以外のユーザーが実行した場合、エラーを発生させる", async () => {
  const { result } = renderHook(() => useCreateAccount(), { wrapper: Wrapper });

  const input: CreateAccountInputs = {
    username: "New User",
    email: "newuser@example.com",
    password: "asdf1234",
    confirmPassword: "asdf1234",
    roleType: "editor",
  };

  await waitFor(() => {
    expect(() => result.current.handleCreateAccount(input, "editor")).toThrow(
      /権限がありません。/
    );
  });
});
