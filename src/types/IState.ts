import { INote } from '../api/models';
import { EditorState } from 'draft-js';

export interface IEntity<E> {
  byId: { [key: string]: E };
  allIds: ReadonlyArray<number>;
}

export interface IState {
  notes: IEntity<INote>;
  activeId: number | undefined;
  editorState: EditorState;
  focusEditor: boolean;
}
