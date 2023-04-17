import React, { useState } from "react";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";
import { useDispatch } from "react-redux";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse, codeResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      console.log(userInfo);

      const valuesToLogin = {
        username: userInfo.email,
        password: userInfo.email,
      };

      const valuesToSignup = {
        username: userInfo.email,
        password: userInfo.email,
        confirmPassword: userInfo.email,
        displayName: userInfo.name,
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
    },
  });

  return (
    <button onClick={() => login()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="prefix__ic-gg"
        viewBox="0 0 32 32">
        <g id="prefix__Group_11448" data-name="Group 11448">
          <path
            id="prefix__Path_8246"
            d="M18.845 8.544a9.639 9.639 0 0 1 6.163 2.216l4.829-4.529a16.4 16.4 0 0 0-13.958-3.963A16.2 16.2 0 0 0 4.293 10.9l5.444 4.132a9.6 9.6 0 0 1 9.108-6.485z"
            data-name="Path 8246"
            style={{ transform: "translate(-2.6px, -2px)" }}
            fill="#d94f3d"></path>
          <path
            id="prefix__Path_8247"
            d="M8.646 21.336a9.28 9.28 0 0 1 .492-2.967l-5.445-4.133a15.731 15.731 0 0 0 0 14.2L9.138 24.3a9.28 9.28 0 0 1-.492-2.967z"
            data-name="Path 8247"
            style={{ transform: "translate(-2px, -5.339px)" }}
            fill="#f2c042"></path>
          <path
            id="prefix__Path_8248"
            d="M39.607 20H24.1v6.544h8.787a7.811 7.811 0 0 1-3.364 4.481l5.4 4.1c3.455-3.05 5.484-8.011 4.684-15.125z"
            data-name="Path 8248"
            style={{ transform: "translate(-7.781px, -6.911px)" }}
            fill="#5085ed"></path>
          <path
            id="prefix__Path_8249"
            d="M24.341 33.23a10.451 10.451 0 0 1-5.5 1.336 9.6 9.6 0 0 1-9.108-6.485l-5.44 4.132a16.289 16.289 0 0 0 14.552 8.9 16.3 16.3 0 0 0 10.9-3.781z"
            data-name="Path 8249"
            style={{ transform: "translate(-2.6px, -9.116px)" }}
            fill="#57a75c"></path>
        </g>
      </svg>
    </button>
  );
};

export default GoogleLoginButton;
