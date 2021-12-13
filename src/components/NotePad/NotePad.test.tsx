import React from 'react';
import renderer from 'react-test-renderer';
import NotePad from './NotePad';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mockReducer from '../../testUtils/mockReducer';
import { initialState } from '../../initialState/initialState';
import { Editor, EditorState } from 'draft-js';
import { setEditorState, addNoteAsync } from '../../actions/actions';

describe('<NotePad> test a render output', () => {
  it('should render the notepad', () => {
    const store = createStore(mockReducer(initialState));
    store.dispatch = jest.fn();
    const tree = renderer
      .create(
        <Provider store={store}>
          <NotePad />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call dispatch on editorChange', () => {
    const store = createStore(mockReducer(initialState));
    store.dispatch = jest.fn();

    const comp = renderer.create(
      <Provider store={store}>
        <NotePad />
      </Provider>
    );
    const inst = comp.root;
    const emptyState = EditorState.createEmpty();
    const element = inst.findByType(Editor);
    element.props.onChange(emptyState);
    expect(store.dispatch).toHaveBeenCalledWith(setEditorState(emptyState));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call dispatch on editorChange', () => {
    const store = createStore(mockReducer({ ...initialState, focusEditor: true, activeId: 1 }));
    store.dispatch = jest.fn();

    const comp = renderer.create(
      <Provider store={store}>
        <NotePad />
      </Provider>
    );
    const inst = comp.root;
    inst.findByType(Editor).props.onChange(EditorState.createEmpty());
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should call dispatch on edit area click', () => {
    const store = createStore(mockReducer(initialState));
    store.dispatch = jest.fn();

    const comp = renderer.create(
      <Provider store={store}>
        <NotePad />
      </Provider>
    );
    const inst = comp.root;
    inst.findByProps({ title: 'NotePad' }).props.onClick({});
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should not call dispatch on edit area click if activeId is set', () => {
    const store = createStore(mockReducer({ ...initialState, activeId: 1 }));
    store.dispatch = jest.fn();

    const comp = renderer.create(
      <Provider store={store}>
        <NotePad />
      </Provider>
    );
    const inst = comp.root;
    inst.findByProps({ title: 'NotePad' }).props.onClick({});
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
