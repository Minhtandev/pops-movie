import React, { useState, useRef, useEffect } from "react";
import "./signup.scss";
import logo from "../../assets/logo-pops.png";
import userApi from "../../api/modules/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import FacebookLoginButton from "../../components/FacebookLoginButton";
import GoogleLoginButton from "../../components/GoogleLoginButton";
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
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [passHide, setPassHide] = useState(true);
  const [confirmHide, setConfirmHide] = useState(true);
  // const labelEl = useRef(null);
  // let text = "Username";
  return (
    <div className="login">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="form">
        <h2>Đăng ký</h2>
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
                />

                <ErrorMessage component="span" name="username" />
              </div>
              <div className="form-group">
                <Field
                  name="displayName"
                  required={false}
                  placeholder="Tên hiển thị"
                />
                <ErrorMessage component="span" name="displayName" />
              </div>
              <div className="form-group">
                <Field
                  name="password"
                  type={passHide ? "password" : "text"}
                  placeholder="Mật khẩu"
                />
                <ErrorMessage component="span" name="password" />
                <i
                  className={passHide ? "" : "active"}
                  onClick={() => {
                    setPassHide(!passHide);
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
              <div className="form-group">
                <Field
                  name="confirmPassword"
                  type={confirmHide ? "password" : "text"}
                  placeholder="Xác nhận lại mật khẩu"
                />
                <ErrorMessage component="span" name="confirmPassword" />
                <i
                  className={confirmHide ? "" : "active"}
                  onClick={() => {
                    setConfirmHide(!confirmHide);
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
              <FacebookLoginButton />
            </span>
          </div>
          <div className="google">
            <span>
              <GoogleLoginButton />
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

export default Signup;
