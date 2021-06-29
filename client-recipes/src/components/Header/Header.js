import React from "react";
import { Link } from "react-router-dom";

import Nav from "./components/Nav";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/" className="header-logo">
        <p>
          Think Food <i className="fal fa-utensils-alt"></i>
        </p>
      </Link>

      <Nav />
      <div className="burger-div">
        <i className="fal fa-cheeseburger"></i>
      </div>
    </header>
  );
};

export default Header;
