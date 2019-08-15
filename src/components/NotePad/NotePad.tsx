import React, { useRef, useEffect } from 'react';
import { Editor, EditorState } from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { getEditorState, getActiveId, getFocusEditor } from '../../reducers/reducer';
import {
  setEditorState,
  addNoteAsync,
  updateNoteAsync,
  setFocusEditor
} from '../../actions/actions';

export const NotePad: React.FC = () => {
  const editorState = useSelector(getEditorState);
  const activeId = useSelector(getActiveId);
  const focusEditor = useSelector(getFocusEditor);
  const dispatch = useDispatch();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (focusEditor && editorRef && editorRef.current) {
      editorRef.current.focus();
      dispatch(setFocusEditor(false));
    }
  }, [activeId, focusEditor, dispatch]);

  const onEditAreaClick = (e: React.MouseEvent) => {
    if (editorRef && editorRef.current) {
      editorRef.current.focus();
      if (!activeId) {
        dispatch(addNoteAsync());
      }
    }
  };

  const onEditorChange = (editState: EditorState) => {
    dispatch(setEditorState(editState));
    const text = editState.getCurrentContent().getPlainText();
    if (activeId) {
      dispatch(updateNoteAsync(activeId, text));
    }
  };

  return (
    <div
      title="NotePad"
      className="NotePad dib w-100 pa3 bl b--near-white br3 br--left shadow-1"
      onClick={onEditAreaClick}
    >
      <Editor editorState={editorState} onChange={onEditorChange} ref={editorRef} />
    </div>
  );
};

export default NotePad;
