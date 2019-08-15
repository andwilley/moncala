import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mockReducer from '../../testUtils/mockReducer';
import { initialState } from '../../initialState/initialState';

describe('<Header> test a basic render output', () => {
  const store = createStore(mockReducer(initialState));
  it('should render the notepad', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Header />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
