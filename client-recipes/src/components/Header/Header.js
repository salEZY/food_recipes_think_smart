import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/" className="header-logo">
        <p>THINK FOOD</p>
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/categories">CATEGORIES</Link>
          </li>
          <li>
            <Link to="/search">SEARCH</Link>
          </li>
          <li>
            <Link to="/meals/:userId">MY MEALS</Link>
          </li>
          <li>
            <Link to="/auth">AUTHENTICATE</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
