import { mockDateString } from './dayjs';

export const notes = [{
  id: 0,
  dateCreated: mockDateString,
  dateModified: mockDateString,
  content: ''
}];

const mockDexie = {
  notes: {
    add: () => 0,
    update: () => 0,
    delete: () => undefined,
    toArray: () => notes
  }
}

export default mockDexie;