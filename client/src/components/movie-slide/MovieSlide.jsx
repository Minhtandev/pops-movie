import { useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "../auto-swiper/AutoSwiper"
import CircularRate from "../circular-rate/CircularRate"
import "./movie-slide.scss"
const DATA = [
    {
    
    }
]

const MovieItem = () => {
  return (
    <div className="movie-item" style={{backgroundImage: 'url("https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg")'}}>
      <div className="movie-item__overlay">
        <div className="movie-item__overlay__icon">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.748 10.945a4.505 4.505 0 00-1.923-1.976L8.377 2.729a4.328 4.328 0 00-2.667-.71 2.698 2.698 0 00-1.978 1.143A4.504 4.504 0 003 5.86v12.28a4.502 4.502 0 00.732 2.698 2.696 2.696 0 001.978 1.144 4.328 4.328 0 002.667-.71l10.448-6.063a4.483 4.483 0 001.923-1.987 2.701 2.701 0 000-2.277z"></path></svg>
        </div>
        <div className="movie-item__overlay__content">
          <CircularRate rating={86} />
          <span>2022</span>
          <div>Puss in Boots: The last wish</div>
        </div>
      </div>
    </div>
  )
}
const MovieSlide = ({slideName = "popular", data = DATA}) => {
  return (
    <>
      <h3 className="movie-slide__title">
        POPULAR MOVIES
      </h3>
    <AutoSwiper >
      <SwiperSlide >
        <MovieItem />
      </SwiperSlide>
            <SwiperSlide >
        <MovieItem />
      </SwiperSlide>
            <SwiperSlide >
        <MovieItem />
      </SwiperSlide>
            <SwiperSlide >
        <MovieItem />
      </SwiperSlide>
            <SwiperSlide >
        <MovieItem />
      </SwiperSlide>
            <SwiperSlide >
        <MovieItem />
        </SwiperSlide>
        <SwiperSlide >
        <MovieItem />
        </SwiperSlide>
        <SwiperSlide >
        <MovieItem />
        </SwiperSlide>
        <SwiperSlide >
        <MovieItem />
        </SwiperSlide>
        <SwiperSlide >
        <MovieItem />
        </SwiperSlide>
    </AutoSwiper>
    </>
  )
}

export default MovieSlide