import Homepage from "../pages/homepage/Homepage";
// import PersonDetail from "../pages/PersonDetail";
import FavouriteList from "../pages/favorites/FavouriteList";
import MediaDetail from "../pages/media-detail/MediaDetail";
// import MediaList from "../pages/MediaList";
import Search from "../pages/search/Search";
// import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/reviews/ReviewList";
import ProtectedPage from "../components/ProtectedPage";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import NotFound from "../components/not-found/NotFound";
import MovieList from "../pages/movie-list/MovieList";

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: <Homepage />,
    state: "home",
  },
  // {
  //   path: "/person/:personId",
  //   element: <PersonDetail />,
  //   state: "person.detail"
  // },
  {
    path: "/search/:query",
    element: <Search />,
    state: "search",
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   state: "login",
  // },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  //   state: "signup ",
  // },
  // {
  //   path: "/password-update",
  //   element: (
  //     <ProtectedPage>
  //       <PasswordUpdate />
  //     </ProtectedPage>
  //   ),
  //   state: "password.update"
  // },
  {
    path: "/favourites",
    element: (
      <ProtectedPage>
        <FavouriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/tv",
    element: <MovieList mediaType="tv" />,
  },
  {
    path: "/movie",
    element: <MovieList mediaType="movie" />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
];

export default routes;
