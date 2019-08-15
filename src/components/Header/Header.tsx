import React from 'react';
import { useDispatch } from 'react-redux';
import { addNoteAsync } from '../../actions/actions';
import { ContentState, convertToRaw } from 'draft-js';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="Header h3 pt2 pl2">
      <div className="dib">
        <h2 className="ma0 b">Of Note</h2>
      </div>
      <div
        className="dib fr h2 w2 mr2 ba"
        onClick={() =>
          dispatch(addNoteAsync(JSON.stringify(convertToRaw(ContentState.createFromText('')))))
        }
      >
        add
      </div>
    </div>
  );
};

export default Header;
