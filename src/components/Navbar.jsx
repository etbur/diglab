import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <NavLink to="/">
          <h1 className="dash">Digital Lab Ethiopia</h1>
        </NavLink>
    </header>
  );
};

export default Navbar;
