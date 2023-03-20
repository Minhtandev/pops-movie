import React, { useState, useEffect, useRef } from "react";
import "./navbar.scss";
import logo from "../../assets/logo-pops.png";
import userIcon from "../../assets/user.webp";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const inputEl = useRef(null);

  const [active, setActive] = useState(false);
  const [searchbarBgColor, setSearchbarBgColor] = useState("#353535");
  const onScroll = () => {
    // console.log(window.screenY,)
    if (
      window?.screenY >= 20 ||
      document?.body?.scrollTop >= 20 ||
      document?.documentElement?.scrollTop >= 20
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className={active ? "navbar active" : "navbar"}>
      <div className="left">
        <div className="navbar__logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <div className="navbar__content">
          <Link to="/">Home</Link>
          <Link to="/movie">Movie</Link>
          <Link to="/tv">TV series</Link>
        </div>
      </div>
      <div className="right">
        <div
          className="navbar__search-bar"
          style={{ backgroundColor: searchbarBgColor }}>
          <input
            onFocus={() => setSearchbarBgColor("#141414")}
            onBlur={() => setSearchbarBgColor("#353535")}
            type="text"
            placeholder="Movie, TV Series name..."
            ref={inputEl}
            onKeyDown={(e) => {
              if (e.key == "Enter")
                navigate("/search/" + inputEl.current.value);
            }}
          />
          <div
            className="navbar__search-bar__btn"
            onClick={() => navigate("/search/" + inputEl.current.value)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M19.707 18.293l-5.052-5.053a8.228 8.228 0 10-1.414 1.414l5.052 5.053a1 1 0 001.414-1.414zM2 8.2a6.2 6.2 0 116.2 6.2A6.207 6.207 0 012 8.2z"
                data-name="ic-search"
                fill="#fff"></path>
            </svg>
          </div>
        </div>
        <div className="btns_container">
          <button className="login_btn" onClick={() => navigate("/login")}>
            ĐĂNG NHẬP
          </button>
          <button className="signup_btn" onClick={() => navigate("/signup")}>
            ĐĂNG KÝ
          </button>
        </div>
        <div className="navbar__user">
          <img src={userIcon} alt="" />
        </div>
        <FiMenu className="menu-icon" size="50px" />
      </div>
    </div>
  );
};

export default Navbar;
