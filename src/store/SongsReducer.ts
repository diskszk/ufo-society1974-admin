import { initialState } from "./initialState";
import { Song } from "../lib/types";

const songsInitialState = initialState.songs;

const UPDATE_SONGS = "UPDATE_SONGS";

type SongsAction = {
  type: typeof UPDATE_SONGS;
  payload: Song[];
};

export const createUpdateSongsAction = (state: Song[]): SongsAction => {
  return {
    type: UPDATE_SONGS,
    payload: [...state],
  };
};

export const SongsReducer = (
  state = songsInitialState,
  action: SongsAction
): Song[] => {
  switch (action.type) {
    case UPDATE_SONGS:
      return [...action.payload];

    default:
      return state;
  }
};
