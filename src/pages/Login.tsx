import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
          navigate("/users/create");
        } else {
          navigate("/");
        }
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
      }
    },
    [email, password, dispatch, navigate]
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
