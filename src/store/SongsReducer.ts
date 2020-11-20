import { initialState } from './initialState';
import { Song } from '../lib/types';

const UPDATE_SONGS = 'UPDATE_SONGS';

const songsInitialState = initialState.songs;

export const updateSongsAction = (state: Song[]) => {
  return {
    type: UPDATE_SONGS,
    payload: [...state],
  };
};

type Action = {
  type: string;
  payload: Song[];
};
export const SongsReducer = (state = songsInitialState, action: Action) => {
  switch (action.type) {
    case UPDATE_SONGS:
      return [...action.payload];

    default:
      return state;
  }
};
