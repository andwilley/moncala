import { ADD_NOTE, UPDATE_NOTE, Action, SET_NOTES } from '../actions/actions';
import { IState } from '../types/IState';
import { initialState } from '../initialState/initialState';
import { INote } from '../api/models';

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
