import { initialState } from './initialState';
import { Album } from '../lib/types';
import { noImage } from '../constans';

const UPDATE_ALBUM = "UPDATE_ALBUM";
const CLEAR_ALBUM = "CLEAR_ALBUM";
const albumInitialState = initialState.album;

export const updateAlbumAction = (state: Album) => {
  return {
    type: UPDATE_ALBUM,
    payload: {
      ...state,
    }
  }
};

export const clearAlbumAction = () => {
  return {
    type: CLEAR_ALBUM,
    // payload: {
    //   ...albumInitialState,
    // }
  }
};

export const AlbumReducer = (state = albumInitialState, action: any) => {
  switch (action.type) {
    case UPDATE_ALBUM:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_ALBUM:
      return {
        ...state,
      };
    default:
      return state;
  }
};