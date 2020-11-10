import { RootStore } from '../lib/types';

export const initialState: RootStore = {
  user: {
    isSignedIn: false,
    uid: "",
    username: "",
    role: ""
  }
};