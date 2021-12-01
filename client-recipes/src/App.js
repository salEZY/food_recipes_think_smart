import React from "react";
import { useModal } from './util/modal-hook'

import "./App.css";

import { AppContext } from "./context/app-context";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

function App() {
  const { modal, modalClass, modalHandler } = useModal()

  return (
    <AppContext.Provider
      value={{
        modalClass: modalClass,
        modal: modal,
        modalHandler: modalHandler
      }}
    >
      <div
        className="App"
        style={{
          paddingLeft: modal ? "0" : "1rem",
          paddingRight: modal ? "0" : "1rem",
        }}
      >
        {modal ? (
          <Modal />
        ) : (
          <>
            <Header />
            <Main />
            <Footer />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
