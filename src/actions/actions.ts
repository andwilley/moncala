import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { IState } from '../types/IState';
import { MoncalaDb } from '../indexeddb/db';
import { INote } from '../api/models';
import day from 'dayjs';
import { EditorState } from 'draft-js';

// Action type constants

export const SET_NOTES = 'SET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_EDITOR_STATE = 'SET_EDITOR_STATE';
export const SET_ACTIVE_ID = 'SET_ACTIVE_ID';
export const SET_FOCUS_EDITOR = 'SET_FOCUS_EDITOR';

// Action creators

export const setNotes = (notes: INote[]) => action(SET_NOTES, notes);
export const loadNotesAsync = (): ThunkAction<void, IState, MoncalaDb, Action> => async (
  dispatch,
  _,
  db
) => {
  const notes = await db.notes.toArray();
  dispatch(setNotes(notes));
};

export const addNote = (note: INote) => action(ADD_NOTE, note);
export const addNoteAsync = (): ThunkAction<void, IState, MoncalaDb, Action> => async (
  dispatch,
  _,
  db
) => {
  const newNote: INote = {
    dateCreated: day().toISOString(),
    dateModified: day().toISOString(),
    content: ''
  };
  const newId = await db.notes.add(newNote);
  dispatch(setActiveId(newId));
  dispatch(addNote({ ...newNote, id: newId }));
  dispatch(setFocusEditor(true));
};

export const updateNote = (noteId: number, note: Partial<INote>) =>
  action(UPDATE_NOTE, { id: noteId, note });
export const updateNoteAsync = (
  noteId: number,
  content: string
): ThunkAction<void, IState, MoncalaDb, Action> => async (dispatch, _, db) => {
  const noteUpdates = {
    content,
    dateModified: day().toISOString()
  };

  dispatch(updateNote(noteId, noteUpdates));
  await db.notes.update(noteId, { content: content });
};

export const deleteNote = (noteId: number) => action(DELETE_NOTE, noteId);
export const deleteNoteAsync = (
  noteId: number,
  activeId: number | undefined
): ThunkAction<void, IState, MoncalaDb, Action> => async (dispatch, _, db) => {
  await db.notes.delete(noteId);
  dispatch(deleteNote(noteId));
  if (activeId === noteId) {
    dispatch(setActiveId(undefined));
    dispatch(setEditorState(EditorState.createEmpty()));
  }
};

export const setEditorState = (editorState: EditorState) => action(SET_EDITOR_STATE, editorState);
export const setActiveId = (noteId: number | undefined) => action(SET_ACTIVE_ID, noteId);
export const setFocusEditor = (flag: boolean) => action(SET_FOCUS_EDITOR, flag);

export type Action =
  | ActionType<typeof addNote>
  | ActionType<typeof updateNote>
  | ActionType<typeof setNotes>
  | ActionType<typeof deleteNote>
  | ActionType<typeof setEditorState>
  | ActionType<typeof setActiveId>
  | ActionType<typeof setFocusEditor>;
