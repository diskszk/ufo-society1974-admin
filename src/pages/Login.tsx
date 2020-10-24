import React, { useCallback, useState } from 'react';
import { PrimalyButton, TextInput } from '../components/UIKit';
import { login } from '../reducks/users/operation';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
    <div className="login page">
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
        <Link to='/reset'><p>パスワードをリセットする</p></Link>
      </div>
    </div>
  );
}
export default Login;
