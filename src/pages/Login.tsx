import React, { useCallback, useState } from 'react';
import { PrimalyButton, TextInput } from '../components/UIKit';
import { login } from '../lib/users/operation';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL } from '../constans';

// Login with e-mail & password
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [setPassword]);

  return (
    <section className="login page">
      <h1>ログイン</h1>
      <div className="inputs-container">

        <TextInput
          fullWidth={true} label={"E-mail"} multiline={false}
          required={true} rows={1} value={email}
          type={"email"} onChange={inputEmail}
        />
        <TextInput
          fullWidth={true} label={"パスワード"} multiline={false}
          required={true} rows={1} value={password}
          type={"password"} onChange={inputPassword}
        />

        <div className="spacing-div" />
        <div className="button-container">
          <PrimalyButton
            label="ログイン"
            onClick={() => dispatch(login(email, password))}
          />
        </div>
        <div className="spacing-div" />
        <Link to={URL.RESET}><p>パスワードをリセットする</p></Link>
      </div>
    </section>
  );
}
export default Login;
