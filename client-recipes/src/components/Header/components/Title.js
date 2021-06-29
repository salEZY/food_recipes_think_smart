import React from "react";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/" className="header-logo">
      <p>
        Think Food <i className="fal fa-utensils-alt"></i>
      </p>
    </Link>
  );
};

export default Title;
