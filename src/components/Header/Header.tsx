import React from 'react';
import { useDispatch } from 'react-redux';
import { addNoteAsync, setEditorState } from '../../actions/actions';
import Icon from '../../Icon/Icon';
import Button from '../Button/Button';
import { EditorState } from 'draft-js';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="Header h3 pt2 pl2">
      <div className="dib w5">
        <h2 className="ma0 b">Of Note</h2>
      </div>
      <Button
        hasBorder={true}
        onClick={() => {
          dispatch(setEditorState(EditorState.createEmpty()));
          dispatch(addNoteAsync());
        }}
      >
        <span className="flex items-center">
          <Icon className="dib h2 w2 pointer" fillColor="#555555" name="plus" size={30} />
          New Note
        </span>
      </Button>
    </div>
  );
};

export default Header;
