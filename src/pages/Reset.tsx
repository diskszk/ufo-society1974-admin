import React, { useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });

  const validationRules = {
    email: {
      required: "メールアドレスを入力してください。",
    },
  };

  const { mutate: resetPasswordMutate } = useMutation((email: string) =>
    resetPassword(email)
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
          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
            render={({ field }) => (
              <StyledTextField
                {...field}
                fullWidth={true}
                label={"E-mail"}
                multiline={false}
                required={true}
                rows={1}
                type={"email"}
                error={errors.email !== undefined}
              />
            )}
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
