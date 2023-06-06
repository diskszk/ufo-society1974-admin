import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UFO_SOCIETY_OFFICIAL } from "../../constants";
import { createDisplayMessage } from "../../store/LoadingStatusReducer";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { signOut } from "../../lib/auth";
import { useMutation } from "@tanstack/react-query";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { signedInUser, setSignOut } = useSignedInUserState();
  const { mutate: signOutMutate } = useMutation(signOut, {
    onError: () => {
      throw new Error("サインアウトに失敗しました。");
    },
  });

  const handleClickLogOut = (
    _ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    signOutMutate();

    setSignOut();
    dispatch(createDisplayMessage("ログアウトしました。"));
    history.push("/login");
  };

  return (
    <header>
      <div className="header">
        <div className="header-content-left">
          <a
            href={UFO_SOCIETY_OFFICIAL}
            target="_blank"
            rel="noopener noreferrer"
          >
            UFO Societyホームページ
          </a>
          {!signedInUser.uid ? (
            <Link to="/login">ログイン</Link>
          ) : (
            <a onClick={handleClickLogOut}>ログアウト</a>
          )}
        </div>
        {signedInUser.uid && (
          <div className="header-content-right">
            <p>ユーザー: {signedInUser.username}</p>
            <p>
              {`権限 `}: {signedInUser.role}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};
