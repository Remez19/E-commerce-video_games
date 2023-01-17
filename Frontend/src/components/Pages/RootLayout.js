import { Outlet } from "react-router-dom";
import { Fragment } from "react";

import Header from "../UI/UI_Elements/Header";
import Footer from "../UI/UI_Elements/Footer";

function RootLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default RootLayout;
