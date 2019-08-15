import React, { useEffect, useCallback } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NotePad from './NotePad/NotePad';
import SideBar from './SideBar/SideBar';
import { useDispatch } from 'react-redux';
import { loadNotesAsync } from '../actions/actions';

export const App: React.FC = () => {
  const dispatch = useCallback(useDispatch(), []);
  useEffect(() => {
    dispatch(loadNotesAsync());
  }, [dispatch]);
  return (
    <div className="vh-100 flex flex-column">
      <Header />
      <div className="flex h-100">
        <SideBar />
        <NotePad />
      </div>
      <Footer />
    </div>
  );
};

export default App;
