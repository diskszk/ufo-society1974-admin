import { initialState } from './initialState';
import { Album } from '../lib/types';

const albumInitialState = initialState.album;

const UPDATE_ALBUM = 'UPDATE_ALBUM';
const CLEAR_ALBUM = 'CLEAR_ALBUM';

type UpdateAlbumAction = {
  type: typeof UPDATE_ALBUM;
  payload: Album;
};
type ClearAlbumAction = {
  type: typeof CLEAR_ALBUM;
};

type AlbumActionTypes = UpdateAlbumAction | ClearAlbumAction;

export const updateAlbumAction = (state: Album): AlbumActionTypes => {
  return {
    type: UPDATE_ALBUM,
    payload: {
      ...state,
    },
  };
};

export const clearAlbumAction = (): AlbumActionTypes => {
  return {
    type: CLEAR_ALBUM,
  };
};

export const AlbumReducer = (
  state = albumInitialState,
  action: AlbumActionTypes
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
