import store from "./Store/store";
import React from "react";
// import { dotenv } from "dotenv";

// Need to use React.lazy() to load components
import RootLayout from "./components/Pages/RootLayout";
import UserLoginPage from "./components/Pages/UserLoginPage";
import UserSignupPage from "./components/Pages/UserSignupPage";
import ErrorPage from "./components/Pages/ErrorPage";
import GameItemPage from "./components/Pages/GameItemPage";

import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Add Lazy loading for other pages as well
const GamesStorePage = React.lazy(() =>
  import("./components/Pages/GamesStorePage")
);
const OrdersPage = React.lazy(() => import("./components/Pages/OrdersPage"));

const CartPage = React.lazy(() => import("./components/Pages/CartPage"));

const RequestResetPasswordPage = React.lazy(() =>
  import("./components/Pages/RequestResetPasswordPage")
);

const ResetPasswordPage = React.lazy(() =>
  import("./components/Pages/ResetPasswordPage")
);

const ContactPage = React.lazy(() => import("./components/Pages/ContactPage"));

const UserProfilePage = React.lazy(() =>
  import("./components/Pages/UserProfilePage")
);

const CheckoutSuccessPage = React.lazy(() =>
  import("./components/Pages/CheckoutSuccessPage")
);

const AddItemPage = React.lazy(() => import("./components/Pages/AddItemPage"));

// dotenv.config();

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
      {
        path: "/new-password",
        element: (
          <React.Suspense>
            <RequestResetPasswordPage />
          </React.Suspense>
        ),
      },
      {
        path: "/new-password/:userId/:token",
        element: (
          <React.Suspense>
            <ResetPasswordPage />
          </React.Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <React.Suspense>
            <CartPage />
          </React.Suspense>
        ),
      },
      { path: "/user-profile", element: <UserProfilePage /> },
      {
        path: "/orders",
        element: (
          <React.Suspense>
            <OrdersPage />
          </React.Suspense>
        ),
        loader: async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_Backend}/order/getUserOrders`,
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
        element: (
          <React.Suspense>
            <CheckoutSuccessPage />
          </React.Suspense>
        ),
        loader: async () => {
          // Get Order data and create order on db
          try {
            const jsonData = await fetch(
              `${process.env.REACT_APP_Backend}/order/getOrder`,

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
      {
        path: "/contact",
        element: (
          <React.Suspense>
            <ContactPage />
          </React.Suspense>
        ),
      },
      {
        path: "/admin/add-item",
        element: (
          <React.Suspense>
            <AddItemPage />
          </React.Suspense>
        ),
      },
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
