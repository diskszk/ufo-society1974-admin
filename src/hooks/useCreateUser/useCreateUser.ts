import { CreateUserInputs } from "../../lib/schemas/createUserSchema";
import { User } from "../../lib/types";
import { useMutation } from "@tanstack/react-query";
import { createUserInFirebase } from "../../lib/auth";
import { registerUser } from "../../lib/users/fetchUser";
import { useMessageModalState } from "../useMessageModalState";
import { useSignIn } from "../useSignIn";
import { ERROR_MESSAGE, ROLE } from "../../constants";

export function useCreateUser() {
  const { openMessageModalWithMessage } = useMessageModalState();
  const { handleSignIn } = useSignIn();

  const { mutateAsync: createUserMutate } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      createUserInFirebase(email, password)
  );

  const { mutateAsync: registerAccountMutate } = useMutation((user: User) =>
    registerUser(user)
  );

  const handleCreateUser = async (
    inputData: CreateUserInputs,
    role: string
  ) => {
    if (role !== ROLE.MASTER) {
      openMessageModalWithMessage("権限がありません。");
      return;
    }

    try {
      const fbUser = await createUserMutate({
        email: inputData.email,
        password: inputData.password,
      });

      if (!fbUser) {
        openMessageModalWithMessage(ERROR_MESSAGE.serverError);
        return;
      }

      await registerAccountMutate({
        uid: fbUser.uid,
        username: inputData.username,
        role: inputData.roleType,
        email: inputData.email,
        isDeleted: false,
      });

      openMessageModalWithMessage(
        `${inputData.username}を作成しました。
          サインインし直します。`
      );
      await handleSignIn(inputData.email, inputData.password);
    } catch (error) {
      if (error instanceof Error) {
        openMessageModalWithMessage(error.message);
        return;
      }
    }
  };

  return { handleCreateUser };
}
