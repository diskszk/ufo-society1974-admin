import { logOutAction, signinAction } from './actions';
import { push } from 'connected-react-router'
import { auth, db, FirebaseTimestamp } from '../../firebase';

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {

      if (!user) {
        console.log("not logined");
        dispatch(push('/login'));
        return false;
      }

      const uid = user.uid;

      db.collection('users').doc(uid).get()
        .then(snapshot => {
          const data = snapshot.data();

          dispatch(signinAction({
            isSignedIn: true,
            uid: uid,
            username: data.username,
            role: data.role,
          }))

        })
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {

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

export const login = (email, password) => {
  return async (dispatch) => {

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
              console.log('No such document!');
              return false
            }

            const data = snapshot.data();

            if (data.isDelete) {
              alert('削除されたユーザーです。');
              return false;
            } else {
              console.log(`role: ${data.role}`);

              dispatch(signinAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                role: data.role,
              }));

              // if (data.role == 'master') {
              //   dispatch(push('/signup'));
              // } else {
              dispatch(push('/'));
              // }
            }
          })
      })
      .catch(e => {
        console.error(`Error: ${e}`);
        alert("ユーザーが見つかりませんでした。");
      })
  }

}

export const signUp = (username, email, password, confirmPassword, role) => {

  console.log(`role: ${role}`);
  return async (dispatch) => {
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
          console.log("失敗");
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
            console.log("success");
            dispatch(push('/'));
          })
      }))
  }
}

export const deleteUser = (id) => {

  const userRef = db.collection('users').doc(id);
  return async () => {
    // role: masterは消せない
    userRef.get()
      .then(snapshot => {
        const doc = snapshot.data();
        if (doc.role == 'master') {
          alert('このユーザーは削除できません。');
          return false;
        } else {
          const data = {
            isDelete: true
          }
          userRef.set(data, { merge: true })
            .then(() => {
              alert('ユーザーが削除されました。')
            })
            .catch(() => {
              throw new Error;
            })
        }
      })
  }
}

export const logOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(logOutAction());
        alert('ログアウトします。')
        dispatch(push('/login'));
      });
  }
}