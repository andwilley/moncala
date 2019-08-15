import { IState } from '../types/IState';
import { EditorState } from 'draft-js';

export const initialState: IState = {
  notes: {
    byId: {},
    allIds: []
  },
  activeId: undefined,
  editorState: EditorState.createEmpty(),
  focusEditor: false
};
