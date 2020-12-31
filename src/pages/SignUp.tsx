import React, { useCallback, useEffect, useState } from 'react';
import { PrimalyButton, TextInput, TypeSelector } from '../components/UIKit';
import { signUp } from '../lib/users/operation';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootStore, User } from '../lib/types';
import { ROLE } from '../constans';

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

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector<RootStore, User>((state) => state.user);

  const [isDisable, setIsDisable] = useState(false);

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPasswod] = useState(''),
    [role, setRole] = useState('editer');

  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPasswod(e.target.value);
    },
    [setConfirmPasswod]
  );

  const selectRole = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRole(e.target.value);
    },
    [setRole]
  );

  useEffect(() => {
    if (user.role !== ROLE.MASTER) {
      setIsDisable(true);
    }
  }, [setIsDisable, user.role]);

  return (
    <section className="sign-up page">
      <h1>管理者登録</h1>
      <div className="inputs-container">
        <TextInput
          fullWidth={false}
          label={'お名前'}
          multiline={false}
          required={true}
          rows={1}
          value={username}
          type={'text'}
          onChange={inputUsername}
        />
        <TextInput
          fullWidth={true}
          label={'E-mail'}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={'email'}
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label={'パスワード'}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={'password'}
          onChange={inputPassword}
        />
        <TextInput
          fullWidth={true}
          label={'パスワード(確認)'}
          multiline={false}
          required={true}
          rows={1}
          value={confirmPassword}
          type={'password'}
          onChange={inputConfirmPassword}
        />

        <TypeSelector
          roles={roles}
          label={'役職'}
          role={role}
          required={true}
          onChange={selectRole}
        />

        <div className="button-container-row">
          <PrimalyButton
            label="もどる"
            onClick={() => dispatch(push('/users'))}
          />
          <PrimalyButton
            isDisable={isDisable}
            label="登録する"
            onClick={() =>
              dispatch(signUp(username, email, password, confirmPassword, role))
            }
          />
        </div>
      </div>
    </section>
  );
};
export default SignUp;
