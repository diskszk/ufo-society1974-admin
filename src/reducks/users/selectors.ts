import { createSelector } from 'reselect';
import { RootState } from '../store/initialState';

const usersSelector = (state: RootState) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);
export const getUserName = createSelector(
  [usersSelector],
  state => state.username
);
