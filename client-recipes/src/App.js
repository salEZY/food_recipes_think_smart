import React from "react";

import "./App.css";

import { AppContext } from "./context/app-context";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

function App() {
  const [modal, setModal] = React.useState(false);
  const [modalClass, setModalClass] = React.useState("dismiss");

  const modalHandler = (bool) => {
    if (modalClass === "dismiss") setModalClass("activate");
    else setModalClass("dismiss");
    setTimeout(() => {
      setModal(bool);
    }, 200);
  };

  return (
    <AppContext.Provider
      value={{
        modalClass: modalClass,
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
          <Modal modalHandler={modalHandler} modal={modal} />
        ) : (
          <>
            <Header modalHandler={modalHandler} />
            <Main />
            <Footer />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
