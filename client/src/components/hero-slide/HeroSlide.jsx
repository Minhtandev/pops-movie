import React, { useEffect, useState } from "react";
import "./hero-slide.scss";
import CircularRate from "../circular-rate/CircularRate";
import Tag from "../tag/Tag";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { Autoplay } from "swiper";

// import PlayArrowIcon from "@mui/icons-material/PlayArrow";s
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
        // modules={[Autoplay]}
        grabCursor={true}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        //   // pauseOnMouseEnter: true,
        // }}
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
                <Button variant="primary">
                  <Link
                    to={routesGen.mediaDetail(
                      mediaType,
                      item?.mediaId || item?.id
                    )}>
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path d="M20.748 10.945a4.505 4.505 0 00-1.923-1.976L8.377 2.729a4.328 4.328 0 00-2.667-.71 2.698 2.698 0 00-1.978 1.143A4.504 4.504 0 003 5.86v12.28a4.502 4.502 0 00.732 2.698 2.696 2.696 0 001.978 1.144 4.328 4.328 0 002.667-.71l10.448-6.063a4.483 4.483 0 001.923-1.987 2.701 2.701 0 000-2.277z"></path>
                    </svg>
                    WATCH NOW
                  </Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
