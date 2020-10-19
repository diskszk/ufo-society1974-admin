import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './reducks/store/store';
import * as History from 'history';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router';
// import {Routes } from './Routes';

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
    <Router history={history}>
      <App />
      {/* <Routes /> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
