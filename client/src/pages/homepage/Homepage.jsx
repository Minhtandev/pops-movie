import React from "react";
import "./homepage.scss";
import MovieSlide from "../../components/movie-slide/MovieSlide";
import HeroSlide from "../../components/hero-slide/HeroSlide";
import Navbar from "../../components/navbar/Navbar";
import LazyLoad from "react-lazyload";
import Footer from "../../components/footer/Footer";
const Homepage = () => {
  return (
    <>
      <Navbar />
      <LazyLoad height={200}>
        <HeroSlide />
        <div className="container">
          <MovieSlide mediaType="movie" mediaCategory="popular" />
          <MovieSlide mediaType="movie" mediaCategory="top_rated" />
          <MovieSlide mediaType="tv" mediaCategory="popular" />
          <MovieSlide mediaType="tv" mediaCategory="top_rated" />
        </div>
      </LazyLoad>
      <Footer />
    </>
  );
};

export default Homepage;
