import { signinAction } from './actions';
import { push } from 'connected-react-router'
import { auth, db, FirebaseTimestamp } from '../../firebase';

export const signin = () => {

  return async (dispatch, getState) => {
    const state = getState();
    // const state: RootState = getState();
    const isSignedIn = state.users.isSignedIn;


    if (!isSignedIn) {
      const url = "https://api.github.com/users/diskszk";
      const response = await fetch(url, { method: "GET" })
        .then(res => res.json())
        .catch(() => null)

      const name = response.login;
      dispatch(signinAction({
        isSignedIn: true,
        uid: "007",
        username: name,
      }));

      console.log("SIGNIN");

      dispatch(push("/"));
    };
  }
}

export const signUp = (username, email, password, confirmPassword, role) => {
  return async () => {
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
            dispatch(push('/'));
          })
      }))
  }
}