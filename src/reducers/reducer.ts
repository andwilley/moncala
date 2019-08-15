import {
  ADD_NOTE,
  UPDATE_NOTE,
  Action,
  SET_NOTES,
  SET_EDITOR_STATE,
  SET_ACTIVE_ID,
  SET_FOCUS_EDITOR,
  DELETE_NOTE
} from '../actions/actions';
import { IState } from '../types/IState';
import { initialState } from '../initialState/initialState';
import { INote } from '../api/models';

/*
 *
 * Reducer
 *
 */

const reducer = (state: IState | undefined = initialState, action: Action): IState => {
  switch (action.type) {
    case SET_NOTES:
      const newNotesById = action.payload.reduce((acc, note) => {
        return note.id
          ? {
              ...acc,
              [note.id]: note
            }
          : acc;
      }, {});

      return {
        ...state,
        notes: {
          byId: newNotesById,
          allIds: (action.payload.filter(note => note.id) as Required<INote>[]).map(note => note.id)
        }
      };
    case ADD_NOTE:
      return action.payload.id
        ? {
            ...state,
            notes: {
              ...state.notes,
              byId: {
                ...state.notes.byId,
                [action.payload.id]: action.payload
              },
              allIds: state.notes.allIds.concat(action.payload.id)
            }
          }
        : state;
    case UPDATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          byId: {
            ...state.notes.byId,
            [action.payload.id]: {
              ...state.notes.byId[action.payload.id],
              ...action.payload.note
            }
          }
        }
      };
    case DELETE_NOTE:
      const { [action.payload]: del, ...rest } = state.notes.byId;
      return {
        ...state,
        notes: {
          byId: rest,
          allIds: state.notes.allIds.filter(noteId => noteId !== action.payload)
        }
      };
    case SET_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload
      };
    case SET_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload
      };
    case SET_FOCUS_EDITOR:
      return {
        ...state,
        focusEditor: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

/*
 *
 * Selectors
 *
 */

export const getNoteIds = (state: IState) => state.notes.allIds;
export const getNotesById = (state: IState) => state.notes.byId;
export const getNotes = (state: IState) =>
  getNoteIds(state).map(noteId => getNotesById(state)[noteId]);
export const getActiveId = (state: IState) => state.activeId;
export const getEditorState = (state: IState) => state.editorState;
export const getFocusEditor = (state: IState) => state.focusEditor;
