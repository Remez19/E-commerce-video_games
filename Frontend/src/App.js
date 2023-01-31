import store from "./Store/store";

// Pages imports
import RootLayout from "./components/Pages/RootLayout";
import GamesStorePage from "./components/Pages/GamesStorePage";
import UserLoginPage from "./components/Pages/UserLoginPage";
import UserSignupPage from "./components/Pages/UserSignupPage";
import ErrorPage from "./components/Pages/ErrorPage";
import CartPage from "./components/Pages/CartPage";
import OrdersPage from "./components/Pages/OrdersPage";
import OrderCheckoutPage from "./components/Pages/OrderCheckoutPage";
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
      { path: "/orders", element: <OrdersPage /> },
      { path: "/checkout", element: <OrderCheckoutPage /> },
      { path: "/game-item", element: <GameItemPage /> },
      { path: "/checkout-sucess", element: <CheckoutSuccessPage /> },
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
