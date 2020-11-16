import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as History from 'history';

// import reducers
import { UsersReducer } from './UsersReducer';
import { ImagesReducer } from './ImgaeReducer';
import { AlbumReducer } from './AlbumReducer';

export const createStore = (history: History.History<any>) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      user: UsersReducer,
      image: ImagesReducer,
      album: AlbumReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
};
