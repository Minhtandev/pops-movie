import React from "react";
import "./signup.scss";
import SignupForm from "../../components/signup-form/SignupForm";
import logo from "../../assets/logo-pops.png";
const Signup = () => {
  return (
    <div className="signup">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
