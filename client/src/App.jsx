import './App.scss';
import HeroSlide from './components/hero-slide/HeroSlide';
import Navbar from './components/navbar/Navbar';
import MovieSlide from './components/movie-slide/MovieSlide';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSlide />
      <div className="container">
      <MovieSlide />

      </div>
    </div>
  );
}

export default App;
