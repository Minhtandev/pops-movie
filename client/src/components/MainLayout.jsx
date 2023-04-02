import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import GlobalLoading from "./global-loading/GlobalLoading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";
import favoriteApi from "../api/modules/favorite.api";
import { setListFavorites, setUser } from "../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  console.log("user>>>", user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      // console.log(err);
      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);
  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      {/* <AuthModal /> */}
      {/* login modal */}

      {/* header */}
      <Navbar />
      {/* header */}

      {/* main */}
      {/* <div
              style={{flexGrow: 1, overFlow: "hidden", minHeight: "100vh"}}
        > */}
      <Outlet />
      {/* </div> */}
      {/* main */}

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;
