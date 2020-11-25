import { Song } from '../lib/types';
import { initialState } from './initialState';

const songInitialState = initialState.song;

const UPDATE_SONG = 'UPDATE_SONG',
  CLEAR_SONG = 'CLEAR_SONG';

type UpdateSongAction = {
  type: typeof UPDATE_SONG;
  payload: Song;
};
type ResteSongActio = {
  type: typeof CLEAR_SONG;
};

type SongActionTypes = UpdateSongAction | ResteSongActio;

export const updateSongAction = (state: Song): SongActionTypes => {
  return {
    type: UPDATE_SONG,
    payload: {
      ...state,
    },
  };
};

export const resetSongAction = (): SongActionTypes => {
  return {
    type: CLEAR_SONG,
  };
};

export const SongReducer = (
  state: Song = songInitialState,
  action: SongActionTypes
): Song => {
  switch (action.type) {
    case UPDATE_SONG:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_SONG:
      return {
        ...state,
      };
    default:
      return state;
  }
};
