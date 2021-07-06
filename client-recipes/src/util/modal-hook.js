import React from "react";

export const useModal = () => {
  const [modal, setModal] = React.useState(false);
  const [modalClass, setModalClass] = React.useState("dismiss");

  const modalHandler = (bool) => {
    if (modalClass === "dismiss") setModalClass("activate");
    else setModalClass("dismiss");
    setTimeout(() => {
      setModal(bool);
    }, 200);
  };

  return {modal, modalClass, modalHandler}
}