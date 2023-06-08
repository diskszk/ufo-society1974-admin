import React, { useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { StyledTextField } from "../components/UIKit/TextInput";
import { StyledButton } from "../components/UIKit/CustomButton";
import { useMessageModalState } from "../hooks/useMessageModalState";
import { resetPassword } from "../lib/auth";

type Inputs = {
  email: string;
};

export const Reset: React.FC = () => {
  const { openMessageModalWithMessage } = useMessageModalState();
  const { showBoundary } = useErrorBoundary();

  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  });

  const { mutate: resetPasswordMutate } = useMutation(
    async (email: string) => await resetPassword(email)
  );

  const handleClickResetButton: SubmitHandler<Inputs> = useCallback(
    ({ email }): void => {
      try {
        resetPasswordMutate(email);
        openMessageModalWithMessage(
          "入力されたアドレスにパスワードリセット用のメールを送信しました。"
        );
        history.push("/login");
      } catch {
        showBoundary("パスワードリセットに失敗しました。");
      }
    },
    [history, openMessageModalWithMessage, resetPasswordMutate, showBoundary]
  );

  return (
    <div className="reset page">
      <h1>パスワードリセット</h1>
      <div className="inputs-container">
        <form onSubmit={handleSubmit(handleClickResetButton)}>
          <StyledTextField
            {...register("email")}
            label={"E-mail"}
            type={"email"}
            required
          />
          <div className="button-container">
            <StyledButton disabled={!isDirty} type="submit">
              リセット
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};
