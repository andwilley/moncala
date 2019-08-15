import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { initialState } from '../initialState/initialState';
import mockReducer from '../testUtils/mockReducer';

describe('Test app rendering', () => {
  const createNodeMock = () => {
    // You can return anything from this function.
    // For example:
    return {
      focus: () => undefined
      // Do nothing
    };
  };

  const store = createStore(mockReducer(initialState));
  store.dispatch = jest.fn();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div,
      createNodeMock
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
