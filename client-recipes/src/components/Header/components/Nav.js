import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/app-context";

const Nav = () => {
  const ctx = React.useContext(AppContext)
  
  return (
    <nav>
      <ul>
        <li onClick={() => ctx.modalHandler(false)}>
          <Link to="/categories" >
            Categories <i className="fal fa-stream"></i>
          </Link>
        </li>
        <li onClick={() => ctx.modalHandler(false)}>
          <Link to="/search">
            Search <i className="fal fa-search"></i>
          </Link>
        </li>
        <li onClick={() => ctx.modalHandler(false)}>
          <Link to="/meals/:userId">
            My Meals <i className="fal fa-hat-chef"></i>
          </Link>
        </li>
        <li onClick={() => ctx.modalHandler(false)}>
          <Link to="/auth">
            Authenticate <i className="fal fa-sign-in"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
