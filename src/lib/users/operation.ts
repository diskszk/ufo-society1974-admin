import { push } from 'connected-react-router';
import { logOutAction, signinAction } from '../../store/UsersReducer';
import { auth, db, FirebaseTimestamp, userRef } from '../../firebase';
import {
  successFetchAction,
  requestFetchAction,
  failedFetchAction,
  displayMessage,
} from '../../store/LoadingStatusReducer';
import { ROLE } from '../../constans';

export const listenAuthState = () => {
  return async (dispatch: any) => {
    dispatch(requestFetchAction());

    return auth.onAuthStateChanged((user) => {
      if (!user) {
        return dispatch(push('/login'));
      } else {
        const uid = user.uid;

        userRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (!data)
              return dispatch(
                failedFetchAction('ユーザーの取得に失敗しました。')
              );

            dispatch(
              signinAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                role: data.role,
              })
            );

            dispatch(successFetchAction());
          })
          .catch((e) => {
            dispatch(failedFetchAction(e.message));
            dispatch(push('/'));
          });
      }
    });
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    // valldert
    if (email === '') {
      return dispatch(displayMessage('必須項目が未入力です。'));
    }
    dispatch(requestFetchAction());
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return dispatch(
            failedFetchAction('入力されたメールアドレスが登録されていません。')
          );
        } else {
          auth
            .sendPasswordResetEmail(email)
            .then(() => {
              dispatch(
                displayMessage(
                  '入力されたアドレスにパスワードリセット用のメールを送信しました。'
                )
              );
              dispatch(successFetchAction);
              dispatch(push('/login'));
            })
            .catch(() => {
              failedFetchAction(
                `パスワードリセットに失敗しました。\n通信環境をご確認の上再度お試しください。`
              );
            });
        }
      });
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    // Validation
    if (email === '' || password === '') {
      return dispatch(displayMessage('必須項目が未入力です。'));
    }
    dispatch(requestFetchAction());
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (!user) {
          return dispatch(
            failedFetchAction('ユーザーが見つかりませんでした。')
          );
        }
        const uid = user.uid;

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            if (!snapshot.exists) {
              return dispatch(
                failedFetchAction('ユーザーが見つかりませんでした。')
              );
            }

            const data = snapshot.data();
            if (!data)
              return dispatch(
                failedFetchAction('ユーザーが見つかりませんでした。')
              );

            if (data.isDelete) {
              return dispatch(failedFetchAction('削除されたユーザーです。'));
            } else {
              dispatch(
                signinAction({
                  isSignedIn: true,
                  uid: uid,
                  username: data.username,
                  role: data.role,
                })
              );
              dispatch(successFetchAction());
              if (data.role === 'master') {
                dispatch(push('/signup'));
              } else {
                dispatch(push('/'));
              }
            }
          })
          .catch(() => {
            dispatch(
              failedFetchAction(
                `ユーザーが見つかりませんでした。\n通信環境をご確認の上再度お試しください。`
              )
            );
          });
      })
      .catch((e) => {
        // エラーパターンが複数ありハンドリングできない
        dispatch(failedFetchAction(e.message));
      });
  };
};

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string
) => {
  return async (dispatch: any) => {
    // Validation
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      role === ''
    ) {
      return dispatch(displayMessage('必須項目が未入力です。'));
    }

    if (password !== confirmPassword) {
      return dispatch(displayMessage('パスワードが一致していません。'));
    }
    dispatch(requestFetchAction());

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (!user) {
          return dispatch(failedFetchAction('ユーザーが存在しません。'));
        }
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: role,
          uid: uid,
          updated_at: timestamp,
          username: username,
          isDelete: false,
        };

        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push('/'));
          });
        dispatch(successFetchAction());
      })
      .catch(() => {
        return dispatch(
          failedFetchAction(
            `ユーザーの登録に失敗しました。\n通信環境をご確認の上再度お試しください。`
          )
        );
      });
  };
};

export const deleteUser = (id: string) => {
  const userRef = db.collection('users').doc(id);
  return async (dispatch: any) => {
    dispatch(requestFetchAction());
    // role: masterは消せない
    userRef.get().then((snapshot) => {
      const data = snapshot.data();
      if (!data) {
        return dispatch(failedFetchAction('ユーザーが存在しません。'));
      }
      if (data.role === ROLE.MASTER) {
        return dispatch(failedFetchAction('このユーザーは削除できません。'));
      } else {
        const userData = {
          isDelete: true,
        };
        userRef
          .set(userData, { merge: true })
          .then(() => {
            dispatch(displayMessage('ユーザーが削除されました。'));
            dispatch(successFetchAction());
          })
          .catch(() => {
            return dispatch(
              failedFetchAction(
                `ユーザーの削除に失敗しました。\n通信環境をご確認の上再度お試しください。`
              )
            );
          });
      }
    });
  };
};

export const logOut = () => {
  return async (dispatch: any) => {
    dispatch(requestFetchAction());

    try {
      await auth.signOut();
    } catch {
      dispatch(
        failedFetchAction(`ログアウトに失敗しました。\n
        通信環境をご確認の上再度お試しください。`)
      );
    }
    dispatch(logOutAction());
    dispatch(displayMessage('ログアウトしました。'));
    dispatch(successFetchAction());
    dispatch(push('/login'));
  };
};
