import Dexie from 'dexie';
import { INote } from '../api/models';

/**
 * indexeddb is a more flexible version of localstorage for offline state management. The only other
 * option is the filesystem API, which is not recommended by MDN.
 * Dexie is a wrapper around indexeddb operations, allowing declarative interaction with the store.
 */
export class MoncalaDb extends Dexie {
  notes: Dexie.Table<INote, number>;

  constructor() {
    super('MoncalaDb');

    //
    // Define tables and indexes
    //
    this.version(1).stores({
      notes: '++id,dateCreated,dateModified'
    });

    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.notes = this.table('notes');
  }
}
