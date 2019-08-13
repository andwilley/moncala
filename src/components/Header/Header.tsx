import React from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../actions/actions';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="Header h3 pt2 pl2">
      <div className="dib">
        <h2 className="ma0 b">Of Note</h2>
      </div>
      <div className="dib fr h2 w2 mr2 ba" onClick={() => dispatch(addNote(''))}>
        add
      </div>
    </div>
  );
};

export default Header;
