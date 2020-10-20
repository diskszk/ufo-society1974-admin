import { useSelector } from 'react-redux';
import { RootStore } from '../store/initialState';
import { User } from './types';

// const usersSelector = (state: RootState) => state.users;

const users = useSelector<RootStore, User>(state => state.users)


// export const getUserId = createSelector(
//   [usersSelector],
//   state => state.uid
// );
// export const getUserName = createSelector(
//   [usersSelector],
//   state => state.username
// );
