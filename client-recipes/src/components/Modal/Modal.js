import React from "react";
import Nav from "../Header/components/Nav";
import Title from "../Header/components/Title";

import "./Modal.css";

const Modal = ({  modalHandler }) => {
  return (
    <>
      <div className="modal-holder" onClick={() => modalHandler(false)}></div>
      <div
        className="modal"
        
      >
        <div style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <Title />
        </div>
        <Nav />
        <p style={{ marginTop: "4rem" }}>Copyright &copy; 2021 - salEZY</p>
      </div>
    </>
  );
};

export default Modal;
