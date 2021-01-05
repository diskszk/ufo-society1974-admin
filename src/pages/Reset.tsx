import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CustomButton, TextInput } from '../components/UIKit';
import { useDispatch } from 'react-redux';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../store/LoadingStatusReducer';
import { resetPassword } from '../lib/users/';

interface Props extends RouteComponentProps<{}> {}

const Reset: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const inputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const handleClickResetButton = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      // validations
      if (email === '') {
        dispatch(displayMessage('必須項目が未入力です。'));
        return;
      }
      try {
        dispatch(requestFetchAction());
        await resetPassword(email);
        dispatch(
          displayMessage(
            '入力されたアドレスにパスワードリセット用のメールを送信しました。'
          )
        );
        dispatch(successFetchAction());
        history.push('/login');
        return;
      } catch (e) {
        dispatch(failedFetchAction(e.message));
      }
    },
    []
  );

  return (
    <section className="reset page">
      <h1>パスワードリセット</h1>
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

        <div className="button-container">
          <CustomButton label="リセット" onClick={handleClickResetButton} />
        </div>
      </div>
    </section>
  );
};

export default Reset;
