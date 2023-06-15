import React from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { CreateAccountForm } from "../partials/CreateAccountForm";
import { CreateAccountInputs } from "../lib/schemas/createUserSchema";

export const CreateAccount: React.FC = () => {
  const history = useHistory();

  // const handleClickCreateAccount = useCallback(
  //   async (
  //     _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //   ): Promise<void> => {
  //     // 権限をチェック
  //     if (user.role !== ROLE.MASTER) {
  //       dispatch(
  //         createDisplayMessage("アカウントを作成する権限がありません。")
  //       );
  //       return;
  //     }

  //     // Validations
  //     if (
  //       username === "" ||
  //       email === "" ||
  //       password === "" ||
  //       confirmPassword === "" ||
  //       role === ""
  //     ) {
  //       dispatch(createDisplayMessage("必須項目が未入力です。"));
  //       return;
  //     }

  //     if (password !== confirmPassword) {
  //       dispatch(createDisplayMessage("パスワードが一致していません。"));
  //       return;
  //     }

  //     if (!window.confirm("ユーザーを新規作成しログインし直します。")) {
  //       return;
  //     }
  //     try {
  //       dispatch(createRequestFetchAction());
  //       const newAccount = await createAccount(username, email, password, role);

  //       if (!newAccount) {
  //         dispatch(
  //           createFailedFetchAction(
  //             "ユーザーの作成に失敗しました。\n通信環境をご確認お上再度お試しください。"
  //           )
  //         );
  //         return;
  //       } else {
  //         await registerAccount(newAccount);
  //       }

  //       dispatch(crateSuccessFetchAction());
  //       dispatch(
  //         createDisplayMessage(`${newAccount.username}を作成しました。`)
  //       );
  //       history.push("/");
  //       return;
  //     } catch (e) {
  //       // dispatch(createFailedFetchAction(e.message));
  //       dispatch(createFailedFetchAction("error message"));
  //     }
  //   },
  //   [
  //     username,
  //     email,
  //     password,
  //     confirmPassword,
  //     role,
  //     dispatch,
  //     history,
  //     user.role,
  //   ]
  // );
  const onSubmit: SubmitHandler<CreateAccountInputs> = (data) => {
    // roleのチェック
    // user作成(email,password)=>auth
    // uid取得
    // uid+email, name, role,をサーバーにわたす=>registerUser
    // ok
    // form内容リセット
    // `${newAccount.username}を作成しました。`
    //
    console.log(data);
  };
  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="sign-up page">
      <h1>管理者登録</h1>

      <CreateAccountForm
        handleClickBackButton={handleClick}
        onSubmit={onSubmit}
      />
    </div>
  );
};
