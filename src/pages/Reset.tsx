import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { ResetPartial } from "../partials/Reset";

type Inputs = {
  email: string;
};

export const Reset: React.FC = () => {
  const onSubmit: SubmitHandler<Inputs> = useCallback(({ email }): void => {
    console.log(email);
  }, []);

  return (
    <div className="reset page">
      <h1>パスワードリセット</h1>
      <ResetPartial onSubmit={onSubmit} />
    </div>
  );
};
