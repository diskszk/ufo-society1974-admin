import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { Textbox } from "../../components/Textbox";
import { useSignIn } from "../../hooks/useSignIn";

type Inputs = {
  email: string;
  password: string;
};

export const SignInPage: React.FC = () => {
  const { handleSubmit, register } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signInMutate } = useSignIn();

  const handleClickLoginButton: SubmitHandler<Inputs> = useCallback(
    async ({ email, password }) => {
      await signInMutate({ email, password });
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
