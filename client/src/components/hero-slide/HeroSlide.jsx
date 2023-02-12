import React, {useEffect, useState} from 'react'
import "./hero-slide.scss"
import CircularRate from '../circular-rate/CircularRate';
import Tag from '../tag/Tag';
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from 'react-bootstrap';

// import PlayArrowIcon from "@mui/icons-material/PlayArrow";s
const HeroSlide = () => {
    const images = [
        "https://image.tmdb.org/t/p/original/tGwO4xcBjhXC0p5qlkw37TrH6S6.jpg",
        "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        "https://image.tmdb.org/t/p/original/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg"
    ]
  return (
      <div className="hero-slide">
          <Swiper
              grabCursor={true}
              loop={true}
              style={{ width: "100%", height: "max-content" }}
          >
              {images.map((item, index) => 
                 (<SwiperSlide key={index}>
                      <div className="bg-img__container" style={{backgroundImage: `url(${item})`}}>
                </div>
                <div className="hero-slide__overlay"></div>
                  <div className="hero-slide__content">
                      <div className="hero-slide__content__container">
                      <h4 className="hero-slide__content__title">
                          Puss in Boots: The Last Wish
                    </h4>
                    <div className="hero-slide__content__tags">
                              <CircularRate rating={86} />
                              <Tag tagName="Animation" />
                              <Tag tagName="Adventure" />
                          </div>
                    <p className="hero-slide__content__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In suscipit alias neque vitae quo iure tempore veritatis aliquam unde! Inventore corporis optio tempora perspiciatis delectus eos distinctio iste aspernatur mollitia!
                    </p>
                          <Button variant="primary">
                              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.748 10.945a4.505 4.505 0 00-1.923-1.976L8.377 2.729a4.328 4.328 0 00-2.667-.71 2.698 2.698 0 00-1.978 1.143A4.504 4.504 0 003 5.86v12.28a4.502 4.502 0 00.732 2.698 2.696 2.696 0 001.978 1.144 4.328 4.328 0 002.667-.71l10.448-6.063a4.483 4.483 0 001.923-1.987 2.701 2.701 0 000-2.277z"></path></svg>
                              WATCH NOW
                    </Button>
                          
                      </div>
                </div>
                  </SwiperSlide>)
              )}    

          </Swiper>
    </div>
  )
}

export default HeroSlide