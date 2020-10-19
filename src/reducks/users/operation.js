import { signinAction } from './actions';
import { push } from 'connected-react-router'

export const signin = () => {

  return async (dispatch, getState) => {
    const state = getState();
    // const state: RootState = getState();
    const isSignedIn = state.users.isSignedIn;

    console.log("SIGNIN");

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
      dispatch(push("/"));
    };
  }
}