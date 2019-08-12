import React from "react";

export const NoteListItem: React.FC = () => {
  return (
    <li className="bb b--light-gray pv2 dim pointer">
      <p className="ma0 truncate f6 b">This is the first more than fits line</p>
      <p className="mt1 truncate f6 fw5">This is the second line</p>
    </li>
  );
};

export default NoteListItem;
