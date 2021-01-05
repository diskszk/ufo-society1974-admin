import { initialState } from './initialState';
import { LoadingStatus } from '../lib/types';

const loadingStatusInitialState = initialState.loadingStatus;

const REQUEST_FETCH = 'REQUEST_FETCH';
const SUCCESS_FETCH = 'SUCCESS_FETCH';
const FAILED_FETCH = 'FAILED_FETCH';
const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

type RequestFetchAction = {
  type: typeof REQUEST_FETCH;
};
type SuccessFetchAction = {
  type: typeof SUCCESS_FETCH;
};
type FailedFetchAction = {
  type: typeof FAILED_FETCH;
  payload: string | null;
};
type DisplayMessageAction = {
  type: typeof DISPLAY_MESSAGE;
  payload: string | null;
};
type ClearMessageAction = {
  type: typeof CLEAR_MESSAGE;
};

type LoadingStatusActionTypes =
  | RequestFetchAction
  | SuccessFetchAction
  | FailedFetchAction
  | DisplayMessageAction
  | ClearMessageAction;

export const requestFetchAction = (): LoadingStatusActionTypes => {
  return {
    type: REQUEST_FETCH,
  };
};

export const successFetchAction = (): LoadingStatusActionTypes => {
  return {
    type: SUCCESS_FETCH,
  };
};

export const failedFetchAction = (
  message: string | null
): LoadingStatusActionTypes => {
  return {
    type: FAILED_FETCH,
    payload: message,
  };
};

export const displayMessage = (
  message: string | null
): LoadingStatusActionTypes => {
  return {
    type: DISPLAY_MESSAGE,
    payload: message,
  };
};

export const clearMessageAction = (): LoadingStatusActionTypes => {
  return {
    type: CLEAR_MESSAGE,
  };
};

export const LoadingStatusReducer = (
  state = loadingStatusInitialState,
  action: LoadingStatusActionTypes
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
        isLoading: false,
        message: action.payload,
      };
    case DISPLAY_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
