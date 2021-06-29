import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/categories">
            Categories <i className="fal fa-stream"></i>
          </Link>
        </li>
        <li>
          <Link to="/search">
            Search <i className="fal fa-search"></i>
          </Link>
        </li>
        <li>
          <Link to="/meals/:userId">
            My Meals <i className="fal fa-hat-chef"></i>
          </Link>
        </li>
        <li>
          <Link to="/auth">
            Authenticate <i className="fal fa-sign-in"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
