import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { PrimalyButton, TextInput, TypeSelector } from '../components/UIKit';
import { signUp } from '../lib/users/';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, User } from '../lib/types';
import { ROLE } from '../constans';
import {
  successFetchAction,
  requestFetchAction,
  failedFetchAction,
  displayMessage,
} from '../store/LoadingStatusReducer';

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

interface Props extends RouteComponentProps<{}> {}

const SignUp: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();

  const user = useSelector<RootStore, User>((state) => state.user);

  const [isDisable, setIsDisable] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasswod] = useState('');
  const [role, setRole] = useState('editer');

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

  const handleClickSignUp = async () => {
    // Validation
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      role === ''
    ) {
      dispatch(displayMessage('必須項目が未入力です。'));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(displayMessage('パスワードが一致していません。'));
      return;
    }
    try {
      dispatch(requestFetchAction());
      await dispatch(signUp(username, email, password, role));
      dispatch(successFetchAction());
      history.push('/');
    } catch (e) {
      dispatch(failedFetchAction(e.message));
    }
  };

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
            onClick={() => history.push('/users')}
          />
          <PrimalyButton
            isDisable={isDisable}
            label="登録する"
            onClick={handleClickSignUp}
          />
        </div>
      </div>
    </section>
  );
};

export default withRouter(SignUp);
