import React from "react";
import "./login.scss";
import LoginForm from "../../components/login-form/LoginForm";
import logo from "../../assets/logo-pops.png";
const Login = () => {
  return (
    <div className="login">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
