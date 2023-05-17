import { initialState } from "./initialState";
import { Album } from "../lib/types";

const albumInitialState = initialState.album;

const UPDATE_ALBUM = "UPDATE_ALBUM";
const CLEAR_ALBUM = "CLEAR_ALBUM";

type UpdateAlbumAction = {
  type: typeof UPDATE_ALBUM;
  payload: Album;
};
type ClearAlbumAction = {
  type: typeof CLEAR_ALBUM;
};

type AlbumActions = UpdateAlbumAction | ClearAlbumAction;

export const createUpdateAlbumAction = (state: Album): AlbumActions => {
  return {
    type: UPDATE_ALBUM,
    payload: {
      ...state,
    },
  };
};

export const createClearAlbumAction = (): AlbumActions => {
  return {
    type: CLEAR_ALBUM,
  };
};

export const AlbumReducer = (
  state = albumInitialState,
  action: AlbumActions
): Album => {
  switch (action.type) {
    case UPDATE_ALBUM:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_ALBUM:
      return {
        ...state,
      };
    default:
      return state;
  }
};
