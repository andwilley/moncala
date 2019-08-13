import { action, ActionType } from 'typesafe-actions';
import { Note } from '../api/models';
import uuid4 from 'uuid/v4';

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';

export const addNote = (content: string) => action(ADD_NOTE, { id: uuid4(), content });

export const updateNote = (note: Note) => action(UPDATE_NOTE, note);

export type Action = ActionType<typeof addNote> | ActionType<typeof updateNote>;
