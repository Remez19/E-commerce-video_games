import store from "./Store/store";

// Pages imports
import RootLayout from "./components/Pages/RootLayout";
import GamesStorePage from "./components/Pages/GamesStorePage";
import UserLoginPage from "./components/Pages/UserLoginPage";
import UserSignupPage from "./components/Pages/UserSignupPage";
import ErrorPage from "./components/Pages/ErrorPage";
import CartPage from "./components/Pages/CartPage";
import OrdersPage from "./components/Pages/OrdersPage";
import GameItemPage from "./components/Pages/GameItemPage";
import CheckoutSuccessPage from "./components/Pages/CheckoutSuccessPage";

import React from "react";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <GamesStorePage /> },
      {
        path: "/login",
        element: <UserLoginPage />,
      },
      { path: "/signup", element: <UserSignupPage /> },
      { path: "/shop", element: <CartPage /> },
      {
        path: "/orders",
        element: <OrdersPage />,
        loader: async () => {
          try {
            const jsonData = await fetch(
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
            const resData = await jsonData.json();
            return resData;
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
              "http://localhost:8080/order/setNewOrder",

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
    ],
  },
]);

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Fragment>
  );
}

export default App;
