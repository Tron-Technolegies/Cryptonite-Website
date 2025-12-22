import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import PageLayout from "../pages/PageLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import HostingPage from "../pages/HostingPage";
import ShopPage from "../pages/shop/ShopPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/shop/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import UsersDetailPage from "../pages/dashboard/UsersDetailPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import RentCheckoutPage from "../pages/shop/RentCheckoutPage";
import ForgotPasswordPage from "../pages/dashboard/ForgotPasswordPage";
import BlogPage from "../pages/BlogPage";
import BlogDetails from "../components/blogs/BlogDetails";
import ProductDetailsPage from "../pages/shop//ProductDetailsPage";
import ContactPage from "../pages/ContactPage";
import CalculatorPage from "../pages/calculator/CalculatorPage";
import CheckoutPage from "../pages/shop/checkout/CheckoutPage";
import PaymentSuccess from "../pages/shop/checkout/components/PaymentSuccess";
import AsicProfitabilityPage from "../pages/AsicProfitabilityPage";
import ResetPasswordPage from "../pages/dashboard/ResetPasswordPage";
// import ResetPasswordPage from "../pages/dashboard/ResetPasswordPage";

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
          path: "/calculator",
          element: <CalculatorPage />,
        },
        { path: "/asic-profitability", element: <AsicProfitabilityPage /> },
        {
          path: "/blogs",
          element: <BlogPage />,
        },
        {
          path: "/blogs/:id",
          element: <BlogDetails />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/shop",
          element: <ShopPage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailsPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/rent-checkout/:id",
          element: <RentCheckoutPage />,
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/verify-email/:uid/:token",
          element: <VerifyEmailPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage/>
        },
       {
        path: "/reset-password/:uid/:token",
        element : <ResetPasswordPage/>
       },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <UsersDetailPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "/reset-password/:uid/:token",
          element: <ResetPasswordPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
