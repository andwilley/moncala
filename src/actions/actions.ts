import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { IState } from '../types/IState';
import { MoncalaDb } from '../indexeddb/db';
import { INote } from '../api/models';
import day from 'dayjs';

// Action type constants

export const SET_NOTES = 'SET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';

// Action creators

export const setNotes = (notes: INote[]) => action(SET_NOTES, notes);
export const loadNotes = (): ThunkAction<void, IState, MoncalaDb, Action> => async (
  dispatch,
  _,
  db
) => {
  const notes = await db.notes.toArray();
  dispatch(setNotes(notes));
};

export const addNote = (note: INote) => action(ADD_NOTE, note);
export const addNoteAsync = (
  content: string
): ThunkAction<void, IState, MoncalaDb, Action> => async (dispatch, _, db) => {
  const newNote: INote = {
    dateCreated: day().toISOString(),
    dateModified: day().toISOString(),
    content
  };
  const newId = await db.notes.add(newNote);
  dispatch(addNote({ ...newNote, id: newId }));
};

export const updateNote = (noteId: number, note: Partial<INote>) =>
  action(UPDATE_NOTE, { id: noteId, note });

export type Action =
  | ActionType<typeof addNote>
  | ActionType<typeof updateNote>
  | ActionType<typeof setNotes>;
