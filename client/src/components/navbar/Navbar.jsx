import React, { useState, useEffect, useRef } from "react";
import "./navbar.scss";
import logo from "../../assets/logo-pops.png";
import userIcon from "../../assets/user.webp";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputEl = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
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
    <div className={active ? "navbar navbar--active" : "navbar"}>
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
        {user ? (
          <div className="navbar__user">
            <img
              src={userIcon}
              alt="avatar"
              onClick={() => setMenuShow(!menuShow)}
            />
            <div
              className={
                menuShow ? "toggle-menu toggle-menu--active" : "toggle-menu"
              }>
              <ul>
                <li>
                  {/* <Link to="/manage-account"> */}
                  <div className="menu__header">
                    <img src={userIcon} alt="avatar" />
                    <div>
                      <p>User ID: kj398sds98c98s989d</p>
                      <p>Tham gia từ: 06 Mar 2023</p>
                    </div>
                    <button>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24">
                          <path
                            fill="#fff"
                            d="M18.198.778a12.413 12.413 0 00-1.073 1C13.09 5.808 9.113 9.899 4.999 13.845a10.981 10.981 0 00-3.579 5.829 9.486 9.486 0 01-.362 1.073C.722 21.773.39 22.801.001 23.998c2.437-.814 4.691-1.552 6.931-2.33a3.027 3.027 0 001.1-.681q6.029-5.973 12.025-11.98c1.055-1.055 2.156-2.074 3.117-3.21 1.24-1.465 1.047-3.176-.376-4.608a3.235 3.235 0 00-4.6-.411zM8.422 18.034a8.334 8.334 0 01-4.334 2.639c-.343.075-.673.212-1.2.381.755-1.581.773-3.257 2.053-4.5C8.659 12.939 12.3 9.243 15.968 5.577a4.881 4.881 0 00.368-.45l2.363 2.379c-3.382 3.454-6.879 6.946-10.277 10.528z"
                            data-name="Path 596"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  {/* </Link> */}
                </li>
                <li>
                  <Link to="/favourites">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        fill="currentColor"
                        d="M27.225 10.75a5.616 5.616 0 0 1 2.025 2.025A5.376 5.376 0 0 1 30 15.55v8.9a5.376 5.376 0 0 1-.75 2.775 5.616 5.616 0 0 1-2.025 2.025 5.374 5.374 0 0 1-2.775.75h-8.9a5.374 5.374 0 0 1-2.775-.75 5.616 5.616 0 0 1-2.025-2.025A5.376 5.376 0 0 1 10 24.45v-8.9a5.376 5.376 0 0 1 .75-2.775 5.616 5.616 0 0 1 2.025-2.025A5.374 5.374 0 0 1 15.55 10h8.9a5.374 5.374 0 0 1 2.775.75zM26.176 16L24.9 14.925l-6.4 7.7-2.35-2.5-1.225 1.125 3.025 3.2a.817.817 0 0 0 .575.275.78.78 0 0 0 .625-.3z"
                        transform="translate(-10 -10)"></path>
                    </svg>
                    Yêu thích
                  </Link>
                </li>
                <li>
                  <Link to="/reviews">
                    <svg
                      id="b2074e80-7769-4b3f-b2cd-a522fb534303"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <g
                        id="bdb2fe6e-10a2-4875-b145-8a7e223ae1ee"
                        data-name="ic-upload">
                        <path
                          id="b2dade86-2247-4b49-9332-075840b6766f"
                          fill="currentColor"
                          data-name="ic-upload-2"
                          d="M4.64,22A2.64,2.64,0,0,1,2,19.36V14.45a1,1,0,0,1,2,0v4.91a.64.64,0,0,0,.64.64H19.36a.64.64,0,0,0,.64-.64V14.45a1,1,0,0,1,2,0v4.91A2.64,2.64,0,0,1,19.36,22Zm5.3-6.95V15a.5.5,0,0,1-.5-.5v-6H7.19l0,0h0a.5.5,0,0,1-.38-.83l4.81-5.5a.51.51,0,0,1,.73,0l0,0,4.81,5.5a.51.51,0,0,1-.05.71.5.5,0,0,1-.33.12h0l0,0H14.56v6a.5.5,0,0,1-.5.5v0Z"></path>
                      </g>
                    </svg>
                    Review
                  </Link>
                </li>
                <li>
                  <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        fill="currentColor"
                        d="M17.826 0H2.174A2.288 2.288 0 0 0 0 2.381v11a2.288 2.288 0 0 0 2.174 2.381h2.174v3.762a.457.457 0 0 0 .435.476.409.409 0 0 0 .268-.1l5.969-4.136h6.806A2.288 2.288 0 0 0 20 13.381v-11A2.288 2.288 0 0 0 17.826 0zM10 12.837a1.206 1.206 0 1 1 1.206-1.206A1.206 1.206 0 0 1 10 12.837zm.733-3.549H9.267l-.446-6.6h2.385z"></path>
                    </svg>
                    Phản hồi về ứng dụng
                  </Link>
                </li>
                <li
                  onClick={() => {
                    dispatch(setUser(null));
                    toast.success("Logout successfully");
                  }}>
                  <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <g>
                        <path
                          fill="currentColor"
                          d="M4.544 18.378a10 10 0 0 1 0-16.76 1 1 0 1 1 1.091 1.677 8 8 0 1 0 8.729 0 1 1 0 0 1 1.092-1.677A10 10 0 0 1 12.07 19.78a10.13 10.13 0 0 1-2.09.22 9.942 9.942 0 0 1-5.436-1.622zM9 9.181V1a1 1 0 0 1 2 0v8.181a1 1 0 0 1-2 0z"></path>
                      </g>
                    </svg>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="btns_container">
            <button className="login_btn" onClick={() => navigate("/login")}>
              ĐĂNG NHẬP
            </button>
            <button className="signup_btn" onClick={() => navigate("/signup")}>
              ĐĂNG KÝ
            </button>
          </div>
        )}

        {/* <div className="navbar__user">
          <img src={userIcon} alt="" onClick={() => setMenuShow(!menuShow)} />
          {menuShow && (
            <div className="toggle-menu">
              <ul>
                <li>
                  <Link to="/favourites">Favourties</Link>
                </li>
                <li>Review</li>
                <li>aaaaaaaaa</li>
                <li>aaaaaaaa</li>
                <li onClick={() => dispatch(setUser(null))}>Logout</li>
              </ul>
            </div>
          )}
        </div> */}
        <FiMenu className="menu-icon" size="50px" />
      </div>
    </div>
  );
};

export default Navbar;
