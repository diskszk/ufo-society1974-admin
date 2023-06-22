import React from "react";
import { Link, useHistory } from "react-router-dom";
import { UFO_SOCIETY_OFFICIAL } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { signOut } from "../../lib/auth";
import { useMutation } from "@tanstack/react-query";

export const Header: React.FC = () => {
  const history = useHistory();

  const { signedInUser, setSignOut } = useSignedInUserState();
  const { mutate: signOutMutate } = useMutation(signOut);

  const handleClickLogOut = (
    _ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    signOutMutate();

    setSignOut();
    history.push("/signin");
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
            <Link to="/signin">サインイン</Link>
          ) : (
            <a onClick={handleClickLogOut}>サインアウト</a>
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
