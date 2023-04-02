import React, { useState, useRef, useEffect } from "react";
import "./login.scss";
// import LoginForm from "../../components/login-form/LoginForm";
import logo from "../../assets/logo-pops.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import userApi from "../../api/modules/user.api";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "Username minimum 8 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password minimum 8 characters")
    .required("Password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
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
              dispatch(setUser(response));
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
                  placeholder="Nhập số điện thoại hoặc email"
                />
                <ErrorMessage component="span" name="username" />
              </div>
              <div className="form-group">
                <Field
                  name="password"
                  type={hide ? "password" : "text"}
                  placeholder="Mật khẩu"
                />
                <ErrorMessage component="span" name="password" />
                <i
                  className={hide ? "" : "active"}
                  onClick={() => {
                    setHide(!hide);
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14">
                    <defs>
                      <clipPath id="prefix__clip-path">
                        <path d="M0 0H18V14H0z" fill="none"></path>
                      </clipPath>
                    </defs>
                    <g>
                      <path
                        d="M-37.567 1107.684a1.663 1.663 0 0 0 .166 2.076 1.646 1.646 0 0 0 2.189.282 3.23 3.23 0 0 1-1.36 3.641 3.37 3.37 0 0 1-4.191-.439 3.356 3.356 0 0 1-.466-4.155 3.227 3.227 0 0 1 3.662-1.405z"
                        style={{
                          transform: "translate(47.411px, -1103.874px)",
                        }}
                        fill="#fff"></path>
                      <path
                        id="prefix__Path_444"
                        d="M-72.261 1086.057a3.875 3.875 0 0 0 .03-2.126 9.08 9.08 0 0 0-1.988-3.144 9.017 9.017 0 0 0-5.858-2.745 9.749 9.749 0 0 0-5.133.8 8.778 8.778 0 0 0-4.739 5.158 3.641 3.641 0 0 0-.03 1.957 9.088 9.088 0 0 0 2.023 3.232 8.981 8.981 0 0 0 5.819 2.741 9.786 9.786 0 0 0 5.1-.768 8.749 8.749 0 0 0 4.765-5.077.235.235 0 0 1 .011-.028zm-2.145-.719a6.7 6.7 0 0 1-5.541 4.253c-.386.055-.778.068-1.073.093a6.978 6.978 0 0 1-6.707-4.2 1.068 1.068 0 0 1 0-.979 6.752 6.752 0 0 1 5.523-4.114 7.468 7.468 0 0 1 5.136 1.014 6.591 6.591 0 0 1 2.665 3.235 1.02 1.02 0 0 1-.003.698z"
                        style={{
                          transform: "translate(90.098px, -1077.99px)",
                        }}
                        fill="#fff"></path>
                    </g>
                  </svg>
                </i>
              </div>
              <button type="submit">Đăng nhập</button>
            </Form>
          )}
        </Formik>
        {errorMessage && <span>{errorMessage}</span>}
        <div className="continue">Hoăc tiếp tục với</div>
        <div className="other-login">
          <div className="facebook">
            <span>
              <button>
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 23.9859 5.85094 30.6053 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5434 6.25C21.2934 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.12 10.5 18.5 11.7334 18.5 13V16H22.9375L22.2281 20.625H18.5V31.8056C26.1491 30.6053 32 23.9859 32 16Z"
                    fill="#1877F2"></path>
                </svg>
              </button>
            </span>
          </div>
          <div className="google">
            <span>
              <button>
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
            </span>
          </div>
        </div>
        <div className="link-to-signup">
          <Link to="/signup"></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
