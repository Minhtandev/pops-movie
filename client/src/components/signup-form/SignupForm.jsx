import React, { useState, useRef } from "react";
import "./signup-form.scss";
// import { useFormik, ErrorMessage } from "formik";
import userApi from "../../api/modules/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SingupSchema = Yup.object().shape({
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
});

const SignupForm = ({ type = "login" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const labelEl = useRef(null);
  let text = "Username";

  // return (
  //   <div className="form">
  //     <h2>{type == "login" ? "Đăng nhập" : "Đăng ký"}</h2>
  //     <h4>Bạn có thể đăng nhập với tài khoản POPS hoặc POPS Kids.</h4>
  //     {type == "login" ? (
  //       <form action="" onSubmit={login.handleSubmit}>
  //         <input
  //           type="text"
  //           name="username"
  //           placeholder="Nhập số điện thoại hoặc email"
  //           onChange={login.handleChange}
  //           value={login.values.username}
  //         />
  //         <ErrorMessage name="username" />
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="Mật khẩu"
  //           onChange={login.handleChange}
  //           value={login.values.password}
  //         />
  //         <input type="submit" value="Đăng nhập" />
  //       </form>
  //     ) : (
  //       <form action="" onSubmit={signup.handleSubmit}>
  //         <input
  //           type="text"
  //           name="displayName"
  //           placeholder="Nhập tên người dùng"
  //           onChange={signup.handleChange}
  //           value={signup.values.displayName}
  //         />
  //         <input
  //           type="text"
  //           name="username"
  //           placeholder="Nhập số điện thoại hoặc email"
  //           onChange={signup.handleChange}
  //           value={signup.values.username}
  //         />
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="Mật khẩu"
  //           onChange={signup.handleChange}
  //           value={signup.values.password}
  //         />
  //         <input
  //           type="password"
  //           name="confirmPassword"
  //           placeholder="Xác nhận mật khẩu"
  //           onChange={signup.handleChange}
  //           value={signup.values.confirmPassword}
  //         />
  //         <input type="submit" value="Đăng ký" />
  //       </form>
  //     )}
  //     {/* {errorMessage && <p>{errorMessage}</p>} */}
  //   </div>
  // );
  return (
    <div className="form">
      <h2>Đăng nhập</h2>
      <h4>Bạn có thể đăng nhập với tài khoản POPS hoặc POPS Kids.</h4>
      <Formik
        initialValues={{
          password: "",
          username: "",
          displayName: "",
          confirmPassword: "",
        }}
        validationSchema={SingupSchema}
        onSubmit={async (values) => {
          const { response, err } = await userApi.signup(values);
          if (response) {
            // signup.resetForm();
            dispatch(setUser(response));
            toast.success("Signup successfully!!!");
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
                placeholder="Nhập số điện thoại hoặc email"

                // placeholder="Username"
                // invalid={errors?.username?.length > 0}
              />
              {/* <label ref={labelEl}>
                {text.split("").map((letter, i) => (
                  <span
                    className="letter"
                    style={{ transitionDelay: `${i * 50}ms` }}>
                    {letter}
                  </span>
                ))}
              </label> */}
              <ErrorMessage component="span" name="username" />
            </div>
            <Field
              name="password"
              type="password"
              placeholder="Mật khẩu"
              // invalid={errors?.password?.length > 0}
            />
            <ErrorMessage component="span" name="password" />
            <button type="submit">Đăng nhập</button>
          </Form>
        )}
      </Formik>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default SignupForm;
