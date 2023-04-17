import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";
import { useDispatch } from "react-redux";

const FacebookLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseFacebook = async (res) => {
    console.log(res.name, res.id, res.accessToken);
    const valuesToLogin = {
      username: res.id,
      password: res.id,
    };

    const valuesToSignup = {
      username: res.id,
      password: res.id,
      confirmPassword: res.id,
      displayName: res.name,
    };
    const { response, err } = await userApi.login(valuesToLogin);
    if (response) {
      console.log("login response >>>", response);
      dispatch(setUser(response));
      toast.success("Login successfully!!!");
      navigate("/");
    } else {
      const { response, err } = await userApi.signup(valuesToSignup);
      if (response) {
        // signup.resetForm();
        console.log("signup response >>>", response);
        dispatch(setUser(response));
        toast.success("Signup successfully!!!");
        navigate("/");
      } else {
        toast.error("Login failed!!!");
      }
    }
  };

  return (
    <FacebookLogin
      appId="197838216346476"
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          onClick={(e) => {
            renderProps.onClick();
          }}>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 23.9859 5.85094 30.6053 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5434 6.25C21.2934 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.12 10.5 18.5 11.7334 18.5 13V16H22.9375L22.2281 20.625H18.5V31.8056C26.1491 30.6053 32 23.9859 32 16Z"
              fill="#1877F2"></path>
          </svg>
        </button>
      )}
    />
  );
};

export default FacebookLoginButton;
