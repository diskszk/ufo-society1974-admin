import { File } from '../lib/types';
import { initialState } from './initialState';
import { noImage } from '../constans';

const UPDATE_IMAGE = "UPDATE_IMAGE", DELETE_IMAGE = "DELETE_IMAGE";

const imageInitialState = initialState.image;

// action
export const updateImageAction = (imageState: File): { type: string; payload: File } => {
  return {
    type: UPDATE_IMAGE,
    payload: {
      filename: imageState.filename,
      path: imageState.path
    }
  }
};

export const deleteImageAction = (): { type: string; payload: File } => {
  return {
    type: DELETE_IMAGE,
    payload: {
      filename: "",
      path: noImage
    }
  }
};

// reducer
export const ImagesReducer = (state = imageInitialState, action: any) => {
  switch (action.type) {
    case UPDATE_IMAGE:
      return {
        ...state,
        ...action.payload
      };

    case DELETE_IMAGE:
      return {
        ...action.payload
      };

    default:
      return state;
  }
}