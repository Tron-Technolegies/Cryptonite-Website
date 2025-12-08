import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import PageLayout from "../pages/PageLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import HostingPage from "../pages/HostingPage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetailsPage from "../pages/shop/ProductDetailsPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/shop/CartPage";
import CheckoutPage from "../pages/shop/CheckoutPage";
import ProtectedRoute from "./ProtectedRoute";
import UsersDetailPage from "../pages/dashboard/UsersDetailPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import RentCheckoutPage from "../pages/shop/RentCheckoutPage";
import ForgotPasswordPage from "../pages/dashboard/ForgotPasswordPage";
import ResetPasswordPage from "../pages/dashboard/ResetPasswordPage";
import BlogPage from "../pages/BlogPage";
import BlogDetails from "../components/blogs/BlogDetails";

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
          element: <HostingPage />,
        },
        {
          path: "/blogs",
          element: <BlogPage/>
        },
        {
          path: "/blogs/:id",
          element: <BlogDetails/>
        }
        // {
        //   path: "/shop",
        //   element: <ShopPage />,
        // },
        // {
        //   path: "/product/:id",
        //   element: <ProductDetailsPage />,
        // },
        // {
        //   path: "/cart",
        //   element: <CartPage />,
        // },
        // {
        //   path: "/checkout",
        //   element: <CheckoutPage />,
        // },
        // {
        // path: "/rent-checkout/:id",
        // element: <RentCheckoutPage/>
        // },
        // {
        //   path: "/signup",
        //   element: <SignupPage />,
        // },
        // {
        //   path: "/login",
        //   element: <LoginPage />,
        // },
        // {
        //   path: "/verify-email/:uid/:token",
        //   element: <VerifyEmailPage />,
        // },
        // {
        //   path: "/dashboard",
        //   element: (
        //     <ProtectedRoute>
        //       <UsersDetailPage />
        //     </ProtectedRoute>
        //   ),
        // },
        // {
        //   path : "/forgot-password",
        //   element: <ForgotPasswordPage/>
        // },
        // {
        //   path: "/reset-password/:uid/:token",
        //   element: <ResetPasswordPage/>
        // }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
