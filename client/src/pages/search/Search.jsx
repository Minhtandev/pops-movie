import React, { useCallback, useEffect, useState, useRef } from "react";
import "./search.scss";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import mediaApi from "../../api/modules/media.api";
import { MovieItem } from "../../components/movie-slide/MovieSlide";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
let timer;
const timeout = 500;
const Search = () => {
  const { query } = useParams();
  const btn1 = useRef(null);
  const btn2 = useRef(null);
  // const [query, setQuery] = useState("");
  // const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState("movie");
  const [mediaArr, setMediaArr] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    //   setOnSearch(true);

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    //   setOnSearch(false);

    //   if (err) toast.error(err.message);
    if (response) {
      if (page > 1) setMediaArr((m) => [...m, ...response.results]);
      else setMediaArr([...response.results]);
    }
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
      <Navbar />
      <div className="search-page">
        <div className="search-page__btns">
          <Button
            variant="primary"
            ref={btn1}
            onClick={() => {
              setMediaType("movie");
            }}>
            MOVIES
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setMediaType("tv");
            }}>
            TV SERIES
          </Button>
        </div>
        <div className="search-page__results">
          <div className="movie-grid">
            {mediaArr.map((media) => (
              <MovieItem media={media} mediaType={mediaType} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
