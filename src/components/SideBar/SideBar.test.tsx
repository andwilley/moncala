import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from './SideBar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mockReducer from '../../testUtils/mockReducer';
import { initialState } from '../../initialState/initialState';

describe('<SideBar> test a basic render output', () => {
  it('should render the sidebar', () => {
    const store = createStore(mockReducer(initialState));
    const tree = renderer
      .create(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call dispatch on note click', () => {
    const store = createStore(
      mockReducer({
        ...initialState,
        notes: {
          byId: {
            0: {
              id: 0,
              dateCreated: '',
              dateModified: '',
              content: 'test'
            }
          },
          allIds: [0]
        }
      })
    );

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
