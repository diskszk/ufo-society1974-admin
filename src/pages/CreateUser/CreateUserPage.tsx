import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { CreateAccountForm } from "../../partials/CreateAccountForm";
import { CreateAccountInputs } from "../../lib/schemas/createUserSchema";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useCreateUser } from "../../hooks/useCreateUser";

export const CreateUserPage: React.FC = () => {
  const history = useHistory();
  const { signedInUser } = useSignedInUserState();
  const { handleCreateAccount } = useCreateUser();

  const onSubmit: SubmitHandler<CreateAccountInputs> = useCallback(
    (data) => {
      handleCreateAccount(data, signedInUser.role);
    },
    [handleCreateAccount, signedInUser.role]
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
