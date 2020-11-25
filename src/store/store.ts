import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as History from 'history';
import logger from 'redux-logger';

// import reducers
import { UsersReducer } from './UsersReducer';
import { ImagesReducer } from './ImgaeReducer';
import { AlbumReducer } from './AlbumReducer';
import { SongsReducer } from './SongsReducer';
import { SongFileReducer } from './SongFileReducer';

export const createStore = (history: History.History<any>) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      user: UsersReducer,
      image: ImagesReducer,
      album: AlbumReducer,
      songFile: SongFileReducer,
      songs: SongsReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk, logger)
  );
};
