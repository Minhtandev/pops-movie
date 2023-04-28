import React, { useEffect, useState } from "react";
import {
  AiOutlineSend,
  AiFillDelete,
  AiOutlineArrowDown,
} from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
// import Container from "./Container";
import reviewApi from "../../api/modules/review.api";
// import TextAvatar from "./TextAvatar";
import Avatar from "../../assets/user.webp";
import LoadingButton from "../../components/loading-btn/LoadingButton";
import "./review.scss";
import CategoryTitle from "../category-title/CategoryTitle";
const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });

    if (err) toast.error(err.message);
    if (response) onRemoved(review.id);
  };

  return (
    <div className="item" direction="row" spacing={2}>
      <img src={Avatar} alt="" />
      <div className="item__content" spacing={2} flexGrow={1}>
        <div spacing={1}>
          <h3 className="user-name">{review.user.displayName}</h3>
          <h5 className="time">
            {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </h5>
        </div>
        <h4>{review.content}</h4>
        {user && user.id === review.user.id && (
          <LoadingButton
            loading={onRequest}
            //   sx={{
            //     position: { xs: "relative", md: "absolute" },
            //     right: { xs: 0, md: "10px" },
            //     marginTop: { xs: 2, md: 0 },
            //     width: "max-content",
            //           }}
          >
            <button onClick={onRemove}>
              <AiFillDelete />
              Remove
            </button>
          </LoadingButton>
        )}
      </div>
    </div>
    // </Box>
  );
};

const Review = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, err } = await reviewApi.add(body);
    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      toast.success("Post review success");
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success("Remove review success");
  };

  return (
    <div className="review">
      <CategoryTitle text={`Reviews (${reviewCount})`} />
      <div className="review__content">
        {filteredReviews.map((item) => (
          <ReviewItem review={item} onRemoved={onRemoved} />
        ))}
        {filteredReviews.length < listReviews.length && (
          <div className="loadmore">
            <button onClick={onLoadMore}>
              LOAD MORE
              <AiOutlineArrowDown />
            </button>
          </div>
        )}
      </div>
      {user && (
        <>
          <hr />
          <div className="review-box" direction="row" spacing={2}>
            {/* <TextAvatar text={user.displayName} /> */}
            <img src={Avatar} />
            <div className="review-box__content">
              <h3 className="user-name">{user.displayName}</h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                // multiline
                rows={4}
                placeholder="Write your review"
                variant="outlined"
              />
              <LoadingButton loading={onRequest}>
                <button onClick={onAddReview}>
                  <AiOutlineSend />
                  Send
                </button>
              </LoadingButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
