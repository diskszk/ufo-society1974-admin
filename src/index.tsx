import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './store/store';
import * as History from 'history';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';

const history: History.History<any> = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ConnectedRouter> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
