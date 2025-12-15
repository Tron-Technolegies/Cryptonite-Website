import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const PageLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />

      <main className={isHome ? "" : "pt-20"}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PageLayout;
