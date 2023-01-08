import styles from "./App.module.css";
import Header from "./components/UI/UI_Elements/Header";
import DataContainer from "./components/DataContainer";
import Footer from "./components/UI/UI_Elements/Footer";
import React from "react";
import { Provider } from "react-redux";
import store from "./Store/store";
function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Header />
        <div className={styles.main_app__container}>
          <DataContainer />
        </div>
        <Footer />
      </Provider>
    </React.Fragment>
  );
}

export default App;
