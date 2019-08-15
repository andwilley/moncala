import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from './SideBar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mockReducer from '../../testUtils/mockReducer';
import { initialState } from '../../initialState/initialState';

describe('<SideBar> test a basic render output', () => {
  const store = createStore(mockReducer(initialState));
  it('should render the sidebar', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
