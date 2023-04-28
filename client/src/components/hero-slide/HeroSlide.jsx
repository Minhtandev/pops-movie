import React, { useEffect, useState } from "react";
import "./hero-slide.scss";
import CircularRate from "../circular-rate/CircularRate";
import Tag from "../tag/Tag";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { Autoplay } from "swiper";
import WatchButton from "../watch-button/WatchButton";

const HeroSlide = ({ mediaType = "movie", mediaCategory = "popular" }) => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }

      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          // pauseOnMouseEnter: true,
        }}
        style={{ width: "100%", height: "max-content" }}>
        {movies.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-img__container"
              style={{
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  item.backdrop_path || item.poster_path
                )})`,
              }}></div>
            <div className="hero-slide__overlay"></div>
            <div className="hero-slide__content">
              <div className="hero-slide__content__container">
                <h4 className="hero-slide__content__title">
                  {item.title || item.name}
                </h4>
                <div className="hero-slide__content__tags">
                  <CircularRate rating={item.vote_average * 10} />
                  {[...item.genre_ids].splice(0, 2).map((genreId, index) => (
                    <Tag
                      tagName={
                        genres.find((e) => e.id === genreId) &&
                        genres.find((e) => e.id === genreId).name
                      }
                    />
                  ))}
                </div>
                <p className="hero-slide__content__description">
                  {item.overview}
                </p>
                <WatchButton
                  mediaType={mediaType}
                  mediaId={item?.mediaId || item?.id}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
