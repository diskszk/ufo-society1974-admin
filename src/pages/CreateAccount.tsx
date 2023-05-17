import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, TextInput, TypeSelector } from "../components/UIKit";
import { createAccount, registerAccount } from "../lib/users";
import { useDispatch, useSelector } from "react-redux";
import { RootStore, User } from "../lib/types";
import { ROLE } from "../constants";
import {
  crateSuccessFetchAction,
  createRequestFetchAction,
  createFailedFetchAction,
  createDisplayMessage,
} from "../store/LoadingStatusReducer";
import { useRedirectWithinSignedIn } from "../lib/users/useRedirectWithinSignedIn";

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

const CreateAccount: React.FC = () => {
  const dispatch = useDispatch();

  useRedirectWithinSignedIn();

  const user = useSelector<RootStore, User>((state) => state.user);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("editor");

  const inputUsername = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(ev.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(ev.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(ev.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(ev.target.value);
    },
    [setConfirmPassword]
  );

  const selectRole = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setRole(ev.target.value);
    },
    [setRole]
  );

  const handleClickCreateAccount = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      // 権限をチェック
      if (user.role !== ROLE.MASTER) {
        dispatch(
          createDisplayMessage("アカウントを作成する権限がありません。")
        );
        return;
      }

      // Validations
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        role === ""
      ) {
        dispatch(createDisplayMessage("必須項目が未入力です。"));
        return;
      }

      if (password !== confirmPassword) {
        dispatch(createDisplayMessage("パスワードが一致していません。"));
        return;
      }

      if (!window.confirm("ユーザーを新規作成しログインし直します。")) {
        return;
      }
      try {
        dispatch(createRequestFetchAction());
        const newAccount = await createAccount(username, email, password, role);

        if (!newAccount) {
          dispatch(
            createFailedFetchAction(
              "ユーザーの作成に失敗しました。\n通信環境をご確認お上再度お試しください。"
            )
          );
          return;
        } else {
          await registerAccount(newAccount);
        }

        dispatch(crateSuccessFetchAction());
        dispatch(
          createDisplayMessage(`${newAccount.username}を作成しました。`)
        );
        navigate("/");
        return;
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
      }
    },
    [
      username,
      email,
      password,
      confirmPassword,
      role,
      dispatch,
      navigate,
      user.role,
    ]
  );

  useEffect(() => {
    if (user.role === ROLE.MASTER) {
      // 入力フォームがどれか１つでも空だと作成ボタン非活性
      if (
        username !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== ""
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [setDisable, username, email, password, confirmPassword, user.role]);

  return (
    <section className="sign-up page">
      <h1>管理者登録</h1>
      <div className="inputs-container">
        <TextInput
          fullWidth={false}
          label={"お名前"}
          multiline={false}
          required={true}
          rows={1}
          value={username}
          type={"text"}
          onChange={inputUsername}
        />
        <TextInput
          fullWidth={true}
          label={"E-mail"}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={"password"}
          onChange={inputPassword}
        />
        <TextInput
          fullWidth={true}
          label={"パスワード(確認)"}
          multiline={false}
          required={true}
          rows={1}
          value={confirmPassword}
          type={"password"}
          onChange={inputConfirmPassword}
        />

        <TypeSelector
          roles={roles}
          label={"役職"}
          role={role}
          required={true}
          onChange={selectRole}
        />

        <div className="button-container-row">
          <CustomButton
            label="もどる"
            onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              navigate("/users")
            }
          />
          <CustomButton
            disable={disable}
            label="登録する"
            onClick={handleClickCreateAccount}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
