import * as Actions from './actions';
import { initialState } from '../store/initialState';
import { IUser } from './types';
import { Reducer } from 'react';

export const UsersReducer: Reducer<IUser, Actions.UserActions> = (state = initialState.users, action): IUser => {
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