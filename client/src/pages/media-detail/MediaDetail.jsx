import { useEffect, useState, useRef } from "react";
import "./media-detail.scss";
import mediaApi from "../../api/modules/media.api";
import genreApi from "../../api/modules/genre.api";
import CircularRate from "../../components/circular-rate/CircularRate";
import Tag from "../../components/tag/Tag";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MovieSlide from "../../components/movie-slide/MovieSlide";
import tmdbConfigs from "../../api/configs/tmdb.configs.js";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
import { toast } from "react-toastify";
import {
  VideoSlide,
  PosterSlide,
  BackdropSlide,
} from "../../components/media-slide/MediaSlide";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { useDispatch, useSelector } from "react-redux";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const [media, setMedia] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });

      if (response) {
        // console.log(response);
        setMedia(response);
      }
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };
    getMedia();
  }, [mediaType, mediaId]);
  return (
    <>
      {/* <Navbar /> */}
      <div className="media-detail">
        <div
          className="img-header"
          style={{
            backgroundImage: `url(${tmdbConfigs.backdropPath(
              media.backdrop_path || media.poster_path
            )})`,
          }}></div>
        <div className="content">
          <div
            className="poster"
            style={{
              backgroundImage: `url(${tmdbConfigs.posterPath(
                media.poster_path || media.backdrop_path
              )})`,
            }}></div>
          <div className="info">
            <h4 className="title">{media.title || media.name}</h4>
            <div className="tags">
              <CircularRate
                rating={Number(media.vote_average).toFixed(1) * 10}
              />
              {media.genres &&
                [...media.genres]
                  .splice(0, 2)
                  .map((genre, index) => <Tag tagName={genre.name} />)}
            </div>
            <p className="description">{media.overview}</p>
            <Button variant="primary">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M20.748 10.945a4.505 4.505 0 00-1.923-1.976L8.377 2.729a4.328 4.328 0 00-2.667-.71 2.698 2.698 0 00-1.978 1.143A4.504 4.504 0 003 5.86v12.28a4.502 4.502 0 00.732 2.698 2.696 2.696 0 001.978 1.144 4.328 4.328 0 002.667-.71l10.448-6.063a4.483 4.483 0 001.923-1.987 2.701 2.701 0 000-2.277z"></path>
              </svg>
              WATCH NOW
            </Button>
          </div>
        </div>
        <div className="slide-container">
          {media.videos && media.videos.results.length > 0 && (
            <VideoSlide
              mediaArr={
                media.videos ? [...media.videos.results].splice(0, 5) : []
              }
            />
          )}
          {media.images && media.images.posters && (
            <PosterSlide mediaArr={media.images ? media.images.posters : []} />
          )}
          {media.images && media.images.backdrops && (
            <BackdropSlide
              mediaArr={media.images ? media.images.backdrops : []}
            />
          )}
          <MovieSlide recommendations={media?.recommend} />
          <MovieSlide />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MediaDetail;
