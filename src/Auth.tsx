import React, { useEffect, ReactNode } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { findUserById } from "./lib/users/fetchUser";
import { useSignedInUserState } from "./hooks/useSignedInUserState";
import { useMessageModalState } from "./hooks/useMessageModalState";

type Props = {
  children: ReactNode;
};

const Auth: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const { openMessageModalWithMessage } = useMessageModalState();

  const { setSignedInUser, setSignOut } = useSignedInUserState();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setSignOut();
        history.push("/signin");
        return;
      }

      try {
        const idToken = await user.getIdToken();

        const newSignedInUser = await findUserById(user.uid);

        setSignedInUser(newSignedInUser);

        axios.defaults.headers.common["Authorization"] = idToken;
        axios.defaults.headers.common["role"] = newSignedInUser.role;

        return;
      } catch (error) {
        setSignOut();
        history.push("/signin");

        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
        }
        return;
      }
    });

    return () => {
      unsubscribed();
    };
  }, [history, openMessageModalWithMessage, setSignOut, setSignedInUser]);

  return <>{children}</>;
};

export default Auth;
