import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

//destruct props object - title and icon
const Navbar = ({ title, icon}) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to ='/'><i className={icon} /></Link>{"GitHub User Finder"}
      </h1>
      <ul>
        <li>
          {/* link retained the state */}
          <Link to = '/'>Home</Link>
        </li>
        <li>
        <Link to = '/about'>About</Link>
        </li>
        <li>
          <Link to = '/contact'>Contact</Link> 
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github User App",
  icon: "fab fa-github",
};

//enforce prop value to be passed in by type
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
