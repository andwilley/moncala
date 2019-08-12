import React from "react";
import NoteListItem from "../NoteListItem/NoteListItem";

export const SideBar: React.FC = () => {
  return (
    <div className="Sidebar dib w5 h-100 ph2 overflow-y-auto">
      <ul className="NotesList list pl0 mt0">
        {[1, 2, 3, 4].map(e => (
          <NoteListItem />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
