import React, { useCallback, useState } from 'react';
import { PrimalyButton, TextInput } from '../components/UIKit';
import { resetPassword } from '../reducks/users/operation';
import { useDispatch } from 'react-redux';

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  return (
    <section className="reset page">
      <h1>パスワードリセット</h1>
      <div className="inputs-container">

        <TextInput
          fullWidth={true} label={"E-mail"} multiline={false}
          required={true} rows={1} value={email}
          type={"email"} onChange={inputEmail}
        />

        <div className="button-container">
          <PrimalyButton
            label="パスワードをリセット"
            onClick={() => dispatch(resetPassword(email))}
          />
        </div>
      </div>
    </section>
  );
}
export default Reset;
