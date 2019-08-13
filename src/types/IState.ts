import { Note } from '../api/models';

export interface IEntity<E> {
  byId: { [key: string]: E };
  allIds: ReadonlyArray<string>;
}

export interface IState {
  notes: IEntity<Note>;
}
