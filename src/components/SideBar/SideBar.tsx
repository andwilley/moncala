import React from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import { useSelector } from 'react-redux';
import { getNotes } from '../../reducers/reducer';

export const SideBar: React.FC = () => {
  const notes = useSelector(getNotes);
  return (
    <div className="Sidebar dib w5 h-100 ph2 overflow-y-auto">
      <ul className="NotesList list pl0 mt0">
        {notes.map(note => (
          <NoteListItem note={note} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
