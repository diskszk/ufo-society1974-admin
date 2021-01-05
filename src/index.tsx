import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './store/store';
import App from './App';
import './reset.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

export const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
