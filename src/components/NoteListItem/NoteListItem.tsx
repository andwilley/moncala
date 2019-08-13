import React from 'react';
import { Note } from '../../api/models';

export interface INoteListItemProps {
  note: Note;
}

export const NoteListItem: React.FC<INoteListItemProps> = ({ note }) => {
  return (
    <li className="bb b--light-gray pv2 dim pointer">
      <p className="ma0 truncate f6 b">{note.content}</p>
      <p className="mt1 truncate f6 fw5">{note.content}</p>
    </li>
  );
};

export default NoteListItem;
