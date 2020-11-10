import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as History from 'history';

// import reducers
import { UsersReducer } from './UsersReducer';
import { ImagesReducer } from './ImgaesReducer';

export const createStore = (history: History.History<any>) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      user: UsersReducer,
      image: ImagesReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
};
