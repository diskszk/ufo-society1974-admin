import * as Actions from './actions';
import { initialState } from '../store/initialState';
import { User } from './types';
import { Reducer } from 'react';

export const UsersReducer: Reducer<User, Actions.UserActions> = (state = initialState.users, action): User => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
      };

    case Actions.SIGN_OUT:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}