import { push } from 'connected-react-router'
import { logOutAction, signinAction } from '../../store/UsersReducer';
import { auth, db, FirebaseTimestamp, userRef } from '../../firebase';

export const listenAuthState = () => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged(user => {

      if (!user) {
        console.log('not sign in !');
        dispatch(push('/login'));
        return false;
      } else {
        console.log('sign in !');

        const uid = user.uid;

        userRef.doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data();
            console.log(JSON.stringify(data));

            if (!data) return false;

            dispatch(signinAction({
              isSignedIn: true,
              uid: uid,
              username: data.username,
              role: data.role,
            }))

          })
      }
    })
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {

    // valldert
    if (email === "") {
      alert('必須項目が未入力です。');
      return false;
    }
    db.collection('users').where('email', '==', email).get()
      .then(snapshot => {

        if (snapshot.empty) {
          alert('入力されたメールアドレスが登録されていません。.');
          return false;
        } else {
          auth.sendPasswordResetEmail(email)
            .then(() => {
              alert('入力されたアドレスにパスワードリセット用のメールを送信しました。');
              dispatch(push('/login'));
            }).catch(e => {
              alert('パスワードリセットに失敗しました。');
            });
        }
      })
  }
}

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {

    // Validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です。")
      return false;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (!user) {
          alert("ユーザーが見つかりませんでした。");
          return false;
        }
        const uid = user.uid;

        db.collection('users').doc(uid).get()
          .then(snapshot => {

            if (!snapshot.exists) {
              return false
            }

            const data = snapshot.data()
            if (!data) return false;

            if (data.isDelete) {
              alert('削除されたユーザーです。');
              return false;
            } else {
              console.log(JSON.stringify(data));

              dispatch(signinAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                role: data.role,
              }));

              if (data.role === 'master') {
                dispatch(push('/signup'));
              } else {
                dispatch(push('/'));
              }
            }
          })
      })
      .catch(e => {
        console.error(`Error: ${e}`);
        alert("ユーザーが見つかりませんでした。");
      })
  }

}

export const signUp = (username: string, email: string, password: string, confirmPassword: string, role: string) => {

  return async (dispatch: any) => {
    if (username === "" || email === "" || password === "" || confirmPassword === "" || role === "") {
      alert("必須項目が未入力です。");
      return false;
    };

    if (password !== confirmPassword) {
      alert("パスワードが一致していません。")
      return false;
    };

    return auth.createUserWithEmailAndPassword(email, password)
      .then((result => {
        const user = result.user;

        if (!user) {
          return false;
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
          isDelete: false
        }

        db.collection('users').doc(uid).set(userInitialData)
          .then(() => {
            dispatch(push('/'));
          })
      })).catch(e => {
        alert(`Error: ${e}`);
        throw new Error(e);
      })
  }
}

export const deleteUser = (id: string) => {

  const userRef = db.collection('users').doc(id);
  return async () => {

    // role: masterは消せない
    userRef.get()
      .then(snapshot => {
        const data = snapshot.data();
        if (!data) return false;

        if (data.role === 'master') {
          alert('このユーザーは削除できません。');
          return false;
        } else {
          const userData = {
            isDelete: true
          }
          userRef.set(userData, { merge: true })
            .then(() => {
              alert('ユーザーが削除されました。')
            })
            .catch((e) => {
              throw new Error(e);
            })
        }
      })
  }
}

export const logOut = () => {
  return async (dispatch: any) => {
    auth.signOut()
      .then(() => {
        dispatch(logOutAction());
        alert('ログアウトしました。')
        dispatch(push('/login'));
      });
  }
}