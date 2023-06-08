import React from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ROLE } from "../constants";
import { StyledTextField } from "../components/UIKit/TextInput";
import { StyledButton } from "../components/UIKit/CustomButton";
import { TypeSelector } from "../components/UIKit/TypeSelector";

const roles = [
  {
    value: ROLE.EDITOR,
    label: ROLE.EDITOR,
  },
  {
    value: ROLE.MASTER,
    label: ROLE.MASTER,
  },
  {
    value: ROLE.WATCHER,
    label: ROLE.WATCHER,
  },
];

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleType: { label: string; value: string };
};

export const CreateAccount: React.FC = () => {
  const { control, handleSubmit, register } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const validationMessage = (type: string) => `${type}を入力してください。`;

  // const validationRules = {
  //   username: {
  //     required: `${validationMessage("名前")}`,
  //   },
  //   email: {
  //     required: `${validationMessage("メールアドレス")}`,
  //   },
  //   password: {
  //     required: `${validationMessage("パスワード")}`,
  //     minLength: {
  //       value: 8,
  //       message: "パスワードは8文字以上で入力してください。",
  //       pattern: {
  //         value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
  //         message: "パスワードは半角英数字混合で入力してください。",
  //       },
  //     },
  //   },
  //   confirmPassword: {
  //     required: `${validationMessage("確認用のパスワード")}`,
  //     minLength: {
  //       value: 8,
  //       message: "パスワードは8文字以上で入力してください。",
  //     },
  //     pattern: {
  //       value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
  //       message: "パスワードは半角英数字混合で入力してください。",
  //     },
  //   },
  // };

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

  // useEffect(() => {
  //   if (user.role === ROLE.MASTER) {
  //     // 入力フォームがどれか１つでも空だと作成ボタン非活性
  //     if (
  //       username !== "" &&
  //       email !== "" &&
  //       password !== "" &&
  //       confirmPassword !== ""
  //     ) {
  //       setDisable(false);
  //     } else {
  //       setDisable(true);
  //     }
  //   }
  // }, [setDisable, username, email, password, confirmPassword, user.role]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="sign-up page">
      <h1>管理者登録</h1>
      <div className="inputs-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            {...register("username")}
            label={"お名前"}
            type={"text"}
            required
          />
          <StyledTextField
            {...register("email")}
            label={"E-mail"}
            type={"email"}
            required
          />
          <StyledTextField
            {...register("password")}
            label={"パスワード"}
            type={"password"}
            required
          />
          <StyledTextField
            {...register("confirmPassword")}
            label={"パスワード(確認)"}
            type={"password"}
            required
          />

          <Controller
            name="roleType"
            control={control}
            render={({ field }) => <TypeSelector options={roles} {...field} />}
          />

          <div className="button-container-row">
            <StyledButton
              onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                history.push("/users")
              }
            >
              もどる
            </StyledButton>
            <StyledButton type="submit">登録する</StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};
