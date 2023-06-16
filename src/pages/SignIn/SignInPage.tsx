import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "../../lib/auth";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { Textbox } from "../../components/Textbox";

type Inputs = {
  email: string;
  password: string;
};

export const SignInPage: React.FC = () => {
  const { openMessageModalWithMessage } = useMessageModalState();
  const history = useHistory();

  const { handleSubmit, register } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
          <Textbox
            {...register("email")}
            label={"E-mail"}
            type={"email"}
            required
          />
          <Textbox
            {...register("password")}
            label={"パスワード"}
            type={"password"}
            required
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
