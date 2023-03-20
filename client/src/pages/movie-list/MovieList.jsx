import React from "react";
import HeroSlide from "../../components/hero-slide/HeroSlide";
// import { LoadingButton } from "@mui/lab";
// import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import mediaApi from "../../api/modules/media.api";
// import uiConfigs from "../configs/ui.configs";
// import HeroSlide from "../components/common/HeroSlide";
// import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../../redux/features/appStateSlice";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import usePrevious from "../../hooks/usePrevious";
import "./movie-list.scss";
import { MovieItem } from "../../components/movie-slide/MovieSlide";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
const MovieList = ({ mediaType }) => {
  console.log(mediaType);
  const [mediaArr, setMediaArr] = useState([]);
  const [moveToTopActive, setMoveToTopActive] = useState(false);
  // const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevType = usePrevious(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];

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
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    const getMediaArr = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      //   setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      //   setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMediaArr((m) => [...m, ...response.results]);
        else setMediaArr([...response.results]);
      }
    };

    if (mediaType !== prevType) {
      setCurrCategory(0);
      setCurrPage(1);
    }

    getMediaArr();
  }, [mediaType, currCategory, prevType, currPage, mediaCategories, dispatch]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMediaArr([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);
  return (
    <div className="movie-list">
      <HeroSlide />
      <div className="movie-list__content">
        <div className="btns">
          <div className="title">
            {mediaType == "tv" ? "TV series" : "Movies"}
          </div>
          <div className="btns__container">
            {category.map((cate, index) => {
              return (
                <button
                  onClick={() => onCategoryChange(index)}
                  style={{
                    background: `${
                      currCategory == index
                        ? "#ea6016"
                        : "rgba(53, 52, 52, 0.5)"
                    }`,
                    color: `${currCategory == index ? "#fff" : "#ea6016"}`,
                  }}>
                  {cate}
                </button>
              );
            })}
          </div>
        </div>
        <div className="movie-grid">
          {mediaArr.map((media) => (
            <MovieItem media={media} mediaType={mediaType} />
          ))}
        </div>
        <div className="loadmore">
          <button onClick={onLoadMore}>
            LOAD MORE
            <AiOutlineArrowDown />
          </button>
        </div>{" "}
        <div className={moveToTopActive ? "move-to-top active" : "move-to-top"}>
          <button onClick={() => window.scrollTo(0, 0)}>
            <AiOutlineArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
