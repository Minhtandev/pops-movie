import React from "react";
import "./favourite-list.scss";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { LoadingButton } from "@mui/lab";
// import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import MediaItem from "../components/common/MediaItem";
// import Container from "../components/common/Container";
// import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../../api/modules/favorite.api";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { removeFavorite } from "../../redux/features/userSlice";
import LoadingButton from "../../components/loading-btn/LoadingButton";
import { MovieItem } from "../../components/movie-slide/MovieSlide";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import CategoryTitle from "../../components/category-title/CategoryTitle";

const FavouriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <div className="favourite-item">
      <MovieItem media={media} mediaType={media.mediaType} />
      <LoadingButton loading={onRequest} onClick={() => onRemove()}>
        <button onClick={() => onRemove()}>REMOVE</button>
      </LoadingButton>
    </div>
  );
};

const FavouriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  const [moveToTopActive, setMoveToTopActive] = useState(false);

  const onScroll = () => {
    // console.log(window.screenY,)
    if (
      window?.screenY >= 200 ||
      document?.body?.scrollTop >= 200 ||
      document?.documentElement?.scrollTop >= 200
    ) {
      setMoveToTopActive(true);
    } else {
      setMoveToTopActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getFavorites();
  }, []);
  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };
  return (
    <div className="favourite">
      <div className="content">
        <CategoryTitle text="Your favourites" />
        <div className="movie-grid">
          {filteredMedias.map((media, index) => (
            <FavouriteItem media={media} onRemoved={onRemoved} />
          ))}
        </div>
        {filteredMedias.length < medias.length && (
          <div className="loadmore">
            <button onClick={onLoadMore}>
              LOAD MORE
              <AiOutlineArrowDown />
            </button>
          </div>
        )}
        <div className={moveToTopActive ? "move-to-top active" : "move-to-top"}>
          <button onClick={() => window.scrollTo(0, 0)}>
            <AiOutlineArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteList;
