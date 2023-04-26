import React from "react";
import "./footer.scss";
import logo from "../../assets/logo-pops.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <img src={logo} alt="" />
      </div>
      <div className="right">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/movie">MOVIES</Link>
          </li>
          <li>
            <Link to="/tv">TV SERIES</Link>
          </li>
          <li>
            <Link to="/search/a">SEARCH</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
