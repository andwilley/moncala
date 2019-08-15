import {
  addNoteAsync,
  setActiveId,
  addNote,
  setFocusEditor,
  updateNoteAsync,
  updateNote,
  deleteNoteAsync,
  deleteNote,
  setEditorState,
  loadNotesAsync,
  setNotes
} from './actions';
import mockDexie from 'dexie';
import { MoncalaDb } from '../indexeddb/db';
import { mockDateString } from '../__mocks__/dayjs';
import { EditorState } from 'draft-js';
import { notes } from '../__mocks__/dexie';

describe('Test Async Actions', () => {
  it('should dispatch for loading events', async () => {
    const loadNotesThunkAction = loadNotesAsync();

    // mocks
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    await loadNotesThunkAction(mockDispatch, mockGetState, (mockDexie as unknown) as MoncalaDb);

    expect(mockDispatch).toHaveBeenCalledWith(setNotes(notes));
  });

  it('should dispatch for adding event', async () => {
    const addNoteThunkAction = addNoteAsync();

    const newNote = {
      id: 0,
      dateCreated: mockDateString,
      dateModified: mockDateString,
      content: ''
    };

    // mocks
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    await addNoteThunkAction(mockDispatch, mockGetState, (mockDexie as unknown) as MoncalaDb);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, setActiveId(0));
    expect(mockDispatch).toHaveBeenNthCalledWith(2, addNote(newNote));
    expect(mockDispatch).toHaveBeenNthCalledWith(3, setFocusEditor(true));
  });

  it('should dispatch for updating event', async () => {
    const updateNoteThunkAction = updateNoteAsync(0, 'test');

    const newNote = {
      dateModified: mockDateString,
      content: 'test'
    };

    // mocks
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    await updateNoteThunkAction(mockDispatch, mockGetState, (mockDexie as unknown) as MoncalaDb);

    expect(mockDispatch).toHaveBeenCalledWith(updateNote(0, newNote));
  });

  it('should dispatch for deleting an event', async () => {
    const deleteNoteThunkAction = deleteNoteAsync(0, 0);

    // mocks
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    await deleteNoteThunkAction(mockDispatch, mockGetState, (mockDexie as unknown) as MoncalaDb);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, deleteNote(0));
    expect(mockDispatch).toHaveBeenNthCalledWith(2, setActiveId(undefined));
    expect(mockDispatch).toHaveBeenNthCalledWith(3, setEditorState(EditorState.createEmpty()));
  });
});
