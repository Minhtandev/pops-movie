import React from "react";
import "./signup.scss";
import Form from "../../components/form/Form";
import logo from "../../assets/logo-pops.png";
const Signup = () => {
  return (
    <div className="signup">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Form type="signup" />
    </div>
  );
};

export default Signup;
