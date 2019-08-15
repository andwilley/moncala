import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/reducer';
import { Provider } from 'react-redux';
import { MoncalaDb } from './indexeddb/db';

/**
 * Redux is obviously overkill for this app, but I wanted to show my confort level with some
 * useful front end tools. This use takes advantage of async actions for interaction with the
 * browser indexeddb API.
 */
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument(new MoncalaDb()))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

/**
 * This doesn't run in dev mode, but when the app is built, this registers the service worker,
 * allowing the app to be relaoded even when the server is not responding or the client is offline.
 * Once is loads once, the browswer will cache the artifacts and serve them if needed.
 */
serviceWorker.register();
