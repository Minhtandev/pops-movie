import React, { useState } from "react";
import "./form.scss";
import { useFormik } from "formik";
import userApi from "../../api/modules/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Form = ({ type = "login" }) => {
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const login = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      const { response, err } = await userApi.login(values);
      if (response) {
        console.log("results>>>", response);
        login.resetForm();
        toast.success("success");
        navigate("/");
      }
      if (err) setErrorMessage(err.message);
    },
  });

  const signup = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      displayName: Yup.string()
        .min(8, "displayName minimum 8 characters")
        .required("displayName is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirmPassword not match")
        .min(8, "confirmPassword minimum 8 characters")
        .required("confirmPassword is required"),
    }),
    onSubmit: async (values) => {
      const { response, err } = await userApi.signup(values);
      if (response) {
        signup.resetForm();
      }
      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <div className="form">
      <h2>Đăng nhập</h2>
      <h4>Bạn có thể đăng nhập với tài khoản POPS hoặc POPS Kids.</h4>
      {type == "login" ? (
        <form action="" onSubmit={login.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nhập số điện thoại hoặc email"
            onChange={login.handleChange}
            value={login.values.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={login.handleChange}
            value={login.values.password}
          />
          <input type="submit" value="Đăng nhập" />
        </form>
      ) : (
        <form action="" onSubmit={signup.handleSubmit}>
          <input
            type="text"
            name="displayName"
            placeholder="Nhập tên người dùng"
            onChange={signup.handleChange}
            value={signup.values.displayName}
          />
          <input
            type="text"
            name="username"
            placeholder="Nhập số điện thoại hoặc email"
            onChange={signup.handleChange}
            value={signup.values.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={signup.handleChange}
            value={signup.values.password}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            onChange={signup.handleChange}
            value={signup.values.confirmPassword}
          />
          <input type="submit" value="Đăng ký" />
        </form>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Form;
