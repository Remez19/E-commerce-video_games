import styles from "./App.module.css";
import Header from "./components/UI/UI_Elements/Header";
import DataContainer from "./components/DataContainer";
import Footer from "./components/UI/UI_Elements/Footer";
import { useState } from "react";
import React from "react";
import { Provider } from "react-redux";
import store from "./Store/store";
function App() {
  const [searchBarValue, setSearchBarValue] = useState(undefined);
  const getKeyWordsHandler = (keyWords) => {
    setSearchBarValue(keyWords);
  };
  return (
    <React.Fragment>
      <Provider store={store}>
        <Header sendKeyWords={getKeyWordsHandler} />
        <div className={styles.main_app__container}>
          <DataContainer serachBarValue={searchBarValue} />
        </div>
        <Footer />
      </Provider>
    </React.Fragment>
  );
}

export default App;
