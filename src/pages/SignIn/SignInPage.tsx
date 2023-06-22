import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSignIn } from "../../hooks/useSignIn";
import { SignInForm } from "../../partials/SignInForm";

const MockSignIn = () => {
  const pw = "asdf1234";
  const { handleSignIn } = useSignIn();

  const handleClick = async (email: string) => {
    await handleSignIn(email, pw);
  };

  return (
    <div>
      <ul>
        <li>editor</li>
        <button onClick={() => handleClick("editor@example.com")}>
          signIn
        </button>
        <li>master</li>
        <button onClick={() => handleClick("master@example.com")}>
          signIn
        </button>
        <li>watcher</li>
        <button onClick={() => handleClick("watcher@example.com")}>
          signIn
        </button>
      </ul>
    </div>
  );
};

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
