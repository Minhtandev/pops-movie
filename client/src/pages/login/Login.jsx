import React from "react";
import "./login.scss";
import Form from "../../components/form/Form";
import logo from "../../assets/logo-pops.png";
const Login = () => {
  return (
    <div className="login">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Form type="login" />
    </div>
  );
};

export default Login;
