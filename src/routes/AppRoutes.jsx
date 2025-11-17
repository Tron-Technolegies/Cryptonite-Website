import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import PageLayout from "../pages/PageLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import HostingPage from "../pages/HostingPage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetailsPage from "../pages/shop/ProductDetailsPage";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <PageLayout />,

      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/hosting",
          element: <HostingPage/>
        },
        {
          path: "/shop",
          element: <ShopPage/>
        },
        {
          path: "/product/:id", element: <ProductDetailsPage/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
