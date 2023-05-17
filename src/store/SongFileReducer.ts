import { File } from "../lib/types";
import { initialState } from "./initialState";

const songFileInitialState = initialState.songFile;

const UPDATE_SONG_FILE = "UPDATE_SONG_FILE";
const CLEAR_SONG_FILE = "CLEAR_SONG_FILE";

type UpdateSongFileAction = {
  type: typeof UPDATE_SONG_FILE;
  payload: File;
};
type ClearSongFileAction = {
  type: typeof CLEAR_SONG_FILE;
  payload: File;
};

type SongFileActions = UpdateSongFileAction | ClearSongFileAction;

export const createUpdateSongFileAction = (state: File): SongFileActions => {
  return {
    type: UPDATE_SONG_FILE,
    payload: {
      ...state,
    },
  };
};

export const clearSongFileAction = (): SongFileActions => {
  return {
    type: CLEAR_SONG_FILE,
    payload: {
      filename: "",
      path: "",
    },
  };
};

export const SongFileReducer = (
  state: File = songFileInitialState,
  action: SongFileActions
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
