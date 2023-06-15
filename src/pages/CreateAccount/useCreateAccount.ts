import { CreateAccountInputs } from "../../lib/schemas/createUserSchema";
import { User } from "../../lib/types";
import { ROLE } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { createAccountInFirebaseAuth } from "../../lib/auth";
import { registerUser } from "../../lib/users/fetchUser";
import { useMessageModalState } from "../../hooks/useMessageModalState";

export function useCreateAccount() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const createAccountMutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      createAccountInFirebaseAuth(email, password)
  );

  const registerAccountMutation = useMutation((user: User) =>
    registerUser(user)
  );

  const handleCreateAccount = (
    inputData: CreateAccountInputs,
    role: string
  ) => {
    if (role !== ROLE.MASTER) {
      throw new Error("権限がありません。");
    }

    createAccountMutation.mutate(
      {
        email: inputData.email,
        password: inputData.password,
      },
      {
        onError: (err) => {
          throw err;
        },
        onSuccess: (data) => {
          if (!data) {
            throw new Error("サーバーでエラーが発生しました。");
          }
          registerAccountMutation.mutate(
            {
              uid: data.uid,
              username: inputData.username,
              role: inputData.roleType,
              email: inputData.email,
              isDeleted: false,
            },
            {
              onSuccess: () => {
                openMessageModalWithMessage(
                  `${inputData.username}を作成しました。`
                );
              },
            }
          );
        },
      }
    );
  };

  return { handleCreateAccount };
}
