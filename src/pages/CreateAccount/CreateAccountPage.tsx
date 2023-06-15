import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { CreateAccountForm } from "../../partials/CreateAccountForm";
import { CreateAccountInputs } from "../../lib/schemas/createUserSchema";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useCreateAccount } from "./useCreateAccount";
import { useErrorBoundary } from "react-error-boundary";

export const CreateAccountPage: React.FC = () => {
  const { showBoundary } = useErrorBoundary();
  const history = useHistory();
  const { signedInUser } = useSignedInUserState();
  const { handleCreateAccount } = useCreateAccount();

  const onSubmit: SubmitHandler<CreateAccountInputs> = useCallback(
    (data) => {
      try {
        handleCreateAccount(data, signedInUser.role);
      } catch (err) {
        showBoundary(err);
      }
    },
    [handleCreateAccount, showBoundary, signedInUser.role]
  );

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className="sign-up page">
      <h1>管理者登録</h1>

      <CreateAccountForm
        handleClickBackButton={handleClickBack}
        onSubmit={onSubmit}
      />
    </div>
  );
};
