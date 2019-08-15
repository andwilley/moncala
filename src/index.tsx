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

serviceWorker.register();
