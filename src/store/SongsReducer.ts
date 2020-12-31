import { initialState } from './initialState';
import { Song } from '../lib/types';

const songsInitialState = initialState.songs;

const UPDATE_SONGS = 'UPDATE_SONGS';

type SongsActionType = {
  type: typeof UPDATE_SONGS;
  payload: Song[];
};

export const updateSongsAction = (state: Song[]): SongsActionType => {
  return {
    type: UPDATE_SONGS,
    payload: [...state],
  };
};

export const SongsReducer = (
  state = songsInitialState,
  action: SongsActionType
): Song[] => {
  switch (action.type) {
    case UPDATE_SONGS:
      return [...action.payload];

    default:
      return state;
  }
};
