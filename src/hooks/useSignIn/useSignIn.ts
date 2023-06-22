import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { signIn } from "../../lib/auth";
import { useMessageModalState } from "../useMessageModalState";

export function useSignIn() {
  const { openMessageModalWithMessage } = useMessageModalState();
  const history = useHistory();

  const { mutateAsync: signInMutate } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      signIn(email, password)
  );

  const handleSignIn = async (email: string, password: string) => {
    try {
      const user = await signInMutate({ email, password }).then((data) => data);

      if (!user) {
        openMessageModalWithMessage("サインインに失敗しました。");
        return;
      }

      history.push("/");
      return;
    } catch (error) {
      if (error instanceof Error) {
        openMessageModalWithMessage(error.message);
        return;
      }
    }
  };

  return { handleSignIn };
}
