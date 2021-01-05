import { File } from '../lib/types';
import { initialState } from './initialState';

const songFileInitialState = initialState.songFile;

const UPDATE_SONG_FILE = 'UPDATE_SONG_FILE';
const CLEAR_SONG_FILE = 'CLEAR_SONG_FILE';

type UpdateSongFileAction = {
  type: typeof UPDATE_SONG_FILE;
  payload: File;
};
type ClearSongFileActuon = {
  type: typeof CLEAR_SONG_FILE;
  payload: File;
};

type SongFileActionTypes = UpdateSongFileAction | ClearSongFileActuon;

export const updateSongFileAction = (newFile: File): SongFileActionTypes => {
  return {
    type: UPDATE_SONG_FILE,
    payload: {
      ...newFile,
    },
  };
};

export const clearSongFileAction = (): SongFileActionTypes => {
  return {
    type: CLEAR_SONG_FILE,
    payload: {
      filename: '',
      path: '',
    },
  };
};

export const SongFileReducer = (
  state: File = songFileInitialState,
  action: SongFileActionTypes
): File => {
  switch (action.type) {
    case UPDATE_SONG_FILE:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_SONG_FILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
