import { ADD_NOTE, UPDATE_NOTE, Action } from '../actions/actions';
import { IState } from '../types/IState';
import day from 'dayjs';
import { initialState } from '../initialState/initialState';

const reducer = (state: IState | undefined = initialState, action: Action): IState => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          byId: {
            ...state.notes.byId,
            [action.payload.id]: {
              id: action.payload.id,
              dateCreated: day().toISOString(),
              dateModified: day().toISOString(),
              content: action.payload.content
            }
          },
          allIds: state.notes.allIds.concat(action.payload.id)
        }
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          byId: {
            ...state.notes.byId,
            [action.payload.id]: {
              ...state.notes.byId[action.payload.id],
              ...action.payload
            }
          }
        }
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
