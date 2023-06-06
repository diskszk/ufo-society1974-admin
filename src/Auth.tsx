import React, { useEffect, ReactNode } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { fetchUser } from "./lib/users/fetchUser";
import { useSignedInUserState } from "./hooks/useSignedInUserState";

type Props = {
  children: ReactNode;
};

const Auth: React.FC<Props> = ({ children }) => {
  const history = useHistory();

  const { setSignedInUser, setSignOut } = useSignedInUserState();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setSignOut();
        history.push("/signin");
        return;
      }
      const idToken = await user.getIdToken();

      const newSignedInUser = await fetchUser(user.uid);

      setSignedInUser(newSignedInUser);

      axios.defaults.headers.common["Authorization"] = idToken;
      axios.defaults.headers.common["role"] = newSignedInUser.role;

      return;
    });

    return () => {
      unsubscribed();
    };
  }, [history, setSignOut, setSignedInUser]);

  return <>{children}</>;
};

export default Auth;
