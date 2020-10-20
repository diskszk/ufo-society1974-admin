import React, { useCallback, useState } from 'react';
import { PrimalyButton, TextInput, TypeSelector } from '../components/UIKit';
import { signUp } from '../reducks/users/operation';
import { useDispatch } from 'react-redux';

const roles = [
  {
    value: 'editer',
    label: '編集'
  },
  {
    value: 'master',
    label: 'ユーザー管理'
  },
  {
    value: 'test',
    label: 'テスト'
  }
]

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPasswod] = useState(""),
    [role, setRole] = useState("editer");

  const inputUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, [setUsername]);

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [setPassword]);

  const inputConfirmPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswod(e.target.value);
  }, [setConfirmPasswod]);

  const selectRole = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
    console.log(`role: ${role}`);
  }, [setRole])

  return (
    <div className="sign-up page">
      <h1>管理者登録</h1>
      <div className="inputs-container">
        <TextInput
          fullWidth={false} label={"お名前"} multiline={false}
          required={true} rows={1} value={username}
          type={"text"} onChange={inputUsername}
        />
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
        <TextInput
          fullWidth={true} label={"パスワード(確認)"} multiline={false}
          required={true} rows={1} value={confirmPassword}
          type={"password"} onChange={inputConfirmPassword}
        />

        <TypeSelector
          roles={roles} label={"役職"}
          role={role} required={true}
          onChange={selectRole}
        />

        <PrimalyButton
          label="登録する"
          onClick={() => dispatch(signUp(username, email, password, confirmPassword, role))}
        />
      </div>
    </div>
  );
}
export default SignUp;
