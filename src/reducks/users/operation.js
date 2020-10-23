import { signinAction } from './actions';
import { push } from 'connected-react-router'
import { auth, db, FirebaseTimestamp } from '../../firebase';

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

        console.log(user);

        if (!user) {
          alert("ユーザーが見つかりませんでした。");
          return false;
        }
        const uid = user.uid;

        db.collection('users').doc('uid').get()
          .then(snapshot => {
            const data = snapshot.data();

            console.log((user.uid));
            console.log((data));

            dispatch(signinAction({
              isSignedIn: true,
              uid: uid,
              username: data,
              role: data,
            }));

            dispatch(push('/'));
          })
      })
      .catch(e => {
        console.error(`Error: ${e}`);
        alert("ユーザーが見つかりませんでした。");
      })
  }

}

export const signUp = (username, email, password, confirmPassword, role) => {
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
          username: username
        }

        db.collection('users').doc(uid).set(userInitialData)
          .then(() => {
            console.log("success");
            dispatch(push('/'));
          })
      }))
  }
}