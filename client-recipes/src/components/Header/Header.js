import React from "react";
import { AppContext } from "../../context/app-context";

import Nav from "./components/Nav";
import Title from "./components/Title";

import "./Header.css";

const Header = ( ) => {
  const ctx = React.useContext(AppContext)

  return (
    <header>
      <Title />
      <div className="nonmobile-nav">
        <Nav />
      </div>

      <div className="burger-div" onClick={() => ctx.modalHandler(true)}>
        <i className="fal fa-cheeseburger"></i>
      </div>
    </header>
  );
};

export default Header;
