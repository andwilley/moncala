import { initialState } from '../initialState/initialState';
import { IState } from '../types/IState';
import reducer from './reducer';
import {
  addNote,
  setNotes,
  updateNote,
  deleteNote,
  setEditorState,
  setActiveId,
  setFocusEditor,
  SET_EDITOR_STATE,
  SET_ACTIVE_ID
} from '../actions/actions';
import { mockDateString } from '../__mocks__/dayjs';
import { EditorState, ContentState } from 'draft-js';

let startState: IState;

beforeEach(() => {
  startState = {
    ...initialState,
    notes: {
      byId: {
        0: {
          id: 0,
          content: 'test',
          dateCreated: '2019-01-02T09:00:00.00',
          dateModified: '2019-01-02T09:00:00.00'
        }
      },
      allIds: [0]
    }
  };
});

describe('Test the reducer logic', () => {
  it('should return old state when passed undefined action', () => {
    expect(
      reducer(startState, { type: 'not an action' as typeof SET_ACTIVE_ID, payload: 0 })
    ).toEqual(startState);
  });

  it('should return initial when passed undefined state', () => {
    expect(
      reducer(undefined, { type: 'not an action' as typeof SET_ACTIVE_ID, payload: 0 })
    ).toEqual(initialState);
  });

  it('should add a note when addNote action is passed', () => {
    const newNote = {
      id: 1,
      content: 'new',
      dateCreated: '2019-01-02T09:00:00.00',
      dateModified: '2019-01-02T09:00:00.00'
    };

    const newNoteNoId = {
      content: 'new',
      dateCreated: '2019-01-02T09:00:00.00',
      dateModified: '2019-01-02T09:00:00.00'
    };

    const expectedState = {
      ...startState,
      notes: {
        byId: {
          ...startState.notes.byId,
          [newNote.id]: newNote
        },
        allIds: [0, newNote.id]
      }
    };

    expect(reducer(startState, addNote(newNote))).toEqual(expectedState);
    expect(reducer(startState, addNote(newNoteNoId))).toEqual(startState);
  });

  it('should set all notes when setNotes action is passed', () => {
    const newNote1 = {
      id: 1,
      content: 'new',
      dateCreated: '2019-01-02T09:00:00.00',
      dateModified: '2019-01-02T09:00:00.00'
    };

    const newNote2 = {
      id: 2,
      content: 'new',
      dateCreated: '2019-01-02T09:00:00.00',
      dateModified: '2019-01-02T09:00:00.00'
    };

    const expectedState = {
      ...startState,
      notes: {
        byId: {
          [newNote1.id]: newNote1,
          [newNote2.id]: newNote2
        },
        allIds: [newNote1.id, newNote2.id]
      }
    };

    expect(reducer(startState, setNotes([newNote1, newNote2]))).toEqual(expectedState);
  });

  it('should update note when updateNote action is passed', () => {
    const updatedNote = {
      content: 'new',
      dateModified: mockDateString
    };

    const expectedState = {
      ...startState,
      notes: {
        ...startState.notes,
        byId: {
          0: {
            ...startState.notes.byId[0],
            ...updatedNote
          }
        }
      }
    };

    expect(reducer(startState, updateNote(0, updatedNote))).toEqual(expectedState);
  });

  it('should delete note when deleteNote action is passed', () => {
    const expectedState = {
      ...startState,
      notes: {
        ...startState.notes,
        byId: {},
        allIds: []
      }
    };

    expect(reducer(startState, deleteNote(0))).toEqual(expectedState);
  });

  it('should set editor state when set editor state action is passed', () => {
    const newEditor = EditorState.createWithContent(ContentState.createFromText(''));

    const expectedState = {
      ...startState,
      editorState: newEditor
    };

    expect(reducer(startState, setEditorState(newEditor))).toEqual(expectedState);
  });

  it('should set active id when set active id action is passed', () => {
    const expectedState = {
      ...startState,
      activeId: 2
    };

    expect(reducer(startState, setActiveId(2))).toEqual(expectedState);
  });

  it('should set focus when set focus action is passed', () => {
    const expectedState = {
      ...startState,
      focusEditor: true
    };

    expect(reducer(startState, setFocusEditor(true))).toEqual(expectedState);
  });
});
