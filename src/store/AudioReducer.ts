import { Audio } from "../lib/types";
import { initialState } from "./initialState";

const audioInitialState: Audio = initialState.audio;

const UPDATE_AUDIO = "UPDATE_AUDIO";
const PLAY_AUDIO = "PLAY_AUDIO";
const PAUSE_AUDIO = "PAUSE_AUDIO";

type UpdateAudioAction = {
  type: typeof UPDATE_AUDIO;
  payload: Audio;
};
type PlayAudioAction = {
  type: typeof PLAY_AUDIO;
};
type PauseAudioAction = {
  type: typeof PAUSE_AUDIO;
};

type AudioActions = UpdateAudioAction | PlayAudioAction | PauseAudioAction;

export const updateAudioAction = (state: Audio): AudioActions => {
  return {
    type: UPDATE_AUDIO,
    payload: {
      ...state,
    },
  };
};

export const playAudioActon = (): AudioActions => {
  return {
    type: PLAY_AUDIO,
  };
};

export const pauseMusicAction = (): AudioActions => {
  return {
    type: PAUSE_AUDIO,
  };
};

export const AudioReducer = (
  state: Audio = audioInitialState,
  action: AudioActions
): Audio => {
  switch (action.type) {
    case UPDATE_AUDIO:
      return {
        ...state,
      };
    case PLAY_AUDIO:
      return {
        ...state,
        isPaused: false,
      };
    case PAUSE_AUDIO:
      return {
        ...state,
        isPaused: true,
      };
    default:
      return state;
  }
};
