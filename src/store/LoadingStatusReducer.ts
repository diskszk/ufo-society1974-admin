import { initialState } from "./initialState";
import { LoadingStatus } from "../lib/types";

const loadingStatusInitialState = initialState.loadingStatus;

const REQUEST_FETCH = "REQUEST_FETCH";
const SUCCESS_FETCH = "SUCCESS_FETCH";
const FAILED_FETCH = "FAILED_FETCH";
const DISPLAY_MESSAGE = "DISPLAY_MESSAGE";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";

type RequestFetchAction = {
  type: typeof REQUEST_FETCH;
};
type SuccessFetchAction = {
  type: typeof SUCCESS_FETCH;
};
type FailedFetchAction = {
  type: typeof FAILED_FETCH;
  payload: LoadingStatus;
};
type DisplayMessageAction = {
  type: typeof DISPLAY_MESSAGE;
  payload: string | null;
};
type ClearMessageAction = {
  type: typeof CLEAR_MESSAGE;
  payload: string | null;
};

type LoadingStatusActions =
  | RequestFetchAction
  | SuccessFetchAction
  | FailedFetchAction
  | DisplayMessageAction
  | ClearMessageAction;

export const createRequestFetchAction = (): LoadingStatusActions => {
  return {
    type: REQUEST_FETCH,
  };
};

export const crateSuccessFetchAction = (): LoadingStatusActions => {
  return {
    type: SUCCESS_FETCH,
  };
};

export const createFailedFetchAction = (
  message: string | null
): LoadingStatusActions => {
  return {
    type: FAILED_FETCH,
    payload: { message: message, isLoading: false },
  };
};

export const createDisplayMessage = (
  message: string | null
): LoadingStatusActions => {
  return {
    type: DISPLAY_MESSAGE,
    payload: message,
  };
};

export const createClearMessageAction = (): LoadingStatusActions => {
  return {
    type: CLEAR_MESSAGE,
    payload: null,
  };
};

export const LoadingStatusReducer = (
  state = loadingStatusInitialState,
  action: LoadingStatusActions
): LoadingStatus => {
  switch (action.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_FETCH:
      return {
        ...state,
        isLoading: false,
      };
    case FAILED_FETCH:
      return {
        ...state,
        ...action.payload,
      };
    case DISPLAY_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
