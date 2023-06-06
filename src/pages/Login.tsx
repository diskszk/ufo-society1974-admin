import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CustomButton, TextInput } from "../components/UIKit";
import { login } from "../lib/users";
import { useDispatch } from "react-redux";
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from "../store/LoadingStatusReducer";
import { ROLE } from "../constants";
import { createLoginAction } from "../store/UsersReducer";

// Login with e-mail & password
const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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

  // 1. email,pwでfirebaseAuthを使ってsignInする
  // auth.onAuthStateChangedが動く
  // 2. firebaseAuthからsignInしたuser<Firebase.User>情報を取得する
  // ↑ここまで
  // 3. user<Firebase.User>のuidを使ってWebAPIからuser<User>を取得する
  // 4. user<Firebase.User>からidTokenを取得してAxiosのheaderにセットする
  // 5. user<User>からroleを取得してAxiosのheaderにセットする
  // 5. ログイン中のuserとしてglobal stateに設定する
  const handleClickLoginButton = useCallback(
    async (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Validations
      if (email === "" || password === "") {
        dispatch(createDisplayMessage("必須項目が未入力です。"));
        return;
      }
      try {
        dispatch(createRequestFetchAction());
        const user = await login(email, password);

        dispatch(createLoginAction({ ...user }));
        dispatch(crateSuccessFetchAction());

        if (user.role === ROLE.MASTER) {
          history.push("/users/create");
        } else {
          history.push("/");
        }
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
      }
    },
    [email, password, dispatch, history]
  );

  return (
    <section className="login page">
      <h1>ログイン</h1>
      <div className="inputs-container">
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

        <div className="spacing-div" />
        <div className="button-container">
          <CustomButton label="ログイン" onClick={handleClickLoginButton} />
        </div>
        <div className="spacing-div" />

        <Link to="/reset">パスワードをリセットする</Link>
      </div>
    </section>
  );
};

export default Login;
