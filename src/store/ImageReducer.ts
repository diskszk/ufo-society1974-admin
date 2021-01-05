import { File } from '../lib/types';
import { initialState } from './initialState';

const imageInitialState = initialState.image;

const UPDATE_IMAGE = 'UPDATE_IMAGE';
const CLEAR_IMAGE = 'CLEAR_IMAGE';

type UpdateImageAction = {
  type: typeof UPDATE_IMAGE;
  payload: File;
};
type ClearImageAction = {
  type: typeof CLEAR_IMAGE;
  payload: File;
};

type ImageActionTypes = UpdateImageAction | ClearImageAction;

// action
export const updateImageAction = (state: File): ImageActionTypes => {
  return {
    type: UPDATE_IMAGE,
    payload: {
      ...state,
    },
  };
};

export const clearImageAction = (): ImageActionTypes => {
  return {
    type: CLEAR_IMAGE,
    payload: {
      ...imageInitialState,
    },
  };
};

export const ImagesReducer = (
  state: File = imageInitialState,
  action: ImageActionTypes
): File => {
  switch (action.type) {
    case UPDATE_IMAGE:
      return {
        ...state,
        ...action.payload,
      };

    case CLEAR_IMAGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
