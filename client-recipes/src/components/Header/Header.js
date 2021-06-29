import React from "react";

import Nav from "./components/Nav";
import Title from "./components/Title";

import "./Header.css";

const Header = ({ modalHandler }) => {
  return (
    <header>
      <Title />
      <div className="nonmobile-nav">
        <Nav />
      </div>

      <div className="burger-div" onClick={() => modalHandler(true)}>
        <i className="fal fa-cheeseburger"></i>
      </div>
    </header>
  );
};

export default Header;
