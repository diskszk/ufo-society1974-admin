import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSignIn } from "../../hooks/useSignIn";
import { SignInForm } from "../../partials/SignInForm";
import { MockSignIn } from "../../mocks/MockSignIn";

type Inputs = {
  email: string;
  password: string;
};

export const SignInPage: React.FC = () => {
  const { handleSignIn } = useSignIn();

  const handleClickLoginButton: SubmitHandler<Inputs> = useCallback(
    async ({ email, password }) => {
      await handleSignIn(email, password);
    },
    [handleSignIn]
  );

  return (
    <div className="login page">
      <h1>サインイン</h1>
      <SignInForm onSubmit={handleClickLoginButton} />
      {process.env.NODE_ENV === "development" && <MockSignIn />}
    </div>
  );
};
