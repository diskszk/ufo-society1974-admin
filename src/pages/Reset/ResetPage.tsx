import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { ResetForm } from "../../partials/ResetForm";
import { useMutation } from "@tanstack/react-query";
import { findUserByEmail } from "../../lib/users/fetchUser";
import { resetPassword } from "../../lib/auth";
import { useMessageModalState } from "../../hooks/useMessageModalState";

type Inputs = {
  email: string;
};

export const ResetPage: React.FC = () => {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutate: resetPasswordMutate } = useMutation((email: string) =>
    resetPassword(email)
  );

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ email }) => {
      try {
        await findUserByEmail(email);
      } catch (error) {
        openMessageModalWithMessage(
          "入力されたメールアドレスと一致するユーザーが存在しません。"
        );
        return;
      }

      resetPasswordMutate(email, {
        onError: () => {
          openMessageModalWithMessage("サーバーへのアクセスに失敗しました・");
          return;
        },
        onSuccess: () => {
          openMessageModalWithMessage(
            "入力されたメールアドレス宛にご案内メールを送信しました。"
          );
        },
      });
    },
    [openMessageModalWithMessage, resetPasswordMutate]
  );

  return (
    <div className="reset page">
      <h1>パスワードリセット</h1>
      <ResetForm onSubmit={onSubmit} />
    </div>
  );
};
