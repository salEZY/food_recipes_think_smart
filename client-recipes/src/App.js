import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

function App() {
  const [modal, setModal] = React.useState(false);

  const modalHandler = (bool) => {
    setModal(bool);
  };
  return (
    <div
      className="App"
      style={{
        paddingLeft: modal ? "0" : "1rem",
        paddingRight: modal ? "0" : "1rem",
      }}
    >
      {modal ? (
        <Modal modalHandler={modalHandler} />
      ) : (
        <>
          <Header modalHandler={modalHandler} />
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
