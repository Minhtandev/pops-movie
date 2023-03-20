import React, { useState, useRef, useEffect } from "react";
import "./login-form.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import userApi from "../../api/modules/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "username minimum 8 characters")
    .required("username is required"),
  password: Yup.string()
    .min(8, "password minimum 8 characters")
    .required("password is required"),
});

const LoginForm = ({ type = "login" }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const labelEl = useRef(null);
  // const [loginUsernameErr, setLoginUsernameErr] = useState("");
  // const [loginPasswordErr, setLoginPasswordErr] = useState("");
  const navigate = useNavigate();

  // const login = useFormik({
  //   initialValues: {
  //     password: "",
  //     username: "",
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string()
  //       .min(8, "username minimum 8 characters")
  //       .required("username is required"),
  //     password: Yup.string()
  //       .min(8, "password minimum 8 characters")
  //       .required("password is required"),
  //   }),
  //   onSubmit: async (values) => {
  //     const { response, err } = await userApi.login(values);
  //     if (response) {
  //       console.log("results>>>", response);
  //       login.resetForm();
  //       toast.success("Login successfully!!!");
  //       navigate("/");
  //     }
  //     if (err) setErrorMessage(err.message);
  //   },
  // });
  // useEffect(() => {
  //   if (labelEl.innerText) {}
  //     labelEl.innerHTML = labelEl.innerText
  //       .split("")
  //       .map(function (letter, i) {
  //         return `<span style= "transition-delay:${i * 50}ms">${letter}</span>`;
  //       })
  //       .join("");
  // }, []);
  let text = "Username";
  return (
    <div className="form">
      <h2>Đăng nhập</h2>
      <h4>Bạn có thể đăng nhập với tài khoản POPS hoặc POPS Kids.</h4>
      <Formik
        initialValues={{
          password: "",
          username: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const { response, err } = await userApi.login(values);
          if (response) {
            // console.log("results>>>", response);
            // login.resetForm();
            toast.success("Login successfully!!!");
            navigate("/");
          }
          if (err) setErrorMessage(err.message);
        }}>
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <Field
                name="username"
                required={false}
                // placeholder="Username"
                // invalid={errors?.username?.length > 0}
              />
              <label ref={labelEl}>
                {text.split("").map((letter, i) => (
                  <span
                    className="letter"
                    style={{ transitionDelay: `${i * 50}ms` }}>
                    {letter}
                  </span>
                ))}
              </label>
              <ErrorMessage component="span" name="username" />
            </div>
            <Field
              name="password"
              type="password"
              // invalid={errors?.password?.length > 0}
            />
            <ErrorMessage component="span" name="password" />
            <button type="submit">Đăng nhập</button>
          </Form>
        )}
      </Formik>
      {/* <form action="" onSubmit={login.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nhập số điện thoại hoặc email"
          onChange={login.handleChange}
          value={login.values.username}
        />
        <ErrorMessage name="username" />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={login.handleChange}
          value={login.values.password}
        />
        <input type="submit" value="Đăng nhập" />
      </form> */}
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default LoginForm;
