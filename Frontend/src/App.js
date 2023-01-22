// import Header from "./components/UI/UI_Elements/Header";

// import Footer from "./components/UI/UI_Elements/Footer";
import store from "./Store/store";

// Pages imports
import RootLayout from "./components/Pages/RootLayout";
import GamesStorePage from "./components/Pages/GamesStorePage";
import UserLoginPage from "./components/Pages/UserLoginPage";
import UserSignupPage from "./components/Pages/UserSignupPage";
import ErrorPage from "./components/Pages/ErrorPage";

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
