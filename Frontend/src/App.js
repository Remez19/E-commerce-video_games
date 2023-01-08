import styles from "./App.module.css";
import Header from "./components/UI/UI_Elements/Header";
import DataContainer from "./components/DataContainer";
import Footer from "./components/UI/UI_Elements/Footer";
import React from "react";
import { useState } from "react";
function App() {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.main_app__container}>
        <DataContainer />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
