import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { signIn } from "../../lib/auth";
import { useMessageModalState } from "../useMessageModalState";

export function useSignIn() {
  const { openMessageModalWithMessage } = useMessageModalState();
  const history = useHistory();

  const { mutateAsync: signInMutate } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    {
      onSuccess: (user) => {
        if (!user) {
          openMessageModalWithMessage("サインインに失敗しました。");
          return;
        }
        history.push("/");
      },
      onError: () => {
        openMessageModalWithMessage("サインインに失敗しました。");
      },
    }
  );

  return { signInMutate };
}
