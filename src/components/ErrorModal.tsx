import { useCallback, useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useErrorBoundary } from "react-error-boundary";

type Props = {
  error: Error;
};

export const ErrorModal: React.FC<Props> = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  // 基本サーバーで定義したエラーメッセージを使う
  const [errorMessage, setErrorMessage] = useState(error.message);

  // 未定義のエラーの場合のエラーメッセージを定義する
  // DTOの型エラーの場合404 Bad Request.
  if (error.message === "Bad Request.") {
    setErrorMessage("想定していない値が入力されています。");
    // サーバーエラー
  } else if (error.message === "Internal Server Error.") {
    setErrorMessage("サーバー側でエラーが発生しました。");
  }
  // TODO: サーバーが起動していないときのネットワークエラーを追記する

  const handlePopState = useCallback(() => {
    resetBoundary();
  }, [resetBoundary]);

  // ブラウザバックしたらエラーが消える
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);

  const handleClick = useCallback(() => {
    resetBoundary();
  }, [resetBoundary]);

  return <Modal message={errorMessage} handleClickCloseModal={handleClick} />;
};
