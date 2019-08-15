import React, { useState, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';

export const NotePad: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<Editor>(null);

  const onEditAreaClick = (e: React.MouseEvent) => {
    if (editorRef && editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div
      className="Notes dib w-100 pa3 bl b--near-white br3 br--left shadow-2"
      onClick={onEditAreaClick}
    >
      <Editor editorState={editorState} onChange={setEditorState} ref={editorRef} />
    </div>
  );
};

export default NotePad;
