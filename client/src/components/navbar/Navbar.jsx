import React, { useState, useEffect} from 'react'
import "./navbar.scss"
import logo from "../../assets/logo-pops.png"
import userIcon from "../../assets/user.webp"
const Navbar = () => {
    const [active, setActive] = useState(false);
    const [searchbarBgColor, setSearchbarBgColor] = useState("#353535");
    const onScroll = () => {
        // console.log(window.screenY,)
        if (window?.screenY >= 20 || document?.body?.scrollTop >= 20 || document?.documentElement?.scrollTop >= 20) {
            setActive(true);
        }
        else {
            setActive(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)   
        }
    }, [])
  return (
    <div className={active ? "navbar active" : "navbar" }>
          <div className="left">
          <div className="navbar__logo">
              <img src={ logo} alt="" />
          </div>
          <div className="navbar__content">
              <a href="#">Home</a>
              <a href="#">Movie</a>
              <a href="#">TV series</a>
          </div>
          </div>
          <div className="right">
              
          <div className="navbar__search-bar" style={{backgroundColor: searchbarBgColor}}>
                  <input onFocus={ () => setSearchbarBgColor("#141414")} onBlur={ () => setSearchbarBgColor("#353535")} type="text" placeholder='Ten phim, chuong trinh truyen hinh' />
              <div className='navbar__search-bar__btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M19.707 18.293l-5.052-5.053a8.228 8.228 0 10-1.414 1.414l5.052 5.053a1 1 0 001.414-1.414zM2 8.2a6.2 6.2 0 116.2 6.2A6.207 6.207 0 012 8.2z" data-name="ic-search" fill="#fff"></path></svg>                      
              </div>
          </div>
          <div className="navbar__user">
              <img src={userIcon} alt="" />
          </div>
          </div>
    </div>
  )
}

export default Navbar