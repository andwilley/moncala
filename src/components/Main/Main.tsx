import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotePad from "../NotePad";
import SideBar from "../SideBar/SideBar";

export const Main: React.FC = () => {
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

export default Main;
