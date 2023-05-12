import { User } from "../lib/types";
import { initialState } from "./initialState";

const userInitialState = initialState.user;

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

type SignInAction = {
  type: typeof LOG_IN;
  payload: User;
};
type LogOutAction = {
  type: typeof LOG_OUT;
  payload: User;
};

type UserActions = SignInAction | LogOutAction;

// action
export const createLoginAction = (state: User): UserActions => {
  return {
    type: LOG_IN,
    payload: {
      ...state,
      isSignedIn: true,
    },
  };
};

export const createLogOutAction = (): UserActions => {
  return {
    type: LOG_OUT,
    payload: {
      isSignedIn: false,
      role: "",
      username: "",
      uid: "",
    },
  };
};

// reducer
export const UsersReducer = (
  state = userInitialState,
  action: UserActions
): User => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        ...action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
