import React from "react";
import "./review-list.scss";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { LoadingButton } from "@mui/lab";
// import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import MediaItem from "../components/common/MediaItem";
// import Container from "../components/common/Container";
// import uiConfigs from "../configs/ui.configs";
import reviewApi from "../../api/modules/review.api";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { removeFavorite } from "../../redux/features/userSlice";
import LoadingButton from "../../components/loading-btn/LoadingButton";
import { MovieItem } from "../../components/movie-slide/MovieSlide";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiFillDelete,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import dayjs from "dayjs";

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await reviewApi.remove({ reviewId: review.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove review success");
      onRemoved(review.id);
    }
  };

  return (
    <div className="item">
      <div className="image-container">
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: "unset", textDecoration: "none" }}>
          <div
            className="poster"
            style={{
              backgroundImage: `url(${tmdbConfigs.posterPath(
                review.mediaPoster
              )})`,
            }}></div>
        </Link>
      </div>
      <div className="content">
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: "unset", textDecoration: "none" }}>
          <h4 className="media-title">{review.mediaTitle}</h4>
        </Link>
        <h5 className="time">
          {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </h5>
        <h4 className="">{review.content}</h4>
      </div>
      <LoadingButton loading={onRequest}>
        <button onClick={onRemove}>
          <AiFillDelete />
          remove
        </button>
      </LoadingButton>
    </div>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 2;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setReviews([...response]);
        setFilteredReviews([...response].splice(0, skip));
      }
    };

    getReviews();
  }, []);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    console.log({ reviews });
    const newReviews = [...reviews].filter((e) => e.id !== id);
    console.log({ newReviews });
    setReviews(newReviews);
    setFilteredReviews([...newReviews].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <div className="review-list">
      <h2 className="title">{`Your reviews (${count})`}</h2>
      <div spacing={2}>
        {filteredReviews.map((item) => (
          <>
            <ReviewItem review={item} onRemoved={onRemoved} />
            <hr />
          </>
        ))}
        {filteredReviews.length < reviews.length && (
          <div className="loadmore">
            <button onClick={onLoadMore}>
              LOAD MORE
              <AiOutlineArrowDown />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
