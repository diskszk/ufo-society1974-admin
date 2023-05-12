import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './reset.css';

import { Provider } from 'react-redux';
import { createStore } from './store/store';
import { BrowserRouter } from 'react-router-dom';

const store = createStore();

const container = document.getElementById('root');

if (!container) {
  throw new Error('Can not find app root.');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
