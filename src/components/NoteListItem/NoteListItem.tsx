import React from 'react';
import { INote } from '../../api/models';
import Icon from '../../Icon/Icon';

export interface INoteListItemProps {
  note: INote;
  isActive: boolean;
  onDelete: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

export const NoteListItem: React.FC<INoteListItemProps> = ({
  note,
  onClick,
  onDelete,
  isActive
}) => {
  const content = note.content;
  const lines = content.split(/\r\n|\r|\n/);
  const filledLines = lines.filter(line => /\S/.test(line));

  return (
    <li
      onClick={onClick}
      title="NoteItem"
      style={{ minHeight: '2rem' }}
      className={`relative bb br1 ph2 b--light-gray pv2 hide-child dim pointer ${
        isActive ? 'bg-lightest-blue' : ''
      }`}
    >
      <p className="ma0 truncate f6 b">{filledLines[0]}</p>
      <p className="mt1 mb0 truncate f6 fw5">{filledLines.length > 1 ? filledLines[1] : ''}</p>
      <span className="absolute" style={{ right: 0, top: '.3rem' }} onClick={onDelete}>
        <Icon className="child" size={20} name="delete" />
      </span>
    </li>
  );
};

export default NoteListItem;
