import store from "./Store/store";
import React from "react";

// Pages imports
// Can use a diffrent method to import pages e.g use import only
// if the page is needed to load.

// Need to use React.lazy() to load components
import RootLayout from "./components/Pages/RootLayout";
// import GamesStorePage from "./components/Pages/GamesStorePage";
import UserLoginPage from "./components/Pages/UserLoginPage";
import UserSignupPage from "./components/Pages/UserSignupPage";
import RequestResetPasswordPage from "./components/Pages/RequestResetPasswordPage";
import ResetPasswordPage from "./components/Pages/ResetPasswordPage";
import ErrorPage from "./components/Pages/ErrorPage";
import CartPage from "./components/Pages/CartPage";
import OrdersPage from "./components/Pages/OrdersPage";
import GameItemPage from "./components/Pages/GameItemPage";
import CheckoutSuccessPage from "./components/Pages/CheckoutSuccessPage";
import UserProfilePage from "./components/Pages/UserProfilePage";
import ContactPage from "./components/Pages/ContactPage";

import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Add Lazy loading for other pages as well
const GamesStorePage = React.lazy(() =>
  import("./components/Pages/GamesStorePage")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <React.Suspense>
            <GamesStorePage />
          </React.Suspense>
        ),
      },
      {
        path: "/login",
        element: <UserLoginPage />,
      },
      { path: "/signup", element: <UserSignupPage /> },
      { path: "/new-password", element: <RequestResetPasswordPage /> },
      {
        path: "/new-password/:userId/:token",
        element: <ResetPasswordPage />,
      },
      { path: "/shop", element: <CartPage /> },
      { path: "/user-profile", element: <UserProfilePage /> },
      {
        path: "/orders",
        element: <OrdersPage />,
        loader: async () => {
          try {
            const response = await fetch(
              "http://localhost:8080/order/getUserOrders",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  userEmail: localStorage.getItem("userEmail"),
                }),
              }
            );
            if (response.ok) {
              const resData = await response.json();
              return resData;
            }
            if (response.status === 401) {
              // window.location("/login");
              localStorage.clear();
              window.location.href = "/login";
            }
          } catch (err) {
            throw err;
          }
        },
      },
      { path: "/game-item", element: <GameItemPage /> },
      {
        path: "/checkout-sucess",
        element: <CheckoutSuccessPage />,
        loader: async () => {
          // Get Order data and create order on db
          try {
            const jsonData = await fetch(
              "http://localhost:8080/order/getOrder",

              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  userEmail: localStorage.getItem("userEmail"),
                }),
              }
            );
            const resData = await jsonData.json();
            return resData;
          } catch (err) {
            throw err;
          }
        },
      },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
