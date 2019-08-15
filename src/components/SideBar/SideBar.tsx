import React from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes, getActiveId } from '../../reducers/reducer';
import {
  setEditorState,
  setActiveId,
  deleteNoteAsync,
  setFocusEditor
} from '../../actions/actions';
import { EditorState, ContentState } from 'draft-js';

export const SideBar: React.FC = () => {
  const notes = useSelector(getNotes);
  const activeId = useSelector(getActiveId);
  const dispatch = useDispatch();

  /**
   * Set the active note to this one, set the editor state and active note id, then focus the editor
   * @param noteId the id of the note to activate
   * @param content the content of this note
   */
  const onNoteClick = (noteId: number, content: string) => (e: React.MouseEvent) => {
    dispatch(setEditorState(EditorState.createWithContent(ContentState.createFromText(content))));
    dispatch(setActiveId(noteId));
    dispatch(setFocusEditor(true));
  };

  /**
   * handle deleting a note. stopProp because onclick on the parent activates this note in the editor.
   * @param noteId the id to delete
   */
  const onNoteDelete = (noteId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteNoteAsync(noteId, activeId));
  };

  return (
    <div className="Sidebar dib w5 h-100 ph2 overflow-y-auto">
      <ul className="NotesList list pl0 mt0">
        {notes.map(
          note =>
            note.id && (
              <NoteListItem
                key={note.id}
                isActive={activeId === note.id}
                onDelete={onNoteDelete(note.id)}
                onClick={onNoteClick(note.id, note.content)}
                note={note}
              />
            )
        )}
      </ul>
    </div>
  );
};

export default SideBar;
