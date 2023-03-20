import React, { useCallback, useEffect, useState, useRef } from "react";
import "./search.scss";
// import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import mediaApi from "../../api/modules/media.api";
import { MovieItem } from "../../components/movie-slide/MovieSlide";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { useDispatch, useSelector } from "react-redux";

let timer;
const timeout = 500;
const Search = () => {
  const { query } = useParams();
  const btn1El = useRef(null);
  const btn2El = useRef(null);
  // const [query, setQuery] = useState("");
  // const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState("movie");
  const [mediaArr, setMediaArr] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const search = useCallback(async () => {
    //   setOnSearch(true);
    dispatch(setGlobalLoading(true));

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    //   setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      if (page > 1) setMediaArr((m) => [...m, ...response.results]);
      else setMediaArr([...response.results]);
    }
    dispatch(setGlobalLoading(false));
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMediaArr([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMediaArr([]);
    setPage(1);
  }, [mediaType]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="search-page">
        <div className="search-page__btns">
          <button
            className="movie-btn"
            variant="primary"
            ref={btn1El}
            onClick={() => {
              setMediaType("movie");
              btn2El.current.style.borderColor = "#ea6016";
              btn2El.current.style.background = "rgba(53, 52, 52, 0.5)";
              btn2El.current.style.color = "#ea6016";

              btn1El.current.style.borderColor = "#ea6016";
              btn1El.current.style.background = "#ea6016";
              btn1El.current.style.color = "#fff";
            }}>
            MOVIES
          </button>
          <button
            variant="primary"
            ref={btn2El}
            onClick={() => {
              setMediaType("tv");
              btn1El.current.style.borderColor = "#ea6016";
              btn1El.current.style.background = "rgba(53, 52, 52, 0.5)";
              btn1El.current.style.color = "#ea6016";

              btn2El.current.style.borderColor = "#ea6016";
              btn2El.current.style.background = "#ea6016";
              btn2El.current.style.color = "#fff";
            }}>
            TV SERIES
          </button>
        </div>
        <div className="search-page__results">
          <div className="movie-grid">
            {mediaArr.map((media) => (
              <MovieItem media={media} mediaType={mediaType} />
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Search;
