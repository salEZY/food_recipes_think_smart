import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/" className="header-logo">
        <p>
          THINK FOOD <i className="fal fa-utensils-alt"></i>
        </p>
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/categories">
              CATEGORIES <i className="fal fa-stream"></i>
            </Link>
          </li>
          <li>
            <Link to="/search">
              SEARCH <i className="fal fa-search"></i>
            </Link>
          </li>
          <li>
            <Link to="/meals/:userId">
              MY MEALS <i className="fal fa-hat-chef"></i>
            </Link>
          </li>
          <li>
            <Link to="/auth">
              AUTHENTICATE <i className="fal fa-sign-in"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
