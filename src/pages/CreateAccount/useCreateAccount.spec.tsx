import { renderHook, waitFor } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { useCreateAccount } from "./useCreateAccount";
import { input } from "../../test-utils/createAccount";

jest.mock("../../lib/auth", () => ({
  createAccountInFirebaseAuth: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
}));

test("[role=master]以外のユーザーが実行した場合、エラーを発生させる", async () => {
  const { result } = renderHook(() => useCreateAccount(), { wrapper: Wrapper });

  await waitFor(() => {
    expect(() => result.current.handleCreateAccount(input, "editor")).toThrow(
      /権限がありません。/
    );
  });
});
