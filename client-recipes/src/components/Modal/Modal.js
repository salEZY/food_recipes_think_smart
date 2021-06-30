import React from "react";
import { AppContext } from "../../context/app-context";
import Nav from "../Header/components/Nav";
import Title from "../Header/components/Title";

import "./Modal.css";

const Modal = ({ modal, modalHandler }) => {
  const appCtx = React.useContext(AppContext);
  return (
    <>
      <div className="modal-holder" onClick={() => modalHandler(false)}></div>
      <div id="modal" className={appCtx.modalClass}>
        <Title />
        <Nav />
        <p>Copyright &copy; 2021 - salEZY</p>
      </div>
    </>
  );
};

export default Modal;
