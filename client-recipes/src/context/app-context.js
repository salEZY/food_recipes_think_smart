import { createContext } from "react";

export const AppContext = createContext({
  modalClass: "",
  modal: false,
  modalHandler: () => {}
});
