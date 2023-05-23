import React, { useCallback, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore, User } from "./lib/types";
import { auth, db } from "./firebase";
import {
  crateSuccessFetchAction,
  createRequestFetchAction,
  createFailedFetchAction,
} from "./store/LoadingStatusReducer";
import { useHistory } from "react-router-dom";
import { createLoginAction } from "./store/UsersReducer";
import LoadingModal from "./components/LoadingModal";

type Props = {
  children: ReactNode;
};

const Auth: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSignedIn } = useSelector<RootStore, User>((state) => state.user);

  const listenAuthState = useCallback(async () => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(createFailedFetchAction("ユーザーの取得に失敗しました。"));
        history.push("/login");
        return;
      }
      const { uid } = user;

      const snapshot = await db.collection("users").doc(uid).get();
      const data = snapshot.data();

      if (!data) {
        dispatch(createFailedFetchAction("ユーザーの取得に失敗しました。"));
        history.push("/login");
        return;
      }
      dispatch(
        createLoginAction({
          isSignedIn: true,
          uid: uid,
          username: data.username,
          role: data.role,
        })
      );
    });
  }, [dispatch, history]);

  useEffect(() => {
    if (!isSignedIn) {
      try {
        dispatch(createRequestFetchAction());
        listenAuthState();

        dispatch(crateSuccessFetchAction());
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
        history.push("/login");
      }
    }
  }, [isSignedIn, dispatch, history, listenAuthState]);

  return <>{!isSignedIn ? <LoadingModal /> : <>{children}</>}</>;
};

export default Auth;
