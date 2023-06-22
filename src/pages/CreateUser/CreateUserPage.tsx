import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { CreateUserForm } from "../../partials/CreateUserForm";
import { CreateUserInputs } from "../../lib/schemas/createUserSchema";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useCreateUser } from "../../hooks/useCreateUser";
import { ROLE } from "../../constants";
import { useMessageModalState } from "../../hooks/useMessageModalState";

export const CreateUserPage: React.FC = () => {
  const history = useHistory();
  const { signedInUser } = useSignedInUserState();
  const { handleCreateUser } = useCreateUser();
  const { openMessageModalWithMessage } = useMessageModalState();

  const onSubmit: SubmitHandler<CreateUserInputs> = useCallback(
    (data) => {
      handleCreateUser(data, signedInUser.role);
    },
    [handleCreateUser, signedInUser.role]
  );

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if (signedInUser) {
      if (signedInUser.role !== ROLE.MASTER) {
        openMessageModalWithMessage("このページへのアクセス権がありません。");
        history.push("/users");
      }
    }
  }, [openMessageModalWithMessage, signedInUser, history]);

  return (
    <div className="sign-up page">
      <h1>管理者登録</h1>

      <CreateUserForm
        handleClickBackButton={handleClickBack}
        onSubmit={onSubmit}
        role={signedInUser.role}
      />
    </div>
  );
};
