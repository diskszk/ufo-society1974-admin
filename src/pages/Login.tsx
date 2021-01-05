import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CustomButton, TextInput } from '../components/UIKit';
import { login } from '../lib/users';
import { useDispatch } from 'react-redux';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../store/LoadingStatusReducer';
import { ROLE } from '../constants';
import { signinAction } from '../store/UsersReducer';

interface Props extends RouteComponentProps<{}> {}

// Login with e-mail & password
const Login: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleClickLoginButton = useCallback(
    async (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Validations
      if (email === '' || password === '') {
        dispatch(displayMessage('必須項目が未入力です。'));
        return;
      }
      try {
        dispatch(requestFetchAction());
        const user = await login(email, password);

        dispatch(signinAction({ ...user }));
        dispatch(successFetchAction());

        if (user.role === ROLE.MASTER) {
          history.push('/signup');
        } else {
          history.push('/');
        }
      } catch (e) {
        dispatch(failedFetchAction(e.message));
      }
    },
    []
  );

  return (
    <section className="login page">
      <h1>ログイン</h1>
      <div className="inputs-container">
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

        <div className="spacing-div" />
        <div className="button-container">
          <CustomButton label="ログイン" onClick={handleClickLoginButton} />
        </div>
        <div className="spacing-div" />
        <a
          onClick={(_ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
            history.push('/reset')
          }
        >
          <p>パスワードをリセットする</p>
        </a>
      </div>
    </section>
  );
};

export default Login;
