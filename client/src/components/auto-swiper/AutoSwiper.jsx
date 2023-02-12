import React from 'react'
import { Swiper } from "swiper/react";
import "./auto-swiper.scss"
const AutoSwiper = ({ children}) => {
  return (
      <div className='auto-swiper'>
          <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </div>
  )
}

export default AutoSwiper