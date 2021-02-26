import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  Store,
} from 'redux';
import logger from 'redux-logger';

// import reducers
import { UsersReducer } from './UsersReducer';
import { ImagesReducer } from './ImageReducer';
import { AlbumReducer } from './AlbumReducer';
import { SongsReducer } from './SongsReducer';
import { SongFileReducer } from './SongFileReducer';
import { LoadingStatusReducer } from './LoadingStatusReducer';

export const createStore = (): Store => {
  return reduxCreateStore(
    combineReducers({
      user: UsersReducer,
      image: ImagesReducer,
      album: AlbumReducer,
      songFile: SongFileReducer,
      songs: SongsReducer,
      loadingStatus: LoadingStatusReducer,
    }),
    applyMiddleware(logger)
  );
};
