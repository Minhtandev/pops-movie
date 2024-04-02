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
import Review from "../../components/review/Review";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addFavorite, removeFavorite } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import favoriteApi from "../../api/modules/favorite.api";
import LoadingButton from "../../components/loading-btn/LoadingButton";
import WatchButton from "../../components/watch-button/WatchButton";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState({});
  const dispatch = useDispatch();
  const { user, listFavorites } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });

      if (response) {
        console.log(response);
        setMedia(response);
        setIsFavorite(response.isFavorite);
      }
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onRemoveFavorite = async () => {
    if (loading) return;
    setLoading(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, err } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });

    setLoading(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite success");
    }
  };

  const onFavoriteClick = async () => {
    if (!user) return navigate("/login");

    if (loading) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setLoading(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, err } = await favoriteApi.add(body);

    setLoading(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

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
                rating={Number(media.vote_average).toFixed(1) * 10 || 95}
              />
              {media.genres &&
                [...media.genres]
                  .splice(0, 2)
                  .map((genre, index) => <Tag tagName={genre.name} />)}
            </div>
            <p className="description">{media.overview}</p>
            <div className="btns-container">
              {user && (
                <LoadingButton loading={loading}>
                  <div
                    className="favortie-btn"
                    onClick={() => onFavoriteClick()}>
                    {isFavorite ? (
                      <AiFillHeart fill="#ea6016" />
                    ) : (
                      <AiOutlineHeart fill="#ea6016" />
                    )}
                  </div>
                </LoadingButton>
              )}
              <WatchButton mediaType={mediaType} mediaId={mediaId} />
            </div>
          </div>
        </div>
        <div className="container">
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
          <Review
            reviews={media.reviews ? media.reviews : []}
            media={media}
            mediaType={mediaType}
          />
          <MovieSlide recommendations={media?.recommend} />
          <MovieSlide />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MediaDetail;
