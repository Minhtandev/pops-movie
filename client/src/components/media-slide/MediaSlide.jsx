import { useEffect, useState, useRef } from "react";
// import { Swiper } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "../auto-swiper/AutoSwiper";
import CircularRate from "../circular-rate/CircularRate";
import "./media-slide.scss";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import { routesGen } from "../../routes/routes";
import NavigationSwiper from "../navigation-swiper/NavigationSwiper";
import CategoryTitle from "../category-title/CategoryTitle";
const VideoItem = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    console.log("ifram");
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [video]);
  return (
    <iframe
      key={video.key}
      src={tmdbConfigs.youtubePath(video.key)}
      ref={iframeRef}
      width="100%"
      title={video.id}
      style={{ border: 0 }}></iframe>
  );
};

const VideoSlide = ({ mediaArr }) => {
  return (
    <div className="video-slide">
      <CategoryTitle text="Trailers" />
      <NavigationSwiper>
        {[...mediaArr].map((video, i) => (
          <SwiperSlide>
            <VideoItem video={video} />
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </div>
  );
};

const BackdropSlide = ({ mediaArr }) => {
  return (
    <div className="backdrop-slide">
      <CategoryTitle text="Backdrops" />
      <NavigationSwiper>
        {[...mediaArr].splice(0, 10).map((item, i) => (
          <SwiperSlide>
            <div
              className="backdrop-item"
              style={{
                paddingTop: "60%",
                backgroundPosition: "center top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  item.file_path
                )})`,
              }}></div>
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </div>
  );
};

const PosterSlide = ({ mediaArr }) => {
  return (
    <div className="poster-slide">
      <CategoryTitle text="Posters" />
      <AutoSwiper>
        {[...mediaArr].splice(0, 10).map((item, i) => (
          <SwiperSlide>
            <div
              className="poster-item"
              style={{
                paddingTop: "160%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.posterPath(
                  item.file_path
                )})`,
              }}></div>
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </div>
  );
};

export { VideoSlide, BackdropSlide, PosterSlide };
