import { File } from "../lib/types";
import { initialState } from "./initialState";

const imageInitialState = initialState.image;

const UPDATE_IMAGE = "UPDATE_IMAGE";
const CLEAR_IMAGE = "CLEAR_IMAGE";

type UpdateImageAction = {
  type: typeof UPDATE_IMAGE;
  payload: File;
};
type ClearImageAction = {
  type: typeof CLEAR_IMAGE;
  payload: File;
};

type ImageActions = UpdateImageAction | ClearImageAction;

// action
export const createUpdateImageAction = (state: File): ImageActions => {
  return {
    type: UPDATE_IMAGE,
    payload: {
      ...state,
    },
  };
};

export const createClearImageAction = (): ImageActions => {
  return {
    type: CLEAR_IMAGE,
    payload: {
      ...imageInitialState,
    },
  };
};

export const ImagesReducer = (
  state: File = imageInitialState,
  action: ImageActions
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
