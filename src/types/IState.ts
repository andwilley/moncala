import { INote } from '../api/models';

export interface IEntity<E> {
  byId: { [key: string]: E };
  allIds: ReadonlyArray<number>;
}

export interface IState {
  notes: IEntity<INote>;
}
