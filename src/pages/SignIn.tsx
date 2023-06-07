import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signIn } from "../lib/auth";
import { useMessageModalState } from "../hooks/useMessageModalState";
import { StyledTextField } from "../components/UIKit/TextInput";
import { StyledButton } from "../components/UIKit/CustomButton";

type Inputs = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const { openMessageModalWithMessage } = useMessageModalState();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });

  const validationRules = {
    email: {
      required: "メールアドレスを入力してください。",
    },
    password: {
      required: "パスワードを入力してください。",
    },
  };

  const { mutate: signInMutate } = useMutation(
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

  const handleClickLoginButton: SubmitHandler<Inputs> = useCallback(
    ({ email, password }) => {
      signInMutate({ email, password });
    },
    [signInMutate]
  );

  return (
    <div className="login page">
      <h1>サインイン</h1>
      <div className="inputs-container">
        <form onSubmit={handleSubmit(handleClickLoginButton)}>
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
          <Controller
            name="password"
            control={control}
            rules={validationRules.password}
            render={({ field }) => (
              <StyledTextField
                {...field}
                fullWidth={true}
                label={"パスワード"}
                multiline={false}
                required={true}
                rows={1}
                type={"password"}
                error={errors.password !== undefined}
              />
            )}
          />

          <div className="spacing-div" />
          <div className="button-container">
            <StyledButton type="submit">サインイン</StyledButton>
          </div>
          <div className="spacing-div" />
        </form>

        <Link to="/reset">パスワードをリセットする</Link>
      </div>
    </div>
  );
};
