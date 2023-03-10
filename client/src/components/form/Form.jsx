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
      <h2>????ng nh???p</h2>
      <h4>B???n c?? th??? ????ng nh???p v???i t??i kho???n POPS ho???c POPS Kids.</h4>
      {type == "login" ? (
        <form action="" onSubmit={login.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nh???p s??? ??i???n tho???i ho???c email"
            onChange={login.handleChange}
            value={login.values.username}
          />
          <input
            type="password"
            name="password"
            placeholder="M???t kh???u"
            onChange={login.handleChange}
            value={login.values.password}
          />
          <input type="submit" value="????ng nh???p" />
        </form>
      ) : (
        <form action="" onSubmit={signup.handleSubmit}>
          <input
            type="text"
            name="displayName"
            placeholder="Nh???p t??n ng?????i d??ng"
            onChange={signup.handleChange}
            value={signup.values.displayName}
          />
          <input
            type="text"
            name="username"
            placeholder="Nh???p s??? ??i???n tho???i ho???c email"
            onChange={signup.handleChange}
            value={signup.values.username}
          />
          <input
            type="password"
            name="password"
            placeholder="M???t kh???u"
            onChange={signup.handleChange}
            value={signup.values.password}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="X??c nh???n m???t kh???u"
            onChange={signup.handleChange}
            value={signup.values.confirmPassword}
          />
          <input type="submit" value="????ng k??" />
        </form>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Form;
