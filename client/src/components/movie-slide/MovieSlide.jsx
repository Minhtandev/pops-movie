import { useEffect, useState } from "react";
// import { Swiper } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "../auto-swiper/AutoSwiper";
import CircularRate from "../circular-rate/CircularRate";
import "./movie-slide.scss";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import { routesGen } from "../../routes/routes";
import { toast } from "react-toastify";
import CategoryTitle from "../category-title/CategoryTitle";

const MovieItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);
  return (
    <Link to={routesGen.mediaDetail(mediaType, media?.mediaId || media?.id)}>
      <div
        className="movie-item"
        style={{ backgroundImage: `url(${posterPath})` }}>
        <div className="movie-item__overlay">
          <div className="movie-item__overlay__icon">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M20.748 10.945a4.505 4.505 0 00-1.923-1.976L8.377 2.729a4.328 4.328 0 00-2.667-.71 2.698 2.698 0 00-1.978 1.143A4.504 4.504 0 003 5.86v12.28a4.502 4.502 0 00.732 2.698 2.696 2.696 0 001.978 1.144 4.328 4.328 0 002.667-.71l10.448-6.063a4.483 4.483 0 001.923-1.987 2.701 2.701 0 000-2.277z"></path>
            </svg>
          </div>
          <div className="movie-item__overlay__content">
            <CircularRate rating={Number(rate).toFixed(1) * 10} />
            <span>{releaseDate}</span>
            <div>{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
const MovieSlide = ({
  mediaType = "movie",
  mediaCategory = "popular",
  recommendations = [],
}) => {
  const [mediaArr, setMediaArr] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      if (recommendations.length > 0) {
        setMediaArr(recommendations);
      } else {
        const { response, err } = await mediaApi.getList({
          mediaType,
          mediaCategory,
          page: 1,
        });

        console.log("mediaArr>>>>", response.results);
        if (response) setMediaArr(response.results);
        if (err) toast.error(err.message);
      }
    };

    getMedias();
  }, [mediaType, mediaCategory]);
  return (
    <div className="movie-slide">
      <CategoryTitle
        text={
          recommendations.length > 0
            ? "you may also like"
            : `${mediaCategory} ${mediaType == "movie" ? "movie" : "tv series"}`
        }
      />

      <AutoSwiper>
        {mediaArr.map((item, i) => (
          <SwiperSlide>
            <MovieItem media={item} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </div>
  );
};

export default MovieSlide;

export { MovieItem };
