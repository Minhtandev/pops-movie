import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import GlobalLoading from "./global-loading/GlobalLoading";

const MainLayout = () => {
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
