import React from "react";
import "./footer.scss";
import logo from "../../assets/logo-pops.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <img src={logo} alt="" />
      </div>
      <div className="right">
        <ul>
          <li>HOME</li>
          <li>MOVIES</li>
          <li>TV SERIES</li>
          <li>SEARCH</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
